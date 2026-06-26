"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { publicationsApi } from "@/lib/api/publications";
import { QueryKeys } from "@/constants/query-key";
import type { Publication, CreatePublicationDto, UpdatePublicationDto } from "@/lib/types/book";

// Hook to fetch all publications
export function usePublications() {
  return useQuery({
    queryKey: QueryKeys.publications,
    queryFn: async () => {
      const response = await publicationsApi.getPublications();
      return response.data;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - publications don't change often
    retry: 1,
  });
}

// Hook to fetch single publication
export function usePublication(id: string) {
  return useQuery({
    queryKey: [...QueryKeys.publications, id],
    queryFn: async () => {
      const response = await publicationsApi.getPublication(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to create publication
export function useCreatePublication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: CreatePublicationDto) => {
      const response = await publicationsApi.createPublication(dto);
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.publications });
      toast.success(response.message || "Publication created successfully");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

// Hook to update publication
export function useUpdatePublication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdatePublicationDto }) => {
      const response = await publicationsApi.updatePublication(id, data);
      return response;
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.publications });
      queryClient.invalidateQueries({ queryKey: [...QueryKeys.publications, variables.id] });
      toast.success(response.message || "Publication updated successfully");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

// Hook to delete publication
export function useDeletePublication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await publicationsApi.deletePublication(id);
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.publications });
      toast.success(response.message || "Publication deleted successfully");
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
