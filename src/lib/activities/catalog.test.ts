import { describe, expect, it } from "vitest";
import { activities, goals, type Goal } from "./catalog";

describe("activity catalog", () => {
  it("uses unique identities and distinct titles", () => {
    expect(new Set(activities.map((activity) => activity.id)).size).toBe(
      activities.length,
    );
    expect(
      new Set(activities.map((activity) => activity.title.trim().toLowerCase()))
        .size,
    ).toBe(activities.length);
  });

  it("preserves the identities already used by saved favorites", () => {
    expect(activities.map((activity) => activity.id)).toEqual(
      expect.arrayContaining([
        "stretch-2",
        "walk-5",
        "walk-10",
        "five-things-2",
        "desk-5",
        "prepare-10",
        "water-note-2",
        "journal-5",
        "journal-10",
        "screen-break-2",
        "notice-5",
        "quiet-10",
        "hands-2",
        "one-task-2",
      ]),
    );
  });

  it("provides several alternatives for every exact goal and duration, including no-tool indoor choices", () => {
    for (const goal of Object.keys(goals) as Goal[]) {
      for (const minutes of [2, 5, 10]) {
        const choices = activities.filter(
          (activity) => activity.goal === goal && activity.minutes === minutes,
        );
        expect(choices.length, `${goal}/${minutes}`).toBeGreaterThanOrEqual(4);
        expect(
          choices.filter(
            (activity) =>
              activity.places.includes("indoor") &&
              activity.requiredTools.length === 0,
          ).length,
          `${goal}/${minutes} indoor without tools`,
        ).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("keeps required and optional tools separate and supplies actionable instructions", () => {
    for (const activity of activities) {
      expect(
        activity.requiredTools.some((tool) =>
          activity.optionalTools.includes(tool),
        ),
        activity.id,
      ).toBe(false);
      expect(activity.places.length, activity.id).toBeGreaterThan(0);
      expect(activity.steps.length, activity.id).toBeGreaterThanOrEqual(2);
      expect(
        activity.steps.every((step) => step.trim().length > 0),
        activity.id,
      ).toBe(true);
    }
  });
});
