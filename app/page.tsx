"use client";

import { useEffect } from "react";
import { useWarehouseStore } from "@/store/warehouseStore";

export default function Home() {
  const { data, isLoading, error, loadData } = useWarehouseStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="h-screen w-screen bg-black">
      {isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-white"></div>
            <p className="text-lg text-gray-400">Loading warehouse data...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex h-full w-full items-center justify-center">
          <div className="rounded-lg bg-red-900/20 border border-red-700 p-6 text-center">
            <p className="text-lg font-semibold text-red-400">Error Loading Data</p>
            <p className="mt-2 text-red-300">{error}</p>
          </div>
        </div>
      )}

      {data && !isLoading && !error && (
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-semibold text-gray-300">3D Warehouse Scene will be rendered here</p>
            <p className="mt-2 text-gray-500">Racks: {data.racks.length} | Zones: {data.zones.length} | Routes: {data.routes.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}
