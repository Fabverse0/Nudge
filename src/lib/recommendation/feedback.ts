import type { Activity } from "../activities/catalog";
import type { Feedback } from "./recommend";

export type RejectionReason = "tools" | "effort" | "seen";
export function recordRejectionReason(
  feedback: Feedback,
  activity: Activity,
  reason: RejectionReason,
): Feedback {
  return {
    ...feedback,
    rejected: [...new Set([...feedback.rejected, activity.id])],
    reasons: { ...feedback.reasons, [activity.id]: reason },
    unavailableTools:
      reason === "tools"
        ? [
            ...new Set([
              ...(feedback.unavailableTools ?? []),
              ...activity.requiredTools,
            ]),
          ]
        : feedback.unavailableTools,
  };
}
