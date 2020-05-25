import { Tile } from "./Types";

interface TileDeckItem {
  tile: Tile;
  count: number;
}

export interface TileDeckParameters {
  items: TileDeckItem[];
}

export class TileDeck {
  private _list = new Array<Tile>();

  public constructor({ items }: TileDeckParameters) {
    items.forEach(({ tile, count }: TileDeckItem) => {
      for (let i = 0; i < count; i++) {
        this._list.push(tile);
      }
    });
  }

  public shuffle(): TileDeck {
    for (let i = this._list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._list[i], this._list[j]] = [this._list[j], this._list[i]];
    }
    return this;
  }

  public draw(): Tile | null {
    // TODO test meeeeee
    return this._list.pop() ?? null;
  }

  public get length(): number {
    return this._list.length;
  }

  public get(index: number): Tile {
    return this._list[index];
  }

  public forEach(
    callbackFn: (value: Tile, index: number, array: Tile[]) => void
  ) {
    return this._list.forEach(callbackFn);
  }
  public filter(
    callbackFn: (value: Tile, index: number, array: Tile[]) => unknown
  ): Tile[] {
    return this._list.filter(callbackFn);
  }
}
