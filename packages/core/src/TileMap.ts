import { CartesianMap } from "./CartesianMap";
import { Tile } from "./tiles";

export class TileMap extends CartesianMap<Tile> {
  // TODO function that finds every proximate location in the cartesian map, and its neighbours
  /**
    init set
    get every [Location, Tile]
    for each [Location, Tile]
      get Neighbours for Location
      get Location[] of empty Neighbours
      add Location[] to set
    init outputSet
    for every Location in set
      get Neighbours for Location
      add [Location, TileAtLocation] to outputSet
    return outputSet
   */
}
