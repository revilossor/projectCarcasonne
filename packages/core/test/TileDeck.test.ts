import { TileDeck, Tiles, Types } from "../src";

let deck: TileDeck;

describe("Given I have a blank deck", () => {
  beforeEach(() => {
    deck = TileDeck.empty();
  });

  it("Then there should be no tiles in the deck", () => {
    expect(deck).toHaveLength(0);
  });

  it("When I draw a tile, then it returns null", () => {
    expect(deck.draw()).toBeNull();
  });
});

describe("Given I have a deck with 100 blank tiles", () => {
  const items = [
    {
      tile: Tiles.blank,
      count: 100,
    },
  ];

  beforeEach(() => {
    deck = TileDeck.fromParameters({ items });
  });

  it("Then there should be 100 blank tiles in the deck", () => {
    expect(deck).toHaveLength(100);
    deck.forEach((item) => expect(item).toEqual(Tiles.blank));
  });

  describe("When I draw a tile", () => {
    let tile: Types.Tile | null;

    beforeEach(() => {
      tile = deck.draw();
    });

    it("Then it is a blank tile", () => {
      expect(tile).toBe(Tiles.blank);
    });

    it("And there should be 99 blank tiles in the deck", () => {
      expect(deck).toHaveLength(99);
      deck.forEach((item) => expect(item).toEqual(Tiles.blank));
    });
  });

  describe("When I have drawn all the tiles", () => {
    beforeEach(() => {
      for (let i = 0; i < 100; i++) {
        deck.draw();
      }
    });

    it("Then there should be no tiles left in the deck", () => {
      expect(deck).toHaveLength(0);
    });

    it("When I draw a tile, it returns null", () => {
      expect(deck.draw()).toBeNull();
    });
  });
});

describe("Given I have a deck with 50 blank and 50 monastary tiles", () => {
  const monastary = { ...Tiles.blank, monastary: true };

  const items = [
    {
      tile: Tiles.blank,
      count: 50,
    },
    {
      tile: monastary,
      count: 50,
    },
  ];

  beforeEach(() => {
    deck = TileDeck.fromParameters({ items });
  });

  it("Then there should be 50 blank and 50 monastary tiles in the deck, in order", () => {
    expect(deck).toHaveLength(100);
    for (let i = 0; i < 50; i++) {
      expect(deck.get(i)).toEqual(Tiles.blank);
    }
    for (let i = 50; i < 100; i++) {
      expect(deck.get(i)).toEqual(monastary);
    }
  });

  describe("When I shuffle the deck", () => {
    beforeEach(() => {
      jest.spyOn(Math, "random");
      deck.shuffle();
    });

    it("Then each tile is inserted in a random position", () => {
      expect(deck).toHaveLength(100); // cant really test the randomness...
      expect(Math.random).toHaveReturnedTimes(99);
      expect(deck.filter((item) => item === Tiles.blank)).toHaveLength(50);
      expect(deck.filter((item) => item === monastary)).toHaveLength(50);
    });
  });
});
