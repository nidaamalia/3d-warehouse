import { type ClassValue, clsx } from "clsx";
import { Coordinate3D, ItemPosition } from "@/types/warehouse";

/**
 * Combines multiple class values into a single class string
 * Useful for conditionally applying Tailwind CSS classes
 *
 * @param classes - Array of class values (strings, undefined, null, or objects)
 * @returns Combined class string
 *
 * @example
 * cn("px-4", isActive && "bg-blue-500", undefined) // "px-4 bg-blue-500"
 */
export function cn(...classes: ClassValue[]): string {
  return clsx(classes);
}

/**
 * Calculate RELATIVE position of item within rack group
 * Returns position relative to rack's origin (0,0,0), not world coordinates
 * 
 * @param itemPosition - Grid position on rack {x: column (0-2), y: shelf (1-3)}
 * @returns RELATIVE position [x, y, z] within rack group
 * 
 * @example
 * // Item at column 1, shelf 2 (center column, middle shelf)
 * calculateItemPosition({x: 1, y: 2})
 * // Returns: [0, 1.475, 0] (relative to rack center)
 */
export function calculateItemPosition(
  itemPosition: { x: number; y: number }
): [number, number, number] {
  // Shelf heights RELATIVE to rack base (matching RackStructure)
  // Add 0.175 to place item ON TOP of shelf (shelf at y, thickness 0.05, item height 0.3)
  const shelfHeights: Record<number, number> = {
    0: 0.475,  // Shelf at 0.3 + item offset
    1: 0.975,  // Shelf at 0.8 + item offset
    2: 1.475,  // Shelf at 1.3 + item offset
    3: 1.975   // Shelf at 1.8 + item offset
  };
  
  // Column positions RELATIVE to rack center (rack is 2.0 units wide)
  // 3 columns: left (-0.65), center (0), right (+0.65)
  const columnOffset = (itemPosition.x - 1) * 0.65;
  
  return [
    columnOffset,                          // X: relative to rack center
    shelfHeights[itemPosition.y] || 0.975, // Y: shelf height from rack base
    0                                       // Z: items don't go front/back (same as rack center)
  ];
}
