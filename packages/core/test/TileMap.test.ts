import { TileMap } from "../src/TileMap";
import {
  blank,
  Tile,
  TileEdge,
  Location,
  Proximity,
  Orientation,
} from "../src/tiles";

let map: TileMap;

describe("Given I have no items set", () => {
  beforeEach(() => {
    map = new TileMap();
  });

  it("When I get open locations, an empty list is returned", () => {
    expect(map.getOpenLocations()).toEqual([]);
  });

  it("And I get fitting locations for a tile, an empty list is returned", () => {
    expect(map.getFittingLocations(blank)).toEqual([]);
  });
});

describe("Given I have several items set", () => {
  /**
       0
    , , , ,
  0 , ,0, ,
    , ,1, ,
    , ,2,r,
    , ,r, ,

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
    const expectedNeighbourLocations = expectedOpenPositions.map(
      getNeighbourLocations
    );

    const result = map.getOpenLocations();

    expect(result).toHaveLength(8);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          ...expectedOpenPositions[0],
          neighbours: {
            top: [expectedNeighbourLocations[0].top, null],
            right: [expectedNeighbourLocations[0].right, null],
            bottom: [expectedNeighbourLocations[0].bottom, items[0]],
            left: [expectedNeighbourLocations[0].left, null],
          },
        },
        {
          ...expectedOpenPositions[1],
          neighbours: {
            top: [expectedNeighbourLocations[1].top, null],
            right: [expectedNeighbourLocations[1].right, items[0]],
            bottom: [expectedNeighbourLocations[1].bottom, null],
            left: [expectedNeighbourLocations[1].left, null],
          },
        },
        {
          ...expectedOpenPositions[2],
          neighbours: {
            top: [expectedNeighbourLocations[2].top, null],
            right: [expectedNeighbourLocations[2].right, items[1]],
            bottom: [expectedNeighbourLocations[2].bottom, null],
            left: [expectedNeighbourLocations[2].left, null],
          },
        },
        {
          ...expectedOpenPositions[3],
          neighbours: {
            top: [expectedNeighbourLocations[3].top, null],
            right: [expectedNeighbourLocations[3].right, items[2]],
            bottom: [expectedNeighbourLocations[3].bottom, null],
            left: [expectedNeighbourLocations[3].left, null],
          },
        },
        {
          ...expectedOpenPositions[4],
          neighbours: {
            top: [expectedNeighbourLocations[4].top, null],
            right: [expectedNeighbourLocations[4].right, null],
            bottom: [expectedNeighbourLocations[4].bottom, null],
            left: [expectedNeighbourLocations[4].left, items[0]],
          },
        },
        {
          ...expectedOpenPositions[5],
          neighbours: {
            top: [expectedNeighbourLocations[5].top, null],
            right: [expectedNeighbourLocations[5].right, null],
            bottom: [expectedNeighbourLocations[5].bottom, null],
            left: [expectedNeighbourLocations[5].left, items[1]],
          },
        },
        {
          ...expectedOpenPositions[6],
          neighbours: {
            top: [expectedNeighbourLocations[6].top, null],
            right: [expectedNeighbourLocations[6].right, null],
            bottom: [expectedNeighbourLocations[6].bottom, null],
            left: [expectedNeighbourLocations[6].left, items[2]],
          },
        },
        {
          ...expectedOpenPositions[7],
          neighbours: {
            top: [expectedNeighbourLocations[7].top, items[2]],
            right: [expectedNeighbourLocations[7].right, null],
            bottom: [expectedNeighbourLocations[7].bottom, null],
            left: [expectedNeighbourLocations[7].left, null],
          },
        },
      ])
    );
  });

  describe("And I get fitting locations for a tile", () => {
    describe("And the tile fits in lots of places", () => {
      it("When there are fitting locations, the correct list is returned", () => {
        const expectedFittingLocations = [
          { x: 0, y: -1 },
          { x: -1, y: 0 },
          { x: -1, y: 1 },
          { x: -1, y: 2 },
          { x: 1, y: 0 },
          { x: 1, y: 1 },
        ];
        const expectedNeighbourLocations = expectedFittingLocations.map(
          getNeighbourLocations
        );

        const result = map.getFittingLocations(blank);
        expect(result).toHaveLength(24);
        expect(result).toEqual(
          expect.arrayContaining([
            {
              ...expectedFittingLocations[0],
              neighbours: {
                top: [expectedNeighbourLocations[0].top, null],
                right: [expectedNeighbourLocations[0].right, null],
                bottom: [expectedNeighbourLocations[0].bottom, items[0]],
                left: [expectedNeighbourLocations[0].left, null],
              },
              orientation: Orientation.NORTH,
            },
            {
              ...expectedFittingLocations[0],
              neighbours: {
                top: [expectedNeighbourLocations[0].top, null],
                right: [expectedNeighbourLocations[0].right, null],
                bottom: [expectedNeighbourLocations[0].bottom, items[0]],
                left: [expectedNeighbourLocations[0].left, null],
              },
              orientation: Orientation.EAST,
            },
            {
              ...expectedFittingLocations[0],
              neighbours: {
                top: [expectedNeighbourLocations[0].top, null],
                right: [expectedNeighbourLocations[0].right, null],
                bottom: [expectedNeighbourLocations[0].bottom, items[0]],
                left: [expectedNeighbourLocations[0].left, null],
              },
              orientation: Orientation.SOUTH,
            },
            {
              ...expectedFittingLocations[0],
              neighbours: {
                top: [expectedNeighbourLocations[0].top, null],
                right: [expectedNeighbourLocations[0].right, null],
                bottom: [expectedNeighbourLocations[0].bottom, items[0]],
                left: [expectedNeighbourLocations[0].left, null],
              },
              orientation: Orientation.WEST,
            },
            {
              ...expectedFittingLocations[1],
              neighbours: {
                top: [expectedNeighbourLocations[1].top, null],
                right: [expectedNeighbourLocations[1].right, items[0]],
                bottom: [expectedNeighbourLocations[1].bottom, null],
                left: [expectedNeighbourLocations[1].left, null],
              },
              orientation: Orientation.NORTH,
            },
            {
              ...expectedFittingLocations[1],
              neighbours: {
                top: [expectedNeighbourLocations[1].top, null],
                right: [expectedNeighbourLocations[1].right, items[0]],
                bottom: [expectedNeighbourLocations[1].bottom, null],
                left: [expectedNeighbourLocations[1].left, null],
              },
              orientation: Orientation.EAST,
            },
            {
              ...expectedFittingLocations[1],
              neighbours: {
                top: [expectedNeighbourLocations[1].top, null],
                right: [expectedNeighbourLocations[1].right, items[0]],
                bottom: [expectedNeighbourLocations[1].bottom, null],
                left: [expectedNeighbourLocations[1].left, null],
              },
              orientation: Orientation.SOUTH,
            },
            {
              ...expectedFittingLocations[1],
              neighbours: {
                top: [expectedNeighbourLocations[1].top, null],
                right: [expectedNeighbourLocations[1].right, items[0]],
                bottom: [expectedNeighbourLocations[1].bottom, null],
                left: [expectedNeighbourLocations[1].left, null],
              },
              orientation: Orientation.WEST,
            },
            {
              ...expectedFittingLocations[2],
              neighbours: {
                top: [expectedNeighbourLocations[2].top, null],
                right: [expectedNeighbourLocations[2].right, items[1]],
                bottom: [expectedNeighbourLocations[2].bottom, null],
                left: [expectedNeighbourLocations[2].left, null],
              },
              orientation: Orientation.NORTH,
            },
            {
              ...expectedFittingLocations[2],
              neighbours: {
                top: [expectedNeighbourLocations[2].top, null],
                right: [expectedNeighbourLocations[2].right, items[1]],
                bottom: [expectedNeighbourLocations[2].bottom, null],
                left: [expectedNeighbourLocations[2].left, null],
              },
              orientation: Orientation.EAST,
            },
            {
              ...expectedFittingLocations[2],
              neighbours: {
                top: [expectedNeighbourLocations[2].top, null],
                right: [expectedNeighbourLocations[2].right, items[1]],
                bottom: [expectedNeighbourLocations[2].bottom, null],
                left: [expectedNeighbourLocations[2].left, null],
              },
              orientation: Orientation.SOUTH,
            },
            {
              ...expectedFittingLocations[2],
              neighbours: {
                top: [expectedNeighbourLocations[2].top, null],
                right: [expectedNeighbourLocations[2].right, items[1]],
                bottom: [expectedNeighbourLocations[2].bottom, null],
                left: [expectedNeighbourLocations[2].left, null],
              },
              orientation: Orientation.WEST,
            },
            {
              ...expectedFittingLocations[3],
              neighbours: {
                top: [expectedNeighbourLocations[3].top, null],
                right: [expectedNeighbourLocations[3].right, items[2]],
                bottom: [expectedNeighbourLocations[3].bottom, null],
                left: [expectedNeighbourLocations[3].left, null],
              },
              orientation: Orientation.NORTH,
            },
            {
              ...expectedFittingLocations[3],
              neighbours: {
                top: [expectedNeighbourLocations[3].top, null],
                right: [expectedNeighbourLocations[3].right, items[2]],
                bottom: [expectedNeighbourLocations[3].bottom, null],
                left: [expectedNeighbourLocations[3].left, null],
              },
              orientation: Orientation.EAST,
            },
            {
              ...expectedFittingLocations[3],
              neighbours: {
                top: [expectedNeighbourLocations[3].top, null],
                right: [expectedNeighbourLocations[3].right, items[2]],
                bottom: [expectedNeighbourLocations[3].bottom, null],
                left: [expectedNeighbourLocations[3].left, null],
              },
              orientation: Orientation.SOUTH,
            },
            {
              ...expectedFittingLocations[3],
              neighbours: {
                top: [expectedNeighbourLocations[3].top, null],
                right: [expectedNeighbourLocations[3].right, items[2]],
                bottom: [expectedNeighbourLocations[3].bottom, null],
                left: [expectedNeighbourLocations[3].left, null],
              },
              orientation: Orientation.WEST,
            },
            {
              ...expectedFittingLocations[4],
              neighbours: {
                top: [expectedNeighbourLocations[4].top, null],
                right: [expectedNeighbourLocations[4].right, null],
                bottom: [expectedNeighbourLocations[4].bottom, null],
                left: [expectedNeighbourLocations[4].left, items[0]],
              },
              orientation: Orientation.NORTH,
            },
            {
              ...expectedFittingLocations[4],
              neighbours: {
                top: [expectedNeighbourLocations[4].top, null],
                right: [expectedNeighbourLocations[4].right, null],
                bottom: [expectedNeighbourLocations[4].bottom, null],
                left: [expectedNeighbourLocations[4].left, items[0]],
              },
              orientation: Orientation.EAST,
            },
            {
              ...expectedFittingLocations[4],
              neighbours: {
                top: [expectedNeighbourLocations[4].top, null],
                right: [expectedNeighbourLocations[4].right, null],
                bottom: [expectedNeighbourLocations[4].bottom, null],
                left: [expectedNeighbourLocations[4].left, items[0]],
              },
              orientation: Orientation.SOUTH,
            },
            {
              ...expectedFittingLocations[4],
              neighbours: {
                top: [expectedNeighbourLocations[4].top, null],
                right: [expectedNeighbourLocations[4].right, null],
                bottom: [expectedNeighbourLocations[4].bottom, null],
                left: [expectedNeighbourLocations[4].left, items[0]],
              },
              orientation: Orientation.WEST,
            },
            {
              ...expectedFittingLocations[5],
              neighbours: {
                top: [expectedNeighbourLocations[5].top, null],
                right: [expectedNeighbourLocations[5].right, null],
                bottom: [expectedNeighbourLocations[5].bottom, null],
                left: [expectedNeighbourLocations[5].left, items[1]],
              },
              orientation: Orientation.NORTH,
            },
            {
              ...expectedFittingLocations[5],
              neighbours: {
                top: [expectedNeighbourLocations[5].top, null],
                right: [expectedNeighbourLocations[5].right, null],
                bottom: [expectedNeighbourLocations[5].bottom, null],
                left: [expectedNeighbourLocations[5].left, items[1]],
              },
              orientation: Orientation.EAST,
            },
            {
              ...expectedFittingLocations[5],
              neighbours: {
                top: [expectedNeighbourLocations[5].top, null],
                right: [expectedNeighbourLocations[5].right, null],
                bottom: [expectedNeighbourLocations[5].bottom, null],
                left: [expectedNeighbourLocations[5].left, items[1]],
              },
              orientation: Orientation.SOUTH,
            },
            {
              ...expectedFittingLocations[5],
              neighbours: {
                top: [expectedNeighbourLocations[5].top, null],
                right: [expectedNeighbourLocations[5].right, null],
                bottom: [expectedNeighbourLocations[5].bottom, null],
                left: [expectedNeighbourLocations[5].left, items[1]],
              },
              orientation: Orientation.WEST,
            },
          ])
        );
      });
      it("When there are no fitting locations, an empty list is returned", () => {
        const tile = {
          top: TileEdge.BUILDING,
          right: TileEdge.BUILDING,
          bottom: TileEdge.BUILDING,
          left: TileEdge.BUILDING,
          monastary: false,
        };
        expect(map.getFittingLocations(tile)).toEqual([]);
      });
    });
    describe("And the tile fits in a few places", () => {
      it("When there are fitting locations, the correct list is returned", () => {
        const expectedFittingLocations = [
          { x: 0, y: 3 },
          { x: 1, y: 2 },
        ];
        const expectedNeighbourLocations = expectedFittingLocations.map(
          getNeighbourLocations
        );
        const roadTile = {
          ...blank,
          top: TileEdge.BUILDING,
          right: TileEdge.ROAD,
          bottom: TileEdge.BUILDING,
          left: TileEdge.ROAD,
        };

        const result = map.getFittingLocations(roadTile);
        expect(result).toHaveLength(4);
        expect(result).toEqual(
          expect.arrayContaining([
            {
              ...expectedFittingLocations[0],
              neighbours: {
                top: [expectedNeighbourLocations[0].top, items[2]],
                right: [expectedNeighbourLocations[0].right, null],
                bottom: [expectedNeighbourLocations[0].bottom, null],
                left: [expectedNeighbourLocations[0].left, null],
              },
              orientation: Orientation.EAST,
            },
            {
              ...expectedFittingLocations[0],
              neighbours: {
                top: [expectedNeighbourLocations[0].top, items[2]],
                right: [expectedNeighbourLocations[0].right, null],
                bottom: [expectedNeighbourLocations[0].bottom, null],
                left: [expectedNeighbourLocations[0].left, null],
              },
              orientation: Orientation.WEST,
            },
            {
              ...expectedFittingLocations[1],
              neighbours: {
                top: [expectedNeighbourLocations[1].top, null],
                right: [expectedNeighbourLocations[1].right, null],
                bottom: [expectedNeighbourLocations[1].bottom, null],
                left: [expectedNeighbourLocations[1].left, items[2]],
              },
              orientation: Orientation.NORTH,
            },
            {
              ...expectedFittingLocations[1],
              neighbours: {
                top: [expectedNeighbourLocations[1].top, null],
                right: [expectedNeighbourLocations[1].right, null],
                bottom: [expectedNeighbourLocations[1].bottom, null],
                left: [expectedNeighbourLocations[1].left, items[2]],
              },
              orientation: Orientation.SOUTH,
            },
          ])
        );
      });
      it("When there are no fitting locations, an empty list is returned", () => {
        const tile = {
          top: TileEdge.BUILDING,
          right: TileEdge.BUILDING,
          bottom: TileEdge.BUILDING,
          left: TileEdge.BUILDING,
          monastary: false,
        };
        expect(map.getFittingLocations(tile)).toEqual([]);
      });
    });
    it("And the tile fits in no places, an empty list is returned", () => {
      expect(
        map.getFittingLocations({
          ...blank,
          top: TileEdge.BUILDING,
          right: TileEdge.BUILDING,
          bottom: TileEdge.BUILDING,
          left: TileEdge.BUILDING,
        })
      ).toEqual([]);
    });
  });

  describe("Given I then add another tile, neighbouring those already populated", () => {
    const newLocation = { x: 1, y: 1 };

    /**
         0
      , , , ,
    0 , ,0, ,
      , ,1,N,
      , ,2,r,
      , ,r, ,
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
      const expectedNeighbourLocations = expectedOpenPositions.map(
        getNeighbourLocations
      );

      expect(map.getOpenLocations()).toEqual(
        expect.arrayContaining([
          {
            ...expectedOpenPositions[0],
            neighbours: {
              top: [expectedNeighbourLocations[0].top, null],
              right: [expectedNeighbourLocations[0].right, null],
              bottom: [expectedNeighbourLocations[0].bottom, items[0]],
              left: [expectedNeighbourLocations[0].left, null],
            },
          },
          {
            ...expectedOpenPositions[1],
            neighbours: {
              top: [expectedNeighbourLocations[1].top, null],
              right: [expectedNeighbourLocations[1].right, items[0]],
              bottom: [expectedNeighbourLocations[1].bottom, null],
              left: [expectedNeighbourLocations[1].left, null],
            },
          },
          {
            ...expectedOpenPositions[2],
            neighbours: {
              top: [expectedNeighbourLocations[2].top, null],
              right: [expectedNeighbourLocations[2].right, items[1]],
              bottom: [expectedNeighbourLocations[2].bottom, null],
              left: [expectedNeighbourLocations[2].left, null],
            },
          },
          {
            ...expectedOpenPositions[3],
            neighbours: {
              top: [expectedNeighbourLocations[3].top, null],
              right: [expectedNeighbourLocations[3].right, items[2]],
              bottom: [expectedNeighbourLocations[3].bottom, null],
              left: [expectedNeighbourLocations[3].left, null],
            },
          },
          {
            ...expectedOpenPositions[4],
            neighbours: {
              top: [expectedNeighbourLocations[4].top, null],
              right: [expectedNeighbourLocations[4].right, null],
              bottom: [expectedNeighbourLocations[4].bottom, blank],
              left: [expectedNeighbourLocations[4].left, items[0]],
            },
          },
          {
            ...expectedOpenPositions[5],
            neighbours: {
              top: [expectedNeighbourLocations[5].top, null],
              right: [expectedNeighbourLocations[5].right, null],
              bottom: [expectedNeighbourLocations[5].bottom, null],
              left: [expectedNeighbourLocations[5].left, items[1]],
            },
          },
          {
            ...expectedOpenPositions[6],
            neighbours: {
              top: [expectedNeighbourLocations[6].top, blank],
              right: [expectedNeighbourLocations[6].right, null],
              bottom: [expectedNeighbourLocations[6].bottom, null],
              left: [expectedNeighbourLocations[6].left, items[2]],
            },
          },
          {
            ...expectedOpenPositions[7],
            neighbours: {
              top: [expectedNeighbourLocations[7].top, items[2]],
              right: [expectedNeighbourLocations[7].right, null],
              bottom: [expectedNeighbourLocations[7].bottom, null],
              left: [expectedNeighbourLocations[7].left, null],
            },
          },
        ])
      );
    });
  });
});
