import { Tile } from "./Types";

interface TileDeckItem {
  tile: Tile;
  count: number;
}

export interface TileDeckParameters {
  items: TileDeckItem[];
}

export class TileDeck extends Array {
  constructor({ items }: TileDeckParameters) {
    super();
    items.forEach(({ tile, count }: TileDeckItem) => {
      for (let i = 0; i < count; i++) {
        this.push(tile);
      }
    });
  }
}
