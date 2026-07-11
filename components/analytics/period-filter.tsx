"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarRange } from "lucide-react";

type Period = "day" | "week" | "month" | "year" | "custom";

interface PeriodFilterProps {
  period: Period;
  groupBy: "day" | "week" | "month";
  startDate: string;
  endDate: string;
  onPeriodChange: (period: Period) => void;
  onGroupByChange: (groupBy: "day" | "week" | "month") => void;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  layoutId,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  layoutId: string;
}) {
  return (
    <div className="relative flex rounded-lg bg-muted/40 p-1">
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`relative z-10 rounded-md px-3.5 py-1.5 text-sm font-medium capitalize transition-colors ${
              active
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 -z-10 rounded-md bg-primary shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function PeriodFilter({
  period,
  groupBy,
  startDate,
  endDate,
  onPeriodChange,
  onGroupByChange,
  onStartDateChange,
  onEndDateChange,
}: PeriodFilterProps) {
  const periods: { value: Period; label: string }[] = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
    { value: "custom", label: "Custom" },
  ];

  return (
    <Card className="border-border/60 shadow-card">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <Label className="text-sm font-medium text-muted-foreground">
              Period
            </Label>
            <SegmentedControl
              layoutId="period-indicator"
              options={periods}
              value={period}
              onChange={onPeriodChange}
            />
          </div>

          {period !== "day" && period !== "custom" && (
            <div className="flex items-center gap-3">
              <Label className="text-sm font-medium text-muted-foreground">
                Group by
              </Label>
              <SegmentedControl
                layoutId="groupby-indicator"
                options={[
                  { value: "day", label: "Day" },
                  { value: "week", label: "Week" },
                  { value: "month", label: "Month" },
                ]}
                value={groupBy}
                onChange={onGroupByChange}
              />
            </div>
          )}

          {period === "custom" && (
            <div className="flex items-center gap-2 rounded-lg border border-border/60 px-3 py-1.5">
              <CalendarRange className="h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                value={startDate}
                onChange={(e) => onStartDateChange(e.target.value)}
                className="h-8 w-auto border-0 p-0 shadow-none focus-visible:ring-0"
              />
              <span className="text-sm text-muted-foreground">to</span>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => onEndDateChange(e.target.value)}
                className="h-8 w-auto border-0 p-0 shadow-none focus-visible:ring-0"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
