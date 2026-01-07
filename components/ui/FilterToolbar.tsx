'use client';

import { useMemo } from 'react';
import { useWarehouseStore } from '@/store/warehouseStore';
import type { ItemCondition } from '@/types/warehouse';

const conditions: Array<{ name: ItemCondition; color: string }> = [
  { name: 'Good', color: '#22c55e' },
  { name: 'Damage', color: '#ef4444' },
  { name: 'Quarantine', color: '#eab308' },
  { name: 'Scrap', color: '#000000' },
];

/**
 * Filter toolbar for controlling item visibility by condition
 * Shows item counts and provides quick filter controls
 */
export default function FilterToolbar() {
  const activeFilters = useWarehouseStore((state) => state.activeFilters);
  const toggleFilter = useWarehouseStore((state) => state.toggleFilter);
  const selectAllFilters = useWarehouseStore((state) => state.selectAllFilters);
  const clearFilters = useWarehouseStore((state) => state.clearFilters);
  const racks = useWarehouseStore((state) => state.data?.racks ?? []);

  // Calculate item counts per condition
  const itemCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Good: 0,
      Damage: 0,
      Quarantine: 0,
      Scrap: 0,
    };

    racks.forEach((rack) => {
      rack.items.forEach((item) => {
        if (counts[item.condition] !== undefined) {
          counts[item.condition]++;
        }
      });
    });

    return counts;
  }, [racks]);

  return (
    <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-slate-700 z-10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-slate-200 font-semibold text-sm">Item Condition</h3>
        <span className="text-slate-400 text-xs">
          {activeFilters.length} / {conditions.length}
        </span>
      </div>

      <div className="space-y-2 mb-3">
        {conditions.map((condition) => {
          const isActive = activeFilters.includes(condition.name);
          const count = itemCounts[condition.name] || 0;
          
          return (
            <label
              key={condition.name}
              className="flex items-center gap-2 cursor-pointer hover:bg-slate-800/50 p-2 rounded transition-colors"
            >
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => toggleFilter(condition.name)}
                className="w-4 h-4 rounded border-slate-600 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
              />
              <div
                className="w-4 h-4 rounded border border-slate-600"
                style={{ backgroundColor: condition.color }}
              />
              <span className="text-slate-300 text-sm flex-1">
                {condition.name}
              </span>
              <span className="text-slate-500 text-xs">({count})</span>
            </label>
          );
        })}
      </div>

      <div className="flex gap-2 pt-2 border-t border-slate-700">
        <button
          onClick={selectAllFilters}
          className="flex-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs rounded transition-colors"
        >
          Select All
        </button>
        <button
          onClick={clearFilters}
          className="flex-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs rounded transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
