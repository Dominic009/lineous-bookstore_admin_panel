import apiClient from "./axios";
import type { Order, CreateOrderDto, UpdateOrderStatusDto, ApiResponse } from "@/lib/types/book";

// Get all orders
export const getOrders = async (): Promise<ApiResponse<Order[]>> => {
  const response = await apiClient.get<ApiResponse<Order[]>>("/orders");
  return response.data;
};

// Get order by ID
export const getOrder = async (id: string): Promise<ApiResponse<Order>> => {
  const response = await apiClient.get<ApiResponse<Order>>(`/orders/${id}`);
  return response.data;
};

// Create order
export const createOrder = async (dto: CreateOrderDto): Promise<ApiResponse<Order>> => {
  const response = await apiClient.post<ApiResponse<Order>>("/orders", dto);
  return response.data;
};

// Update order status
export const updateOrderStatus = async (id: string, dto: UpdateOrderStatusDto): Promise<ApiResponse<Order>> => {
  const response = await apiClient.patch<ApiResponse<Order>>(`/orders/${id}/status`, dto);
  return response.data;
};

export const ordersApi = {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
};

export default ordersApi;
