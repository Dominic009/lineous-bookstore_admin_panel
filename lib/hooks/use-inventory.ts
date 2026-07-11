"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { inventoryApi } from "@/lib/api/inventory";
import { QueryKeys } from "@/constants/query-key";

// Hook to fetch inventory overview
export function useInventoryOverview() {
  return useQuery({
    queryKey: QueryKeys.inventoryOverview,
    queryFn: async () => {
      const data = await inventoryApi.getInventoryOverview();
      return data ?? {};
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
    retry: 1,
  });
}

// Hook to refetch inventory data
export function useRefetchInventory() {
  const queryClient = useQueryClient();

  const refetch = async () => {
    try {
      await queryClient.invalidateQueries({ queryKey: QueryKeys.inventoryOverview });
      toast.success("Inventory data refreshed");
    } catch {
      toast.error("Failed to refresh inventory data");
    }
  };

  return refetch;
}
