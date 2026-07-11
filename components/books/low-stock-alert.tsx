import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import type { LowStockBook, OutOfStockBook } from "@/lib/types/book";

interface LowStockAlertProps {
  lowStockBooks: LowStockBook[];
  outOfStockBooks: OutOfStockBook[];
}

export function LowStockAlert({ lowStockBooks, outOfStockBooks }: LowStockAlertProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Out of Stock */}
      <Card className="border-border/60 shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rose-600" />
            Out of Stock ({outOfStockBooks?.length})
          </CardTitle>
        </CardHeader>

        <CardContent>
          {outOfStockBooks?.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No out of stock books
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead>Paper</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {outOfStockBooks?.map((book) => (
                  <TableRow key={`${book.bookId}-${book.paperName}`}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>
                      <Badge variant="destructive">{book.paperName}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Low Stock */}
      <Card className="border-border/60 shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Low Stock ({lowStockBooks?.length})
          </CardTitle>
        </CardHeader>

        <CardContent>
          {lowStockBooks?.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No low stock books
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead>Paper</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Threshold</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockBooks?.map((book) => (
                  <TableRow key={`${book?.bookId}-${book?.paperName}`}>
                    <TableCell className="font-medium">{book?.title}</TableCell>
                    <TableCell>{book.paperName}</TableCell>
                    <TableCell className="text-right">
                      <span className="font-semibold text-orange-600">
                        {book.currentStock}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {book.threshold}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
