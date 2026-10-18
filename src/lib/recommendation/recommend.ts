import {
  activities,
  type Activity,
  type Goal,
  type Mood,
  type Place,
} from "../activities/catalog";

export type Context = {
  goal: Goal;
  minutes: 2 | 5 | 10;
  mood: Mood | null;
  place: Place | "any";
  tools: "any" | "none";
};
export type Feedback = { rejected: string[]; liked: string[] };
export type Suggestion = {
  activity: Activity;
  reasons: string[];
  differences: string[];
};
export type Recommendation =
  | { kind: "suggestion"; suggestion: Suggestion }
  | { kind: "empty" | "exhausted" };
export const emptyFeedback = (): Feedback => ({ rejected: [], liked: [] });

export function recommend(
  context: Context,
  feedback: Feedback,
  catalog = activities,
): Recommendation {
  const eligible = catalog.filter(
    (a) => a.goal === context.goal && a.minutes <= context.minutes,
  );
  if (!eligible.length) return { kind: "empty" };
  const remaining = eligible.filter((a) => !feedback.rejected.includes(a.id));
  if (!remaining.length) return { kind: "exhausted" };
  const matches = (a: Activity) =>
    (context.place === "any" || a.places.includes(context.place)) &&
    (context.tools !== "none" || !a.requiredTools.length);
  const exact = remaining.filter(matches);
  const pool = exact.length
    ? exact
    : remaining.filter(
        (a) => a.places.includes("indoor") || !a.requiredTools.length,
      );
  if (!pool.length) return { kind: "empty" };
  const score = (a: Activity) =>
    (context.mood && a.moods.includes(context.mood) ? 2 : 0) +
    (feedback.liked.includes(a.id) ? 1 : 0);
  const activity = [...pool].sort((a, b) => score(b) - score(a))[0];
  const differences: string[] = [];
  if (context.place !== "any" && !activity.places.includes(context.place))
    differences.push(
      "Alternatif ini dilakukan dalam ruangan, berbeda dari pilihan tempatmu.",
    );
  if (context.tools === "none" && activity.requiredTools.length)
    differences.push(
      "Alternatif ini membutuhkan alat yang tercantum di bawah, berbeda dari pilihan tanpa alatmu.",
    );
  const reasons = [
    `Sesuai tujuanmu dan cukup dalam waktu ${context.minutes} menit.`,
  ];
  if (context.mood && activity.moods.includes(context.mood))
    reasons.push(
      `Dipilih sebagai kegiatan yang bisa dicoba saat merasa ${context.mood.toLowerCase()}. Mood bukan penilaian kesehatan.`,
    );
  if (feedback.liked.includes(activity.id))
    reasons.push("Kegiatan ini kamu tandai cocok dalam sesi ini.");
  return { kind: "suggestion", suggestion: { activity, reasons, differences } };
}
