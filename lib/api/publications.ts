import apiClient from "./axios";
import type { Publication, CreatePublicationDto, UpdatePublicationDto, ApiResponse } from "@/lib/types/book";

// Get all publications
export const getPublications = async (): Promise<ApiResponse<Publication[]>> => {
  const response = await apiClient.get<ApiResponse<Publication[]>>("/publications");
  return response.data;
};

// Get publication by ID
export const getPublication = async (id: string): Promise<ApiResponse<Publication>> => {
  const response = await apiClient.get<ApiResponse<Publication>>(`/publications/${id}`);
  return response.data;
};

// Create publication
export const createPublication = async (dto: CreatePublicationDto): Promise<ApiResponse<Publication>> => {
  const response = await apiClient.post<ApiResponse<Publication>>("/publications", dto);
  return response.data;
};

// Update publication
export const updatePublication = async (id: string, dto: UpdatePublicationDto): Promise<ApiResponse<Publication>> => {
  const response = await apiClient.patch<ApiResponse<Publication>>(`/publications/${id}`, dto);
  return response.data;
};

// Delete publication (soft delete)
export const deletePublication = async (id: string): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(`/publications/${id}`);
  return response.data;
};

export const publicationsApi = {
  getPublications,
  getPublication,
  createPublication,
  updatePublication,
  deletePublication,
};

export default publicationsApi;
