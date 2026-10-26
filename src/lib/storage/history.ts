import { goals, type Activity, type Goal } from "../activities/catalog";
import type { StorageAdapter, StorageResult } from "./storage";

export const HISTORY_KEY = "nudge.history.v1";
export const HISTORY_LIMIT = 100;
export type HistoryEntry = {
  id: string;
  activityId: string;
  title: string;
  goal: Goal;
  minutes: 2 | 5 | 10;
  completedAt: number;
};
export type HistoryState = { enabled: boolean; entries: HistoryEntry[] };
export const emptyHistory = (): HistoryState => ({
  enabled: true,
  entries: [],
});

function parseEntry(value: unknown): HistoryEntry {
  if (!value || typeof value !== "object") throw new Error("invalid");
  const row = value as Record<string, unknown>;
  if (
    typeof row.id !== "string" ||
    !row.id ||
    typeof row.activityId !== "string" ||
    !row.activityId ||
    typeof row.title !== "string" ||
    !row.title ||
    typeof row.goal !== "string" ||
    !Object.hasOwn(goals, row.goal) ||
    (row.minutes !== 2 && row.minutes !== 5 && row.minutes !== 10) ||
    typeof row.completedAt !== "number" ||
    !Number.isFinite(row.completedAt) ||
    row.completedAt < 0 ||
    row.completedAt > 8.64e15
  )
    throw new Error("invalid");
  return {
    id: row.id,
    activityId: row.activityId,
    title: row.title,
    goal: row.goal as Goal,
    minutes: row.minutes,
    completedAt: row.completedAt,
  };
}
function latest(entries: HistoryEntry[]) {
  return [...new Map(entries.map((entry) => [entry.id, entry])).values()]
    .sort((a, b) => b.completedAt - a.completedAt)
    .slice(0, HISTORY_LIMIT);
}
export function readHistory(
  storage: StorageAdapter,
): StorageResult<HistoryState> {
  try {
    const raw = storage.getItem(HISTORY_KEY);
    if (raw === null) return { value: emptyHistory(), error: null };
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object") throw new Error("invalid");
    const data = value as Record<string, unknown>;
    if (typeof data.enabled !== "boolean" || !Array.isArray(data.entries))
      throw new Error("invalid");
    return {
      value: {
        enabled: data.enabled,
        entries: latest(data.entries.map(parseEntry)),
      },
      error: null,
    };
  } catch {
    return {
      value: emptyHistory(),
      error: "Riwayat belum bisa dibaca. Kamu tetap bisa menggunakan Nudge.",
    };
  }
}
export function appendCompletion(
  state: HistoryState,
  activity: Activity,
  id: string,
  completedAt: number,
): HistoryState {
  if (!state.enabled || state.entries.some((entry) => entry.id === id))
    return state;
  const entry: HistoryEntry = {
    id,
    activityId: activity.id,
    title: activity.title,
    goal: activity.goal,
    minutes: activity.minutes,
    completedAt,
  };
  return { ...state, entries: latest([entry, ...state.entries]) };
}
export function writeHistory(
  storage: StorageAdapter,
  state: HistoryState,
): string | null {
  try {
    storage.setItem(HISTORY_KEY, JSON.stringify(state));
    return null;
  } catch {
    return "Riwayat belum tersimpan di perangkat ini. Perubahan hanya tersedia selama halaman terbuka.";
  }
}
