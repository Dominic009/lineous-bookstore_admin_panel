import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  "New book added",
  "Order #ORD-001 placed",
  "Teacher profile updated",
  "Review approved",
];

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity} className="flex gap-3">
              <div className="mt-2 h-2 w-2 rounded-full bg-blue-600" />

              <p className="text-sm">{activity}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
