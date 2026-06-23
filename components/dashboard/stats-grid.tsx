import { BookOpen, Users, ShoppingCart, DollarSign } from "lucide-react";

import { StatCard } from "./stat-card";

export function StatsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Books"
        value="2,540"
        icon={BookOpen}
        change="+12% this month"
      />

      <StatCard
        title="Users"
        value="1,245"
        icon={Users}
        change="+8% this month"
      />

      <StatCard
        title="Orders"
        value="432"
        icon={ShoppingCart}
        change="+14% this month"
      />

      <StatCard
        title="Revenue"
        value="$18,420"
        icon={DollarSign}
        change="+22% this month"
      />
    </div>
  );
}
