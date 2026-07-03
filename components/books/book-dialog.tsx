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
  
  const isOpen = open ?? internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  const handleSuccess = (createdBookId?: string) => {
    setIsOpen(false);
    if (createdBookId && onBookCreated) {
      onBookCreated(createdBookId);
    }
    onSuccess?.();
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
          onSuccess={() => handleSuccess(book?.id)} 
          onCancel={() => setIsOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
}
