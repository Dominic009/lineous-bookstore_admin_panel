import apiClient from "./axios";
import type { Review, CreateReviewDto, UpdateReviewDto, ApiResponse } from "@/lib/types/book";

// Get all reviews for a book
export const getReviews = async (bookId: string): Promise<ApiResponse<Review[]>> => {
  const response = await apiClient.get<ApiResponse<Review[]>>("/reviews", {
    params: { bookId },
  });
  return response.data;
};

// Get review by ID
export const getReview = async (id: string): Promise<ApiResponse<Review>> => {
  const response = await apiClient.get<ApiResponse<Review>>(`/reviews/${id}`);
  return response.data;
};

// Create review
export const createReview = async (dto: CreateReviewDto): Promise<ApiResponse<Review>> => {
  const response = await apiClient.post<ApiResponse<Review>>("/reviews", dto);
  return response.data;
};

// Update review
export const updateReview = async (id: string, dto: UpdateReviewDto): Promise<ApiResponse<Review>> => {
  const response = await apiClient.patch<ApiResponse<Review>>(`/reviews/${id}`, dto);
  return response.data;
};

// Delete review (soft delete)
export const deleteReview = async (id: string): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(`/reviews/${id}`);
  return response.data;
};

export const reviewsApi = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};

export default reviewsApi;
