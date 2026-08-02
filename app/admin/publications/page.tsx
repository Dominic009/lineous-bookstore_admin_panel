"use client";

import { useState } from "react";
import { Plus, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { useDeletePublication } from "@/lib/hooks/use-publications";
import { PublicationsTable } from "@/components/publications/publications-table";
import { PublicationDialog } from "@/components/publications/publication-dialog";
import type { Publication } from "@/lib/types/book";

export default function PublicationsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

  const handleEdit = (publication: Publication) => {
    setSelectedPublication(publication);
    setIsEditDialogOpen(true);
  };

  const deleteMutation = useDeletePublication();

  const handleDelete = (publication: Publication) => {
    setSelectedPublication(publication);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedPublication) {
      await deleteMutation.mutateAsync(selectedPublication.id);
    }
    setIsDeleteDialogOpen(false);
    setSelectedPublication(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Publications</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your bookstore publications.
          </p>
        </div>

        <PublicationDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          trigger={
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Publication
            </Button>
          }
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search publications..."
            className="h-10 rounded-md border-border/60 bg-muted/30 pl-10 pr-4"
          />
        </div>

        <Button variant="outline" className="gap-2 rounded-md">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      <PublicationsTable onEdit={handleEdit} onDelete={handleDelete} />

      {/* Edit Dialog */}
      <PublicationDialog
        publication={selectedPublication}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Publication</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &#34;{selectedPublication?.name}&#34;? This action will soft delete the publication.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
