import { activities } from "../activities/catalog";
export type StorageAdapter = Pick<Storage, "getItem" | "setItem">;
export const FAVORITES_KEY = "nudge.favorites.v1";
export type StorageResult<T> = { value: T; error: string | null };
export function readFavorites(
  storage: StorageAdapter,
): StorageResult<string[]> {
  try {
    const raw = storage.getItem(FAVORITES_KEY);
    if (raw === null) return { value: [], error: null };
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data) || !data.every((v) => typeof v === "string"))
      throw new Error("invalid");
    return {
      value: [...new Set(data)].filter((id) =>
        activities.some((a) => a.id === id),
      ),
      error: null,
    };
  } catch {
    return {
      value: [],
      error: "Favorit belum bisa dibaca. Kamu tetap bisa memilih kegiatan.",
    };
  }
}
export function writeFavorites(
  storage: StorageAdapter,
  ids: string[],
): string | null {
  try {
    storage.setItem(FAVORITES_KEY, JSON.stringify([...new Set(ids)]));
    return null;
  } catch {
    return "Favorit belum tersimpan di perangkat ini. Pilihanmu tetap tersedia selama halaman terbuka.";
  }
}
