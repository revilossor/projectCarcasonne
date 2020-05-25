import { TileDeck, Tiles } from "../src";

let deck: TileDeck;

describe("Given I have 100 blank tiles", () => {
  const items = [
    {
      tile: Tiles.blank,
      count: 100,
    },
  ];

  beforeEach(() => {
    deck = new TileDeck({ items });
  });

  it("Then there should be 100 blank tiles in the deck", () => {
    expect(deck).toHaveLength(100);
    deck.forEach((item) => expect(item).toEqual(Tiles.blank));
  });
});

describe("Given I have 50 blank and 50 monastary tiles", () => {
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
    deck = new TileDeck({ items });
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

// TODO draw, export items somehow, export list of drawn things
// TODO get places i can put a meeple on a tile...
