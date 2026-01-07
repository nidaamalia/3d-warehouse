'use client';

import { useRef } from 'react';
import * as THREE from 'three';

export default function DebugHelpers() {
  const axesRef = useRef<THREE.AxesHelper>(null);

  return (
    <>
      {/* Axes Helper for coordinate system visualization */}
      {/* @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime */}
      <axesHelper
        ref={axesRef}
        args={[5]}
        position={[0, 0, 0]}
      />
    </>
  );
}
