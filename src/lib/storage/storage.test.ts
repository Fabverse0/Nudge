import { expect, it } from "vitest";
import { readFavorites, writeFavorites } from "./storage";
it("deduplicates favorites and drops retired IDs", () => {
  const storage = {
    getItem: () => '["stretch-2","stretch-2","retired"]',
    setItem: () => {},
  };
  expect(readFavorites(storage)).toEqual({ value: ["stretch-2"], error: null });
});
it("survives corrupt and blocked storage", () => {
  expect(
    readFavorites({ getItem: () => "{bad", setItem: () => {} }).error,
  ).not.toBeNull();
  const blocked = {
    getItem: () => {
      throw new Error("blocked");
    },
    setItem: () => {
      throw new Error("blocked");
    },
  };
  expect(readFavorites(blocked).value).toEqual([]);
  expect(writeFavorites(blocked, ["stretch-2"])).not.toBeNull();
});
