'use client';

import { useState } from 'react';

interface ItemProps {
  serialNo: string;
  color: string;
  position: [number, number, number];
  onClick?: () => void;
}

/**
 * 3D representation of a warehouse item
 * Color-coded by condition, positioned on rack shelves
 */
export default function Item({ serialNo, color, position, onClick }: ItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    // @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime
    <mesh
      position={position}
      castShadow
      receiveShadow
      scale={isHovered ? 1.1 : 1}
      onClick={onClick}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      onPointerEnter={() => (document.body.style.cursor = 'pointer')}
      onPointerLeave={() => (document.body.style.cursor = 'default')}
    >
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <boxGeometry args={[0.3, 0.3, 0.3, 2, 2, 2]} />
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <meshStandardMaterial 
        color={color} 
        metalness={0.2}
        roughness={0.8}
      />
    </mesh>
  );
}
