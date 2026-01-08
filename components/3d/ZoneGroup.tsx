'use client';

import { useWarehouseStore } from '@/store/warehouseStore';
import Zone from './Zone';

/**
 * Renders all warehouse zones from store data (SDUI pattern)
 * Zones are floor markings for loading areas, parking, etc.
 */
export default function ZoneGroup() {
  const zones = useWarehouseStore((state) => state.data?.zones ?? []);

  if (zones.length === 0) {
    return null;
  }

  return (
    <>
      {zones.map((zone) => (
        <Zone
          key={zone.name}
          name={zone.name}
          position={zone.coordinate as [number, number, number]}
          dimensions={zone.dimensions as [number, number]}
          color={zone.color}
        />
      ))}
    </>
  );
}
