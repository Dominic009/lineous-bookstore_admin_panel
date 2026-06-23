import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const orders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    amount: "$120",
  },
  {
    id: "#ORD-002",
    customer: "Sarah Smith",
    amount: "$95",
  },
  {
    id: "#ORD-003",
    customer: "Alex Brown",
    amount: "$210",
  },
];

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <h4 className="font-medium">{order.id}</h4>

                <p className="text-sm text-muted-foreground">
                  {order.customer}
                </p>
              </div>

              <div className="font-semibold">{order.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
