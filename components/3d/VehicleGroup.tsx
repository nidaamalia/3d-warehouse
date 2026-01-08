'use client';

import { useWarehouseStore } from '@/store/warehouseStore';
import Vehicle from './Vehicle';

/**
 * Renders all vehicles from store data (SDUI pattern)
 * Automatically closes path loops for smooth animation
 */
export default function VehicleGroup() {
  const routes = useWarehouseStore((state) => state.data?.routes ?? []);

  if (routes.length === 0) {
    return null;
  }

  return (
    // @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime
    <group>
      {routes.map((route) => {
        // IMPORTANT: Close the loop by adding first point at end
        // This prevents jumping/teleporting
        // Example: [A, B, C, D] becomes [A, B, C, D, A]
        const closedPath = [...route.path, route.path[0]];

        return (
          <Vehicle
            key={route.name}
            path={closedPath as [number, number, number][]}
            color={route.color}
            speed={1}
          />
        );
      })}
    </group>
  );
}
