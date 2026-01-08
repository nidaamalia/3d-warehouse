'use client';

import { useMemo, memo } from 'react';
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
function FilterToolbar() {
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
    <div className="absolute top-6 right-6 bg-slate-900/95 backdrop-blur-md rounded-xl p-5 shadow-2xl border border-slate-700/50 z-10 w-72 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-100 font-bold text-base">Item Condition</h3>
        <span className="text-slate-400 text-xs bg-slate-800/50 px-2.5 py-1 rounded-full">
          {activeFilters.length} / {conditions.length}
        </span>
      </div>

      <div className="space-y-2.5 mb-4">
        {conditions.map((condition) => {
          const isActive = activeFilters.includes(condition.name);
          const count = itemCounts[condition.name] || 0;
          
          return (
            <label
              key={condition.name}
              className={`flex items-center gap-3 cursor-pointer p-2.5 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-slate-800/60 border border-slate-600/50' 
                  : 'hover:bg-slate-800/30 border border-transparent'
              }`}
            >
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => toggleFilter(condition.name)}
                className="w-4 h-4 rounded border-slate-600 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer accent-blue-500"
              />
              <div
                className="w-4 h-4 rounded border border-slate-500 flex-shrink-0"
                style={{ backgroundColor: condition.color }}
              />
              <span className="text-slate-300 text-sm flex-1 font-medium">
                {condition.name}
              </span>
              <span className="text-slate-500 text-xs bg-slate-800/50 px-2 py-0.5 rounded">
                {count}
              </span>
            </label>
          );
        })}
      </div>

      <div className="flex gap-2.5 pt-4 border-t border-slate-700/50">
        <button
          onClick={selectAllFilters}
          className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors duration-200 active:scale-95"
        >
          Select All
        </button>
        <button
          onClick={clearFilters}
          className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold rounded-lg transition-colors duration-200 active:scale-95"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

export default memo(FilterToolbar);
