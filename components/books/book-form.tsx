"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect, type ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  useCreateBook,
  useUpdateBook,
  usePublications,
  useSubjects,
} from "@/lib/hooks/use-books";
import type {
  Book,
  UpdateBookDto,
  BookStatus,
} from "@/lib/types/book";

type BookFormValues = {
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  isbn?: string;
  price: string;
  discountPrice?: string;
  publicationDate?: string;
  edition?: string;
  language?: string;
  stock?: boolean;
  stockAmount?: string;
  status?: BookStatus;
  publicationId?: string;
  subjectId?: string;
};

interface BookFormProps {
  book?: Book | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BookForm({ book, onSuccess, onCancel }: BookFormProps) {
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
  const isEditing = !!book;

  // Create preview URL for selected thumbnail
  useEffect(() => {
    if (thumbnailFile) {
      const url = URL.createObjectURL(thumbnailFile);
      setThumbnailPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setThumbnailPreview(null);
  }, [thumbnailFile]);

  // Store original values to detect changes
  const originalValues = book
    ? {
        title: book.title,
        slug: book.slug,
        shortDescription: book.shortDescription || "",
        description: book.description || "",
        isbn: book.isbn || "",
        price: String(book.price),
        discountPrice: book.discountPrice ? String(book.discountPrice) : "",
        publicationDate: book.publicationDate || "",
        edition: book.edition || "",
        language: book.language || "",
        stock: book.stock ?? false,
        stockAmount: book.stockAmount ? String(book.stockAmount) : "",
        status: book.status as BookStatus,
        publicationId: book.publicationId || "",
        subjectId: book.subjectId || "",
        thumbnail: book.thumbnail || "",
      }
    : null;

  const { data: publications = [] } = usePublications();
  const { data: subjects = [] } = useSubjects();

  const createMutation = useCreateBook();
  const updateMutation = useUpdateBook();

  const { register, handleSubmit, setValue, watch } = useForm<BookFormValues>({
    defaultValues: {
      title: book?.title || "",
      slug: book?.slug || "",
      shortDescription: book?.shortDescription || "",
      description: book?.description || "",
      isbn: book?.isbn || "",
      price: book?.price ? String(book.price) : "",
      discountPrice: book?.discountPrice ? String(book.discountPrice) : "",
      publicationDate: book?.publicationDate || "",
      edition: book?.edition || "",
      language: book?.language || "",
      stock: book?.stock ?? false,
      stockAmount: book?.stockAmount ? String(book.stockAmount) : "",
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

  const buildPartialUpdate = (data: BookFormValues): { data: UpdateBookDto | FormData; hasFiles: boolean } => {
    const hasFiles = !!thumbnailFile || attachmentFiles.length > 0;
    const changes: Record<string, unknown> = {};

    // Compare each field with original value and only include if changed
    if (data.title !== originalValues?.title) changes.title = data.title;
    if (data.slug !== originalValues?.slug) changes.slug = data.slug;
    if (data.shortDescription !== originalValues?.shortDescription) changes.shortDescription = data.shortDescription;
    if (data.description !== originalValues?.description) changes.description = data.description;
    if (data.isbn !== originalValues?.isbn) changes.isbn = data.isbn;
    if (data.price !== originalValues?.price) changes.price = parseFloat(data.price) || 0;
    if (data.discountPrice !== originalValues?.discountPrice) {
      changes.discountPrice = data.discountPrice ? parseFloat(data.discountPrice) : undefined;
    }
    if (data.publicationDate !== originalValues?.publicationDate) changes.publicationDate = data.publicationDate;
    if (data.edition !== originalValues?.edition) changes.edition = data.edition;
    if (data.language !== originalValues?.language) changes.language = data.language;
    if (data.stock !== originalValues?.stock) changes.stock = data.stock;
    if (data.stockAmount !== originalValues?.stockAmount) {
      changes.stockAmount = data.stockAmount ? parseFloat(data.stockAmount) : undefined;
    }
    if (data.status !== originalValues?.status) changes.status = data.status;
    if (data.publicationId !== originalValues?.publicationId) changes.publicationId = data.publicationId;
    if (data.subjectId !== originalValues?.subjectId) changes.subjectId = data.subjectId;

    if (hasFiles) {
      // Use FormData when files are involved
      const formData = new FormData();
      Object.entries(changes).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, String(value));
        }
      });
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }
      attachmentFiles.forEach((file) => {
        formData.append("attachments", file);
      });
      return { data: formData, hasFiles: true };
    }

    return { data: changes as UpdateBookDto, hasFiles: false };
  };

  const onSubmit = async (data: BookFormValues) => {
    console.log("=== Form Submit Debug ===");
    console.log("thumbnailFile:", thumbnailFile);
    console.log("thumbnailFile type:", thumbnailFile?.constructor.name);
    console.log("thumbnailFile size:", thumbnailFile?.size);
    console.log("attachmentFiles:", attachmentFiles);
    console.log("isEditing:", isEditing);
    console.log("========================");

    if (isEditing && book) {
      const { data: updateData, hasFiles } = buildPartialUpdate(data);
      console.log("Update hasFiles:", hasFiles);
      console.log("Update data type:", hasFiles ? "FormData" : "JSON");
      if (hasFiles) {
        const fd = updateData as FormData;
        console.log("FormData entries:");
        for (const [key, value] of fd.entries()) {
          console.log(`  ${key}:`, value);
        }
      } else {
        console.log("Update JSON:", updateData);
      }
      await updateMutation.mutateAsync({ id: book.id, data: updateData });
    } else {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("slug", data.slug);
      if (data.shortDescription) formData.append("shortDescription", data.shortDescription);
      if (data.description) formData.append("description", data.description);
      if (data.isbn) formData.append("isbn", data.isbn);
      formData.append("price", data.price);
      if (data.discountPrice) formData.append("discountPrice", data.discountPrice);
      if (data.publicationDate) formData.append("publicationDate", data.publicationDate);
      if (data.edition) formData.append("edition", data.edition);
      if (data.language) formData.append("language", data.language);
      if (data.stock !== undefined) formData.append("stock", String(data.stock));
      if (data.stockAmount) formData.append("stockAmount", data.stockAmount);
      formData.append("status", data.status || "DRAFT");
      if (data.publicationId) formData.append("publicationId", data.publicationId);
      if (data.subjectId) formData.append("subjectId", data.subjectId);

      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      attachmentFiles.forEach((file) => {
        formData.append("attachments", file);
      });

      await createMutation.mutateAsync(formData);
    }

    onSuccess?.();
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            {...register("slug")}
            placeholder="enter-book-slug"
          />
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
          <Input id="isbn" {...register("isbn")} placeholder="978-..." />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register("price")}
            placeholder="0.00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="discountPrice">Discount Price</Label>
          <Input
            id="discountPrice"
            type="number"
            step="0.01"
            {...register("discountPrice")}
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
          <Label htmlFor="stock" className="flex items-center gap-2">
            <Checkbox
              id="stock"
              checked={watch("stock") || false}
              onCheckedChange={(checked) => setValue("stock", checked as boolean)}
            />
            In Stock
          </Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stockAmount">Stock Amount</Label>
          <Input
            id="stockAmount"
            type="number"
            {...register("stockAmount")}
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
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="publicationId">Publication</Label>
          <Select
            value={watch("publicationId") || ""}
            onValueChange={(value) =>
              setValue("publicationId", value || undefined)
            }
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail">Thumbnail (Book Cover)</Label>
        <Input
          id="thumbnail"
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
        />
        {(thumbnailPreview || (book?.thumbnail && !thumbnailFile)) && (
          <div className="mt-2">
            <p className="mb-1 text-sm text-muted-foreground">
              {thumbnailFile ? "New Thumbnail Preview:" : "Current Thumbnail:"}
            </p>
            <img
              src={thumbnailPreview || book?.thumbnail}
              alt={thumbnailFile ? "Thumbnail preview" : "Current thumbnail"}
              className="h-32 w-24 rounded-md object-cover"
            />
          </div>
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
        <Button
          type="submit"
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          {createMutation.isPending || updateMutation.isPending
            ? "Saving..."
            : isEditing
            ? "Update Book"
            : "Create Book"}
        </Button>
      </div>
    </form>
  );
}
