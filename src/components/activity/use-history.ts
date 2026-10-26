"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Activity } from "@/lib/activities/catalog";
import {
  appendCompletion,
  emptyHistory,
  HISTORY_KEY,
  readHistory,
  writeHistory,
  type HistoryState,
} from "@/lib/storage/history";

export function useHistory(notify: (message: string) => void) {
  const [state, setState] = useState<HistoryState>(emptyHistory);
  const [loaded, setLoaded] = useState(false);
  const current = useRef<HistoryState>(emptyHistory());
  const writable = useRef(true);
  useEffect(() => {
    const load = () => {
      try {
        const saved = readHistory(window.localStorage);
        current.current = saved.value;
        setState(saved.value);
        if (saved.error) notify(saved.error);
      } catch {
        writable.current = false;
        notify(
          "Riwayat hanya tersedia selama halaman terbuka karena penyimpanan lokal tidak tersedia.",
        );
      }
      setLoaded(true);
    };
    const timeout = window.setTimeout(load, 0);
    const sync = (event: StorageEvent) => {
      if (event.key === HISTORY_KEY || event.key === null) load();
    };
    window.addEventListener("storage", sync);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("storage", sync);
    };
  }, [notify]);

  const change = useCallback(
    (update: (previous: HistoryState) => HistoryState) => {
      let previous = current.current;
      try {
        if (
          writable.current &&
          window.localStorage.getItem(HISTORY_KEY) !== null
        ) {
          const saved = readHistory(window.localStorage);
          if (!saved.error) previous = saved.value;
        }
      } catch {
        writable.current = false;
      }
      const next = update(previous);
      current.current = next;
      setState(next);
      try {
        const error = writeHistory(window.localStorage, next);
        if (error) {
          writable.current = false;
          notify(error);
        }
      } catch {
        writable.current = false;
        notify(
          "Riwayat hanya tersedia selama halaman terbuka karena penyimpanan lokal tidak tersedia.",
        );
      }
    },
    [notify],
  );
  return {
    state,
    loaded,
    record: (activity: Activity, id: string, completedAt: number) =>
      change((previous) =>
        appendCompletion(previous, activity, id, completedAt),
      ),
    setEnabled: (enabled: boolean) =>
      change((previous) => ({ ...previous, enabled })),
    remove: (id: string) =>
      change((previous) => ({
        ...previous,
        entries: previous.entries.filter((entry) => entry.id !== id),
      })),
    clear: () => change((previous) => ({ ...previous, entries: [] })),
  };
}
