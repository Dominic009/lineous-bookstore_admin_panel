import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a monetary amount (backend returns Decimal serialized as string, e.g. "500.00")
 * as a BDT currency string: ৳500.00
 */
export function formatBDT(amount: string | number | null | undefined): string {
  if (amount === null || amount === undefined || amount === "") return "৳0.00";
  const numeric = typeof amount === "number" ? amount : Number(amount);
  if (Number.isNaN(numeric)) return "৳0.00";
  return `৳${numeric.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** Format an ISO date string as a readable date-time (e.g. "Jul 6, 2026, 10:00 AM"). */
export function formatDateTime(date: string | null | undefined): string {
  if (!date) return "-";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Format an ISO date string as a readable date (e.g. "Jul 6, 2026"). */
export function formatDate(date: string | null | undefined): string {
  if (!date) return "-";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
