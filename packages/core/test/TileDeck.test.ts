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

  it("Then there should be 100 tiles in the deck", () => {
    expect(deck).toHaveLength(100);
  });
});

describe("Given I have 50 blank and 50 other tiles", () => {
  const items = [
    {
      tile: Tiles.blank,
      count: 50,
    },
    {
      tile: { ...Tiles.blank, monastary: true },
      count: 50,
    },
  ];

  beforeEach(() => {
    deck = new TileDeck({ items });
  });

  it("Then there should be 100 tiles in the deck", () => {
    expect(deck).toHaveLength(100);
  });
});
