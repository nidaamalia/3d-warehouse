'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import { useTheme } from '@/contexts/ThemeContext';
import Lights from './Lights';
import Ground from './Ground';
import RackGroup from './RackGroup';
import ZoneGroup from './ZoneGroup';
import RouteGroup from './RouteGroup';
import VehicleGroup from './VehicleGroup';
import DebugHelpers from './DebugHelpers';

/**
 * WarehouseScene - Main 3D warehouse scene container
 * 
 * This component serves as the primary 3D scene container for the warehouse visualizer.
 * It handles:
 * - Canvas setup and configuration
 * - Camera positioning for isometric-style view
 * - Shadow rendering
 * - Orbit controls for user interaction
 * - Scene lighting and ground plane
 * - Theme-aware background colors
 * 
 * The component uses React Three Fiber to manage the Three.js scene and
 * provides an interactive 3D environment for warehouse visualization.
 */
export default function WarehouseScene() {
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const { theme } = useTheme();
  const glRef = useRef<any>(null);

  useEffect(() => {
    // Update clear color when theme changes without re-rendering canvas
    if (glRef.current) {
      const bgColor = theme === 'dark' ? '#1a1f2e' : '#f5f5f5';
      glRef.current.setClearColor(bgColor, 1);
    }
  }, [theme]);

  useEffect(() => {
    // console.log('WarehouseScene mounted');
    return () => {
      // console.log('WarehouseScene unmounted');
    };
  }, []);

  const bgColor = theme === 'dark' ? '#1a1f2e' : '#f5f5f5';
  const errorBgClass = theme === 'dark' ? 'bg-slate-950' : 'bg-slate-100';

  if (error) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${errorBgClass}`}>
        <div className="text-center">
          <p className={theme === 'dark' ? 'text-red-400' : 'text-red-600'} style={{ fontWeight: 'bold' }}>3D Canvas Error</p>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>{error}</p>
          <button
            onClick={() => {
              setError(null);
              setRetryCount(prev => prev + 1);
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <Canvas
      key={retryCount}
      camera={{
        position: [18, 16, 18],
        fov: 50,
      }}
      shadows
      style={{ width: '100%', height: '100%' }}
      gl={{ 
        antialias: false,
        powerPreference: 'low-power',
        preserveDrawingBuffer: true,
        alpha: true,
        stencil: false,
        depth: true,
      } as any}
      onCreated={(state) => {
        // console.log('Canvas created successfully');
        const canvas = state.gl.domElement as HTMLCanvasElement;
        glRef.current = state.gl;
        state.gl.setClearColor(bgColor, 1);
        
        canvas.addEventListener('webglcontextlost', (event) => {
          // console.warn('WebGL context lost - attempting recovery');
          event.preventDefault();
        });
        
          canvas.addEventListener('webglcontextrestored', () => {
          // console.log('WebGL context restored');
        });
      }}
      onError={(error: any) => {
        console.error('Canvas error:', error);
        setError(error?.message || 'Unknown canvas error');
      }}
    >
      <Lights />
      
      <OrbitControls
        target={[-2, 0, -2]}
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={50}
        maxPolarAngle={Math.PI / 2.1}
      />
      
      <Ground />
      
      <RackGroup />
      
      <ZoneGroup />
      
      <RouteGroup />
      
      <VehicleGroup />
      
      <DebugHelpers />
      
      <Stats className="stats-bottom-left" />
    </Canvas>
  );
}
