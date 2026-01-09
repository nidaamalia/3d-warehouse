'use client';

import { useRef } from 'react';
import { DirectionalLight } from 'three';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Lights component provides a consistent three-light setup for the warehouse scene.
 * 
 * Lighting setup:
 * - Ambient light: Provides overall scene illumination
 * - Main directional light: Primary light source from above-right (casts shadows)
 * - Fill directional light: Secondary light from opposite side for fill lighting
 * - Hemisphere light: Better ambient lighting with theme-aware ground color
 * 
 * Intensity adjusts based on theme:
 * - Dark mode: Higher intensity for better visibility
 * - Light mode: Lower intensity to avoid overexposure
 * 
 * This component should be placed inside the Canvas to apply lighting to all scene elements.
 */
export default function Lights() {
  const mainLightRef = useRef<DirectionalLight>(null);
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const ambientIntensity = isDark ? 0.8 : 0.6;
  const mainIntensity = isDark ? 2 : 1.5;
  const fillIntensity = isDark ? 0.8 : 0.6;
  const hemisphereIntensity = isDark ? 0.5 : 0.3;
  const groundColor = isDark ? '#444444' : '#d0d0d0';

  return (
    <>
      {/* Ambient light for overall scene illumination */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <ambientLight intensity={ambientIntensity} color="#ffffff" />

      {/* Main directional light source */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <directionalLight
        ref={mainLightRef}
        position={[10, 15, 10]}
        intensity={mainIntensity}
        castShadow
        color="#ffffff"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-far={500}
      />

      {/* Fill directional light for secondary illumination */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <directionalLight
        position={[-5, 10, -5]}
        intensity={fillIntensity}
        color="#ffffff"
      />

      {/* Hemisphere light for better ambient lighting */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <hemisphereLight
        intensity={hemisphereIntensity}
        color="#ffffff"
        groundColor={groundColor}
      />
    </>
  );
}
