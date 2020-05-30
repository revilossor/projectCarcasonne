export enum TileComponent {
  ROAD = "road",
  BUILDING = "building",
  EMPTY = "empty",
  UNOCCUPIED = "unoccupied",
  MONASTARY = "monastary",
  TOWN = "town",
}

export interface Proximity<T> {
  top: T;
  right: T;
  bottom: T;
  left: T;
}

export interface Tile extends Proximity<TileComponent> {
  middle: TileComponent;
  index?: number;
  orientation?: Orientation;
}

export interface Neighbours extends Proximity<[Location, Tile | null]> {}

export interface Location {
  x: number;
  y: number;
}

export type HashedLocation = string;

export interface OpenLocation extends Location {
  neighbours: Neighbours;
}

export interface FittingLocation extends OpenLocation {
  orientation: Orientation;
}

export enum Orientation {
  NORTH = "north",
  EAST = "east",
  SOUTH = "south",
  WEST = "west",
}

export enum Direction {
  TOP = "top",
  RIGHT = "right",
  BOTTOM = "bottom",
  LEFT = "left",
}
