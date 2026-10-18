import type { StorageAdapter } from "../storage/storage";
export type Reminder = { enabled: boolean; days: number[]; time: string };
export const REMINDER_KEY = "nudge.reminder.v1";
export const defaultReminder: Reminder = {
  enabled: false,
  days: [1, 2, 3, 4, 5],
  time: "16:00",
};
export function isReminder(value: unknown): value is Reminder {
  if (!value || typeof value !== "object") return false;
  const r = value as Reminder;
  return (
    typeof r.enabled === "boolean" &&
    /^([01]\d|2[0-3]):[0-5]\d$/.test(r.time) &&
    Array.isArray(r.days) &&
    (!r.enabled || r.days.length > 0) &&
    r.days.every((d) => Number.isInteger(d) && d >= 0 && d <= 6)
  );
}
export function readReminder(storage: StorageAdapter): {
  value: Reminder;
  error: string | null;
} {
  try {
    const raw = storage.getItem(REMINDER_KEY);
    if (!raw) return { value: defaultReminder, error: null };
    const value: unknown = JSON.parse(raw);
    if (!isReminder(value)) throw new Error("invalid");
    return { value, error: null };
  } catch {
    return {
      value: defaultReminder,
      error:
        "Pengaturan pengingat belum bisa dibaca. Atur ulang jika ingin menggunakannya.",
    };
  }
}
export function reminderOccurrence(
  reminder: Reminder,
  now: Date,
): string | null {
  if (
    !reminder.enabled ||
    !isReminder(reminder) ||
    !reminder.days.includes(now.getDay())
  )
    return null;
  const localTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  if (localTime !== reminder.time) return null;
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${reminder.time}`;
}
