'use client';

import { useWarehouseStore } from '@/store/warehouseStore';
import Rack from './Rack';

/**
 * Renders all warehouse racks from store data (SDUI pattern)
 * This component demonstrates Server-Driven UI - the warehouse layout is entirely driven by JSON data
 */
export default function RackGroup() {
  const racks = useWarehouseStore((state) => state.data?.racks ?? []);

  if (racks.length === 0) {
    return null;
  }

  return (
    // @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime
    <group>
      {racks.map((rack) => (
        <Rack
          key={rack.name}
          name={rack.name}
          position={rack.coordinate as [number, number, number]}
          items={rack.items}
        />
      ))}
    {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
    </group>
  );
}
