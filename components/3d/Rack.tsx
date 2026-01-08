'use client';

import { useMemo } from 'react';
import { Text, Billboard } from '@react-three/drei';
import RackStructure from './RackStructure';
import Item from './Item';
import { calculateItemPosition } from '@/lib/utils';
import { useWarehouseStore } from '@/store/warehouseStore';
import type { Item as ItemType } from '@/types/warehouse';

interface RackProps {
  name: string;
  position: [number, number, number];
  items: ItemType[];
}

/**
 * Rack component with client-side item filtering
 * Filters items based on active condition filters from store
 */
export default function Rack({ name, position, items }: RackProps) {
  const activeFilters = useWarehouseStore((state) => state.activeFilters);

  const filteredItems = useMemo(() => {
    return items.filter((item) => activeFilters.includes(item.condition));
  }, [items, activeFilters]);

  return (
    // @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime
    <group position={position}>
      {/* Rack Label - Always faces camera */}
      <Billboard>
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.3}
          color="#e2e8f0"
          anchorY="bottom"
          anchorX="center"
          outlineWidth={0.01}
          outlineColor="#1e293b"
        >
          {name}
        </Text>
      </Billboard>

      {/* Rack Structure */}
      <RackStructure />

      {/* Items on Rack - filtered by active conditions */}
      {filteredItems.map((item) => {
        const itemPosition = calculateItemPosition(item.position);
        return (
          <Item
            key={item.serialNo}
            serialNo={item.serialNo}
            lot={item.lot}
            description={item.description}
            condition={item.condition}
            color={item.color}
            position={itemPosition}
          />
        );
      })}
    </group>
  );
}
