import type { CSSProperties } from "react";
import { DlButton } from "@/components/duo-landing/atoms/dl-button";
import { SceneNight } from "@/components/duo-landing/illustrations/scene-night";
import "./collections-band.css";

/* Deterministic star field so server and client markup always match. */
const stars = Array.from({ length: 34 }, (_, i) => {
  const x = (i * 37 + 11) % 100;
  const y = (i * 53 + 7) % 100;
  const size = 2 + (i % 3);
  return {
    key: i,
    style: {
      left: `${x}%`,
      top: `${y}%`,
      width: `${size}px`,
      height: `${size}px`,
      animationDelay: `${-((i * 0.37) % 3).toFixed(2)}s`,
      animationDuration: `${2.4 + (i % 4) * 0.6}s`,
    } satisfies CSSProperties,
  };
});

const collections = [
  { name: "Pagi ringan", note: "Bangun badan pelan-pelan", tone: "sun" },
  { name: "Jeda kerja", note: "Lepas mata dari layar", tone: "green" },
  { name: "Malam tenang", note: "Tutup hari dengan tenang", tone: "purple" },
] as const;

/** Dark night band introducing the three themed collections. */
export function CollectionsBand() {
  return (
    <section
      id="koleksi"
      className="collections-band"
      aria-labelledby="collections-title"
      data-dl-scene
    >
      <div className="collections-band__sky" aria-hidden="true">
        {stars.map((s) => (
          <span key={s.key} className="collections-band__dot" style={s.style} />
        ))}
      </div>

      <div className="dl-container collections-band__inner">
        <div className="collections-band__copy dl-reveal">
          <span className="collections-band__pill">
            <span className="collections-band__pill-text">Nudge Koleksi</span>
          </span>
          <h2 id="collections-title" className="collections-band__title">
            tiga koleksi, satu langkah kecil
          </h2>
          <p className="collections-band__lead">
            Bingung mulai dari mana? Pilih suasana yang paling pas dengan
            harimu. Tiap koleksi punya pilihan 2, 5, dan 10 menit, jadi kamu
            tinggal ambil satu yang terasa ringan sekarang.
          </p>
          <ul className="collections-band__list">
            {collections.map((c) => (
              <li
                key={c.name}
                className={`collections-band__item collections-band__item--${c.tone}`}
              >
                <span className="collections-band__icon" aria-hidden="true">
                  <CollectionIcon tone={c.tone} />
                </span>
                <span className="collections-band__item-text">
                  <strong>{c.name}</strong>
                  <span>{c.note}</span>
                </span>
                <span className="collections-band__mins">2 · 5 · 10 mnt</span>
              </li>
            ))}
          </ul>
          <DlButton href="/app" variant="white" size="lg">
            Lihat koleksi
          </DlButton>
        </div>
        <div className="collections-band__art dl-reveal">
          <SceneNight />
        </div>
      </div>
    </section>
  );
}

function CollectionIcon({ tone }: { tone: "sun" | "green" | "purple" }) {
  if (tone === "sun") {
    return (
      <svg viewBox="0 0 32 32" focusable="false">
        <circle cx="16" cy="18" r="7" fill="#ffc94a" />
        <path
          d="M16 4v4M6 10l3 3M26 10l-3 3M3 24h26"
          stroke="#ffc94a"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (tone === "green") {
    return (
      <svg viewBox="0 0 32 32" focusable="false">
        <path d="M6 12h17v8a7 7 0 0 1-7 7h-3a7 7 0 0 1-7-7Z" fill="#45b29d" />
        <path
          d="M23 14h2a3.5 3.5 0 0 1 0 7h-2"
          fill="none"
          stroke="#45b29d"
          strokeWidth="3"
        />
        <path
          d="M11 4c-2 2 2 3 0 5M17 4c-2 2 2 3 0 5"
          fill="none"
          stroke="#e3f4ef"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" focusable="false">
      <path d="M21 4a12 12 0 1 0 7 19A10 10 0 0 1 21 4Z" fill="#a98bdb" />
      <circle cx="24" cy="9" r="2" fill="#ffe3a1" />
    </svg>
  );
}
