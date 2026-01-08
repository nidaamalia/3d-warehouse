'use client';

import { useEffect } from 'react';
import { useWarehouseStore } from '@/store/warehouseStore';
import WarehouseScene from '@/components/3d/WarehouseScene';
import FilterToolbar from '@/components/ui/FilterToolbar';

export default function Home() {
  const { isLoading, error, loadData } = useWarehouseStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-slate-700/30"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-slate-100">Loading Warehouse</p>
            <p className="text-sm text-slate-400">Initializing 3D visualization...</p>
          </div>
          <div className="flex justify-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="rounded-xl bg-red-900/20 backdrop-blur-sm border border-red-700/50 p-8 text-center max-w-md shadow-xl">
          <div className="mb-4 text-4xl">⚠️</div>
          <p className="text-lg font-bold text-red-300 mb-2">Error Loading Warehouse</p>
          <p className="text-sm text-red-200/80 mb-6">{error}</p>
          <button
            onClick={() => loadData()}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 active:scale-95 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-slate-950">
      <FilterToolbar />
      <WarehouseScene />
    </div>
  );
}
