import apiClient from "./axios";
import type { Book, CreateBookDto, UpdateBookDto, ApiResponse, Publication, Subject } from "@/lib/types/book";

// Get all books
export const getBooks = async (): Promise<ApiResponse<Book[]>> => {
  const response = await apiClient.get<ApiResponse<Book[]>>("/books");
  return response.data;
};

// Get book by ID
export const getBook = async (id: string): Promise<ApiResponse<Book>> => {
  const response = await apiClient.get<ApiResponse<Book>>(`/books/${id}`);
  return response.data;
};

// Create book with FormData (for file uploads)
export const createBook = async (formData: FormData): Promise<ApiResponse<Book>> => {
  const response = await apiClient.post<ApiResponse<Book>>("/books", formData);
  return response.data;
};

// Update book
export const updateBook = async (id: string, data: UpdateBookDto): Promise<ApiResponse<Book>> => {
  const response = await apiClient.patch<ApiResponse<Book>>(`/books/${id}`, data);
  return response.data;
};

// Delete book (soft delete)
export const deleteBook = async (id: string): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(`/books/${id}`);
  return response.data;
};

// Get all publications (for dropdown)
export const getPublications = async (): Promise<ApiResponse<Publication[]>> => {
  const response = await apiClient.get<ApiResponse<Publication[]>>("/publications");
  return response.data;
};

// Get all subjects (for dropdown)
export const getSubjects = async (): Promise<ApiResponse<Subject[]>> => {
  const response = await apiClient.get<ApiResponse<Subject[]>>("/subjects");
  return response.data;
};

export const booksApi = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  getPublications,
  getSubjects,
};

export default booksApi;