"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookPaperForm } from "./book-paper-form";
import type { BookPaper } from "@/lib/types/book";

interface BookPaperDialogProps {
  bookId: string;
  paper?: BookPaper | null;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  onCancel?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function BookPaperDialog({ bookId, paper, trigger, onSuccess, onCancel, open, onOpenChange }: BookPaperDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = open !== undefined && onOpenChange !== undefined;
  const dialogOpen = isControlled ? open : internalOpen;
  const setDialogOpen = isControlled ? onOpenChange : setInternalOpen;

  const handleSuccess = () => {
    setDialogOpen(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    setDialogOpen(false);
    onCancel?.();
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Paper
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[95dvh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{paper ? "Edit Paper" : "Add New Paper"}</DialogTitle>
          <DialogDescription>
            {paper
              ? "Update the paper variant details below."
              : "Create a new paper variant for this book. A book must have at least one paper to be sellable."}
          </DialogDescription>
        </DialogHeader>
        <BookPaperForm
          bookId={bookId}
          paper={paper}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
