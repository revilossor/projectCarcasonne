interface Location {
  x: number;
  y: number;
}

type HashedLocation = string;

export class CartesianMap<T> {
  private _map!: Map<HashedLocation, T>;

  constructor() {
    this._map = new Map<HashedLocation, T>();
  }

  private static locationToHash(location: Location): HashedLocation {
    return JSON.stringify(location);
  }

  private static locationFromHash(hash: HashedLocation): Location {
    return JSON.parse(hash);
  }

  public set(location: Location, value: T): CartesianMap<T> {
    this._map.set(CartesianMap.locationToHash(location), value);
    return this;
  }

  public get(location: Location): T {
    return this._map.get(CartesianMap.locationToHash(location));
  }
}
