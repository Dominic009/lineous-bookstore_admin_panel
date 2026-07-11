import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import type { TopSellingBook } from "@/lib/types/book";

interface TopSellingBooksProps {
  books: TopSellingBook[];
}

export function TopSellingBooks({ books }: TopSellingBooksProps) {
  return (
    <Card className="border-border/60 shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Top Selling Books</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {books.map((book) => (
            <div
              key={book.bookId}
              className="flex items-center gap-4 rounded-md border border-border/60 bg-muted/20 p-3 transition-colors hover:bg-muted/40"
            >
              {/* Rank */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {book.rank}
              </div>

              {/* Cover Image */}
              <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                {book.coverImage ? (
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Book Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{book.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {book.publication}
                  </Badge>
                  <span className="text-xs text-muted-foreground truncate">
                    {book.subject}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="text-right shrink-0">
                <div className="text-sm font-semibold text-primary">
                  ৳{book.totalRevenue.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {book.totalQuantitySold} sold
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
