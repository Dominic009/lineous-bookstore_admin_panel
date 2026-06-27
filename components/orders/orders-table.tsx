"use client";

import { useOrders, useUpdateOrderStatus } from "@/lib/hooks/use-orders";
import type { Order, OrderStatus } from "@/lib/types/book";
import { OrderActions } from "./order.actions";
import { StatusBadge } from "@/components/books/status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface OrdersTableProps {
  onView?: (order: Order) => void;
  onEdit?: (order: Order) => void;
}

const orderStatusOptions: { value: OrderStatus; label: string }[] = [
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "PROCESSING", label: "Processing" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "RETURNED", label: "Returned" },
];

export function OrdersTable({ onView, onEdit }: OrdersTableProps) {
  const { data: orders, isLoading, error } = useOrders();
  const updateStatusMutation = useUpdateOrderStatus();

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    await updateStatusMutation.mutateAsync({ id: orderId, data: { status: newStatus } });
    onEdit?.({ ...orders!.find((o) => o.id === orderId)!, status: newStatus } as Order);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to load orders";
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-destructive">{errorMessage}</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">No orders found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border/60 bg-muted/30 text-left text-sm">
            <th className="px-6 py-4 font-medium text-muted-foreground">
              Order
            </th>
            <th className="px-6 py-4 font-medium text-muted-foreground">
              Customer
            </th>
            <th className="px-6 py-4 font-medium text-muted-foreground">
              Total
            </th>
            <th className="px-6 py-4 font-medium text-muted-foreground">
              Status
            </th>
            <th className="px-6 py-4 font-medium text-muted-foreground">
              Payment
            </th>
            <th className="px-6 py-4 font-medium text-muted-foreground">
              Date
            </th>
            <th className="px-6 py-4 font-medium text-muted-foreground"></th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b border-border/40 transition-colors last:border-0 hover:bg-muted/20"
            >
              <td className="px-6 py-4">
                <div>
                  <h4 className="font-medium">{order.orderNumber}</h4>
                  <p className="text-sm text-muted-foreground">
                    {order.orderItems?.length || 0} items
                  </p>
                </div>
              </td>

              <td className="px-6 py-4 text-sm text-muted-foreground">
                {order.userId.slice(0, 8)}...
              </td>

              <td className="px-6 py-4 text-sm font-medium">
                ${order.total.toFixed(2)}
              </td>

              <td className="px-6 py-4">
                <Select
                  value={order.status}
                  onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                >
                  <SelectTrigger className="h-8 w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {orderStatusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={order.paymentStatus as "PUBLISHED" | "DRAFT" | "ARCHIVED"} />
              </td>

              <td className="px-6 py-4 text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              <td className="px-6 py-4">
                <OrderActions
                  order={order}
                  onView={() => onView?.(order)}
                  onEdit={() => onEdit?.(order)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
