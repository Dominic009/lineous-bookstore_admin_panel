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