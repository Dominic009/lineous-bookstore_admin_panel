"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { subjectsApi } from "@/lib/api/subjects";
import { QueryKeys } from "@/constants/query-key";
import type { Subject, CreateSubjectDto, UpdateSubjectDto } from "@/lib/types/book";

// Hook to fetch all subjects
export function useSubjects() {
  return useQuery({
    queryKey: QueryKeys.subjects,
    queryFn: async () => {
      const response = await subjectsApi.getSubjects();
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - subjects don't change often
    retry: 1,
  });
}

// Hook to fetch single subject
export function useSubject(id: string) {
  return useQuery({
    queryKey: [...QueryKeys.subjects, id],
    queryFn: async () => {
      const response = await subjectsApi.getSubject(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to create subject
export function useCreateSubject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: CreateSubjectDto) => {
      const response = await subjectsApi.createSubject(dto);
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.subjects });
      toast.success(response.message || "Subject created successfully");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

// Hook to update subject
export function useUpdateSubject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateSubjectDto }) => {
      const response = await subjectsApi.updateSubject(id, data);
      return response;
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.subjects });
      queryClient.invalidateQueries({ queryKey: [...QueryKeys.subjects, variables.id] });
      toast.success(response.message || "Subject updated successfully");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

// Hook to delete subject
export function useDeleteSubject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await subjectsApi.deleteSubject(id);
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.subjects });
      toast.success(response.message || "Subject deleted successfully");
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
