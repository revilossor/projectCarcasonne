export enum TileEdge {
  ROAD = "road",
  BUILDING = "building",
  EMPTY = "empty",
  UNOCCUPIED = "unoccupied",
}

export interface Proximity<T> {
  top: T;
  right: T;
  bottom: T;
  left: T;
}

export interface Tile extends Proximity<TileEdge> {
  monastary: boolean;
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

export enum Orientation {
  NORTH = "north",
  EAST = "east",
  SOUTH = "south",
  WEST = "west",
}
