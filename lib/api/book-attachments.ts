import apiClient from "./axios";
import type { BookAttachment, ApiResponse } from "@/lib/types/book";

// Upload book attachment
export const uploadBookAttachment = async (
  file: File,
  bookId: string,
  type: "IMAGE" | "PDF" | "BANNER" | "THUMBNAIL"
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
  deleteBookAttachment,
  getBookAttachments,
};

export default bookAttachmentsApi;