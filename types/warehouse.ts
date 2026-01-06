/**
 * Item condition status
 */
export type ItemCondition = "Good" | "Damage" | "Quarantine" | "Scrap";

/**
 * 3D coordinate tuple [x, y, z]
 */
export type Coordinate3D = [number, number, number];

/**
 * 2D position on a rack grid
 */
export interface ItemPosition {
  /** X coordinate on the rack grid */
  x: number;
  /** Y coordinate on the rack grid */
  y: number;
}

/**
 * Inventory item stored in a rack
 */
export interface Item {
  /** Unique serial number for the item */
  serialNo: string;
  /** Lot number for batch tracking */
  lot: string;
  /** Item description */
  description: string;
  /** Current condition status of the item */
  condition: ItemCondition;
  /** Hex color code for visualization */
  color: string;
  /** Grid position within the rack */
  position: ItemPosition;
}

/**
 * Storage rack in the warehouse
 */
export interface Rack {
  /** Rack identifier/name */
  name: string;
  /** 3D coordinate position in the warehouse */
  coordinate: Coordinate3D;
  /** Array of items stored in this rack */
  items: Item[];
}

/**
 * Floor zone for special areas (loading, staging, etc.)
 */
export interface Zone {
  /** Type of zone (e.g., loading_zone, staging_area) */
  type: string;
  /** Zone name/identifier */
  name: string;
  /** 3D coordinate position of the zone */
  coordinate: Coordinate3D;
  /** [width, length] dimensions of the zone */
  dimensions: [number, number];
  /** Hex color code for visualization */
  color: string;
}

/**
 * Vehicle route through the warehouse
 */
export interface Route {
  /** Type of vehicle (e.g., forklift, agv) */
  type: string;
  /** Route name/identifier */
  name: string;
  /** Array of waypoint coordinates defining the route path */
  path: Coordinate3D[];
  /** Hex color code for visualization */
  color: string;
}

/**
 * Complete warehouse data structure
 */
export interface WarehouseData {
  /** Array of storage racks */
  racks: Rack[];
  /** Array of floor zones */
  zones: Zone[];
  /** Array of vehicle routes */
  routes: Route[];
}
