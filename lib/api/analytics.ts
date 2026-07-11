import apiClient from "./axios";
import type {
  SalesAnalyticsData,
  SalesAnalyticsParams,
  CustomerInsightsData,
  CustomerInsightsParams,
} from "@/lib/types/book";

// Get sales analytics with period filtering
export const getSalesAnalytics = async (
  params: SalesAnalyticsParams
): Promise<SalesAnalyticsData> => {
  const response = await apiClient.get<SalesAnalyticsData>("/admin/analytics/sales", {
    params,
  });
  return response.data;
};

// Get customer insights
export const getCustomerInsights = async (
  params?: CustomerInsightsParams
): Promise<CustomerInsightsData> => {
  const response = await apiClient.get<CustomerInsightsData>("/admin/analytics/customers", {
    params,
  });
  return response.data;
};

// Get top selling books
export const getTopSellingBooks = async (params?: {
  limit?: number;
  period?: "all" | "month" | "week";
}): Promise<{ books: unknown[] }> => {
  const response = await apiClient.get<{ books: unknown[] }>("/admin/books/top-selling", { params });
  return response.data;
};

export const analyticsApi = {
  getSalesAnalytics,
  getCustomerInsights,
  getTopSellingBooks,
};

export default analyticsApi;
