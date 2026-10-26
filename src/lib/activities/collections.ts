import type { Goal } from "./catalog";

export type Collection = {
  id: string;
  title: string;
  description: string;
  goal: Goal;
  activityIds: string[];
};
export const collections: Collection[] = [
  {
    id: "after-class",
    title: "Jeda setelah kuliah",
    description: "Lepas layar sebentar. Beri pikiran ruang untuk beralih.",
    goal: "reflect",
    activityIds: [
      "screen-break-2",
      "listen-nearby-2",
      "notice-5",
      "journal-5",
      "quiet-10",
      "journal-10",
    ],
  },
  {
    id: "before-bed",
    title: "Beres kecil sebelum tidur",
    description: "Rapikan sedikit hari ini, siapkan yang perlu untuk nanti.",
    goal: "productive",
    activityIds: [
      "fold-one-2",
      "five-things-2",
      "pocket-sort-5",
      "desk-5",
      "outfit-10",
      "prepare-10",
    ],
  },
  {
    id: "leave-chair",
    title: "Bangkit dari kursi",
    description: "Beri badan giliran dengan gerak yang nyaman.",
    goal: "move",
    activityIds: [
      "stretch-2",
      "hands-2",
      "walk-5",
      "step-pattern-5",
      "walk-10",
      "movement-sequence-10",
    ],
  },
];
export function findCollection(id: string | null | undefined) {
  return collections.find((collection) => collection.id === id) ?? null;
}
