import { Tile } from "./Types";
import { carcassonne } from "./tiles";

interface TileDeckItem {
  tile: Tile;
  count: number;
}

export interface TileDeckParameters {
  items: TileDeckItem[];
}

export class TileDeck {
  private _list = new Array<Tile>();

  public static empty(): TileDeck {
    return new TileDeck({ items: [] });
  }

  public static carcassonne(): TileDeck {
    const tileCount = [3, 3, 3, 5, 3, 2, 3, 5, 5, 3, 4, 3, 1, 8, 9, 4, 1, 4, 2];
    return TileDeck.fromParameters({
      items: tileCount.map((count, index) => ({
        tile: { ...carcassonne[`${index}`] },
        count,
      })),
    });
  }

  public static fromParameters(parameters: TileDeckParameters): TileDeck {
    return new TileDeck(parameters);
  }

  private constructor(public parameters: TileDeckParameters) {
    parameters.items.forEach(({ tile, count }: TileDeckItem) => {
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
    const drawn = this._list.pop() ?? null;
    return drawn ? { ...drawn } : null;
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
