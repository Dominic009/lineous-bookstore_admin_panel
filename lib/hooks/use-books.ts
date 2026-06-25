"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { booksApi } from "@/lib/api/books";
import { QueryKeys } from "@/constants/query-key";
import type { Book, CreateBookDto, UpdateBookDto } from "@/lib/types/book";

// Hook to fetch all books
export function useBooks() {
  return useQuery({
    queryKey: QueryKeys.books,
    queryFn: async () => {
      const response = await booksApi.getBooks();
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

// Hook to fetch single book
export function useBook(id: string) {
  return useQuery({
    queryKey: [...QueryKeys.books, id],
    queryFn: async () => {
      const response = await booksApi.getBook(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to create book
export function useCreateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await booksApi.createBook(formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.books });
    },
  });
}

// Hook to update book
export function useUpdateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateBookDto }) => {
      const response = await booksApi.updateBook(id, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.books });
      queryClient.invalidateQueries({ queryKey: [...QueryKeys.books, variables.id] });
    },
  });
}

// Hook to delete book
export function useDeleteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await booksApi.deleteBook(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.books });
    },
  });
}

// Hook to fetch publications
export function usePublications() {
  return useQuery({
    queryKey: QueryKeys.publications,
    queryFn: async () => {
      const response = await booksApi.getPublications();
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - publications don't change often
  });
}

// Hook to fetch subjects
export function useSubjects() {
  return useQuery({
    queryKey: QueryKeys.subjects,
    queryFn: async () => {
      const response = await booksApi.getSubjects();
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - subjects don't change often
  });
}