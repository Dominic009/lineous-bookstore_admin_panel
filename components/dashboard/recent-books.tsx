import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const books = [
  {
    title: "Advanced Mathematics",
    isbn: "978-123456",
    stock: 50,
  },
  {
    title: "Physics Essentials",
    isbn: "978-654321",
    stock: 22,
  },
  {
    title: "Biology Guide",
    isbn: "978-444555",
    stock: 17,
  },
];

export function RecentBooks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Books</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {books.map((book) => (
            <div
              key={book.isbn}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <h4 className="font-medium">{book.title}</h4>

                <p className="text-sm text-muted-foreground">{book.isbn}</p>
              </div>

              <div className="text-sm">Stock: {book.stock}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
