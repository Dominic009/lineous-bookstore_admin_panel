/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TimeSeriesData } from "@/lib/types/book";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RevenueChartProps {
  data: TimeSeriesData[];
}

const formatCurrency = (value: number) => `৳${value.toLocaleString()}`;

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const revenue = payload.find((p: any) => p.dataKey === "revenue")?.value ?? 0;
  const orders = payload.find((p: any) => p.dataKey === "orders")?.value ?? 0;

  return (
    <div className="rounded-lg border border-border/60 bg-card px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="mt-1.5 space-y-1">
        <div className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-muted-foreground">Revenue</span>
          <span className="ml-auto font-semibold text-foreground">
            {formatCurrency(revenue)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span className="text-muted-foreground">Orders</span>
          <span className="ml-auto font-semibold text-foreground">
            {orders}
          </span>
        </div>
      </div>
    </div>
  );
}

export function RevenueChart({ data }: RevenueChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="border-border/60 shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">
            Revenue Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No data available for the selected period
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/60 shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">
          Revenue Over Time
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="hsl(var(--border))"
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                minTickGap={32}
                interval="preserveStartEnd"
              />

              <YAxis
                yAxisId="revenue"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(v) =>
                  `৳${Intl.NumberFormat("en", { notation: "compact" }).format(
                    v
                  )}`
                }
                width={56}
              />

              <YAxis
                yAxisId="orders"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                width={36}
              />

              <Tooltip
                content={<ChartTooltip />}
                cursor={{ stroke: "hsl(var(--border))" }}
              />

              <Area
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2.5}
                fill="url(#revenueFill)"
                animationDuration={700}
              />

              <Line
                yAxisId="orders"
                type="monotone"
                dataKey="orders"
                stroke="hsl(38 92% 50%)"
                strokeWidth={2}
                strokeDasharray="4 3"
                dot={false}
                activeDot={{ r: 4 }}
                animationDuration={700}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-2 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-primary" />
            <span className="text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[2px] w-3 border-t-2 border-dashed border-amber-500" />
            <span className="text-muted-foreground">Orders</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
