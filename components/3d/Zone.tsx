'use client';

import { Text } from '@react-three/drei';

interface ZoneProps {
  name: string;
  position: [number, number, number];
  dimensions: [number, number];
  color: string;
}

/**
 * Floor marking zone (loading area, parking, etc)
 * Renders as semi-transparent plane with label
 */
export default function Zone({ name, position, dimensions, color }: ZoneProps) {
  const [width, depth] = dimensions;

  // console.log(`Zone "${name}": width=${width}, depth=${depth}, color=${color}, position=${JSON.stringify(position)}`);

  return (
    // @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime
    <group position={position}>
      {/* Floor marking plane */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
        <planeGeometry args={[width, depth]} />
        {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
          roughness={0.8}
        />
      </mesh>

      {/* Floating label */}
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.4}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
}
