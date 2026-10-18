import { expect, it } from "vitest";
import { updateMood } from "./session";
it("skip keeps the previous mood including no mood", () => {
  expect(updateMood("Lelah", "skip")).toBe("Lelah");
  expect(updateMood(null, "skip")).toBeNull();
  expect(updateMood("Lelah", "Bosan")).toBe("Bosan");
});
