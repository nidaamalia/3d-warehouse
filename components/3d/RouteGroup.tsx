'use client';

import { useWarehouseStore } from '@/store/warehouseStore';
import { Line } from '@react-three/drei';

/**
 * Renders route paths as visible lines in the 3D scene
 * Shows complete closed loops where vehicles travel
 */
export default function RouteGroup() {
  const routes = useWarehouseStore((state) => state.data?.routes ?? []);

  if (routes.length === 0) {
    return null;
  }

  return (
    // @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime
    <group>
      {routes.map((route) => {
        // Close the path for visual line too
        const closedPath = [...route.path, route.path[0]];

        return (
          <Line
            key={`route-${route.name}`}
            points={closedPath}
            color={route.color}
            lineWidth={8}
          />
        );
      })}
    </group>
  );
}
