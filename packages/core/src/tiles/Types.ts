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

export interface Neighbours extends Proximity<Tile> {}
