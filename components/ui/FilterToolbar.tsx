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
    <div className="absolute top-6 right-6 backdrop-blur-md rounded-xl p-5 shadow-2xl z-10 w-72 max-h-96 overflow-y-auto"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        borderWidth: '1px'
      }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-base" style={{ color: 'var(--foreground)' }}>Item Condition</h3>
        <span className="text-xs px-2.5 py-1 rounded-full" 
          style={{
            color: 'var(--secondary)',
            backgroundColor: 'var(--background)'
          }}>
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
                  ? 'border' 
                  : 'hover:opacity-80 border border-transparent'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--background)' : 'transparent',
                borderColor: isActive ? 'var(--border)' : 'transparent'
              }}
            >
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => toggleFilter(condition.name)}
                className="w-4 h-4 rounded cursor-pointer accent-blue-500"
                style={{
                  borderColor: 'var(--border)',
                  accentColor: 'var(--primary)'
                }}
              />
              <div
                className="w-4 h-4 rounded border flex-shrink-0"
                style={{ 
                  backgroundColor: condition.color,
                  borderColor: condition.color
                }}
              />
              <span className="text-sm flex-1 font-medium" style={{ color: 'var(--foreground)' }}>
                {condition.name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded" 
                style={{
                  color: 'var(--secondary)',
                  backgroundColor: 'var(--background)'
                }}>
                {count}
              </span>
            </label>
          );
        })}
      </div>

      <div className="flex gap-2.5 pt-4" style={{ borderTopColor: 'var(--border)', borderTopWidth: '1px' }}>
        <button
          onClick={selectAllFilters}
          className="flex-1 px-3 py-2 text-white text-xs font-semibold rounded-lg transition-colors duration-200 active:scale-95"
          style={{ backgroundColor: 'var(--primary)' }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Select All
        </button>
        <button
          onClick={clearFilters}
          className="flex-1 px-3 py-2 text-xs font-semibold rounded-lg transition-colors duration-200 active:scale-95"
          style={{
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)',
            borderColor: 'var(--border)',
            borderWidth: '1px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

export default memo(FilterToolbar);
