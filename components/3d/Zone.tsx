'use client';

import { Text, Billboard } from '@react-three/drei';
import { useTheme } from '@/contexts/ThemeContext';

interface ZoneProps {
  name: string;
  position: [number, number, number];
  dimensions: [number, number];
  color: string;
}

/**
 * Floor marking zone (loading area, parking, etc)
 * Renders as semi-transparent plane with label
 * Label uses Billboard to always face camera
 */
export default function Zone({ name, position, dimensions, color }: ZoneProps) {
  const [width, depth] = dimensions;
  const { theme } = useTheme();

  const textColor = theme === 'dark' ? '#ffffff' : '#000000';
  const outlineColor = theme === 'dark' ? '#000000' : '#ffffff';

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

      {/* Billboard label - always faces camera */}
      <Billboard>
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.5}
          color={textColor}
          outlineWidth={0.05}
          outlineColor={outlineColor}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {name}
        </Text>
      </Billboard>
    </group>
  );
}
