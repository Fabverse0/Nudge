"use client";
import { XIcon } from "@phosphor-icons/react";
import type { Activity } from "@/lib/activities/catalog";
import type { RejectionReason } from "@/lib/recommendation/feedback";

export function RejectionReasons({
  activity,
  onReason,
  onDismiss,
}: {
  activity: Activity;
  onReason: (reason: RejectionReason) => void;
  onDismiss: () => void;
}) {
  return (
    <section className="rejection-reasons" aria-labelledby="rejection-title">
      <div className="rejection-heading">
        <h2 id="rejection-title">Tentang {activity.title}</h2>
        <button
          className="icon-button"
          aria-label="Tutup alasan"
          onClick={onDismiss}
        >
          <XIcon size={20} aria-hidden="true" />
        </button>
      </div>
      <p>
        Apa yang kurang pas? Boleh dilewati. Jawabanmu hanya dipakai dalam sesi
        ini.
      </p>
      <div className="reason-options">
        {activity.requiredTools.length > 0 && (
          <button
            className="button secondary"
            onClick={() => onReason("tools")}
          >
            Tidak punya alatnya
          </button>
        )}
        <button className="button secondary" onClick={() => onReason("effort")}>
          Terlalu berat
        </button>
        <button className="button secondary" onClick={() => onReason("seen")}>
          Sudah pernah
        </button>
      </div>
    </section>
  );
}
