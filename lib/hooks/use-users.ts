"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { usersApi } from "@/lib/api/users";
import { QueryKeys } from "@/constants/query-key";
import type { User, CreateUserDto, UpdateUserDto } from "@/lib/types/book";

// Hook to fetch all users
export function useUsers() {
  return useQuery({
    queryKey: QueryKeys.users,
    queryFn: async () => {
      const response = await usersApi.getUsers();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

// Hook to fetch single user
export function useUser(id: string) {
  return useQuery({
    queryKey: [...QueryKeys.users, id],
    queryFn: async () => {
      const response = await usersApi.getUser(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook to create user
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: CreateUserDto) => {
      const response = await usersApi.createUser(dto);
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.users });
      toast.success(response.message || "User created successfully");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

// Hook to update user
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateUserDto }) => {
      const response = await usersApi.updateUser(id, data);
      return response;
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.users });
      queryClient.invalidateQueries({ queryKey: [...QueryKeys.users, variables.id] });
      toast.success(response.message || "User updated successfully");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });
}

// Hook to delete user
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await usersApi.deleteUser(id);
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QueryKeys.users });
      toast.success(response.message || "User deleted successfully");
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
