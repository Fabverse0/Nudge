import { describe, expect, it } from "vitest";
import { activities, type Goal } from "../activities/catalog";
import { emptyFeedback, recommend, type Context } from "./recommend";

const context: Context = { goal: "reflect", minutes: 5, mood: null, place: "any", tools: "any" };
describe("recommendations", () => {
  it("covers every goal and time without silently exceeding either", () => {
    for (const goal of ["reflect", "productive", "move"] as Goal[]) for (const minutes of [2, 5, 10] as const) {
      const result = recommend({ ...context, goal, minutes, tools: "none", place: "indoor" }, emptyFeedback());
      expect(result.kind).toBe("suggestion");
      if (result.kind === "suggestion") { expect(result.suggestion.activity.goal).toBe(goal); expect(result.suggestion.activity.minutes).toBeLessThanOrEqual(minutes); expect(result.suggestion.activity.requiredTools).toEqual([]); }
    }
  });
  it("ranks by actual mood metadata and has stable ties", () => {
    const result = recommend({ ...context, mood: "Bosan" }, emptyFeedback());
    expect(result.kind === "suggestion" && result.suggestion.activity.id).toBe("journal-5");
    expect(recommend(context, emptyFeedback())).toEqual(recommend(context, emptyFeedback()));
  });
  it("excludes rejected suggestions for this session", () => {
    const first = recommend(context, emptyFeedback());
    if (first.kind !== "suggestion") throw new Error("Expected first suggestion");
    const next = recommend(context, { rejected: [first.suggestion.activity.id], likedGoals: [] });
    expect(next.kind === "suggestion" && next.suggestion.activity.id).not.toBe(first.suggestion.activity.id);
    expect(recommend(context, emptyFeedback())).toEqual(first);
  });
  it("explains a place mismatch instead of silently relaxing it", () => {
    const result = recommend({ ...context, goal: "move", minutes: 2, place: "outdoor" }, emptyFeedback(), [activities[0]]);
    expect(result.kind === "suggestion" && result.suggestion.differences.join(" ")).toContain("berbeda");
  });
  it("distinguishes missing catalog matches from exhausted choices", () => {
    expect(recommend(context, emptyFeedback(), []).kind).toBe("empty");
    expect(recommend(context, { rejected: activities.map((a) => a.id), likedGoals: [] }).kind).toBe("exhausted");
  });
});
