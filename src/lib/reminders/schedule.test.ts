import { expect, it } from "vitest";
import {
  defaultReminder,
  isReminder,
  readReminder,
  reminderOccurrence,
} from "./schedule";
it("only fires during the chosen local minute and day", () => {
  const monday = new Date(2026, 9, 19, 16, 0);
  const reminder = { ...defaultReminder, enabled: true };
  expect(reminderOccurrence(reminder, monday)).toBe("2026-10-19-16:00");
  expect(reminderOccurrence(reminder, new Date(2026, 9, 19, 16, 1))).toBeNull();
  expect(
    reminderOccurrence({ ...reminder, enabled: false }, monday),
  ).toBeNull();
  expect(reminderOccurrence({ ...reminder, days: [2] }, monday)).toBeNull();
  expect(reminderOccurrence({ ...reminder, time: "17:00" }, monday)).toBeNull();
});
it("rejects broken schedules and falls back safely", () => {
  expect(isReminder({ ...defaultReminder, time: "25:99" })).toBe(false);
  expect(isReminder({ ...defaultReminder, enabled: true, days: [] })).toBe(false);
  expect(isReminder({ ...defaultReminder, enabled: false, days: [] })).toBe(true);
  expect(
    readReminder({ getItem: () => "{}", setItem: () => {} }).value.enabled,
  ).toBe(false);
});
