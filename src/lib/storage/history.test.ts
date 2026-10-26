import { describe, expect, it } from "vitest";
import { activities } from "../activities/catalog";
import {
  appendCompletion,
  emptyHistory,
  HISTORY_KEY,
  readHistory,
  writeHistory,
} from "./history";

function storage() {
  const data = new Map<string, string>();
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
  };
}
describe("local completion history", () => {
  it("starts enabled and saves only public activity metadata and completion time", () => {
    const adapter = storage();
    const state = appendCompletion(
      emptyHistory(),
      activities[0],
      "run-1",
      1000,
    );
    expect(writeHistory(adapter, state)).toBeNull();
    expect(readHistory(adapter).value).toEqual(state);
    expect(Object.keys(state.entries[0]).sort()).toEqual(
      ["id", "activityId", "title", "goal", "minutes", "completedAt"].sort(),
    );
    expect(readHistory(storage()).value.enabled).toBe(true);
  });
  it("records once per run, retains repeated activities from different runs, and caps at 100 newest", () => {
    let state = emptyHistory();
    for (let i = 0; i < 105; i += 1)
      state = appendCompletion(state, activities[0], `run-${i}`, i);
    state = appendCompletion(state, activities[0], "run-104", 999);
    expect(state.entries).toHaveLength(100);
    expect(state.entries[0].id).toBe("run-104");
    expect(state.entries.at(-1)!.id).toBe("run-5");
  });
  it("disabling future recording preserves prior entries after reload", () => {
    const adapter = storage();
    const original = appendCompletion(emptyHistory(), activities[0], "one", 1);
    const disabled = { ...original, enabled: false };
    expect(appendCompletion(disabled, activities[1], "two", 2)).toBe(disabled);
    writeHistory(adapter, disabled);
    expect(readHistory(adapter).value).toEqual(disabled);
  });
  it("preserves snapshots for removed catalog items", () => {
    const adapter = storage();
    const state = appendCompletion(
      emptyHistory(),
      { ...activities[0], id: "removed" },
      "one",
      1,
    );
    writeHistory(adapter, state);
    expect(readHistory(adapter).value.entries[0].activityId).toBe("removed");
  });
  it("rejects damaged data and tolerates denied reads or writes", () => {
    const adapter = storage();
    for (const raw of [
      "{",
      "null",
      '{"enabled":true,"entries":[{}]}',
      '{"enabled":true,"entries":[]}garbage',
    ]) {
      adapter.setItem(HISTORY_KEY, raw);
      expect(readHistory(adapter).error).not.toBeNull();
      expect(readHistory(adapter).value.entries).toEqual([]);
    }
    const denied = {
      getItem: () => {
        throw new Error("denied");
      },
      setItem: () => {
        throw new Error("denied");
      },
    };
    expect(readHistory(denied).error).not.toBeNull();
    expect(writeHistory(denied, emptyHistory())).not.toBeNull();
  });
});
