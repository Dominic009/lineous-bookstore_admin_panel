"use client";

import { MoreHorizontal, Eye, Truck } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import type { Order } from "@/lib/types/book";

interface OrderActionsProps {
  order: Order;
  onView?: () => void;
  onSetShipping?: () => void;
}

export function OrderActions({ onView, onSetShipping }: OrderActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="rounded-md">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="rounded-md">
        <DropdownMenuItem onClick={onView}>
          <Eye className="mr-2 h-4 w-4" />
          View
        </DropdownMenuItem>
        {onSetShipping && (
          <DropdownMenuItem onClick={onSetShipping}>
            <Truck className="mr-2 h-4 w-4" />
            Set Delivery Charge
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
