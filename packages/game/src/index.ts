import { AUTO, Scale } from "phaser";
import scenes from "./scenes";
//
// import { Tiles } from "@revilossor/core";
// //
// // test();
//
// Tiles.TileEdge.ROAD

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
