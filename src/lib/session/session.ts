import type { Mood } from "../activities/catalog";
export function updateMood(previous: Mood | null, next: Mood | "skip"): Mood | null { return next === "skip" ? previous : next; }
