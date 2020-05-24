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
    const a = this.all;
    const b = a.reduce(
      (
        openLocations: OpenLocation[],
        [location]: [Location, Tile]
      ): OpenLocation[] => {
        const neighbours = this.getNeighbours(location);
        if (neighbours.top[1] === null) {
          // ie, there is no tile there
          openLocations.push({
            ...neighbours.top[0],
            neighbours: this.getNeighbours(neighbours.top[0]),
          });
        }
        if (neighbours.right[1] === null) {
          // TODO refactor me ! DRY
          openLocations.push({
            ...neighbours.right[0],
            neighbours: this.getNeighbours(neighbours.right[0]),
          });
        }
        if (neighbours.bottom[1] === null) {
          // TODO refactor me ! DRY
          openLocations.push({
            ...neighbours.bottom[0],
            neighbours: this.getNeighbours(neighbours.bottom[0]),
          });
        }
        if (neighbours.left[1] === null) {
          // TODO refactor me ! DRY
          openLocations.push({
            ...neighbours.left[0],
            neighbours: this.getNeighbours(neighbours.left[0]),
          });
        }
        return openLocations;
      },
      []
    );

    return b;
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
