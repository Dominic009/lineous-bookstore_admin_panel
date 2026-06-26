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

  const response = await apiClient.post<ApiResponse<{ url: string; publicId: string }>>(
    "/upload/book-attachment",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
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