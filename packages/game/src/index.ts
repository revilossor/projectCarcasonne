import { AUTO, Scale } from "phaser";
import scenes from "./scenes";

import { TileMap, Tiles } from "@revilossor/core";

const map = new TileMap();
map.set({ x: 0, y: 0 }, Tiles.blank);

console.dir({
  map,
  tile: Tiles.blank,
  positions: map.getFittingLocations(Tiles.blank),
});

new Phaser.Game({
  type: AUTO,
  backgroundColor: "0xff00ff",
  width: 256,
  height: 192,
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  scene: scenes,
});
