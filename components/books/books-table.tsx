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
    status: "PUBLISHED",
  },
  {
    id: 2,
    title: "Physics Essentials",
    isbn: "978444555",
    price: "$18",
    stock: 12,
    status: "DRAFT",
  },
  {
    id: 3,
    title: "Chemistry Handbook",
    isbn: "978777999",
    price: "$30",
    stock: 8,
    status: "ARCHIVED",
  },
] as const;

export function BooksTable() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <table className="w-full">
        <thead className="border-b bg-muted/40">
          <tr className="text-left text-sm">
            <th className="p-4">Book</th>

            <th>ISBN</th>

            <th>Price</th>

            <th>Stock</th>

            <th>Status</th>

            <th></th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="border-b transition hover:bg-muted/30">
              <td className="p-4">
                <div className="flex items-center gap-4">
                  <Image
                    src="https://placehold.co/60x80"
                    alt=""
                    width={60}
                    height={80}
                    className="rounded-lg"
                  />

                  <div>
                    <h4 className="font-medium">{book.title}</h4>

                    <p className="text-sm text-muted-foreground">Science</p>
                  </div>
                </div>
              </td>

              <td>{book.isbn}</td>

              <td>{book.price}</td>

              <td>{book.stock}</td>

              <td>
                <StatusBadge status={book.status} />
              </td>

              <td>
                <BookActions />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
