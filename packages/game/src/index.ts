import { AUTO, Scale } from "phaser";
import scenes from "./scenes";

new Phaser.Game({
  type: AUTO,
  backgroundColor: "0xff00ff",
  width: 256,
  height: 192,
  render: {
    antialias: false,
    pixelArt: true,
    roundPixels: true,
  },
  zoom: 4,
  loader: {
    baseURL: "http://localhost:1233",
    crossOrigin: "anonymous",
  },
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  scene: scenes,
});
