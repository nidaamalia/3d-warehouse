'use client';

import { GridHelper } from 'three';
import { useEffect, useRef } from 'react';

/**
 * Ground component renders a large ground plane with a grid overlay.
 * 
 * Features:
 * - Large ground plane (20 x 20 units) positioned at floor level (y = 0)
 * - Dark slate material (#1e293b) with shadow receiving enabled
 * - Subtle grid helper overlay (20x20 divisions) for spatial reference
 * - Grid positioned slightly above ground to prevent z-fighting
 * 
 * This component provides the foundation for the warehouse scene.
 */
export default function Ground() {
  const gridRef = useRef<GridHelper>(null);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.position.y = 0.01;
    }
  }, []);

  return (
    <>
      {/* Ground Plane */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
        <planeGeometry args={[20, 20]} />
        {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.8}
          receiveShadow
        />
      </mesh>

      {/* Grid Helper Overlay */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <gridHelper
        ref={gridRef}
        args={[20, 20, '#334155', '#334155']}
        position={[0, 0.01, 0]}
      />
    </>
  );
}
