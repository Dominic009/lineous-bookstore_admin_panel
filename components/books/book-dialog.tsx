"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookForm } from "./book-form";
import type { Book } from "@/lib/types/book";

interface BookDialogProps {
  book?: Book | null;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
  onBookCreated?: (bookId: string) => void;
}

export function BookDialog({ book, trigger, open, onOpenChange, onSuccess, onBookCreated }: BookDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isOpen = open ?? internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  const handleSuccess = (createdBookId?: string) => {
    setIsSubmitting(false);
    setIsOpen(false);
    if (createdBookId && onBookCreated) {
      onBookCreated(createdBookId);
    }
    onSuccess?.();
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {book ? "Edit Book" : "Create New Book"}
          </DialogTitle>
        </DialogHeader>
        <BookForm
          book={book}
          onSuccess={(createdBookId) => {
            setIsSubmitting(true);
            handleSuccess(createdBookId);
          }}
          onCancel={handleCancel}
        />
        {isSubmitting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-2xl">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-sm font-medium text-foreground">Creating book...</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
