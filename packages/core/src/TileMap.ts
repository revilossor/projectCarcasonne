import { CartesianMap } from "./CartesianMap";
import { Tile, Neighbours, Location, OpenLocation, Proximity } from "./tiles";

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
}
