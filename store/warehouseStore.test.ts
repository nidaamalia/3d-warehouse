import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useWarehouseStore } from './warehouseStore';

describe('warehouseStore', () => {
  // Reset store before each test
  beforeEach(() => {
    const store = useWarehouseStore.getState();
    store.setActiveFilters(['Good', 'Damage', 'Quarantine', 'Scrap']);
  });

  describe('Initial State', () => {
    it('should have default initial state', () => {
      const state = useWarehouseStore.getState();
      
      expect(state.data).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.activeFilters).toEqual(['Good', 'Damage', 'Quarantine', 'Scrap']);
    });

    it('should have all filter actions defined', () => {
      const state = useWarehouseStore.getState();
      
      expect(typeof state.toggleFilter).toBe('function');
      expect(typeof state.selectAllFilters).toBe('function');
      expect(typeof state.clearFilters).toBe('function');
      expect(typeof state.setActiveFilters).toBe('function');
    });
  });

  describe('toggleFilter', () => {
    it('should remove filter when already active', () => {
      const store = useWarehouseStore.getState();
      
      store.toggleFilter('Good');
      
      const newState = useWarehouseStore.getState();
      expect(newState.activeFilters).not.toContain('Good');
      expect(newState.activeFilters).toContain('Damage');
      expect(newState.activeFilters).toContain('Quarantine');
      expect(newState.activeFilters).toContain('Scrap');
    });

    it('should add filter when not active', () => {
      const store = useWarehouseStore.getState();
      
      // First remove it
      store.toggleFilter('Good');
      // Then add it back
      store.toggleFilter('Good');
      
      const newState = useWarehouseStore.getState();
      expect(newState.activeFilters).toContain('Good');
    });

    it('should handle toggling multiple filters', () => {
      const store = useWarehouseStore.getState();
      
      store.toggleFilter('Good');
      store.toggleFilter('Damage');
      
      const newState = useWarehouseStore.getState();
      expect(newState.activeFilters).not.toContain('Good');
      expect(newState.activeFilters).not.toContain('Damage');
      expect(newState.activeFilters).toContain('Quarantine');
      expect(newState.activeFilters).toContain('Scrap');
    });
  });

  describe('selectAllFilters', () => {
    it('should set all filters to active', () => {
      const store = useWarehouseStore.getState();
      
      // Clear first
      store.clearFilters();
      // Then select all
      store.selectAllFilters();
      
      const newState = useWarehouseStore.getState();
      expect(newState.activeFilters).toEqual(['Good', 'Damage', 'Quarantine', 'Scrap']);
    });
  });

  describe('clearFilters', () => {
    it('should remove all filters', () => {
      const store = useWarehouseStore.getState();
      
      store.clearFilters();
      
      const newState = useWarehouseStore.getState();
      expect(newState.activeFilters).toEqual([]);
    });
  });

  describe('setActiveFilters', () => {
    it('should set filters to specific array', () => {
      const store = useWarehouseStore.getState();
      
      store.setActiveFilters(['Good', 'Quarantine']);
      
      const newState = useWarehouseStore.getState();
      expect(newState.activeFilters).toEqual(['Good', 'Quarantine']);
    });

    it('should replace all existing filters', () => {
      const store = useWarehouseStore.getState();
      
      store.setActiveFilters(['Damage']);
      
      const newState = useWarehouseStore.getState();
      expect(newState.activeFilters).toEqual(['Damage']);
      expect(newState.activeFilters.length).toBe(1);
    });
  });

  describe('loadData', () => {
    beforeEach(() => {
      // Reset fetch mock
      vi.clearAllMocks();
    });

    it('should load data successfully', async () => {
      const mockData = {
        racks: [
          {
            name: 'Rack A-1',
            coordinate: [-5, 0, -5],
            items: []
          }
        ],
        zones: [],
        routes: []
      };

      // Mock successful fetch
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);

      const store = useWarehouseStore.getState();
      await store.loadData();

      const newState = useWarehouseStore.getState();
      expect(newState.data).toEqual(mockData);
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBeNull();
    });

    it('should set loading state during fetch', async () => {
      let resolvePromise: (value: any) => void;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      global.fetch = vi.fn().mockReturnValue(promise);

      const store = useWarehouseStore.getState();
      const loadPromise = store.loadData();

      // Check loading state immediately
      const loadingState = useWarehouseStore.getState();
      expect(loadingState.isLoading).toBe(true);

      // Resolve the promise
      resolvePromise!({
        ok: true,
        json: async () => ({ racks: [], zones: [], routes: [] }),
      });

      await loadPromise;
    });

    it('should handle fetch errors', async () => {
      // Set initial data first
      const store = useWarehouseStore.getState();
      store.setActiveFilters(['Good']); // Just to change state
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      } as Response);

      await store.loadData();

      const newState = useWarehouseStore.getState();
      expect(newState.error).toBeTruthy();
      expect(newState.isLoading).toBe(false);
      // Data remains unchanged on error (not set to null)
    });

    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const store = useWarehouseStore.getState();
      await store.loadData();

      const newState = useWarehouseStore.getState();
      expect(newState.error).toBe('Network error');
      expect(newState.isLoading).toBe(false);
    });
  });
});
