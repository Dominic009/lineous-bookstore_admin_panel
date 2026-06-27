import apiClient from "./axios";
import type { User, CreateUserDto, UpdateUserDto, ApiResponse } from "@/lib/types/book";

// Get all users
export const getUsers = async (): Promise<ApiResponse<User[]>> => {
  const response = await apiClient.get<ApiResponse<User[]>>("/users");
  return response.data;
};

// Get user by ID
export const getUser = async (id: string): Promise<ApiResponse<User>> => {
  const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
  return response.data;
};

// Create user
export const createUser = async (dto: CreateUserDto): Promise<ApiResponse<User>> => {
  const response = await apiClient.post<ApiResponse<User>>("/users", dto);
  return response.data;
};

// Update user
export const updateUser = async (id: string, dto: UpdateUserDto): Promise<ApiResponse<User>> => {
  const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}`, dto);
  return response.data;
};

// Delete user (soft delete)
export const deleteUser = async (id: string): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(`/users/${id}`);
  return response.data;
};

export const usersApi = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

export default usersApi;
