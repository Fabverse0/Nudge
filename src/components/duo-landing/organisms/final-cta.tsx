import { DlButton } from "@/components/duo-landing/atoms/dl-button";
import { SceneHills } from "@/components/duo-landing/illustrations/scene-hills";
import "./final-cta.css";

/** Closing call to action over the rolling hills scene. */
export function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <div className="dl-container final-cta__inner">
        <h2 id="final-cta-title" className="final-cta__title dl-reveal">
          mulai satu langkah kecil bersama nudge
        </h2>
        <div className="final-cta__action dl-reveal">
          <DlButton href="/app" variant="primary" size="lg">
            Mulai
          </DlButton>
        </div>
      </div>
      <SceneHills />
    </section>
  );
}
