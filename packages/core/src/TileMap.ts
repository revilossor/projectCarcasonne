import { CartesianMap } from "./CartesianMap";
import {
  Tile,
  Neighbours,
  Location,
  OpenLocation,
  Proximity,
  Orientation,
  Direction,
  TileEdge,
  FittingLocation,
} from "./Types";

export class TileMap extends CartesianMap<Tile> {
  public setTile(tile: Tile, fittingLocation: FittingLocation): TileMap {
    this.set(
      fittingLocation,
      TileMap.rotateTile(tile, fittingLocation.orientation)
    );
    return this;
  }

  public getFittingLocations(tile: Tile): FittingLocation[] {
    const addFittingLocation = (
      fittingLocations: FittingLocation[],
      openLocation: OpenLocation,
      tile: Tile,
      orientation: Orientation
    ) => {
      if (
        TileMap.checkFit(
          TileMap.rotateTile(tile, orientation),
          this.getNeighbours(openLocation)
        )
      ) {
        fittingLocations.push({ ...openLocation, orientation });
      }
    };

    return this.getOpenLocations().reduce(
      (
        fittingLocations: FittingLocation[],
        openLocation: OpenLocation
      ): FittingLocation[] => {
        const addFittingLocationToList = addFittingLocation.bind(
          this,
          fittingLocations,
          openLocation,
          tile
        );
        addFittingLocationToList(Orientation.NORTH);
        addFittingLocationToList(Orientation.EAST);
        addFittingLocationToList(Orientation.SOUTH);
        addFittingLocationToList(Orientation.WEST);
        return fittingLocations;
      },
      []
    );
  }

  public getOpenLocations(): OpenLocation[] {
    const addOpenLocation = (
      list: OpenLocation[],
      [location, tile]: [Location, Tile | null]
    ) => {
      if (tile === null) {
        list.push({
          ...location,
          neighbours: this.getNeighbours(location),
        });
      }
    };

    return this.all.reduce(
      (
        openLocations: OpenLocation[],
        [location]: [Location, Tile]
      ): OpenLocation[] => {
        const neighbours = this.getNeighbours(location);
        addOpenLocation(openLocations, neighbours.top);
        addOpenLocation(openLocations, neighbours.right);
        addOpenLocation(openLocations, neighbours.bottom);
        addOpenLocation(openLocations, neighbours.left);
        return openLocations;
      },
      []
    );
  }

  public getNeighbours(location: Location): Neighbours {
    const relative = TileMap.getNeighbourLocations(location);
    return {
      top: [relative.top, this.get(relative.top)],
      right: [relative.right, this.get(relative.right)],
      bottom: [relative.bottom, this.get(relative.bottom)],
      left: [relative.left, this.get(relative.left)],
    };
  }

  private static getNeighbourLocations({
    x,
    y,
  }: Location): Proximity<Location> {
    // assume all locations are integers, and positive y is down...
    return {
      top: { x, y: y - 1 },
      right: { x: x + 1, y },
      bottom: { x, y: y + 1 },
      left: { x: x - 1, y },
    };
  }

  private static rotateTile(tile: Tile, orientation: Orientation): Tile {
    switch (orientation) {
      case Orientation.EAST:
        return {
          top: tile.left,
          right: tile.top,
          bottom: tile.right,
          left: tile.bottom,
          monastary: tile.monastary,
        };
      case Orientation.SOUTH:
        return {
          top: tile.bottom,
          right: tile.left,
          bottom: tile.top,
          left: tile.right,
          monastary: tile.monastary,
        };
      case Orientation.WEST:
        return {
          top: tile.right,
          right: tile.bottom,
          bottom: tile.left,
          left: tile.top,
          monastary: tile.monastary,
        };
      default:
        return {
          top: tile.top,
          right: tile.right,
          bottom: tile.bottom,
          left: tile.left,
          monastary: tile.monastary,
        };
    }
  }

  private static getCorrespondingEdge(
    neighbours: Neighbours,
    direction: Direction
  ): TileEdge {
    switch (direction) {
      case Direction.TOP:
        return neighbours?.top[1]?.bottom ?? TileEdge.UNOCCUPIED;
      case Direction.RIGHT:
        return neighbours?.right[1]?.left ?? TileEdge.UNOCCUPIED;
      case Direction.BOTTOM:
        return neighbours?.bottom[1]?.top ?? TileEdge.UNOCCUPIED;
      case Direction.LEFT:
        return neighbours?.left[1]?.right ?? TileEdge.UNOCCUPIED;
    }
  }

  private static tileMatchesInDirection(
    tile: Tile,
    neighbours: Neighbours,
    direction: Direction
  ): boolean {
    const correspondingEdge = TileMap.getCorrespondingEdge(
      neighbours,
      direction
    );
    return (
      correspondingEdge === TileEdge.UNOCCUPIED ||
      tile[direction] === correspondingEdge
    );
  }

  private static checkFit(tile: Tile, neighbours: Neighbours): boolean {
    const thisMatchesInDirection = TileMap.tileMatchesInDirection.bind(
      null,
      tile,
      neighbours
    );
    return (
      thisMatchesInDirection(Direction.TOP) &&
      thisMatchesInDirection(Direction.RIGHT) &&
      thisMatchesInDirection(Direction.BOTTOM) &&
      thisMatchesInDirection(Direction.LEFT)
    );
  }
}
