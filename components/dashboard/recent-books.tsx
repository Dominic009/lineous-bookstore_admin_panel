import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PriceRange } from "@/lib/types/book";

const books: { title: string; priceRange: PriceRange; category: string }[] = [
  {
    title: "Advanced Mathematics",
    priceRange: { min: 250, max: 400, display: "From ৳250" },
    category: "Science",
  },
  {
    title: "Physics Essentials",
    priceRange: { min: 300, max: 300, display: "৳300" },
    category: "Science",
  },
  {
    title: "Biology Guide",
    priceRange: { min: 200, max: 350, display: "From ৳200" },
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
              key={book.title}
              className="flex items-center justify-between rounded-md border border-border/60 bg-muted/20 p-4 transition-colors hover:bg-muted/40"
            >
              <div className="space-y-1">
                <h4 className="font-medium">{book.title}</h4>
                <p className="text-sm text-muted-foreground">{book.priceRange.display}</p>
              </div>

              <div className="text-sm text-muted-foreground">{book.category}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
