import { describe, expect, it } from "vitest";
import { activities } from "./catalog";
import { collections } from "./collections";
import { emptyFeedback, recommend } from "../recommendation/recommend";

describe("themed collections", () => {
  it("contains two real activities per duration and preserves its goal", () => {
    for (const collection of collections) {
      expect(new Set(collection.activityIds).size).toBe(6);
      const items = collection.activityIds.map((id) =>
        activities.find((a) => a.id === id)!,
      );
      expect(items.every((a) => a?.goal === collection.goal)).toBe(true);
      for (const minutes of [2, 5, 10])
        expect(items.filter((a) => a.minutes === minutes)).toHaveLength(2);
    }
  });
  it("keeps every alternative inside its collection until exhausted", () => {
    for (const collection of collections) {
      const feedback = emptyFeedback();
      for (let i = 0; i < collection.activityIds.length; i += 1) {
        const result = recommend(
          {
            goal: collection.goal,
            minutes: 10,
            mood: null,
            place: "any",
            tools: "any",
            collectionId: collection.id,
          },
          feedback,
        );
        expect(result.kind).toBe("suggestion");
        if (result.kind === "suggestion") {
          expect(collection.activityIds).toContain(
            result.suggestion.activity.id,
          );
          feedback.rejected.push(result.suggestion.activity.id);
        }
      }
      expect(
        recommend(
          {
            goal: collection.goal,
            minutes: 10,
            mood: null,
            place: "any",
            tools: "any",
            collectionId: collection.id,
          },
          feedback,
        ).kind,
      ).toBe("exhausted");
    }
  });
});
