import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, ShoppingCart, TrendingUp, Package } from "lucide-react";
import type { SalesSummary } from "@/lib/types/book";

interface SalesSummaryCardsProps {
  summary: SalesSummary;
}

export function SalesSummaryCards({ summary }: SalesSummaryCardsProps) {
  const cards = [
    {
      label: "Total Revenue",
      value: `৳${summary?.totalRevenue?.toLocaleString() ?? 0}`,
      icon: DollarSign,
      accent: "text-emerald-600",
      accentBg: "bg-emerald-50",
      ring: "ring-emerald-100",
    },
    {
      label: "Total Orders",
      value: summary?.totalOrders?.toLocaleString() ?? 0,
      icon: ShoppingCart,
      accent: "text-blue-600",
      accentBg: "bg-blue-50",
      ring: "ring-blue-100",
    },
    {
      label: "Avg. Order Value",
      // fixed: optional chaining now covers averageOrderValue itself,
      // not just `summary`, so this won't throw when the field is missing
      value: `৳${
        summary?.averageOrderValue?.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) ?? "0.00"
      }`,
      icon: TrendingUp,
      accent: "text-violet-600",
      accentBg: "bg-violet-50",
      ring: "ring-violet-100",
    },
    {
      label: "Items Sold",
      value: summary?.totalItemsSold?.toLocaleString() ?? 0,
      icon: Package,
      accent: "text-amber-600",
      accentBg: "bg-amber-50",
      ring: "ring-amber-100",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card
          key={card.label}
          className="relative overflow-hidden border-border/60 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
        >
          <card.icon
            className={`absolute -right-3 -top-3 h-24 w-24 opacity-[0.04] ${card.accent}`}
            strokeWidth={1.5}
          />
          <CardContent className="relative p-6">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.accentBg} ${card.accent} ring-4 ${card.ring}`}
            >
              <card.icon className="h-5 w-5" />
            </div>
            <p className="mt-5 text-sm font-medium text-muted-foreground">
              {card.label}
            </p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight">
              {card.value}
            </h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
