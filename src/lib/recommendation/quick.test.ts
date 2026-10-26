import { describe, expect, it } from "vitest";
import { activities } from "../activities/catalog";
import { pickQuickActivity } from "./quick";

describe("quick suggestions", () => {
  it("uses only light indoor two-minute activities without required tools", () => {
    const seen: string[] = [];
    for (let index = 0; index < activities.length; index += 1) {
      const item = pickQuickActivity(seen, [], () => 0)!;
      expect(item.minutes).toBe(2);
      expect(item.energy).toBe("light");
      expect(item.requiredTools).toEqual([]);
      expect(item.places).toContain("indoor");
      if (!seen.includes(item.id)) seen.push(item.id);
    }
    expect(seen.length).toBeGreaterThan(3);
  });
  it("avoids seen items until all candidates have been shown and never revives rejected ones", () => {
    const first = pickQuickActivity([], [], () => 0)!;
    const second = pickQuickActivity([first.id], [], () => 0)!;
    expect(second.id).not.toBe(first.id);
    expect(pickQuickActivity([], [first.id], () => 0)!.id).not.toBe(first.id);
    expect(
      pickQuickActivity(
        [],
        activities.map((a) => a.id),
      ),
    ).toBeNull();
  });
});
