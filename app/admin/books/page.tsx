"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { BooksTable } from "@/components/books/books-table";
import { BookDialog } from "@/components/books/book-dialog";
import type { Book } from "@/lib/types/book";

export default function BooksPage() {
  const router = useRouter();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleView = (book: Book) => {
    router.push(`/admin/books/${book.id}`);
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (book: Book) => {
    setSelectedBook(book);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // The delete is handled in the BooksTable component
    setIsDeleteDialogOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Books</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your bookstore inventory.
          </p>
        </div>

        <BookDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          trigger={
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Book
            </Button>
          }
          onBookCreated={(bookId) => {
            router.push(`/admin/books/${bookId}`);
          }}
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search books..."
            className="h-10 rounded-md border-border/60 bg-muted/30 pl-10 pr-4"
          />
        </div>

        <Button variant="outline" className="gap-2 rounded-md">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <BooksTable onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Edit Dialog */}
      <BookDialog
        book={selectedBook}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Book</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &#34;{selectedBook?.title}&#34;? This action will soft delete the book.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
