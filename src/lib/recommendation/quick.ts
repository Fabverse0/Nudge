import { activities, type Activity } from "../activities/catalog";

export function pickQuickActivity(
  seen: string[],
  rejected: string[],
  random: () => number = Math.random,
  catalog: Activity[] = activities,
): Activity | null {
  const eligible = catalog.filter(
    (activity) =>
      activity.minutes === 2 &&
      activity.energy === "light" &&
      activity.places.includes("indoor") &&
      activity.requiredTools.length === 0 &&
      !rejected.includes(activity.id),
  );
  const unseen = eligible.filter((activity) => !seen.includes(activity.id));
  const pool = unseen.length ? unseen : eligible;
  if (!pool.length) return null;
  return pool[
    Math.min(pool.length - 1, Math.max(0, Math.floor(random() * pool.length)))
  ];
}
