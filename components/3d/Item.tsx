'use client';

import { useState, memo } from 'react';
import { Html } from '@react-three/drei';

interface ItemProps {
  serialNo: string;
  lot: string;
  description: string;
  condition: string;
  color: string;
  position: [number, number, number];
  onClick?: () => void;
}

/**
 * 3D representation of a warehouse item with hover effects
 * Shows visual feedback and prepares tooltip data on hover
 */
function Item({ 
  serialNo, 
  lot, 
  description, 
  condition, 
  color, 
  position, 
  onClick 
}: ItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    // @ts-expect-error - React Three Fiber extends JSX.IntrinsicElements at runtime
    <mesh
      position={position}
      castShadow
      receiveShadow
      scale={isHovered ? 1.1 : 1}
      onClick={onClick}
      onPointerOver={(e: any) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e: any) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
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
        emissive={color}
        emissiveIntensity={isHovered ? 0.3 : 0}
      />
      
      {isHovered && (
        <Html
          position={[0, 1.1, 0]}
          center
          distanceFactor={8}
          style={{ pointerEvents: 'none' }}
        >
          <div className="bg-slate-900/95 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-slate-700 min-w-[200px]">
            <div className="space-y-1.5">
              <div>
                <div className="text-slate-400 text-xs">Serial No.</div>
                <div className="text-slate-100 text-sm font-semibold">{serialNo}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs">Lot Number</div>
                <div className="text-slate-200 text-sm">{lot}</div>
              </div>
              <div>
                <div className="text-slate-400 text-xs">Description</div>
                <div className="text-slate-200 text-sm">{description}</div>
              </div>
              <div className="pt-1 border-t border-slate-700">
                <div className="text-slate-400 text-xs">Condition</div>
                <div className="flex items-center gap-2 mt-1">
                  <div 
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-slate-100 text-sm font-medium">{condition}</span>
                </div>
              </div>
            </div>
          </div>
        </Html>
      )}
    </mesh>
  );
}

export default memo(Item);
