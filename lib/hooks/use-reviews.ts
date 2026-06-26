"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { reviewsApi } from "@/lib/api/reviews";
import { QueryKeys } from "@/constants/query-key";
import type { Review, CreateReviewDto, UpdateReviewDto } from "@/lib/types/book";

// Hook to fetch all reviews for a book
export function useReviews(bookId: string) {
  return useQuery({
    queryKey: [...QueryKeys.reviews, bookId],
    queryFn: async () => {
      const response = await reviewsApi.getReviews(bookId);
      return response.data;
    },
    enabled: !!bookId,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

// Hook to fetch single review
export function useReview(id: string) {
  return useQuery({
    queryKey: [...QueryKeys.reviews, id],
    queryFn: async () => {
      const response = await reviewsApi.getReview(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to create review
export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: CreateReviewDto) => {
      const response = await reviewsApi.createReview(dto);
      return response;
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: [...QueryKeys.reviews, variables.bookId] });
      toast.success(response.message || "Review created successfully");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

// Hook to update review
export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateReviewDto }) => {
      const response = await reviewsApi.updateReview(id, data);
      return response;
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.reviews });
      queryClient.invalidateQueries({ queryKey: [...QueryKeys.reviews, variables.id] });
      toast.success(response.message || "Review updated successfully");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

// Hook to delete review
export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await reviewsApi.deleteReview(id);
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.reviews });
      toast.success(response.message || "Review deleted successfully");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

// Helper function to extract error message from backend response
function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message;
    if (Array.isArray(message)) {
      return message.join(", ");
    }
    if (typeof message === "string") {
      return message;
    }
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
}
