"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchableDropdown } from "@/components/ui/searchable-dropdown";

import { OrdersTable } from "@/components/orders/orders-table";
import { OrderDetailDialog } from "@/components/orders/order-detail-dialog";
import { OrderStatusStats } from "@/components/orders/order-status-stats";
import type { Order } from "@/lib/types/book";
import { OrderStatus as OrderStatusEnum, orderStatusConfig } from "@/constants/status";
import { useOrderStatusStats } from "@/lib/hooks/use-orders";

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const { data: statusStats, isLoading: statsLoading } = useOrderStatusStats();

  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setDetailOpen(true);
  };

  const handleStatusClick = (status: string) => {
    setStatusFilter(status);
  };


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="mt-2 text-muted-foreground">
            Manage customer orders and fulfillment.
          </p>
        </div>
      </div>

      {/* Order Status Stats */}
      {!statsLoading && statusStats && (
        <OrderStatusStats
          stats={statusStats.stats}
          totalOrders={statusStats.totalOrders}
          visibleStatuses={["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED"]}
          onStatusClick={handleStatusClick}
        />
      )}

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="h-10 rounded-md border-border/60 bg-muted/30 pl-10 pr-4"
          />
        </div>

        <SearchableDropdown
          items={[
            { id: "all", label: "All Statuses" },
            ...OrderStatusEnum.map((status) => ({
              id: status,
              label: status.charAt(0) + status.slice(1).toLowerCase(),
              status,
            })),
          ]}
          value={statusFilter}
          onChange={(item) => {
            if (item) setStatusFilter(item.id as string);
          }}
          placeholder="Filter by status"
          buttonClassName="w-[180px] h-10"
          renderItem={(item, isSelected) => {
            const status = (item as { status?: string }).status;
            if (status && status !== "all" && orderStatusConfig[status as keyof typeof orderStatusConfig]) {
              const config = orderStatusConfig[status as keyof typeof orderStatusConfig];
              return (
                <>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.color}`}>
                    {config.label}
                  </span>
                </>
              );
            }
            return <span className="flex-1">{item.label}</span>;
          }}
        />

        <Button variant="outline" className="gap-2 rounded-md">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <OrdersTable onView={handleView} />

      <OrderDetailDialog
        orderId={selectedOrder?.id ?? null}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  );
}
