import { CartesianMap } from "./CartesianMap";
import {
  Tile,
  Neighbours,
  Location,
  OpenLocation,
  Proximity,
  Orientation,
} from "./tiles";

export class TileMap extends CartesianMap<Tile> {
  public getNeighbours(location: Location): Neighbours {
    const relative = TileMap.getNeighbourLocations(location);

    return {
      top: [relative.top, this.get(relative.top)],
      right: [relative.right, this.get(relative.right)],
      bottom: [relative.bottom, this.get(relative.bottom)],
      left: [relative.left, this.get(relative.left)],
    };
  }

  // TODO get the list of openLocations where a particular tile can be placed...
  // checkFit(location, tile, orientation): boolean
  /**
      for tile
        for each open position
          check if fits, in each of the 4 orientations
            if an orientation fits this open location
              add to list
      return list
   */

  public checkFit(
    location: Location,
    tile: Tile,
    orientation: Orientation = Orientation.NORTH
  ): boolean {
    /**
      rotate the tile to orientation      // rotate(Tile, orientation):Tile
      getNeighbours for location
      for each rotated tile edge      // validateEdge(Tile, neighbours, orientation): boolean
        check if tile edge valid connection with correcponding neighbour edge
      if each tile edge valid
        return true
      return false
     */
    return false;
  }

  public getOpenLocations(): OpenLocation[] {
    const addOpenLocation = (
      list: OpenLocation[],
      tuple: [Location, Tile | null]
    ) => {
      if (tuple[1] === null) {
        list.push({
          ...tuple[0],
          neighbours: this.getNeighbours(tuple[0]),
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
        return tile;
    }
  }
}
