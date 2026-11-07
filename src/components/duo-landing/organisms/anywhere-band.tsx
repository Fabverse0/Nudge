import Link from "next/link";
import { SceneAnywhere } from "@/components/duo-landing/illustrations/scene-anywhere";
import { InstallBadge } from "./install-badge";
import "./anywhere-band.css";

/** Light sky band: "use it anywhere" with two store-style badges. */
export function AnywhereBand() {
  return (
    <section
      id="di-mana-saja"
      className="anywhere-band"
      aria-labelledby="anywhere-title"
    >
      <div className="dl-container anywhere-band__inner">
        <h2 id="anywhere-title" className="anywhere-band__title dl-reveal">
          mulai kapan pun, di mana pun
        </h2>
        <div className="anywhere-band__badges dl-reveal">
          <InstallBadge />
          <Link href="/app" className="anywhere-badge">
            <BrowserIcon />
            <span className="anywhere-badge__text">
              <span className="anywhere-badge__small">Buka di</span>
              <span className="anywhere-badge__big">Browser mana saja</span>
            </span>
          </Link>
        </div>
      </div>
      <div className="anywhere-band__scene dl-reveal">
        <SceneAnywhere />
      </div>
    </section>
  );
}

function BrowserIcon() {
  return (
    <svg
      className="anywhere-badge__icon"
      viewBox="0 0 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="20" cy="20" r="17" fill="#7eaddb" />
      <path
        d="M3 20h34M20 3c-6 5-6 29 0 34M20 3c6 5 6 29 0 34"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="31" cy="31" r="7" fill="#45b29d" />
      <path
        d="m28 31 2.2 2.2L34 29"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
