"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  useCreatePublication,
  useUpdatePublication,
} from "@/lib/hooks/use-publications";
import type {
  Publication,
  UpdatePublicationDto,
  BookStatus,
} from "@/lib/types/book";
import { BookStatus as BookStatusEnum } from "@/constants/status";

type PublicationFormValues = {
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  status?: BookStatus;
};

interface PublicationFormProps {
  publication?: Publication | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function PublicationForm({ publication, onSuccess, onCancel }: PublicationFormProps) {
  const isEditing = !!publication;

  const createMutation = useCreatePublication();
  const updateMutation = useUpdatePublication();

  const { register, handleSubmit, setValue, watch } = useForm<PublicationFormValues>({
    defaultValues: {
      name: publication?.name || "",
      slug: publication?.slug || "",
      description: publication?.description || "",
      logo: publication?.logo || "",
      status: (publication?.status as BookStatus) || "PUBLISHED",
    },
  });

  const onSubmit = async (data: PublicationFormValues) => {
    if (isEditing && publication) {
      const updateData: UpdatePublicationDto = {
        name: data.name,
        slug: data.slug,
        description: data.description,
        logo: data.logo,
        status: data.status,
      };
      await updateMutation.mutateAsync({ id: publication.id, data: updateData });
    } else {
      const createData = {
        name: data.name,
        slug: data.slug,
        description: data.description,
        logo: data.logo,
        status: data.status || "PUBLISHED",
      };
      await createMutation.mutateAsync(createData);
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
            placeholder="Enter publication name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            {...register("slug")}
            placeholder="enter-publication-slug"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Publication description"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="logo">Logo URL</Label>
        <Input
          id="logo"
          {...register("logo")}
          placeholder="https://example.com/logo.png"
        />
        <p className="text-xs text-muted-foreground">
          Enter a fully qualified URL for the publication logo
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={watch("status") || "PUBLISHED"}
          onValueChange={(value) => setValue("status", value as BookStatus)}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {BookStatusEnum.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0) + status.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
            ? "Update Publication"
            : "Create Publication"}
        </Button>
      </div>
    </form>
  );
}
