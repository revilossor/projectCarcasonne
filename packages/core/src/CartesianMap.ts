interface Location {
  x: number;
  y: number;
}

type HashedLocation = string;

export class CartesianMap<T> {
  [x: string]: any;
  private _map!: Map<HashedLocation, T>;

  constructor() {
    // TODO pass [Location, T][], each is hashed and set
    this._map = new Map<HashedLocation, T>();
  }

  public set(location: Location, value: T): CartesianMap<T> {
    this._map.set(CartesianMap.locationToHash(location), value);
    return this;
  }

  public get(location: Location): T | null {
    return this._map.get(CartesianMap.locationToHash(location)) ?? null;
  }

  public get all(): [Location, T][] {
    const list = new Array<[Location, T]>();
    this._map.forEach((value: T, hash: HashedLocation) => {
      list.push([CartesianMap.locationFromHash(hash), value]);
    });
    return list;
  }

  private static locationToHash(location: Location): HashedLocation {
    return JSON.stringify(location);
  }

  private static locationFromHash(hash: HashedLocation): Location {
    return JSON.parse(hash);
  }
}
