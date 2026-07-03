"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Package, DollarSign, Hash, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useBookPapers, useDeleteBookPaper } from "@/lib/hooks/use-books";
import { BookPaperDialog } from "./book-paper-dialog";
import type { BookPaper } from "@/lib/types/book";

interface BookPapersManagerProps {
  bookId: string;
  bookTitle: string;
}

export function BookPapersManager({ bookId, bookTitle }: BookPapersManagerProps) {
  const { data: papers = [], isLoading, error, refetch } = useBookPapers(bookId);
  const deleteMutation = useDeleteBookPaper();
  const [editingPaper, setEditingPaper] = useState<BookPaper | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = async (paperId: string) => {
    try {
      await deleteMutation.mutateAsync(paperId);
      refetch();
    } catch (error) {
      console.error("Failed to delete paper:", error);
    }
  };

  const handleEdit = (paper: BookPaper) => {
    setEditingPaper(paper);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingPaper(null);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingPaper(null);
    refetch();
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex h-32 items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex h-32 items-center justify-center">
          <p className="text-destructive">Failed to load papers</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Paper Variants</h2>
            <p className="text-sm text-muted-foreground">
              Manage pricing, stock, and variants for {bookTitle}
            </p>
          </div>
          <BookPaperDialog
            bookId={bookId}
            // trigger={
            //   <Button>
            //     <Plus className="mr-2 h-4 w-4" />
            //     Add Paper
            //   </Button>
            // }
            onSuccess={handleDialogClose}
          />
        </div>

        {papers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Package className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="mb-2 text-lg font-medium">No papers yet</p>
            <p className="mb-4 text-sm text-muted-foreground">
              Add at least one paper variant to make this book sellable.
            </p>
            <Button onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Add First Paper
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {papers.map((paper) => (
              <Card key={paper.id} className="border-border/60">
                <CardContent className="p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold">{paper.name}</span>
                      {paper.isDefault && (
                        <Badge variant="default" className="text-xs">Default</Badge>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(paper)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Paper</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {paper.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(paper.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    {paper.code && (
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Code:</span>
                        <span className="font-medium">{paper.code}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium">৳{paper.price}</span>
                      {paper.discountPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          ৳{paper.discountPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Effective:</span>
                      <span className="font-medium text-emerald-600">৳{paper.effectivePrice}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Stock:</span>
                      <span className={`font-medium ${paper.isInStock ? "text-emerald-600" : "text-red-600"}`}>
                        {paper.stock} {paper.isInStock ? "(In Stock)" : "(Out of Stock)"}
                      </span>
                    </div>

                    {paper.isbn && (
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">ISBN:</span>
                        <span className="font-medium">{paper.isbn}</span>
                      </div>
                    )}

                    {paper.pageCount && (
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Pages:</span>
                        <span className="font-medium">{paper.pageCount}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={paper.status === "PUBLISHED" ? "default" : "secondary"} className="text-xs">
                        {paper.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        <BookPaperDialog
          bookId={bookId}
          paper={editingPaper}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSuccess={handleDialogClose}
        />
      </CardContent>
    </Card>
  );
}
