"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  useCreateReview,
  useUpdateReview,
} from "@/lib/hooks/use-reviews";
import type { Review, UpdateReviewDto } from "@/lib/types/book";

type ReviewFormValues = {
  bookId: string;
  reviewerName: string;
  designation?: string;
  rating: number;
  comment?: string;
  displayOrder?: number;
};

interface ReviewFormProps {
  review?: Review | null;
  bookId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ReviewForm({ review, bookId, onSuccess, onCancel }: ReviewFormProps) {
  const isEditing = !!review;

  const createMutation = useCreateReview();
  const updateMutation = useUpdateReview();

  const { register, handleSubmit, setValue, watch } = useForm<ReviewFormValues>({
    defaultValues: {
      bookId: review?.bookId || bookId || "",
      reviewerName: review?.reviewerName || "",
      designation: review?.designation || "",
      rating: review?.rating || 5,
      comment: review?.comment || "",
      displayOrder: review?.displayOrder ?? 0,
    },
  });

  const onSubmit = async (data: ReviewFormValues) => {
    if (isEditing && review) {
      const updateData: UpdateReviewDto = {
        reviewerName: data.reviewerName,
        designation: data.designation,
        rating: data.rating,
        comment: data.comment,
        displayOrder: data.displayOrder,
      };
      await updateMutation.mutateAsync({ id: review.id, data: updateData });
    } else {
      await createMutation.mutateAsync(data);
    }

    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {!bookId && (
        <div className="space-y-2">
          <Label htmlFor="bookId">Book ID *</Label>
          <Input
            id="bookId"
            {...register("bookId")}
            placeholder="Enter book ID"
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="reviewerName">Reviewer Name *</Label>
          <Input
            id="reviewerName"
            {...register("reviewerName")}
            placeholder="Enter reviewer name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="designation">Designation</Label>
          <Input
            id="designation"
            {...register("designation")}
            placeholder="e.g. Professor, Senior Editor"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="rating">Rating *</Label>
          <Input
            id="rating"
            type="number"
            min={1}
            max={5}
            {...register("rating", { valueAsNumber: true })}
            placeholder="1-5"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="displayOrder">Display Order</Label>
          <Input
            id="displayOrder"
            type="number"
            {...register("displayOrder", { valueAsNumber: true })}
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Comment</Label>
        <Textarea
          id="comment"
          {...register("comment")}
          placeholder="Review comment/testimonial"
          rows={4}
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
            ? "Update Review"
            : "Create Review"}
        </Button>
      </div>
    </form>
  );
}
