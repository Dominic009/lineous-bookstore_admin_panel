"use client";

import { useSubjects, useDeleteSubject } from "@/lib/hooks/use-subjects";
import type { Subject } from "@/lib/types/book";
import { SubjectActions } from "./subject.actions";

interface SubjectsTableProps {
  onEdit?: (subject: Subject) => void;
  onDelete?: (subject: Subject) => void;
}

export function SubjectsTable({ onEdit, onDelete }: SubjectsTableProps) {
  const { data: subjects, isLoading, error } = useSubjects();
  const deleteMutation = useDeleteSubject();

  const handleDelete = async (subject: Subject) => {
    await deleteMutation.mutateAsync(subject.id);
    onDelete?.(subject);
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
      error instanceof Error ? error.message : "Failed to load subjects";
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-destructive">{errorMessage}</p>
      </div>
    );
  }

  if (!subjects || subjects.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">No subjects found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border/60 bg-muted/30 text-left text-sm">
            <th className="px-6 py-4 font-medium text-muted-foreground">
              Subject
            </th>
            <th className="px-6 py-4 font-medium text-muted-foreground">
              Slug
            </th>
            <th className="px-6 py-4 font-medium text-muted-foreground">
              Description
            </th>
            <th className="px-6 py-4 font-medium text-muted-foreground">
              Created At
            </th>
            <th className="px-6 py-4 font-medium text-muted-foreground"></th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((subject) => (
            <tr
              key={subject.id}
              className="border-b border-border/40 transition-colors last:border-0 hover:bg-muted/20"
            >
              <td className="px-6 py-4">
                <div>
                  <h4 className="font-medium">{subject.name}</h4>
                </div>
              </td>

              <td className="px-6 py-4 text-sm text-muted-foreground">
                {subject.slug}
              </td>

              <td className="px-6 py-4 text-sm text-muted-foreground">
                {subject.description || "-"}
              </td>

              <td className="px-6 py-4 text-sm text-muted-foreground">
                {new Date(subject.createdAt).toLocaleDateString()}
              </td>

              <td className="px-6 py-4">
                <SubjectActions
                  onEdit={() => onEdit?.(subject)}
                  onDelete={() => handleDelete(subject)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
