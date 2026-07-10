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