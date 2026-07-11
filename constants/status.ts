export const BookStatus = [
    "DRAFT",
    "PUBLISHED",
    "ARCHIVED",
] as const;

export const UserStatus = [
    "ACTIVE",
    "INACTIVE",
    "SUSPENDED",
] as const;

export const OrderStatus = [
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
    "RETURNED",
] as const;

export const PaymentStatus = [
    "PENDING",
    "COMPLETED",
    "FAILED",
    "REFUNDED",
] as const;

export const PaymentMethod = [
    "COD",
    "CARD",
    "BANK_TRANSFER",
    "MOBILE_BANKING",
] as const;

export type OrderStatusValue = (typeof OrderStatus)[number];

/** Human-readable labels for order statuses. */
export const OrderStatusLabels: Record<OrderStatusValue, string> = {
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    PROCESSING: "Processing",
    SHIPPED: "Shipped",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
    RETURNED: "Returned",
};

/** Badge variant and color config for order statuses. */
export const orderStatusConfig: Record<
    OrderStatusValue,
    { label: string; variant: "default" | "secondary" | "destructive" | "outline"; color: string }
> = {
    PENDING: { label: "Pending", variant: "secondary", color: "bg-amber-100 text-amber-800 hover:bg-amber-100" },
    CONFIRMED: { label: "Confirmed", variant: "secondary", color: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
    PROCESSING: { label: "Processing", variant: "secondary", color: "bg-violet-100 text-violet-800 hover:bg-violet-100" },
    SHIPPED: { label: "Shipped", variant: "secondary", color: "bg-cyan-100 text-cyan-800 hover:bg-cyan-100" },
    DELIVERED: { label: "Delivered", variant: "secondary", color: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" },
    CANCELLED: { label: "Cancelled", variant: "destructive", color: "bg-rose-100 text-rose-800 hover:bg-rose-100" },
    RETURNED: { label: "Returned", variant: "destructive", color: "bg-orange-100 text-orange-800 hover:bg-orange-100" },
};

/**
 * Allowed next statuses for each current status, following the documented flow:
 * PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED
 * with CANCELLED / RETURNED as side branches.
 */
export const OrderStatusTransitions: Record<OrderStatusValue, OrderStatusValue[]> = {
    PENDING: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["PROCESSING", "CANCELLED", "RETURNED"],
    PROCESSING: ["SHIPPED", "CANCELLED", "RETURNED"],
    SHIPPED: ["DELIVERED", "RETURNED"],
    DELIVERED: ["RETURNED"],
    CANCELLED: [],
    RETURNED: [],
};

/** Returns the valid next statuses for a given current status. */
export function getNextOrderStatuses(current: OrderStatusValue): OrderStatusValue[] {
    return OrderStatusTransitions[current] ?? [];
}

export const UserRole = [
    "ADMIN",
    "USER",
] as const;

export const UserProvider = [
    "EMAIL",
    "GOOGLE",
    "FACEBOOK",
    "APPLE",
] as const;