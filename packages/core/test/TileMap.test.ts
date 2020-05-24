import { TileMap } from "../src/TileMap";
import { blank, Tile, TileEdge, Location, Proximity } from "../src/tiles";

let map: TileMap;

describe("Given I have no items set", () => {
  beforeEach(() => {
    map = new TileMap();
  });

  it("When I get the open locations, an empty list is returned", () => {
    expect(map.getOpenLocations()).toEqual([]);
  });
});

describe("Given I have several items set", () => {
  /**
       0
    , , , ,
  0 , ,0, ,
    , ,1, ,
    , ,2, ,
    , , , ,

    positive y is down!
   */

  const getNeighbourLocations = ({ x, y }: Location): Proximity<Location> => {
    // assume all locations are integers, and positive y is down...
    return {
      top: { x, y: y - 1 },
      right: { x: x + 1, y },
      bottom: { x, y: y + 1 },
      left: { x: x - 1, y },
    };
  };

  const items: Tile[] = [
    { ...blank, monastary: true },
    blank,
    { ...blank, bottom: TileEdge.ROAD, right: TileEdge.ROAD },
  ];

  beforeEach(() => {
    map = new TileMap();
    items.forEach((item, y) => {
      map.set({ x: 0, y }, item);
    });
  });

  it("When I get the neighbours for a location, the correct list is returned", () => {
    const populatedLocations = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ];

    const expectedNeighbours = populatedLocations.map(getNeighbourLocations);

    expect(map.getNeighbours(populatedLocations[0])).toEqual({
      top: [expectedNeighbours[0].top, null],
      right: [expectedNeighbours[0].right, null],
      bottom: [expectedNeighbours[0].bottom, items[1]],
      left: [expectedNeighbours[0].left, null],
    });

    expect(map.getNeighbours(populatedLocations[1])).toEqual({
      top: [expectedNeighbours[1].top, items[0]],
      right: [expectedNeighbours[1].right, null],
      bottom: [expectedNeighbours[1].bottom, items[2]],
      left: [expectedNeighbours[1].left, null],
    });

    expect(map.getNeighbours(populatedLocations[2])).toEqual({
      top: [expectedNeighbours[2].top, items[1]],
      right: [expectedNeighbours[2].right, null],
      bottom: [expectedNeighbours[2].bottom, null],
      left: [expectedNeighbours[2].left, null],
    });
  });

  it("When I get the open locations, the correct list is returned", () => {
    const expectedOpenPositions = [
      { x: 0, y: -1 },
      { x: -1, y: 0 },
      { x: -1, y: 1 },
      { x: -1, y: 2 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 0, y: 3 },
    ];
    const expectedNeighbours = expectedOpenPositions.map(getNeighbourLocations);

    expect(map.getOpenLocations()).toEqual(
      expect.arrayContaining([
        {
          ...expectedOpenPositions[0],
          neighbours: {
            top: [expectedNeighbours[0].top, null],
            right: [expectedNeighbours[0].right, null],
            bottom: [expectedNeighbours[0].bottom, items[0]],
            left: [expectedNeighbours[0].left, null],
          },
        },
        {
          ...expectedOpenPositions[1],
          neighbours: {
            top: [expectedNeighbours[1].top, null],
            right: [expectedNeighbours[1].right, items[0]],
            bottom: [expectedNeighbours[1].bottom, null],
            left: [expectedNeighbours[1].left, null],
          },
        },
        {
          ...expectedOpenPositions[2],
          neighbours: {
            top: [expectedNeighbours[2].top, null],
            right: [expectedNeighbours[2].right, items[1]],
            bottom: [expectedNeighbours[2].bottom, null],
            left: [expectedNeighbours[2].left, null],
          },
        },
        {
          ...expectedOpenPositions[3],
          neighbours: {
            top: [expectedNeighbours[3].top, null],
            right: [expectedNeighbours[3].right, items[2]],
            bottom: [expectedNeighbours[3].bottom, null],
            left: [expectedNeighbours[3].left, null],
          },
        },
        {
          ...expectedOpenPositions[4],
          neighbours: {
            top: [expectedNeighbours[4].top, null],
            right: [expectedNeighbours[4].right, null],
            bottom: [expectedNeighbours[4].bottom, null],
            left: [expectedNeighbours[4].left, items[0]],
          },
        },
        {
          ...expectedOpenPositions[5],
          neighbours: {
            top: [expectedNeighbours[5].top, null],
            right: [expectedNeighbours[5].right, null],
            bottom: [expectedNeighbours[5].bottom, null],
            left: [expectedNeighbours[5].left, items[1]],
          },
        },
        {
          ...expectedOpenPositions[6],
          neighbours: {
            top: [expectedNeighbours[6].top, null],
            right: [expectedNeighbours[6].right, null],
            bottom: [expectedNeighbours[6].bottom, null],
            left: [expectedNeighbours[6].left, items[2]],
          },
        },
        {
          ...expectedOpenPositions[7],
          neighbours: {
            top: [expectedNeighbours[7].top, items[2]],
            right: [expectedNeighbours[7].right, null],
            bottom: [expectedNeighbours[7].bottom, null],
            left: [expectedNeighbours[7].left, null],
          },
        },
      ])
    );
  });

  it("When I check if a tile fits, it returns correctly", () => {});

  describe("Given I then add another tile, neighbouring those already populated", () => {
    const newLocation = { x: 1, y: 1 };

    /**
         0
      , , , ,
    0 , ,0, ,
      , ,1,N,
      , ,2, ,
      , , , ,
     */

    beforeEach(() => {
      map.set(newLocation, blank);
    });

    it("When I get the neighbours of the newly populated location, the correct list is returned", () => {
      expect(map.getNeighbours(newLocation)).toEqual({
        top: [{ x: 1, y: 0 }, null],
        right: [{ x: 2, y: 1 }, null],
        bottom: [{ x: 1, y: 2 }, null],
        left: [{ x: 0, y: 1 }, items[1]],
      });
    });

    it("When I get the open locations, the correct list is returned", () => {
      const expectedOpenPositions = [
        { x: 0, y: -1 },
        { x: -1, y: 0 },
        { x: -1, y: 1 },
        { x: -1, y: 2 },
        { x: 1, y: 0 },
        { x: 2, y: 1 },
        { x: 1, y: 2 },
        { x: 0, y: 3 },
      ];
      const expectedNeighbours = expectedOpenPositions.map(
        getNeighbourLocations
      );

      expect(map.getOpenLocations()).toEqual(
        expect.arrayContaining([
          {
            ...expectedOpenPositions[0],
            neighbours: {
              top: [expectedNeighbours[0].top, null],
              right: [expectedNeighbours[0].right, null],
              bottom: [expectedNeighbours[0].bottom, items[0]],
              left: [expectedNeighbours[0].left, null],
            },
          },
          {
            ...expectedOpenPositions[1],
            neighbours: {
              top: [expectedNeighbours[1].top, null],
              right: [expectedNeighbours[1].right, items[0]],
              bottom: [expectedNeighbours[1].bottom, null],
              left: [expectedNeighbours[1].left, null],
            },
          },
          {
            ...expectedOpenPositions[2],
            neighbours: {
              top: [expectedNeighbours[2].top, null],
              right: [expectedNeighbours[2].right, items[1]],
              bottom: [expectedNeighbours[2].bottom, null],
              left: [expectedNeighbours[2].left, null],
            },
          },
          {
            ...expectedOpenPositions[3],
            neighbours: {
              top: [expectedNeighbours[3].top, null],
              right: [expectedNeighbours[3].right, items[2]],
              bottom: [expectedNeighbours[3].bottom, null],
              left: [expectedNeighbours[3].left, null],
            },
          },
          {
            ...expectedOpenPositions[4],
            neighbours: {
              top: [expectedNeighbours[4].top, null],
              right: [expectedNeighbours[4].right, null],
              bottom: [expectedNeighbours[4].bottom, blank],
              left: [expectedNeighbours[4].left, items[0]],
            },
          },
          {
            ...expectedOpenPositions[5],
            neighbours: {
              top: [expectedNeighbours[5].top, null],
              right: [expectedNeighbours[5].right, null],
              bottom: [expectedNeighbours[5].bottom, null],
              left: [expectedNeighbours[5].left, items[1]],
            },
          },
          {
            ...expectedOpenPositions[6],
            neighbours: {
              top: [expectedNeighbours[6].top, blank],
              right: [expectedNeighbours[6].right, null],
              bottom: [expectedNeighbours[6].bottom, null],
              left: [expectedNeighbours[6].left, items[2]],
            },
          },
          {
            ...expectedOpenPositions[7],
            neighbours: {
              top: [expectedNeighbours[7].top, items[2]],
              right: [expectedNeighbours[7].right, null],
              bottom: [expectedNeighbours[7].bottom, null],
              left: [expectedNeighbours[7].left, null],
            },
          },
        ])
      );
    });
  });
});
