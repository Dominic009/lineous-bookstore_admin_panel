import { Badge } from "@/components/ui/badge";
import type { OrderStatus, PaymentStatus } from "@/lib/types/book";
import { OrderStatusLabels } from "@/constants/status";

const orderStatusClasses: Record<OrderStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  CONFIRMED: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  PROCESSING: "bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-400",
  SHIPPED: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-400",
  DELIVERED: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  CANCELLED: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400",
  RETURNED: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-400",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <Badge className={orderStatusClasses[status]}>{OrderStatusLabels[status]}</Badge>;
}

const paymentStatusClasses: Record<PaymentStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  COMPLETED: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  FAILED: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400",
  REFUNDED: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

const paymentStatusLabels: Record<PaymentStatus, string> = {
  PENDING: "Pending",
  COMPLETED: "Completed",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return <Badge className={paymentStatusClasses[status]}>{paymentStatusLabels[status]}</Badge>;
}
