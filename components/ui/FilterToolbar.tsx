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

function FilterToolbar() {
  const activeFilters = useWarehouseStore((state) => state.activeFilters);
  const toggleFilter = useWarehouseStore((state) => state.toggleFilter);
  const selectAllFilters = useWarehouseStore((state) => state.selectAllFilters);
  const clearFilters = useWarehouseStore((state) => state.clearFilters);
  const racks = useWarehouseStore((state) => state.data?.racks ?? []);

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

  const isAllSelected = activeFilters.length === conditions.length;
  const hasIndividualFilters = activeFilters.length > 0 && activeFilters.length < conditions.length;

  const handleAllItemsClick = () => {
    if (isAllSelected) {
      clearFilters();
    } else {
      selectAllFilters();
    }
  };

  const handleConditionClick = (condition: ItemCondition) => {
    if (isAllSelected) {
      // If all items are selected, clicking a condition should show only that condition
      useWarehouseStore.setState({ activeFilters: [condition] });
    } else {
      // Otherwise, toggle the condition
      toggleFilter(condition);
    }
  };

  return (
    <div className="absolute top-6 right-6 rounded-2xl shadow-xl z-10 w-64 overflow-hidden"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        borderWidth: '1px'
      }}>
      <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <h3 className="font-bold text-sm tracking-wide uppercase" style={{ color: 'var(--foreground)' }}>Item Condition</h3>
      </div>
      
      <div className="px-6 py-3 space-y-3">
        <button
          onClick={handleAllItemsClick}
          className="w-full flex items-center space-x-3 p-2.5 rounded-lg transition-colors hover:opacity-80"
          style={{
            backgroundColor: isAllSelected ? 'rgba(148, 163, 184, 0.3)' : 'transparent'
          }}
        >
          <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>All Items</span>
        </button>

        {conditions.map(({ name, color }) => (
          <button
            key={name}
            onClick={() => handleConditionClick(name)}
            className="w-full flex items-center space-x-3 p-2.5 rounded-lg transition-colors hover:opacity-80"
            style={{
              backgroundColor: !isAllSelected && activeFilters.includes(name) ? 'rgba(148, 163, 184, 0.3)' : 'transparent'
            }}
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default memo(FilterToolbar);