'use client';

/**
 * Physical 3D structure of a storage rack
 * Dimensions: 2.0 x 2.0 x 1.5 units (W x H x D)
 * Accommodates 3 columns (x: 0, 1, 2) of items
 */
export default function RackStructure() {
  // Post positions (corners of 2.0 x 1.5 footprint)
  const postPositions: [number, number, number][] = [
    [-1.0, 1, 0.75],   // Front-left
    [1.0, 1, 0.75],    // Front-right
    [-1.0, 1, -0.75],  // Back-left
    [1.0, 1, -0.75],   // Back-right
  ];

  // Shelf positions (4 levels)
  const shelfPositions: [number, number, number][] = [
    [0, 0.3, 0],  // Shelf 0 (bottom)
    [0, 0.8, 0],  // Shelf 1
    [0, 1.3, 0],  // Shelf 2
    [0, 1.8, 0],  // Shelf 3 (top)
  ];

  return (
    <>
      {/* Vertical Posts (4 corners) */}
      {postPositions.map((position, index) => (
        // @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime
        <mesh
          key={`post-${index}`}
          position={position}
          castShadow
          receiveShadow
        >
          {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
          <boxGeometry args={[0.1, 2, 0.1]} />
          {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
          <meshStandardMaterial color="#64748b" metalness={0.3} roughness={0.7} />
        </mesh>
      ))}

      {/* Horizontal Shelves (4 levels - matching data y: 0,1,2,3) */}
      {shelfPositions.map((position, index) => (
        // @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime
        <mesh
          key={`shelf-${index}`}
          position={position}
          castShadow
          receiveShadow
        >
          {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
          <boxGeometry args={[2.0, 0.05, 1.5]} />
          {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
          <meshStandardMaterial color="#475569" metalness={0.1} roughness={0.8} />
        </mesh>
      ))}
    </>
  );
}
