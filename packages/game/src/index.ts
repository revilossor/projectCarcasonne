import { AUTO, Scale } from "phaser";
import scenes from "./scenes";

// import { TileMap, TileDeck, Tiles } from "@revilossor/core";
//
// const map = new TileMap()
// const deck = TileDeck.carcassonne();
//
// console.log('lenght ' + deck.length)
//
// map.set({ x: 0, y: 0 }, Tiles.carcassonne.start)
//
// deck.shuffle()
//
// let moves = 71
//
// while(moves-- > 0) {
//   const tile = deck.draw()
//   console.log('lenght ' + deck.length + ' tile ' + tile)
//   if(tile) {
//     const poss = map.getFittingLocations(tile)
//     if(poss.length > 0) {
//       map.setTile(tile, poss[Math.floor(Math.random() * poss.length)])
//     } else {
//       console.log('UNPLACABLE_PIECE')
//     }
//   } else {
//     throw Error('no tile drawn')
//   }
// }
//
// console.dir(map)

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
