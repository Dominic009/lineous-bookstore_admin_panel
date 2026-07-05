"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchableDropdown } from "@/components/ui/searchable-dropdown";

import { OrdersTable } from "@/components/orders/orders-table";
import type { Order, OrderStatus } from "@/lib/types/book";
import { OrderStatus as OrderStatusEnum } from "@/constants/status";

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleView = (order: Order) => {
    console.log("View order:", order.id);
  };

  const handleEdit = (order: Order) => {
    console.log("Update order status:", order.id);
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

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="h-10 rounded-md border-border/60 bg-muted/30 pl-10 pr-4"
          />
        </div>

        <SearchableDropdown
          items={[{ id: "all", label: "All Statuses" }, ...OrderStatusEnum.map((status) => ({ id: status, label: status.charAt(0) + status.slice(1).toLowerCase() }))]}
          value={statusFilter}
          onChange={(item) => {
            if (item) setStatusFilter(item.id as string);
          }}
          placeholder="Filter by status"
          buttonClassName="w-[180px] h-10"
        />

        <Button variant="outline" className="gap-2 rounded-md">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <OrdersTable onView={handleView} onEdit={handleEdit} />
    </div>
  );
}
