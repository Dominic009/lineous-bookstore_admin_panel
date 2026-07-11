import apiClient from "./axios";
import type { InventoryOverviewData } from "@/lib/types/book";

// Get inventory overview with stock alerts
export const getInventoryOverview = async (): Promise<InventoryOverviewData> => {
  const response = await apiClient.get<InventoryOverviewData>("/admin/inventory/overview");
  return response.data;
};

export const inventoryApi = {
  getInventoryOverview,
};

export default inventoryApi;
