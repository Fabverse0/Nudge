import { DlButton } from "@/components/duo-landing/atoms/dl-button";
import { SceneChallenge } from "@/components/duo-landing/illustrations/scene-challenge";
import "./challenge-band.css";

/** White split band: the instant 2-minute pick behind "Pilihkan saja". */
export function ChallengeBand() {
  return (
    <section
      id="tantangan"
      className="challenge-band"
      aria-labelledby="challenge-title"
    >
      <div className="dl-container challenge-band__inner">
        <div className="challenge-band__art dl-reveal">
          <SceneChallenge />
        </div>
        <div className="challenge-band__copy dl-reveal">
          <h2 id="challenge-title" className="dl-title">
            tantangan 2 menit
          </h2>
          <p className="dl-lead">
            Lagi malas memilih? Ketuk <strong>Pilihkan saja</strong> dan Nudge
            langsung memberi satu kegiatan 2 menit yang bisa dilakukan di dalam
            ruangan, tanpa alat apa pun. Tidak perlu berpikir, cukup mulai.
          </p>
          <ul className="challenge-band__facts">
            <li>
              <span className="challenge-band__fact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <circle cx="12" cy="13" r="8" fill="#45b29d" />
                  <path
                    d="M12 9v4l3 2M9 3h6"
                    stroke="#ffffff"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
              2 menit saja
            </li>
            <li>
              <span className="challenge-band__fact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M4 11 12 4l8 7v9H4Z" fill="#7eaddb" />
                  <rect
                    x="10"
                    y="14"
                    width="4"
                    height="6"
                    rx="1"
                    fill="#ffffff"
                  />
                </svg>
              </span>
              Di dalam ruangan
            </li>
            <li>
              <span className="challenge-band__fact-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path
                    d="M7 12h10M12 7v10"
                    stroke="#ff8a65"
                    strokeWidth="3"
                    strokeLinecap="round"
                    transform="rotate(45 12 12)"
                  />
                </svg>
              </span>
              Tanpa alat
            </li>
          </ul>
          <DlButton href="/app" variant="secondary" size="lg">
            Pilihkan saja
          </DlButton>
        </div>
      </div>
    </section>
  );
}
