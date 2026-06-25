"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState, type ChangeEvent } from "react";

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
import { useCreateBook, useUpdateBook, usePublications, useSubjects } from "@/lib/hooks/use-books";
import type { Book, CreateBookDto, UpdateBookDto, BookStatus } from "@/lib/types/book";

// Form validation schema
const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  isbn: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  discountPrice: z.number().min(0, "Discount price must be positive").optional(),
  publicationDate: z.string().optional(),
  edition: z.string().optional(),
  language: z.string().optional(),
  stock: z.number().int().min(0, "Stock must be non-negative").optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  publicationId: z.string().optional(),
  subjectId: z.string().optional(),
});

type BookFormValues = z.infer<typeof bookSchema>;

interface BookFormProps {
  book?: Book | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BookForm({ book, onSuccess, onCancel }: BookFormProps) {
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
  const isEditing = !!book;

  const { data: publications = [] } = usePublications();
  const { data: subjects = [] } = useSubjects();

  const createMutation = useCreateBook();
  const updateMutation = useUpdateBook();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: book?.title || "",
      slug: book?.slug || "",
      shortDescription: book?.shortDescription || "",
      description: book?.description || "",
      isbn: book?.isbn || "",
      price: book?.price || 0,
      discountPrice: book?.discountPrice || undefined,
      publicationDate: book?.publicationDate || "",
      edition: book?.edition || "",
      language: book?.language || "",
      stock: book?.stock ?? 0,
      status: (book?.status as BookStatus) || "DRAFT",
      publicationId: book?.publicationId || "",
      subjectId: book?.subjectId || "",
    },
  });

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  const handleAttachmentsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachmentFiles((prev) => [...prev, ...files]);
  };

  const onSubmit = async (data: BookFormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("slug", data.slug);
      if (data.shortDescription) formData.append("shortDescription", data.shortDescription);
      if (data.description) formData.append("description", data.description);
      if (data.isbn) formData.append("isbn", data.isbn);
      formData.append("price", data.price.toString());
      if (data.discountPrice) formData.append("discountPrice", data.discountPrice.toString());
      if (data.publicationDate) formData.append("publicationDate", data.publicationDate);
      if (data.edition) formData.append("edition", data.edition);
      if (data.language) formData.append("language", data.language);
      formData.append("stock", (data.stock ?? 0).toString());
      formData.append("status", data.status || "DRAFT");
      if (data.publicationId) formData.append("publicationId", data.publicationId);
      if (data.subjectId) formData.append("subjectId", data.subjectId);

      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      attachmentFiles.forEach((file) => {
        formData.append("attachments", file);
      });

      if (isEditing && book) {
        // For editing, we use JSON (not FormData) as per API spec
        const updateData: UpdateBookDto = {
          title: data.title,
          slug: data.slug,
          shortDescription: data.shortDescription,
          description: data.description,
          isbn: data.isbn,
          price: data.price,
          discountPrice: data.discountPrice,
          publicationDate: data.publicationDate,
          edition: data.edition,
          language: data.language,
          stock: data.stock,
          status: data.status,
          publicationId: data.publicationId,
          subjectId: data.subjectId,
        };
        await updateMutation.mutateAsync({ id: book.id, data: updateData });
        toast.success("Book updated successfully");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Book created successfully");
      }

      onSuccess?.();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to save book";
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="Enter book title"
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            {...register("slug")}
            placeholder="enter-book-slug"
          />
          {errors.slug && (
            <p className="text-sm text-destructive">{errors.slug.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="shortDescription">Short Description</Label>
        <Textarea
          id="shortDescription"
          {...register("shortDescription")}
          placeholder="Brief description of the book"
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Full book description"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            {...register("isbn")}
            placeholder="978-..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            placeholder="0.00"
          />
          {errors.price && (
            <p className="text-sm text-destructive">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="discountPrice">Discount Price</Label>
          <Input
            id="discountPrice"
            type="number"
            step="0.01"
            {...register("discountPrice", { valueAsNumber: true })}
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="publicationDate">Publication Date</Label>
          <Input
            id="publicationDate"
            type="date"
            {...register("publicationDate")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="edition">Edition</Label>
          <Input
            id="edition"
            {...register("edition")}
            placeholder="1st Edition"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Input
            id="language"
            {...register("language")}
            placeholder="English"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            {...register("stock", { valueAsNumber: true })}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={watch("status") || "DRAFT"}
            onValueChange={(value) => setValue("status", value as BookStatus)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
              <SelectItem value="ARCHIVED">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="publicationId">Publication</Label>
          <Select
            value={watch("publicationId") || ""}
            onValueChange={(value) => setValue("publicationId", value || undefined)}
          >
            <SelectTrigger id="publicationId">
              <SelectValue placeholder="Select publication" />
            </SelectTrigger>
            <SelectContent>
              {publications.map((pub) => (
                <SelectItem key={pub.id} value={pub.id}>
                  {pub.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subjectId">Subject</Label>
        <Select
          value={watch("subjectId") || ""}
          onValueChange={(value) => setValue("subjectId", value || undefined)}
        >
          <SelectTrigger id="subjectId">
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.id}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail">Thumbnail (Book Cover)</Label>
        <Input
          id="thumbnail"
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
        />
        {book?.thumbnail && !thumbnailFile && (
          <p className="text-sm text-muted-foreground">
            Current: {book.thumbnail}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="attachments">Additional Attachments</Label>
        <Input
          id="attachments"
          type="file"
          accept="image/*"
          multiple
          onChange={handleAttachmentsChange}
        />
        {attachmentFiles.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {attachmentFiles.length} file(s) selected
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : isEditing ? "Update Book" : "Create Book"}
        </Button>
      </div>
    </form>
  );
}