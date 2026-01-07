import '@react-three/fiber';
import type React from 'react';
import type { AmbientLight, DirectionalLight, Mesh, GridHelper } from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: {
        intensity?: number;
        color?: string | number;
      };
      directionalLight: {
        position?: [number, number, number];
        intensity?: number;
        castShadow?: boolean;
        color?: string | number;
        ref?: React.Ref<DirectionalLight>;
        'shadow-mapSize-width'?: number;
        'shadow-mapSize-height'?: number;
        'shadow-camera-left'?: number;
        'shadow-camera-right'?: number;
        'shadow-camera-top'?: number;
        'shadow-camera-bottom'?: number;
        'shadow-camera-near'?: number;
        'shadow-camera-far'?: number;
      };
      mesh: {
        position?: [number, number, number];
        rotation?: [number, number, number];
        scale?: [number, number, number];
        castShadow?: boolean;
        receiveShadow?: boolean;
        ref?: React.Ref<Mesh>;
        children?: React.ReactNode;
      };
      planeGeometry: {
        args?: [number, number];
      };
      meshStandardMaterial: {
        color?: string | number;
        roughness?: number;
        metalness?: number;
        receiveShadow?: boolean;
        castShadow?: boolean;
      };
      gridHelper: {
        args?: [number, number, string | number, string | number];
        position?: [number, number, number];
        ref?: React.Ref<GridHelper>;
      };
    }
  }
}
