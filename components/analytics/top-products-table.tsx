import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy } from "lucide-react";
import type { TopProduct } from "@/lib/types/book";

interface TopProductsTableProps {
  products: TopProduct[];
}

const medalStyles: Record<number, string> = {
  1: "bg-amber-100 text-amber-700 ring-amber-200",
  2: "bg-slate-100 text-slate-600 ring-slate-200",
  3: "bg-orange-100 text-orange-700 ring-orange-200",
};

export function TopProductsTable({ products }: TopProductsTableProps) {
  if (!products || products.length === 0) {
    return (
      <Card className="border-border/60 shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Top Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center">
            <p className="text-sm text-muted-foreground">No product data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxRevenue = Math.max(...products.map((p) => p.revenue));

  return (
    <Card className="border-border/60 shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Top Products</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Qty Sold</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const share = maxRevenue > 0 ? (product.revenue / maxRevenue) * 100 : 0;
              const medal = medalStyles[product.rank];

              return (
                <TableRow key={product.bookId}>
                  <TableCell>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ring-4 ${
                        medal || "bg-primary/10 text-primary ring-primary/5"
                      }`}
                    >
                      {medal && product.rank === 1 ? (
                        <Trophy className="h-3.5 w-3.5" />
                      ) : (
                        product.rank
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{product.title}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    {product.quantitySold.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="font-semibold">
                        ৳{product.revenue.toLocaleString()}
                      </span>
                      {/* relative revenue indicator, scaled against the top performer */}
                      <div className="h-1 w-20 overflow-hidden rounded-full bg-muted/40">
                        <div
                          className="h-full rounded-full bg-primary/70 transition-all duration-500"
                          style={{ width: `${share}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
