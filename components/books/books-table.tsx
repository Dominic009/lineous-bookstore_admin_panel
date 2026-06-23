import Image from "next/image";

import { StatusBadge } from "./status-badge";
import { BookActions } from "./book.actions";

const books = [
  {
    id: 1,
    title: "Advanced Mathematics",
    isbn: "978123456",
    price: "$25",
    stock: 42,
    status: "PUBLISHED" as const,
  },
  {
    id: 2,
    title: "Physics Essentials",
    isbn: "978444555",
    price: "$18",
    stock: 12,
    status: "DRAFT" as const,
  },
  {
    id: 3,
    title: "Chemistry Handbook",
    isbn: "978777999",
    price: "$30",
    stock: 8,
    status: "ARCHIVED" as const,
  },
] as const;

export function BooksTable() {
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
                    <Image
                      src="https://placehold.co/60x80"
                      alt=""
                      width={40}
                      height={56}
                      className="rounded-md object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="font-medium">{book.title}</h4>
                    <p className="text-sm text-muted-foreground">Science</p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-sm text-muted-foreground">
                {book.isbn}
              </td>

              <td className="px-6 py-4 text-sm font-medium">{book.price}</td>

              <td className="px-6 py-4 text-sm">{book.stock}</td>

              <td className="px-6 py-4">
                <StatusBadge status={book.status} />
              </td>

              <td className="px-6 py-4">
                <BookActions />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
