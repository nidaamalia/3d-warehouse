'use client';

import { useRef, useState, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';

interface VehicleProps {
  path: [number, number, number][];
  color: string;
  speed?: number;
}

function calculateDistance(
  p1: [number, number, number],
  p2: [number, number, number]
): number {
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const dz = p2[2] - p1[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Animated forklift vehicle with visible fork prongs
 */
function Vehicle({ path, color, speed = 1 }: VehicleProps) {
  const groupRef = useRef<Group>(null);
  const [currentSegment, setCurrentSegment] = useState(0);
  const [progress, setProgress] = useState(0);
  const targetRotation = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current || path.length < 2) return;

    const totalSegments = path.length - 1;
    const currentStart = path[currentSegment];
    const currentEnd = path[(currentSegment + 1) % path.length];

    const segmentLength = calculateDistance(currentStart, currentEnd);
    const progressIncrement = (speed * delta) / segmentLength;

    let newProgress = progress + progressIncrement;
    let newSegment = currentSegment;

    if (newProgress >= 1) {
      newProgress = 0;
      newSegment = currentSegment + 1;
      
      if (newSegment >= totalSegments) {
        newSegment = 0;
        groupRef.current.position.set(path[0][0], path[0][1], path[0][2]);
        setProgress(0);
        setCurrentSegment(0);
        return;
      }
    }

    const start = path[newSegment];
    const end = path[(newSegment + 1) % path.length];

    const interpolatedPosition = new Vector3(
      start[0] + (end[0] - start[0]) * newProgress,
      start[1] + (end[1] - start[1]) * newProgress,
      start[2] + (end[2] - start[2]) * newProgress
    );

    groupRef.current.position.copy(interpolatedPosition);

    const direction = new Vector3(
      end[0] - start[0],
      end[1] - start[1],
      end[2] - start[2]
    ).normalize();

    const angle = Math.atan2(direction.x, direction.z);
    
    // Handle angle wrapping for smooth rotation
    let angleDiff = angle - targetRotation.current;
    if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
    if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
    
    // Smooth rotation interpolation
    const rotationSpeed = 5; // Adjust for smoother/faster rotation
    targetRotation.current += angleDiff * rotationSpeed * delta;
    
    // Apply the smoothed rotation
    groupRef.current.rotation.y = targetRotation.current;

    setProgress(newProgress);
    setCurrentSegment(newSegment);
  });

  return (
    // @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime
    <group ref={groupRef} position={path[0]}>
      {/* Main vehicle body */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
        <boxGeometry args={[0.5, 0.3, 0.8]} />
        {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
        <meshStandardMaterial 
          color={color}
          metalness={0.5}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.2}
        />
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      </mesh>

      {/* Cabin/Roof */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <mesh position={[0, 0.35, -0.1]} castShadow>
        {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
        <boxGeometry args={[0.4, 0.15, 0.3]} />
        {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
        <meshStandardMaterial color="#333333" />
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      </mesh>

      {/* Fork Prongs - LEFT */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <mesh position={[-0.15, 0.05, 0.5]} castShadow receiveShadow>
        {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
        <boxGeometry args={[0.06, 0.04, 0.5]} />
        {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
        <meshStandardMaterial 
          color="#888888"
          metalness={0.8}
          roughness={0.2}
        />
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      </mesh>

      {/* Fork Prongs - RIGHT */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <mesh position={[0.15, 0.05, 0.5]} castShadow receiveShadow>
        {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
        <boxGeometry args={[0.06, 0.04, 0.5]} />
        {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
        <meshStandardMaterial 
          color="#888888"
          metalness={0.8}
          roughness={0.2}
        />
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      </mesh>

      {/* Fork base/connector */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <mesh position={[0, 0.05, 0.3]} castShadow>
        {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
        <boxGeometry args={[0.35, 0.06, 0.08]} />
        {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
        <meshStandardMaterial 
          color="#666666"
          metalness={0.6}
          roughness={0.4}
        />
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      </mesh>
    {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
    </group>
  );
}

export default memo(Vehicle);
