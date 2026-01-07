'use client';

import { useEffect } from 'react';
import { useWarehouseStore } from '@/store/warehouseStore';
import WarehouseScene from '@/components/3d/WarehouseScene';
import ItemConditionLegend from '@/components/ui/ItemConditionLegend';

export default function Home() {
  const { isLoading, error, loadData } = useWarehouseStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-white mx-auto"></div>
          <p className="text-lg text-gray-400">Loading warehouse data...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen bg-slate-950 flex items-center justify-center">
        <div className="rounded-lg bg-red-900/20 border border-red-700 p-8 text-center max-w-md">
          <p className="text-lg font-semibold text-red-400">Error: {error}</p>
          <button
            onClick={() => loadData()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-slate-950">
      <WarehouseScene />
      <ItemConditionLegend />
    </div>
  );
}
