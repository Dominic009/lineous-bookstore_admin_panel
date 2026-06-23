import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
}

export function StatCard({ title, value, icon: Icon, change }: StatCardProps) {
  return (
    <Card className="transition-all hover:-translate-y-1 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>

            <h3 className="mt-2 text-3xl font-bold">{value}</h3>

            {change && <p className="mt-2 text-xs text-green-600">{change}</p>}
          </div>

          <div className="rounded-xl bg-blue-50 p-3">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
