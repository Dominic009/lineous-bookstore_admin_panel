import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { orderStatusConfig } from "@/constants/status";
import type { OrderStatus, OrderStatusStat } from "@/lib/types/book";

interface OrderStatusStatsProps {
  stats: OrderStatusStat[];
  totalOrders?: number;
  visibleStatuses?: OrderStatus[];
  onStatusClick?: (status: string) => void;
}

export function OrderStatusStats({ stats, totalOrders, visibleStatuses, onStatusClick }: OrderStatusStatsProps) {
  const filteredStats = visibleStatuses
    ? stats.filter((stat) => visibleStatuses.includes(stat.status))
    : stats;

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {filteredStats?.map((stat) => {
        const config = orderStatusConfig[stat.status] || {
          label: stat.status,
          variant: "secondary" as const,
          color: "bg-gray-100 text-gray-800",
        };

        return (
          <Card
            key={stat.status}
            className={`border-border/60 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover ${
              onStatusClick ? "cursor-pointer" : ""
            }`}
            onClick={() => onStatusClick?.(stat.status)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {config.label}
                  </p>
                  <h3 className="text-3xl font-bold tracking-tight">
                    {stat.count.toLocaleString()}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {stat.percentage.toFixed(1)}% of total
                  </p>
                </div>

                <Badge variant={config.variant} className={config.color}>
                  {stat.percentage.toFixed(0)}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
