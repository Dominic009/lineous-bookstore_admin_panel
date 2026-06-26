import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const orders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    amount: "$120",
    status: "Completed",
  },
  {
    id: "#ORD-002",
    customer: "Sarah Smith",
    amount: "$95",
    status: "Processing",
  },
  {
    id: "#ORD-003",
    customer: "Alex Brown",
    amount: "$210",
    status: "Completed",
  },
];

export function RecentOrders() {
  return (
    <Card className="border-border/60 shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-md border border-border/60 bg-muted/20 p-4 transition-colors hover:bg-muted/40"
            >
              <div className="space-y-1">
                <h4 className="font-medium">{order.id}</h4>
                <p className="text-sm text-muted-foreground">
                  {order.customer}
                </p>
              </div>

              <div className="text-right">
                <div className="font-semibold">{order.amount}</div>
                <div className="text-xs text-emerald-600">{order.status}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
