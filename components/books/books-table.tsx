"use client";

import Image from "next/image";
import { toast } from "sonner";

import { StatusBadge } from "./status-badge";
import { BookActions } from "./book.actions";
import { useBooks, useDeleteBook } from "@/lib/hooks/use-books";
import type { Book } from "@/lib/types/book";

interface BooksTableProps {
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
}

export function BooksTable({ onEdit, onDelete }: BooksTableProps) {
  const { data: books, isLoading, error } = useBooks();
  const deleteMutation = useDeleteBook();

  const handleDelete = async (book: Book) => {
    try {
      await deleteMutation.mutateAsync(book.id);
      toast.success("Book deleted successfully");
      onDelete?.(book);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to delete book";
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Failed to load books";
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-destructive">{errorMessage}</p>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">No books found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border/60 bg-muted/30 text-left text-sm">
            <th className="px-6 py-4 font-medium text-muted-foreground">Book</th>
            <th className="px-6 py-4 font-medium text-muted-foreground">ISBN</th>
            <th className="px-6 py-4 font-medium text-muted-foreground">Price</th>
            <th className="px-6 py-4 font-medium text-muted-foreground">Stock</th>
            <th className="px-6 py-4 font-medium text-muted-foreground">Status</th>
            <th className="px-6 py-4 font-medium text-muted-foreground"></th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr
              key={book.id}
              className="border-b border-border/40 transition-colors last:border-0 hover:bg-muted/20"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-10 items-center justify-center rounded-lg bg-muted/50">
                    {book.thumbnail ? (
                      <Image
                        src={book.thumbnail}
                        alt={book.title}
                        width={40}
                        height={56}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <div className="text-xs text-muted-foreground">No Image</div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium">{book.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {book.subject?.name || "Uncategorized"}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-sm text-muted-foreground">
                {book.isbn || "-"}
              </td>

              <td className="px-6 py-4 text-sm font-medium">
                ${book.price.toFixed(2)}
                {book.discountPrice && (
                  <span className="ml-2 text-xs text-muted-foreground line-through">
                    ${book.discountPrice.toFixed(2)}
                  </span>
                )}
              </td>

              <td className="px-6 py-4 text-sm">{book.stock}</td>

              <td className="px-6 py-4">
                <StatusBadge status={book.status} />
              </td>

              <td className="px-6 py-4">
                <BookActions 
                  onEdit={() => onEdit?.(book)}
                  onDelete={() => handleDelete(book)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
