import { AUTO, Scale } from "phaser";
import scenes from "./scenes";

// import { test } from "@revilossor/core";
//
// test();

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
