'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';

/**
 * Ground component renders a large ground plane with a grid overlay.
 * 
 * Features:
 * - Large ground plane (40 x 40 units) positioned at floor level (y = 0)
 * - Theme-aware material colors
 * - Subtle grid helper overlay (40x40 divisions) for spatial reference
 * - Grid positioned slightly above ground to prevent z-fighting
 * 
 * This component provides the foundation for the warehouse scene.
 */
export default function Ground() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const groundColor = theme === 'dark' ? '#1e293b' : '#f5f5f5';
  const gridColor = theme === 'dark' ? '#334155' : '#c0c0c0';

  return (
    <>
      {/* Ground Plane - ENLARGED */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
        <planeGeometry args={[40, 40]} />
        {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
        <meshStandardMaterial
          color={groundColor}
          roughness={0.8}
          receiveShadow
        />
      </mesh>

      {/* Grid Helper Overlay - ENLARGED with more divisions */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <gridHelper
        args={[40, 40, gridColor, gridColor]}
        position={[0, 0.01, 0]}
      />
    </>
  );
}
