import { expect, it } from "vitest";
import { activities } from "../activities/catalog";
import { emptyFeedback, recommend } from "./recommend";
import { recordRejectionReason } from "./feedback";

it("never relaxes an unavailable tool even if place or tool fallback is needed", () => {
  const journal = activities.find((a) => a.id === "journal-5")!;
  const next = recordRejectionReason(emptyFeedback(), journal, "tools");
  expect(next.unavailableTools).toEqual(["paper"]);
  expect(emptyFeedback().unavailableTools).toBeUndefined();
  const result = recommend(
    { goal: "reflect", minutes: 5, mood: null, place: "outdoor", tools: "any" },
    next,
  );
  expect(result.kind).toBe("suggestion");
  if (result.kind === "suggestion")
    expect(result.suggestion.activity.requiredTools).not.toContain("paper");
  expect(
    recommend(
      { goal: "reflect", minutes: 10, mood: null, place: "any", tools: "any" },
      next,
      [{ ...journal, id: "other-journal" }],
    ).kind,
  ).toBe("empty");
});
it("keeps reasons and rejections in session without treating them as likes", () => {
  const item = activities[0];
  const next = recordRejectionReason(emptyFeedback(), item, "seen");
  expect(next.rejected).toEqual([item.id]);
  expect(next.reasons?.[item.id]).toBe("seen");
  expect(next.liked).toEqual([]);
});
