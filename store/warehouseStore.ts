import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { WarehouseData, ItemCondition } from "@/types/warehouse";

interface WarehouseStore {
  data: WarehouseData | null;
  isLoading: boolean;
  error: string | null;
  activeFilters: ItemCondition[];
  hoveredItem: string | null;

  loadData: () => Promise<void>;
  toggleFilter: (condition: ItemCondition | string) => void;
  setActiveFilters: (filters: ItemCondition[]) => void;
  clearFilters: () => void;
  selectAllFilters: () => void;
  setHoveredItem: (serialNo: string | null) => void;
}

export const useWarehouseStore = create<WarehouseStore>()(
  devtools(
    (set) => ({
      data: null,
      isLoading: false,
      error: null,
      activeFilters: ["Good", "Damage", "Quarantine", "Scrap"],
      hoveredItem: null,

      loadData: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch("/data/warehouse-data.json");
          if (!response.ok) {
            throw new Error(`Failed to load warehouse data: ${response.statusText}`);
          }
          const warehouseData: WarehouseData = await response.json();
          set({ data: warehouseData, isLoading: false });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
          set({ error: errorMessage, isLoading: false });
        }
      },

      toggleFilter: (condition: ItemCondition | string) => {
        set((state) => ({
          activeFilters: state.activeFilters.includes(condition as ItemCondition)
            ? state.activeFilters.filter((c) => c !== condition)
            : [...state.activeFilters, condition as ItemCondition],
        }));
      },

      setActiveFilters: (filters) => {
        set({ activeFilters: filters });
      },

      clearFilters: () => {
        set({ activeFilters: [] });
      },

      selectAllFilters: () => {
        set({ activeFilters: ["Good", "Damage", "Quarantine", "Scrap"] });
      },

      setHoveredItem: (serialNo: string | null) => {
        set({ hoveredItem: serialNo });
      },
    }),
    { name: "WarehouseStore" }
  )
);

/**
 * Selector for warehouse racks
 */
export const selectRacks = (state: WarehouseStore) => state.data?.racks ?? [];

/**
 * Selector for warehouse zones
 */
export const selectZones = (state: WarehouseStore) => state.data?.zones ?? [];

/**
 * Selector for warehouse routes
 */
export const selectRoutes = (state: WarehouseStore) => state.data?.routes ?? [];

/**
 * Selector for loading state
 */
export const selectIsLoading = (state: WarehouseStore) => state.isLoading;

/**
 * Selector for error state
 */
export const selectError = (state: WarehouseStore) => state.error;

/**
 * Selector for active filters
 */
export const selectActiveFilters = (state: WarehouseStore) => state.activeFilters;

/**
 * Selector for hovered item
 */
export const selectHoveredItem = (state: WarehouseStore) => state.hoveredItem;

/**
 * Selector for filtered items across all racks
 */
export const selectFilteredItems = (state: WarehouseStore) => {
  return state.data?.racks.flatMap((rack) =>
    rack.items.filter((item) => state.activeFilters.includes(item.condition))
  ) ?? [];
};
