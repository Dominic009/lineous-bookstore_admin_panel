"use client";

import { useForm } from "react-hook-form";
import { useState, type ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useCreateBookPaper, useUpdateBookPaper } from "@/lib/hooks/use-books";
import type { BookPaper, CreateBookPaperDto, UpdateBookPaperDto } from "@/lib/types/book";

type BookPaperFormValues = {
  code?: string;
  name: string;
  price: string;
  discountPrice?: string;
  discountStartDate?: string;
  discountEndDate?: string;
  stock: string;
  isbn?: string;
  pageCount?: string;
  sortOrder: string;
  isDefault: boolean;
  status: "DRAFT" | "PUBLISHED";
};

interface BookPaperFormProps {
  bookId: string;
  paper?: BookPaper | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BookPaperForm({ bookId, paper, onSuccess, onCancel }: BookPaperFormProps) {
  const isEditing = !!paper;
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const createMutation = useCreateBookPaper();
  const updateMutation = useUpdateBookPaper();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookPaperFormValues>({
    defaultValues: {
      code: paper?.code || "",
      name: paper?.name || "",
      price: paper?.price ? String(paper.price) : "",
      discountPrice: paper?.discountPrice ? String(paper.discountPrice) : "",
      discountStartDate: paper?.discountStartDate || "",
      discountEndDate: paper?.discountEndDate || "",
      stock: paper?.stock ? String(paper.stock) : "0",
      isbn: paper?.isbn || "",
      pageCount: paper?.pageCount ? String(paper.pageCount) : "",
      sortOrder: paper?.sortOrder ? String(paper.sortOrder) : "0",
      isDefault: paper?.isDefault || false,
      status: paper?.status || "PUBLISHED",
    },
  });

  const watchPrice = watch("price");
  const watchDiscountPrice = watch("discountPrice");

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const url = URL.createObjectURL(file);
      setThumbnailPreview(url);
    }
  };

  const onSubmit = async (data: BookPaperFormValues) => {
    const price = parseFloat(data.price);
    const discountPrice = data.discountPrice ? parseFloat(data.discountPrice) : undefined;

    // Validate discount price
    if (discountPrice !== undefined && discountPrice > price) {
      toast.error("Discount price cannot be greater than base price");
      return;
    }

    // Validate discount date range
    if (data.discountStartDate && data.discountEndDate) {
      if (new Date(data.discountStartDate) > new Date(data.discountEndDate)) {
        toast.error("Discount start date cannot be after end date");
        return;
      }
    }

    if (isEditing && paper) {
      if (thumbnailFile) {
        // Use FormData when thumbnail is being updated
        const formData = new FormData();
        formData.append("code", data.code || "");
        formData.append("name", data.name);
        formData.append("price", String(price));
        if (discountPrice !== undefined) formData.append("discountPrice", String(discountPrice));
        if (data.discountStartDate) formData.append("discountStartDate", data.discountStartDate);
        if (data.discountEndDate) formData.append("discountEndDate", data.discountEndDate);
        formData.append("stock", String(parseInt(data.stock) || 0));
        if (data.isbn) formData.append("isbn", data.isbn);
        if (data.pageCount) formData.append("pageCount", String(parseInt(data.pageCount)));
        formData.append("sortOrder", String(parseInt(data.sortOrder) || 0));
        formData.append("isDefault", String(data.isDefault));
        formData.append("status", data.status);
        formData.append("thumbnail", thumbnailFile);

        try {
          await updateMutation.mutateAsync({ id: paper.id, data: formData });
          toast.success("Paper updated successfully");
          onSuccess?.();
        } catch (error) {
          console.error("Failed to update paper:", error);
        }
      } else {
        const updateData: UpdateBookPaperDto = {
          code: data.code || undefined,
          name: data.name,
          price,
          discountPrice,
          discountStartDate: data.discountStartDate || undefined,
          discountEndDate: data.discountEndDate || undefined,
          stock: parseInt(data.stock) || 0,
          isbn: data.isbn || undefined,
          pageCount: data.pageCount ? parseInt(data.pageCount) : undefined,
          sortOrder: parseInt(data.sortOrder) || 0,
          isDefault: data.isDefault,
          status: data.status,
        };

        try {
          await updateMutation.mutateAsync({ id: paper.id, data: updateData });
          toast.success("Paper updated successfully");
          onSuccess?.();
        } catch (error) {
          console.error("Failed to update paper:", error);
        }
      }
    } else {
      const formData = new FormData();
      formData.append("bookId", bookId);
      if (data.code) formData.append("code", data.code);
      formData.append("name", data.name);
      formData.append("price", String(price));
      if (discountPrice !== undefined) formData.append("discountPrice", String(discountPrice));
      if (data.discountStartDate) formData.append("discountStartDate", data.discountStartDate);
      if (data.discountEndDate) formData.append("discountEndDate", data.discountEndDate);
      formData.append("stock", String(parseInt(data.stock) || 0));
      if (data.isbn) formData.append("isbn", data.isbn);
      if (data.pageCount) formData.append("pageCount", String(parseInt(data.pageCount)));
      formData.append("sortOrder", String(parseInt(data.sortOrder) || 0));
      formData.append("isDefault", String(data.isDefault));
      formData.append("status", data.status);
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      try {
        await createMutation.mutateAsync(formData);
        toast.success("Paper created successfully");
        onSuccess?.();
      } catch (error) {
        console.error("Failed to create paper:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="code">Code</Label>
          <Input
            id="code"
            {...register("code")}
            placeholder="A, MCQ, ENG"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            {...register("name", { required: "Name is required" })}
            placeholder="Paper A"
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">Price *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            {...register("price", { required: "Price is required", min: 0 })}
            placeholder="0.00"
          />
          {errors.price && (
            <p className="text-xs text-destructive">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="discountPrice">Discount Price</Label>
          <Input
            id="discountPrice"
            type="number"
            step="0.01"
            {...register("discountPrice", {
              min: 0,
              validate: (val) => {
                if (!val) return true;
                const price = parseFloat(watchPrice);
                if (parseFloat(val) > price) {
                  return "Discount price cannot exceed base price";
                }
                return true;
              },
            })}
            placeholder="0.00"
          />
          {errors.discountPrice && (
            <p className="text-xs text-destructive">{errors.discountPrice.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="discountStartDate">Discount Start Date</Label>
          <Input
            id="discountStartDate"
            type="date"
            {...register("discountStartDate")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="discountEndDate">Discount End Date</Label>
          <Input
            id="discountEndDate"
            type="date"
            {...register("discountEndDate")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            {...register("stock")}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="isbn">ISBN</Label>
          <Input
            id="isbn"
            {...register("isbn")}
            placeholder="978-..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="pageCount">Page Count</Label>
          <Input
            id="pageCount"
            type="number"
            {...register("pageCount")}
            placeholder="300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sortOrder">Sort Order</Label>
          <Input
            id="sortOrder"
            type="number"
            {...register("sortOrder")}
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail">Paper Thumbnail</Label>
        <Input
          id="thumbnail"
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
        />
        {(thumbnailPreview || (paper?.thumbnail && !thumbnailFile)) && (
          <div className="mt-2">
            <p className="mb-1 text-sm text-muted-foreground">
              {thumbnailFile ? "New Thumbnail Preview:" : "Current Thumbnail:"}
            </p>
            <img
              src={thumbnailPreview || paper?.thumbnail}
              alt={thumbnailFile ? "Thumbnail preview" : "Current thumbnail"}
              className="h-24 w-16 rounded-md object-cover"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex items-center justify-between rounded-lg border border-border/60 p-4">
          <div className="space-y-0.5">
            <Label htmlFor="isDefault">Default Paper</Label>
            <p className="text-xs text-muted-foreground">
              Only one paper per book can be default
            </p>
          </div>
          <Switch
            id="isDefault"
            checked={watch("isDefault")}
            onCheckedChange={(checked) => setValue("isDefault", checked)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={watch("status")}
            onValueChange={(value) => setValue("status", value as "DRAFT" | "PUBLISHED")}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
          {createMutation.isPending || updateMutation.isPending
            ? "Saving..."
            : isEditing
            ? "Update Paper"
            : "Create Paper"}
        </Button>
      </div>
    </form>
  );
}
