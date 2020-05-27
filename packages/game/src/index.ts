import { AUTO, Scale } from "phaser";
import scenes from "./scenes";

new Phaser.Game({
  type: AUTO,
  backgroundColor: "0xff00ff",
  width: 256,
  height: 192,
  loader: {
    baseURL: "https://localhost:1233",
  },
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  scene: scenes,
});
