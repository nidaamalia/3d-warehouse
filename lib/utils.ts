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
 * Calculate 3D position of item on rack shelf
 * @param rackCoordinate - Base coordinate of rack [x, y, z]
 * @param itemPosition - Grid position {x: column (0-2), y: shelf (1-3)}
 * @returns 3D position [x, y, z] for the item
 */
export function calculateItemPosition(
  rackCoordinate: [number, number, number],
  itemPosition: { x: number; y: number }
): [number, number, number] {
  const [rackX, rackY, rackZ] = rackCoordinate;
  
  // Map logical shelf numbers (1-3) to actual 3D heights
  const shelfHeights: Record<number, number> = {
    0: 0.35,  // Shelf 0 (rarely used)
    1: 0.85,  // Shelf 1 (bottom) - matches data y=1
    2: 1.35,  // Shelf 2 (middle) - matches data y=2
    3: 1.85   // Shelf 3 (top) - matches data y=3
  };
  
  // Calculate column position (0, 1, 2 → left, center, right)
  // Rack is 2.0 units wide, columns spaced at 0.65 apart
  const columnOffset = (itemPosition.x - 1) * 0.65;
  
  return [
    rackX + columnOffset,                    // X: rack base + column offset
    shelfHeights[itemPosition.y] || 0.85,    // Y: shelf height
    rackZ                                     // Z: same as rack depth
  ];
}
