"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { dashboardApi } from "@/lib/api/dashboard";
import { QueryKeys } from "@/constants/query-key";
import type { SalesPeriodParams } from "@/lib/types/book";

// Hook to fetch dashboard overview stats
export function useDashboardStats() {
  return useQuery({
    queryKey: QueryKeys.dashboard,
    queryFn: async () => {
      const response = await dashboardApi.getDashboardStats();
      return response.data ?? {};
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

// Hook to fetch sales for a specific period
export function useSalesPeriod(params: SalesPeriodParams) {
  return useQuery({
    queryKey: QueryKeys.salesPeriod(params),
    queryFn: async () => {
      const response = await dashboardApi.getSalesPeriod(params);
      return response.data ?? {};
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
  });
}

// Hook to fetch order status statistics
export function useOrderStatusStats() {
  return useQuery({
    queryKey: QueryKeys.orderStatusStats,
    queryFn: async () => {
      const response = await dashboardApi.getOrderStatusStats();
      return response ?? { stats: [], totalOrders: 0 };
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
    retry: 1,
  });
}

// Hook to refetch dashboard data
export function useRefetchDashboard() {
  const queryClient = useQueryClient();

  const refetch = async () => {
    try {
      await queryClient.invalidateQueries({ queryKey: QueryKeys.dashboard });
      await queryClient.invalidateQueries({ queryKey: QueryKeys.orderStatusStats });
      toast.success("Dashboard data refreshed");
    } catch {
      toast.error("Failed to refresh dashboard data");
    }
  };

  return refetch;
}
