"use client";

import { Download, Loader2 } from "lucide-react";

import { useOrders, useUpdateOrderStatus, useDownloadReceipt } from "@/lib/hooks/use-orders";
import type { Order, OrderStatus } from "@/lib/types/book";
import { OrderActions } from "./order.actions";
import { OrderStatusBadge, PaymentStatusBadge } from "./order-badges";
import { SearchableDropdown } from "@/components/ui/searchable-dropdown";
import { Button } from "@/components/ui/button";
import { getNextOrderStatuses, OrderStatusLabels } from "@/constants/status";
import { formatBDT } from "@/lib/utils";

interface OrdersTableProps {
  onView?: (order: Order) => void;
}

export function OrdersTable({ onView }: OrdersTableProps) {
  const { data: orders, isLoading, error } = useOrders();
  const updateStatusMutation = useUpdateOrderStatus();
  const downloadReceipt = useDownloadReceipt();

  const handleStatusChange = async (order: Order, newStatus: OrderStatus) => {
    if (newStatus === order.status) return;
    await updateStatusMutation.mutateAsync({ id: order.id, data: { status: newStatus } });
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
            <th className="px-6 py-4 font-medium text-muted-foreground">Order</th>
            <th className="px-6 py-4 font-medium text-muted-foreground">Customer</th>
            <th className="px-6 py-4 font-medium text-muted-foreground">Total</th>
            <th className="px-6 py-4 font-medium text-muted-foreground">Status</th>
            <th className="px-6 py-4 font-medium text-muted-foreground">Payment</th>
            <th className="px-6 py-4 font-medium text-muted-foreground">Date</th>
            <th className="px-6 py-4 font-medium text-muted-foreground"></th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => {
            const nextStatuses = getNextOrderStatuses(order.status);
            const statusOptions = [
              { id: order.status, label: OrderStatusLabels[order.status] },
              ...nextStatuses.map((s) => ({ id: s, label: OrderStatusLabels[s] })),
            ];
            const customerName = order.user
              ? `${order.user.firstName ?? ""} ${order.user.lastName ?? ""}`.trim() ||
                order.userId.slice(0, 8)
              : order.userId.slice(0, 8);

            return (
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

                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium">{customerName}</p>
                    {order.user?.email && (
                      <p className="text-sm text-muted-foreground">{order.user.email}</p>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 text-sm font-medium">{formatBDT(order.total)}</td>

                <td className="px-6 py-4">
                  <SearchableDropdown
                    items={statusOptions}
                    value={order.status}
                    onChange={(item) => {
                      if (item) handleStatusChange(order, item.id as OrderStatus);
                    }}
                    buttonClassName="h-8 w-[150px]"
                    renderSelected={(item) => (
                      <OrderStatusBadge status={item.id as OrderStatus} />
                    )}
                  />
                </td>

                <td className="px-6 py-4">
                  <PaymentStatusBadge status={order.paymentStatus} />
                </td>

                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-md"
                      title="Download receipt"
                      disabled={downloadReceipt.isPending}
                      onClick={() => downloadReceipt.mutate(order.id)}
                    >
                      {downloadReceipt.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </Button>
                    <OrderActions order={order} onView={() => onView?.(order)} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
