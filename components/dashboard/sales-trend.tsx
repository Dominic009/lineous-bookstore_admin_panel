/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import type { SalesTrend } from "@/lib/types/book";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface SalesTrendProps {
  data: SalesTrend;
}

const formatCurrency = (value: number) => `৳${value.toLocaleString()}`;

function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const point = payload[0];
  return (
    <div className="rounded-lg border border-border/60 bg-card px-3 py-2 shadow-lg">
      <p className="text-xs text-muted-foreground">{point.payload.label}</p>
      <p className="text-sm font-semibold text-foreground">
        {formatCurrency(point.value)}
      </p>
    </div>
  );
}

export function SalesTrend({ data }: SalesTrendProps) {
  const chartData = [
    { label: "Today", value: data.today },
    { label: "This Week", value: data.thisWeek },
    { label: "This Month", value: data.thisMonth },
  ];

  return (
    <Card className="border-border/60 shadow-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Sales Trend</CardTitle>
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 28, right: 12, left: 12, bottom: 0 }}
              barCategoryGap="30%"
            >
              <defs>
                <linearGradient id="salesBarFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="hsl(160 84% 39%)"
                    stopOpacity={0.95}
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(160 84% 39%)"
                    stopOpacity={0.5}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="hsl(var(--border))"
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis hide />

              <Tooltip
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
                content={<ChartTooltip />}
              />

              <Bar
                dataKey="value"
                fill="url(#salesBarFill)"
                radius={[8, 8, 0, 0]}
                maxBarSize={80}
                animationDuration={700}
              >
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={(v) => formatCurrency(Number(v))}
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    fill: "hsl(var(--foreground))",
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
