import { describe, expect, it } from "vitest";
import { activities, type Goal } from "../activities/catalog";
import { emptyFeedback, recommend, type Context } from "./recommend";

const context: Context = {
  goal: "reflect",
  minutes: 5,
  mood: null,
  place: "any",
  tools: "any",
};
describe("recommendations", () => {
  it("covers every goal and time without silently exceeding either", () => {
    for (const goal of ["reflect", "productive", "move"] as Goal[])
      for (const minutes of [2, 5, 10] as const) {
        const result = recommend(
          { ...context, goal, minutes, tools: "none", place: "indoor" },
          emptyFeedback(),
        );
        expect(result.kind).toBe("suggestion");
        if (result.kind === "suggestion") {
          expect(result.suggestion.activity.goal).toBe(goal);
          expect(result.suggestion.activity.minutes).toBeLessThanOrEqual(
            minutes,
          );
          expect(result.suggestion.activity.requiredTools).toEqual([]);
        }
      }
  });
  it("ranks by actual mood metadata and has stable ties", () => {
    const result = recommend({ ...context, mood: "Bosan" }, emptyFeedback());
    expect(result.kind === "suggestion" && result.suggestion.activity.id).toBe(
      "journal-5",
    );
    expect(recommend(context, emptyFeedback())).toEqual(
      recommend(context, emptyFeedback()),
    );
  });
  it("excludes rejected suggestions for this session", () => {
    const first = recommend(context, emptyFeedback());
    if (first.kind !== "suggestion")
      throw new Error("Expected first suggestion");
    const next = recommend(context, {
      rejected: [first.suggestion.activity.id],
      liked: [],
    });
    expect(next.kind === "suggestion" && next.suggestion.activity.id).not.toBe(
      first.suggestion.activity.id,
    );
    expect(recommend(context, emptyFeedback())).toEqual(first);
  });
  it("explains a place mismatch instead of silently relaxing it", () => {
    const result = recommend(
      { ...context, goal: "move", minutes: 2, place: "outdoor" },
      emptyFeedback(),
      [activities[0]],
    );
    expect(
      result.kind === "suggestion" && result.suggestion.differences.join(" "),
    ).toContain("berbeda");
  });
  it("distinguishes missing catalog matches from exhausted choices", () => {
    expect(recommend(context, emptyFeedback(), []).kind).toBe("empty");
    expect(
      recommend(context, { rejected: activities.map((a) => a.id), liked: [] })
        .kind,
    ).toBe("exhausted");
  });
  it("a liked activity changes ranking within the same goal", () => {
    const result = recommend(context, { rejected: [], liked: ["notice-5"] });
    expect(result.kind === "suggestion" && result.suggestion.activity.id).toBe(
      "notice-5",
    );
  });
  it("can offer every matching indoor no-tool alternative without repeating a rejected activity", () => {
    for (const goal of ["productive", "move", "reflect"] as Goal[]) {
      for (const minutes of [2, 5, 10] as const) {
        const pool = activities.filter(
          (activity) =>
            activity.goal === goal &&
            activity.minutes <= minutes &&
            activity.places.includes("indoor") &&
            activity.requiredTools.length === 0,
        );
        const feedback = emptyFeedback();
        for (let index = 0; index < pool.length; index += 1) {
          const result = recommend(
            {
              ...context,
              goal,
              minutes,
              place: "indoor",
              tools: "none",
              mood: "Bosan",
            },
            feedback,
            pool,
          );
          if (result.kind !== "suggestion")
            throw new Error(`Missing alternative ${goal}/${minutes}/${index}`);
          expect(feedback.rejected).not.toContain(
            result.suggestion.activity.id,
          );
          feedback.rejected.push(result.suggestion.activity.id);
        }
        expect(new Set(feedback.rejected).size).toBe(pool.length);
        expect(
          recommend({ ...context, goal, minutes }, feedback, pool).kind,
        ).toBe("exhausted");
      }
    }
  });
  it("prefers the selected duration when an exact-duration activity is available", () => {
    for (const goal of ["reflect", "productive", "move"] as Goal[]) {
      for (const minutes of [2, 5, 10] as const) {
        const result = recommend(
          { ...context, goal, minutes, tools: "none", place: "indoor" },
          emptyFeedback(),
        );
        expect(result.kind).toBe("suggestion");
        if (result.kind === "suggestion")
          expect(result.suggestion.activity.minutes).toBe(minutes);
      }
    }
  });
  it("falls back to a shorter activity after exact-duration choices are rejected", () => {
    const exactChoices = activities
      .filter(
        (activity) =>
          activity.goal === "move" &&
          activity.minutes === 10 &&
          activity.places.includes("indoor") &&
          activity.requiredTools.length === 0,
      )
      .map((activity) => activity.id);
    const result = recommend(
      { ...context, goal: "move", minutes: 10, tools: "none", place: "indoor" },
      { rejected: exactChoices, liked: [] },
    );
    expect(result.kind).toBe("suggestion");
    if (result.kind === "suggestion")
      expect(result.suggestion.activity.minutes).toBeLessThan(10);
  });
});
