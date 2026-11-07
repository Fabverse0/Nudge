import { DlButton } from "@/components/duo-landing/atoms/dl-button";
import { HeroCluster } from "@/components/duo-landing/illustrations/hero-cluster";
import "./hero.css";

/** Splash hero: floating turtle-and-friends collage beside the main pitch. */
export function Hero() {
  return (
    <section className="dlh" aria-labelledby="dlh-title">
      <div className="dlh-inner">
        <div className="dlh-art">
          <HeroCluster />
        </div>
        <div className="dlh-copy">
          <h1 id="dlh-title" className="dlh-title">
            Cara paling seru buat berhenti scroll dan mulai bergerak!
          </h1>
          <div className="dlh-actions">
            <DlButton href="/app" variant="primary" size="lg">
              Mulai
            </DlButton>
            <DlButton href="/app" variant="secondary" size="lg">
              Saya sudah punya favorit
            </DlButton>
          </div>
        </div>
      </div>
    </section>
  );
}
