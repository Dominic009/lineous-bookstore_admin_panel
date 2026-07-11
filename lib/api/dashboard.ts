import apiClient from "./axios";
import type {
  DashboardResponse,
  SalesPeriodResponse,
  SalesPeriodParams,
  OrderStatusStatsResponse,
} from "@/lib/types/book";

// Get dashboard overview stats
export const getDashboardStats = async (): Promise<DashboardResponse> => {
  const response = await apiClient.get<DashboardResponse>("/admin/dashboard");
  return response.data;
};

// Get sales for a specific period (day/week/month)
export const getSalesPeriod = async (
  params: SalesPeriodParams
): Promise<SalesPeriodResponse> => {
  const response = await apiClient.get<SalesPeriodResponse>("/admin/sales/period", {
    params,
  });
  return response.data;
};

// Get order status statistics
export const getOrderStatusStats = async (): Promise<OrderStatusStatsResponse> => {
  const response = await apiClient.get<OrderStatusStatsResponse>("/admin/orders/status-stats");
  return response.data;
};

export const dashboardApi = {
  getDashboardStats,
  getSalesPeriod,
  getOrderStatusStats,
};

export default dashboardApi;
