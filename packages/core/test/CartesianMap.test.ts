import { CartesianMap } from "../src/CartesianMap";

interface Thing {
  name: string;
}

let map: CartesianMap<Thing>;

describe("Given I have no items set", () => {
  beforeEach(() => {
    map = new CartesianMap<Thing>();
  });

  it("Then the all property is an empty list", () => {
    expect(map.all).toEqual([]);
  });

  describe("Given I set an item at a location", () => {
    const item = {
      name: "theMoon",
    };
    const location = {
      x: 0,
      y: 0,
    };
    beforeEach(() => {
      map.set(location, item);
    });

    it("When I get the location, the item is returned", () => {
      expect(map.get(location)).toEqual(item);
    });

    it("When I get any other location, null is returned", () => {
      expect(map.get({ x: 1, y: 0 })).toBeNull();
    });

    describe("Given I set another item at the same location", () => {
      const otherItem = {
        name: "theOtherMoon",
      };
      beforeEach(() => {
        map.set(location, otherItem);
      });

      it("When I get the location, the new item is returned", () => {
        expect(map.get(location)).toEqual(otherItem);
      });
    });
  });
});

describe("Given I have several items set", () => {
  const items = [{ name: "tom" }, { name: "dick" }, { name: "harry" }];
  const expected = [
    [{ x: 0, y: 0 }, { name: "tom" }],
    [{ x: 0, y: 1 }, { name: "dick" }],
    [{ x: 0, y: 2 }, { name: "harry" }],
  ];
  beforeEach(() => {
    map = new CartesianMap<Thing>();
    items.forEach((item, y) => {
      map.set({ x: 0, y }, item);
    });
  });

  it("Then the all property lists each populated location and its contents", () => {
    expect(map.all).toEqual(expected);
  });

  describe("When I pass a function to map", () => {
    let result: string[];

    const passedFunction = jest.fn((_, item): string => {
      return item.name;
    });

    beforeEach(() => {
      result = map.map<string>(passedFunction);
    });

    it("Then it is executed once for each populated location and its contents", () => {
      expect(passedFunction).toHaveReturnedTimes(3);
      expected.forEach(([location, item]) => {
        expect(passedFunction).toHaveBeenCalledWith(location, item);
      });
    });
    it("And a list of each executions result is returned", () => {
      expect(result).toEqual(["tom", "dick", "harry"]);
    });
  });
});
