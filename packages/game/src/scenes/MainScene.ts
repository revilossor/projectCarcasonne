import { Scene } from "phaser";
import { TileMap, TileDeck, Tiles } from "@revilossor/core";

const TILE_WIDTH = 8;
const TILE_HEIGHT = 8;
const TILE_SPRITE_KEY = "tiles";

export class MainScene extends Scene {
  private _map: TileMap;
  private _deck: TileDeck;
  private _graphics: Phaser.GameObjects.Graphics;

  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image(
      TILE_SPRITE_KEY,
      "images/carcassonne-tiles.png"
      // { frameWidth: TILE_WIDTH, frameHeight: TILE_HEIGHT }
    );
  }

  private initMap() {
    this._map = new TileMap();
    this._deck = TileDeck.carcassonne();
    this._deck.shuffle();
    this._map.set({ x: 0, y: 0 }, Tiles.carcassonne.start);
  }

  private drawMap() {
    this._graphics.fillStyle(0x00ff00, 1);
    this._map.all.forEach(([location, tile]) => {
      this._graphics.fillRect(
        location.x * TILE_WIDTH + 256 / 2 - TILE_WIDTH / 2,
        location.y * TILE_HEIGHT + 192 / 2 - TILE_HEIGHT / 2,
        TILE_WIDTH,
        TILE_HEIGHT
      );
    });
  }

  private addTile() {
    const tile = this._deck.draw();
    console.dir({ tile });
    if (tile) {
      const positions = this._map.getFittingLocations(tile);
      if (positions.length > 0) {
        this._map.setTile(
          tile,
          positions[Math.floor(Math.random() * [positions].length)]
        );
      }
    } else {
      this.scene.restart();
    }
  }

  create() {
    console.log("MainScene");
    this._graphics = this.add.graphics();
    this.initMap();
    this.time.addEvent({
      delay: 1000,
      callback: this.addTile,
      callbackScope: this,
      loop: true,
    });

    this.add.image(10, 10, TILE_SPRITE_KEY);
  }

  update(time: number, delta: number) {
    super.update(time, delta);
    this.drawMap();
  }
}
