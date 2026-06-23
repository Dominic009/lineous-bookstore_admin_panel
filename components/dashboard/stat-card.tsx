import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  trend?: "up" | "down";
}

export function StatCard({ title, value, icon: Icon, change, trend = "up" }: StatCardProps) {
  return (
    <Card className="group relative overflow-hidden border-border/60 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
            {change && (
              <p className={`text-xs font-medium ${trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>
                {change}
              </p>
            )}
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
