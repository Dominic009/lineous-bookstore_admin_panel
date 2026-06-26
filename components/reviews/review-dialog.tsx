"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ReviewForm } from "./review-form";
import type { Review } from "@/lib/types/book";

interface ReviewDialogProps {
  review?: Review | null;
  bookId?: string;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function ReviewDialog({ review, bookId, trigger, open, onOpenChange, onSuccess }: ReviewDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isOpen = open ?? internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  const handleSuccess = () => {
    setIsOpen(false);
    onSuccess?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {review ? "Edit Review" : "Create New Review"}
          </DialogTitle>
        </DialogHeader>
        <ReviewForm 
          review={review} 
          bookId={bookId}
          onSuccess={handleSuccess} 
          onCancel={() => setIsOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}
