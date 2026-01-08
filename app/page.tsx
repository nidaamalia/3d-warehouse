'use client';

import { useEffect } from 'react';
import { useWarehouseStore } from '@/store/warehouseStore';
import { useTheme } from '@/contexts/ThemeContext';
import WarehouseScene from '@/components/3d/WarehouseScene';
import FilterToolbar from '@/components/ui/FilterToolbar';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Home() {
  const { isLoading, error, loadData } = useWarehouseStore();
  const { theme } = useTheme();

  useEffect(() => {
    loadData();
  }, [loadData]);

  const isDark = theme === 'dark';
  const loadingBg = isDark 
    ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
    : 'bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50';
  const loadingText = isDark ? 'text-slate-100' : 'text-slate-900';
  const loadingSubtext = isDark ? 'text-slate-400' : 'text-slate-600';
  const spinnerColor = isDark ? 'border-slate-700/30' : 'border-slate-300/30';
  const spinnerActive = isDark ? 'border-t-blue-500 border-r-blue-500' : 'border-t-blue-600 border-r-blue-600';
  const bounceColor = isDark ? 'bg-blue-500' : 'bg-blue-600';

  if (isLoading) {
    return (
      <div className={`h-screen w-screen ${loadingBg} flex items-center justify-center`}>
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative w-16 h-16">
              <div className={`absolute inset-0 rounded-full border-4 ${spinnerColor}`}></div>
              <div className={`absolute inset-0 rounded-full border-4 border-transparent ${spinnerActive} animate-spin`}></div>
            </div>
          </div>
          <div className="space-y-2">
            <p className={`text-xl font-semibold ${loadingText}`}>Loading Warehouse</p>
            <p className={`text-sm ${loadingSubtext}`}>Initializing 3D visualization...</p>
          </div>
          <div className="flex justify-center gap-1">
            <div className={`w-2 h-2 rounded-full ${bounceColor} animate-bounce`} style={{ animationDelay: '0s' }}></div>
            <div className={`w-2 h-2 rounded-full ${bounceColor} animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
            <div className={`w-2 h-2 rounded-full ${bounceColor} animate-bounce`} style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    const errorBg = isDark
      ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
      : 'bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50';
    const errorCard = isDark
      ? 'bg-red-900/20 border-red-700/50'
      : 'bg-red-100/50 border-red-300/50';
    const errorTitle = isDark ? 'text-red-300' : 'text-red-700';
    const errorText = isDark ? 'text-red-200/80' : 'text-red-600/80';

    return (
      <div className={`h-screen w-screen ${errorBg} flex items-center justify-center p-4`}>
        <div className={`rounded-xl ${errorCard} backdrop-blur-sm border p-8 text-center max-w-md shadow-xl`}>
          <div className="mb-4 text-4xl">⚠️</div>
          <p className={`text-lg font-bold ${errorTitle} mb-2`}>Error Loading Warehouse</p>
          <p className={`text-sm ${errorText} mb-6`}>{error}</p>
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
    <div className="relative h-screen w-screen" style={{ backgroundColor: 'var(--background)' }}>
      <ThemeToggle />
      <FilterToolbar />
      <WarehouseScene />
    </div>
  );
}
