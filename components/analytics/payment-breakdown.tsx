"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import type { PaymentMethodBreakdown } from "@/lib/types/book";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface PaymentBreakdownProps {
  data: PaymentMethodBreakdown[];
}

const paymentMethodLabels: Record<string, string> = {
  COD: "Cash on Delivery",
  CARD: "Card",
  BANK_TRANSFER: "Bank Transfer",
  MOBILE_BANKING: "Mobile Banking",
};

// hex counterparts of the original bg-*-500 classes, used for the chart fills
const paymentMethodHex: Record<string, string> = {
  COD: "hsl(160 84% 39%)", // emerald-500
  CARD: "hsl(217 91% 60%)", // blue-500
  BANK_TRANSFER: "hsl(280 65% 60%)", // violet-500
  MOBILE_BANKING: "hsl(38 92% 50%)", // amber-500
};

const FALLBACK_HEX = "hsl(215 16% 57%)"; // gray-500

const formatCurrency = (value: number) => `৳${value.toLocaleString()}`;

function ChartTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-border/60 bg-card px-3 py-2 shadow-lg">
      <p className="text-sm font-semibold text-foreground">{item.name}</p>
      <p className="text-xs text-muted-foreground">
        {formatCurrency(item.value)} · {item.payload.count} orders
      </p>
    </div>
  );
}

export function PaymentBreakdown({ data }: PaymentBreakdownProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="border-border/60 shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">
            Payment Method Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No payment data available
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = data.reduce((sum, item) => sum + item.count, 0);

  const chartData = data.map((item) => ({
    ...item,
    name: paymentMethodLabels[item.method] || item.method,
    fill: paymentMethodHex[item.method] || FALLBACK_HEX,
    percentage: totalRevenue > 0 ? (item.revenue / totalRevenue) * 100 : 0,
  }));

  return (
    <Card className="border-border/60 shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">
          Payment Method Breakdown
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center gap-8 sm:flex-row">
          {/* Donut chart, total revenue centered inside the ring */}
          <div className="relative h-[190px] w-[190px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="revenue"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={85}
                  paddingAngle={3}
                  strokeWidth={0}
                  animationDuration={700}
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.method} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
              <p className="text-lg font-bold tracking-tight">
                {formatCurrency(totalRevenue)}
              </p>
              <p className="text-xs text-muted-foreground">Total Revenue</p>
            </div>
          </div>

          {/* Legend */}
          <div className="w-full flex-1 space-y-3">
            {chartData.map((item) => (
              <div key={item.method} className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <div className="flex items-center gap-1.5 text-sm font-medium">
                  <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                  {item.name}
                </div>
                <div className="ml-auto text-right">
                  <p className="text-sm font-semibold leading-tight">
                    {formatCurrency(item.revenue)}
                  </p>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {item.count} orders · {item.percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-sm">
          <span className="text-muted-foreground">Total Orders</span>
          <span className="font-semibold">{totalOrders.toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}
