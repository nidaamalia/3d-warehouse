'use client';

import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Lights from './Lights';
import Ground from './Ground';
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
 * 
 * The component uses React Three Fiber to manage the Three.js scene and
 * provides an interactive 3D environment for warehouse visualization.
 */
export default function WarehouseScene() {
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    console.log('WarehouseScene mounted');
    return () => {
      console.log('WarehouseScene unmounted');
    };
  }, []);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <p className="text-red-400 font-semibold">3D Canvas Error</p>
          <p className="text-gray-400 text-sm mt-2">{error}</p>
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
        position: [15, 15, 15],
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
        console.log('Canvas created successfully');
        const canvas = state.gl.domElement as HTMLCanvasElement;
        
        canvas.addEventListener('webglcontextlost', (event) => {
          console.warn('WebGL context lost - attempting recovery');
          event.preventDefault();
        });
        
        canvas.addEventListener('webglcontextrestored', () => {
          console.log('WebGL context restored');
        });
      }}
      onError={(error: any) => {
        console.error('Canvas error:', error);
        setError(error?.message || 'Unknown canvas error');
      }}
    >
      <Lights />
      
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={50}
        maxPolarAngle={Math.PI / 2.2}
      />
      
      <Ground />
      
      <DebugHelpers />
      
      {/* Racks will be added here */}
    </Canvas>
  );
}
