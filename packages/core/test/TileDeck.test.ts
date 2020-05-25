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
      expect(deck[i]).toEqual(Tiles.blank);
    }
    for (let i = 50; i < 100; i++) {
      expect(deck[i]).toEqual(monastary);
    }
  });
});
