'use client';

/**
 * Ground component renders a large ground plane with a grid overlay.
 * 
 * Features:
 * - Large ground plane (40 x 40 units) positioned at floor level (y = 0)
 * - Dark slate material (#1e293b) with shadow receiving enabled
 * - Subtle grid helper overlay (40x40 divisions) for spatial reference
 * - Grid positioned slightly above ground to prevent z-fighting
 * 
 * This component provides the foundation for the warehouse scene.
 */
export default function Ground() {
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
          color="#1e293b"
          roughness={0.8}
          receiveShadow
        />
      </mesh>

      {/* Grid Helper Overlay - ENLARGED with more divisions */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <gridHelper
        args={[40, 40, '#334155', '#334155']}
        position={[0, 0.01, 0]}
      />
    </>
  );
}
