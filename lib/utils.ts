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
 * Calculates the actual 3D position of an item in the warehouse scene
 * based on the rack's coordinate and the item's logical grid position
 *
 * The calculation uses the following logic:
 * - X (column): rackCoord[0] + (itemPos.x * 0.4) - 0.4
 *   Places items horizontally with 0.4 unit spacing, offset by -0.4
 * - Y (row/shelf): itemPos.y * 0.6 + 0.3
 *   Places items vertically with 0.6 unit spacing between shelves
 * - Z (depth): rackCoord[2]
 *   Items maintain the rack's depth coordinate
 *
 * @param rackCoordinate - The 3D coordinate of the rack [x, y, z]
 * @param itemPosition - The logical grid position of the item {x, y}
 * @returns The calculated 3D coordinate [x, y, z] for the item in the scene
 *
 * @example
 * const itemPos = calculateItemPosition([-5, 0, -5], { x: 1, y: 1 });
 * // Returns: [-4.6, 0.9, -5]
 */
export function calculateItemPosition(
  rackCoordinate: Coordinate3D,
  itemPosition: ItemPosition
): Coordinate3D {
  const x = rackCoordinate[0] + itemPosition.x * 0.4 - 0.4;
  const y = itemPosition.y * 0.6 + 0.3;
  const z = rackCoordinate[2];

  return [x, y, z];
}
