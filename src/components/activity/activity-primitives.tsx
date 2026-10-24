import {
  ClipboardTextIcon,
  FootprintsIcon,
  LeafIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { TurtleMascot } from "@/components/ui/turtle-mascot";
import {
  placeLabels,
  toolLabels,
  type Activity,
  type Goal,
} from "@/lib/activities/catalog";

export function GoalIcon({ goal, size = 24 }: { goal: Goal; size?: number }) {
  const Icon =
    goal === "move"
      ? FootprintsIcon
      : goal === "reflect"
        ? LeafIcon
        : ClipboardTextIcon;
  return <Icon size={size} aria-hidden="true" />;
}

export function ActivityArtwork({ goal }: { goal: Goal }) {
  return goal === "move" ? (
    <Image
      src="/brand/small-steps/stretch.webp"
      width={64}
      height={64}
      sizes="64px"
      alt=""
      className="turtle-mascot"
    />
  ) : (
    <TurtleMascot
      pose={goal === "reflect" ? "journal" : "tidy"}
      size={64}
      eager
    />
  );
}

export function ActivityDetails({ activity }: { activity: Activity }) {
  return (
    <>
      <div className="conditions">
        <span>
          {activity.places.map((place) => placeLabels[place]).join(" / ")}
        </span>
        <span>
          {activity.requiredTools.length
            ? `Perlu: ${activity.requiredTools.map((tool) => toolLabels[tool]).join(", ")}`
            : "Tanpa alat"}
        </span>
      </div>
      <ol className="activity-steps">
        {activity.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      {activity.id.startsWith("journal") && (
        <p className="info-note small">
          Tulisanmu tetap di media pilihanmu. Nudge tidak mengumpulkan atau
          menyimpan isi jurnal.
        </p>
      )}
    </>
  );
}
