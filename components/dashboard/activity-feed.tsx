import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ShoppingCart, User, Star } from "lucide-react";

const activities = [
  {
    id: 1,
    action: "New book added",
    detail: "Advanced Mathematics was added to inventory",
    time: "2 min ago",
    icon: BookOpen,
  },
  {
    id: 2,
    action: "Order placed",
    detail: "Order #ORD-001 placed by John Doe",
    time: "15 min ago",
    icon: ShoppingCart,
  },
  {
    id: 3,
    action: "Teacher profile updated",
    detail: "Dr. Smith updated their profile",
    time: "1 hour ago",
    icon: User,
  },
  {
    id: 4,
    action: "Review approved",
    detail: "Review for Physics Essentials was approved",
    time: "3 hours ago",
    icon: Star,
  },
];

export function ActivityFeed() {
  return (
    <Card className="border-border/60 shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{activity.action}</p>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
