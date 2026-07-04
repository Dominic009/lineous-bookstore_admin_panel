"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Package, DollarSign, Hash, BookOpen, ImageOff } from "lucide-react";

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
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Paper Variants</h2>
            <p className="text-sm text-muted-foreground">
              Manage pricing and variants for {bookTitle}
            </p>
          </div>
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Paper
          </Button>
        </div>

        {papers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
              <Package className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <p className="mb-2 text-lg font-medium text-foreground">No papers yet</p>
            <p className="mb-6 text-sm text-muted-foreground">
              Add at least one paper variant to make this book sellable.
            </p>
            <Button onClick={handleAdd} className="gap-2">
              <Plus className="h-4 w-4" />
              Add First Paper
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {papers.map((paper) => (
              <Card key={paper.id} className="group border-border/60 transition-all hover:shadow-md">
                <CardContent className="p-0">
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/3] w-full bg-muted/30">
                    {paper.thumbnail ? (
                      <img
                        src={paper.thumbnail}
                        alt={paper.name}
                        className="h-full w-full rounded-t-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ImageOff className="h-10 w-10 text-muted-foreground/40" />
                      </div>
                    )}
                    {paper.isDefault && (
                      <div className="absolute left-3 top-3">
                        <Badge variant="default" className="text-xs">Default</Badge>
                      </div>
                    )}
                    <div className="absolute right-3 top-3 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 bg-white/90 shadow-sm hover:bg-white"
                        onClick={() => handleEdit(paper)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-8 w-8 bg-white/90 text-destructive shadow-sm hover:bg-white"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
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

                  {/* Content */}
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="font-semibold text-foreground">{paper.name}</h3>
                      {paper.code && (
                        <p className="text-sm text-muted-foreground">{paper.code}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Price</span>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">৳{paper.price}</span>
                          {paper.discountPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              ৳{paper.discountPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {paper.discountPrice && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Effective</span>
                          <span className="font-semibold text-emerald-600">৳{paper.effectivePrice}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Stock</span>
                        <span className="font-medium text-foreground">{paper.stock}</span>
                      </div>

                      {paper.pageCount && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Pages</span>
                          <span className="font-medium text-foreground">{paper.pageCount}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <Badge variant={paper.status === "PUBLISHED" ? "default" : "secondary"} className="text-xs">
                          {paper.status}
                        </Badge>
                        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
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
