import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const books = [
  {
    title: "Advanced Mathematics",
    isbn: "978-123456",
    stock: 50,
    category: "Science",
  },
  {
    title: "Physics Essentials",
    isbn: "978-654321",
    stock: 22,
    category: "Science",
  },
  {
    title: "Biology Guide",
    isbn: "978-444555",
    stock: 17,
    category: "Science",
  },
];

export function RecentBooks() {
  return (
    <Card className="border-border/60 shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Recent Books</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {books.map((book) => (
            <div
              key={book.isbn}
              className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-4 transition-colors hover:bg-muted/40"
            >
              <div className="space-y-1">
                <h4 className="font-medium">{book.title}</h4>
                <p className="text-sm text-muted-foreground">{book.isbn}</p>
              </div>

              <div className="text-sm font-medium">Stock: {book.stock}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
