"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateOrderShipping } from "@/lib/hooks/use-orders";
import { formatBDT } from "@/lib/utils";
import { Truck, Loader2 } from "lucide-react";
import type { Order } from "@/lib/types/book";

interface SetShippingDialogProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SetShippingDialog({ order, open, onOpenChange }: SetShippingDialogProps) {
  const [shippingInput, setShippingInput] = useState("");
  const updateShipping = useUpdateOrderShipping();

  const handleOpen = (newOpen: boolean) => {
    if (newOpen && order) {
      setShippingInput(order.shipping ?? "0");
    }
    onOpenChange(newOpen);
  };

  const handleSetShipping = async () => {
    if (!order) return;
    const value = parseFloat(shippingInput);
    if (isNaN(value) || value < 0) {
      alert("Please enter a valid non-negative number.");
      return;
    }
    await updateShipping.mutateAsync({ id: order.id, shipping: value });
    handleOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set Delivery Charge</DialogTitle>
          <DialogDescription>
            Enter the delivery charge for order {order?.orderNumber}. This will be added to the order total and included in the receipt.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="shipping" className="text-sm font-medium">
              Delivery Charge (BDT)
            </label>
            <Input
              id="shipping"
              type="number"
              min="0"
              step="0.01"
              value={shippingInput}
              onChange={(e) => setShippingInput(e.target.value)}
              placeholder="0.00"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSetShipping} disabled={updateShipping.isPending}>
            {updateShipping.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Delivery Charge
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
