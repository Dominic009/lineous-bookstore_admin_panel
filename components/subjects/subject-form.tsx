"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  useCreateSubject,
  useUpdateSubject,
} from "@/lib/hooks/use-subjects";
import type { Subject, UpdateSubjectDto } from "@/lib/types/book";

type SubjectFormValues = {
  name: string;
  slug: string;
  description?: string;
};

interface SubjectFormProps {
  subject?: Subject | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function SubjectForm({ subject, onSuccess, onCancel }: SubjectFormProps) {
  const isEditing = !!subject;

  const createMutation = useCreateSubject();
  const updateMutation = useUpdateSubject();

  const { register, handleSubmit } = useForm<SubjectFormValues>({
    defaultValues: {
      name: subject?.name || "",
      slug: subject?.slug || "",
      description: subject?.description || "",
    },
  });

  const onSubmit = async (data: SubjectFormValues) => {
    if (isEditing && subject) {
      const updateData: UpdateSubjectDto = {
        name: data.name,
        slug: data.slug,
        description: data.description,
      };
      await updateMutation.mutateAsync({ id: subject.id, data: updateData });
    } else {
      await createMutation.mutateAsync(data);
    }

    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Enter subject name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            {...register("slug")}
            placeholder="enter-subject-slug"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Subject description"
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          {createMutation.isPending || updateMutation.isPending
            ? "Saving..."
            : isEditing
            ? "Update Subject"
            : "Create Subject"}
        </Button>
      </div>
    </form>
  );
}
