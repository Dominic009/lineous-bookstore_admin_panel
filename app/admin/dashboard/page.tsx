import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentBooks } from "@/components/dashboard/recent-books";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { StatsGrid } from "@/components/dashboard/stats-grid";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Welcome back to your bookstore management system.
        </p>
      </div>

      <QuickActions />

      <StatsGrid />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentOrders />
        <RecentBooks />
      </div>

      <ActivityFeed />
    </div>
  );
}
