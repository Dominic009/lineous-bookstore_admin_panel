"use client";

import { usePublications, useDeletePublication } from "@/lib/hooks/use-publications";
import type { Publication } from "@/lib/types/book";
import { PublicationActions } from "./publication.actions";
import { StatusBadge } from "@/components/books/status-badge";

interface PublicationsTableProps {
  onEdit?: (publication: Publication) => void;
  onDelete?: (publication: Publication) => void;
}

export function PublicationsTable({ onEdit, onDelete }: PublicationsTableProps) {
  const { data: publications, isLoading, error } = usePublications();
  const deleteMutation = useDeletePublication();

  const handleDelete = async (publication: Publication) => {
    await deleteMutation.mutateAsync(publication.id);
    onDelete?.(publication);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to load publications";
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-destructive">{errorMessage}</p>
      </div>
    );
  }

  if (!publications || publications.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">No publications found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border/60 bg-muted/30 text-left text-sm">
            <th className="px-6 py-4 font-medium text-muted-foreground">
              Publication
            </th>
            <th className="px-6 py-4 font-medium text-muted-foreground">
              Slug
            </th>
            <th className="px-6 py-4 font-medium text-muted-foreground">
              Status
            </th>
            <th className="px-6 py-4 font-medium text-muted-foreground">
              Created At
            </th>
            <th className="px-6 py-4 font-medium text-muted-foreground"></th>
          </tr>
        </thead>

        <tbody>
          {publications.map((publication) => (
            <tr
              key={publication.id}
              className="border-b border-border/40 transition-colors last:border-0 hover:bg-muted/20"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50">
                    {publication.logo ? (
                      <img
                        src={publication.logo}
                        alt={publication.name}
                        className="h-8 w-8 rounded-md object-cover"
                      />
                    ) : (
                      <div className="text-xs text-muted-foreground">
                        No Logo
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium">{publication.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {publication.description || "No description"}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-sm text-muted-foreground">
                {publication.slug}
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={publication.status as "PUBLISHED" | "DRAFT" | "ARCHIVED"} />
              </td>

              <td className="px-6 py-4 text-sm text-muted-foreground">
                {new Date(publication.createdAt).toLocaleDateString()}
              </td>

              <td className="px-6 py-4">
                <PublicationActions
                  publication={publication}
                  onEdit={() => onEdit?.(publication)}
                  onDelete={() => handleDelete(publication)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
