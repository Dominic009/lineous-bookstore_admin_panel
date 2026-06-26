import apiClient from "./axios";
import type { Subject, CreateSubjectDto, UpdateSubjectDto, ApiResponse } from "@/lib/types/book";

// Get all subjects
export const getSubjects = async (): Promise<ApiResponse<Subject[]>> => {
  const response = await apiClient.get<ApiResponse<Subject[]>>("/subjects");
  return response.data;
};

// Get subject by ID
export const getSubject = async (id: string): Promise<ApiResponse<Subject>> => {
  const response = await apiClient.get<ApiResponse<Subject>>(`/subjects/${id}`);
  return response.data;
};

// Create subject
export const createSubject = async (dto: CreateSubjectDto): Promise<ApiResponse<Subject>> => {
  const response = await apiClient.post<ApiResponse<Subject>>("/subjects", dto);
  return response.data;
};

// Update subject
export const updateSubject = async (id: string, dto: UpdateSubjectDto): Promise<ApiResponse<Subject>> => {
  const response = await apiClient.patch<ApiResponse<Subject>>(`/subjects/${id}`, dto);
  return response.data;
};

// Delete subject (soft delete)
export const deleteSubject = async (id: string): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(`/subjects/${id}`);
  return response.data;
};

export const subjectsApi = {
  getSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
};

export default subjectsApi;
