'use client';

import { useRef } from 'react';
import { DirectionalLight } from 'three';

/**
 * Lights component provides a consistent three-light setup for the warehouse scene.
 * 
 * Lighting setup:
 * - Ambient light: Provides overall scene illumination (0.4 intensity)
 * - Main directional light: Primary light source from above-right (1.0 intensity, casts shadows)
 * - Fill directional light: Secondary light from opposite side for fill lighting (0.3 intensity, no shadows)
 * 
 * This component should be placed inside the Canvas to apply lighting to all scene elements.
 */
export default function Lights() {
  const mainLightRef = useRef<DirectionalLight>(null);

  return (
    <>
      {/* Ambient light for overall scene illumination */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Main directional light source */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <directionalLight
        ref={mainLightRef}
        position={[10, 15, 10]}
        intensity={1}
        castShadow
        color="#ffffff"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
      />

      {/* Fill directional light for secondary illumination */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <directionalLight
        position={[-5, 10, -5]}
        intensity={0.3}
        color="#ffffff"
      />
    </>
  );
}
