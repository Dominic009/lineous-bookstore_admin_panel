import apiClient from "./axios";
import type { BookAttachment, ApiResponse, AttachmentType } from "@/lib/types/book";

// Upload book attachment to Cloudinary
export const uploadBookAttachment = async (
  file: File,
  bookId: string,
  type: AttachmentType
): Promise<ApiResponse<{ url: string; publicId: string }>> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("bookId", bookId);
  formData.append("type", type);

  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${apiClient.defaults.baseURL}/upload/book-attachment`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to upload attachment");
  }
  return await response.json();
};

// Create book attachment record
export const createBookAttachment = async (data: {
  bookId: string;
  url: string;
  publicId: string;
  type: AttachmentType;
  sortOrder: number;
}): Promise<ApiResponse<BookAttachment>> => {
  const response = await apiClient.post<ApiResponse<BookAttachment>>(
    "/book-attachments",
    data
  );
  return response.data;
};

// Delete book attachment
export const deleteBookAttachment = async (id: string): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(`/upload/book-attachment/${id}`);
  return response.data;
};

// Get book attachments by book ID
export const getBookAttachments = async (bookId: string): Promise<ApiResponse<BookAttachment[]>> => {
  const response = await apiClient.get<ApiResponse<BookAttachment[]>>(`/book-attachments?bookId=${bookId}`);
  return response.data;
};

export const bookAttachmentsApi = {
  uploadBookAttachment,
  createBookAttachment,
  deleteBookAttachment,
  getBookAttachments,
};

export default bookAttachmentsApi;