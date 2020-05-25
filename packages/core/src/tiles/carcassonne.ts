import { TileEdge, Tile } from "../Types";

// TODO export tiles here, ratios in static TileDeck factory
export const carcassonne: { [key: string]: Tile } = {
  start: {
    top: TileEdge.BUILDING,
    right: TileEdge.ROAD,
    bottom: TileEdge.EMPTY,
    left: TileEdge.ROAD,
    monastary: false,
  },
  1: {
    //3
    top: TileEdge.BUILDING,
    right: TileEdge.EMPTY,
    bottom: TileEdge.ROAD,
    left: TileEdge.ROAD,
    monastary: false,
  },
  2: {
    //3
    top: TileEdge.BUILDING,
    right: TileEdge.ROAD,
    bottom: TileEdge.ROAD,
    left: TileEdge.EMPTY,
    monastary: false,
  },
  3: {
    //3
    top: TileEdge.BUILDING,
    right: TileEdge.ROAD,
    bottom: TileEdge.EMPTY,
    left: TileEdge.ROAD,
    monastary: false,
  },
  4: {
    //5
    top: TileEdge.BUILDING,
    right: TileEdge.EMPTY,
    bottom: TileEdge.EMPTY,
    left: TileEdge.EMPTY,
    monastary: false,
  },
  5: {
    //3
    top: TileEdge.BUILDING,
    right: TileEdge.EMPTY,
    bottom: TileEdge.BUILDING,
    left: TileEdge.EMPTY,
    monastary: false,
  },
  6: {
    //2
    top: TileEdge.BUILDING,
    right: TileEdge.EMPTY,
    bottom: TileEdge.EMPTY,
    left: TileEdge.BUILDING,
    monastary: false,
  },
  7: {
    //3
    top: TileEdge.BUILDING,
    right: TileEdge.ROAD,
    bottom: TileEdge.ROAD,
    left: TileEdge.ROAD,
    monastary: false,
  },
  8: {
    //5
    top: TileEdge.BUILDING,
    right: TileEdge.BUILDING,
    bottom: TileEdge.EMPTY,
    left: TileEdge.EMPTY,
    monastary: false,
  },
  9: {
    //5
    top: TileEdge.BUILDING,
    right: TileEdge.BUILDING,
    bottom: TileEdge.ROAD,
    left: TileEdge.ROAD,
    monastary: false,
  },
  10: {
    //3
    top: TileEdge.BUILDING,
    right: TileEdge.EMPTY,
    bottom: TileEdge.BUILDING,
    left: TileEdge.EMPTY,
    monastary: false,
  },
  11: {
    //4
    top: TileEdge.BUILDING,
    right: TileEdge.BUILDING,
    bottom: TileEdge.EMPTY,
    left: TileEdge.BUILDING,
    monastary: false,
  },
  12: {
    //3
    top: TileEdge.BUILDING,
    right: TileEdge.BUILDING,
    bottom: TileEdge.ROAD,
    left: TileEdge.BUILDING,
    monastary: false,
  },
  13: {
    //1
    top: TileEdge.BUILDING,
    right: TileEdge.BUILDING,
    bottom: TileEdge.BUILDING,
    left: TileEdge.BUILDING,
    monastary: false,
  },
  14: {
    //8
    top: TileEdge.ROAD,
    right: TileEdge.EMPTY,
    bottom: TileEdge.ROAD,
    left: TileEdge.EMPTY,
    monastary: false,
  },
  15: {
    //9
    top: TileEdge.ROAD,
    right: TileEdge.ROAD,
    bottom: TileEdge.EMPTY,
    left: TileEdge.EMPTY,
    monastary: false,
  },
  16: {
    //4
    top: TileEdge.EMPTY,
    right: TileEdge.ROAD,
    bottom: TileEdge.ROAD,
    left: TileEdge.ROAD,
    monastary: false,
  },
  17: {
    //1
    top: TileEdge.ROAD,
    right: TileEdge.ROAD,
    bottom: TileEdge.ROAD,
    left: TileEdge.ROAD,
    monastary: false,
  },
  18: {
    //4
    top: TileEdge.EMPTY,
    right: TileEdge.EMPTY,
    bottom: TileEdge.EMPTY,
    left: TileEdge.EMPTY,
    monastary: true,
  },
  19: {
    //2
    top: TileEdge.EMPTY,
    right: TileEdge.EMPTY,
    bottom: TileEdge.ROAD,
    left: TileEdge.EMPTY,
    monastary: true,
  },
};
