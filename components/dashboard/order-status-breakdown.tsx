"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { OrderStatusBreakdown } from "@/lib/types/book";
import { orderStatusConfig } from "@/constants/status";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface OrderStatusBreakdownProps {
  data: OrderStatusBreakdown[];
  totalOrders: number;
}

// Fixed hue rotation so slice colors stay consistent and legible no matter
// how many status types the API returns.
const CHART_COLORS = [
  "hsl(217 91% 60%)", // blue
  "hsl(160 84% 39%)", // emerald
  "hsl(38 92% 50%)", // amber
  "hsl(280 65% 60%)", // violet
  "hsl(340 82% 60%)", // rose
  "hsl(190 80% 45%)", // cyan
];

function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-border/60 bg-card px-3 py-2 shadow-lg">
      <p className="text-sm font-semibold text-foreground">{item.name}</p>
      <p className="text-xs text-muted-foreground">
        {item.value} orders ({item.payload.percentage.toFixed(1)}%)
      </p>
    </div>
  );
}

export function OrderStatusBreakdown({ data, totalOrders }: OrderStatusBreakdownProps) {
  const chartData = data.map((item, i) => {
    const config = orderStatusConfig[item.status] || {
      label: item.status,
      variant: "secondary" as const,
      color: "bg-gray-100 text-gray-800",
    };
    return {
      ...item,
      name: config.label,
      variant: config.variant,
      badgeColor: config.color,
      fill: CHART_COLORS[i % CHART_COLORS.length],
    };
  });

  return (
    <Card className="border-border/60 shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Order Status Breakdown</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center gap-8 sm:flex-row">
          {/* Donut chart, grand total centered inside the ring */}
          <div className="relative h-[200px] w-[200px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={90}
                  paddingAngle={3}
                  strokeWidth={0}
                  animationDuration={700}
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.status} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-2xl font-bold tracking-tight">
                {totalOrders.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Total Orders</p>
            </div>
          </div>

          {/* Legend */}
          <div className="w-full flex-1 space-y-3">
            {chartData.map((item) => (
              <div key={item.status} className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <Badge variant={item.variant} className={`${item.badgeColor} shrink-0`}>
                  {item.name}
                </Badge>
                <div className="ml-auto flex items-baseline gap-1.5">
                  <span className="text-sm font-semibold text-foreground">
                    {item.count}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
