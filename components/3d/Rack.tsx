'use client';

import { Text } from '@react-three/drei';
import RackStructure from './RackStructure';
import Item from './Item';
import { calculateItemPosition } from '@/lib/utils';
import type { Item as ItemType } from '@/types/warehouse';

interface RackProps {
  name: string;
  position: [number, number, number];
  items: ItemType[];
}

/**
 * Complete rack component with structure, label, and items
 * Positions a rack at a specific 3D coordinate and displays its name as a label
 */
export default function Rack({ name, position, items }: RackProps) {
  return (
    // @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime
    <group position={position}>
      {/* Rack Label */}
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

      {/* Rack Structure */}
      <RackStructure />

      {/* Items on Rack */}
      {items.map((item) => {
        const itemPosition = calculateItemPosition(item.position);
        return (
          <Item
            key={item.serialNo}
            serialNo={item.serialNo}
            color={item.color}
            position={itemPosition}
          />
        );
      })}
    </group>
  );
}
