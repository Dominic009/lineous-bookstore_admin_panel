import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { orderStatusConfig } from "@/constants/status";
import type { RecentOrder } from "@/lib/types/book";

interface RecentOrdersProps {
  orders: RecentOrder[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="border-border/60 shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
      </CardHeader>

      <CardContent>
        {orders.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No recent orders found
          </p>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => {
              const config = orderStatusConfig[order.status] || {
                label: order.status,
                variant: "secondary" as const,
                color: "bg-gray-100 text-gray-800",
              };

              return (
                <div
                  key={order.orderNumber}
                  className="flex items-center justify-between rounded-md border border-border/60 bg-muted/20 p-4 transition-colors hover:bg-muted/40"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium">{order.orderNumber}</h4>
                    <p className="text-sm text-muted-foreground">
                      {order.customerName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold">৳{order.total.toLocaleString()}</div>
                    <Badge variant={config.variant} className={`${config.color} mt-1`}>
                      {config.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
