import { Card, CardContent } from "@/components/ui/card";
import { Users, UserPlus, Activity, Repeat } from "lucide-react";
import type { CustomerSummary } from "@/lib/types/book";

interface CustomerStatsProps {
  summary: CustomerSummary;
}

export function CustomerStats({ summary }: CustomerStatsProps) {
  const stats = [
    {
      label: "Total Customers",
      value: summary.totalCustomers.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "New This Month",
      value: summary.newCustomersThisMonth.toLocaleString(),
      icon: UserPlus,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      label: "Active Customers",
      value: summary.activeCustomers.toLocaleString(),
      icon: Activity,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
    },
    {
      label: "Repeat Customers",
      value: summary.repeatCustomers.toLocaleString(),
      icon: Repeat,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats?.map((stat) => (
        <Card
          key={stat.label}
          className="border-border/60 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h3 className="text-3xl font-bold tracking-tight">{stat.value}</h3>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-md ${stat.bgColor} ${stat.color} transition-transform duration-300 hover:scale-110`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
