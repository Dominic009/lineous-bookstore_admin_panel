"use client";

import { useReviews } from "@/lib/hooks/use-reviews";
import type { Review } from "@/lib/types/book";
import { ReviewActions } from "./review.actions";

interface ReviewsTableProps {
  bookId: string;
  onEdit?: (review: Review) => void;
  onDelete?: (review: Review) => void;
}

export function ReviewsTable({ bookId, onEdit, onDelete }: ReviewsTableProps) {
  const { data: reviews, isLoading, error } = useReviews(bookId);

  const handleDelete = (review: Review) => {
    onDelete?.(review);
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
      error instanceof Error ? error.message : "Failed to load reviews";
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-destructive">{errorMessage}</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">No reviews found for this book</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card">
      <table className="w-full">
       <thead className="bg-gray-100 font-bold">
          <tr className="border-b border-border/60 bg-muted/30 text-left text-sm">
             <th className="px-6 py-4 font-semibold text-gray-500">
              Reviewer
            </th>
             <th className="px-6 py-4 font-semibold text-gray-500">
              Designation
            </th>
             <th className="px-6 py-4 font-semibold text-gray-500">
              Rating
            </th>
             <th className="px-6 py-4 font-semibold text-gray-500">
              Comment
            </th>
             <th className="px-6 py-4 font-semibold text-gray-500">
              Order
            </th>
             <th className="px-6 py-4 font-semibold text-gray-500"></th>
          </tr>
        </thead>

        <tbody>
          {reviews.map((review) => (
            <tr
              key={review.id}
              className="border-b border-border/40 transition-colors last:border-0 hover:bg-muted/20"
            >
              <td className="px-6 py-4">
                <div>
                  <h4 className="font-medium">{review.reviewerName}</h4>
                </div>
              </td>

              <td className="px-6 py-4 text-sm text-muted-foreground">
                {review.designation || "-"}
              </td>

              <td className="px-6 py-4 text-sm font-medium">
                {review.rating}/5
              </td>

              <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">
                {review.comment || "-"}
              </td>

              <td className="px-6 py-4 text-sm text-muted-foreground">
                {review.displayOrder}
              </td>

              <td className="px-6 py-4">
                <ReviewActions
                  onEdit={() => onEdit?.(review)}
                  onDelete={() => handleDelete(review)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
