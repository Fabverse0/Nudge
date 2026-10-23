import Image from "next/image";
import { LandingAnimation } from "./landing-animation";
import { TimeStory } from "./time-story";
import { StretchStory } from "./stretch-story";

export type LandingSceneKind =
  "hero" | "phone" | "time" | "move" | "tidy" | "journal" | "welcome";
const descriptions: Record<LandingSceneKind, string> = {
  hero: "Nudge bersama ponsel yang ditinggalkan dan satu langkah menuju kegiatan kecil",
  phone:
    "Feed berwarna bergulir pada ponsel, berhenti pada Jeda sebentar, lalu buku dan tanaman muncul dari layar",
  time: "Jam, kartu durasi, dan adegan langkah, buku terbuka, atau susunan benda mengikuti pilihan waktu",
  move: "Kura-kura Nudge meregangkan badan di atas alas, dengan ponsel diletakkan di samping",
  tidy: "Buku dan benda meja tersusun satu per satu ke tempatnya",
  journal:
    "Pena bergerak di atas jurnal terbuka, dengan catatan pendek yang muncul",
  welcome: "Kura-kura Nudge menyambut langkah kecilmu di samping daun dan buku",
};

function Tidy() {
  return (
    <svg viewBox="0 0 520 430" className="object-scene" aria-hidden="true">
      <rect x="70" y="337" width="390" height="17" rx="8" fill="#E6D4BE" />
      <g className="tidy-stack">
        <g transform="translate(155 298)">
          <rect width="161" height="39" rx="9" fill="#315F5E" />
          <rect x="12" y="5" width="143" height="27" rx="5" fill="#FAF8F4" />
          <path d="M24 18h117" stroke="#E6D4BE" strokeWidth="3" />
        </g>
      </g>
      <g className="tidy-blue-book">
        <g transform="translate(159 259)">
          <rect width="150" height="39" rx="9" fill="#7EADDB" />
          <rect x="12" y="5" width="132" height="27" rx="5" fill="#FAF8F4" />
          <path d="M24 18h105" stroke="#E6D4BE" strokeWidth="3" />
        </g>
      </g>
      <g className="tidy-sand-book">
        <g transform="translate(153 221)">
          <rect width="156" height="39" rx="9" fill="#CBAF8B" />
          <rect x="12" y="5" width="138" height="27" rx="5" fill="#FAF8F4" />
          <path d="M24 18h112" stroke="#E6D4BE" strokeWidth="3" />
        </g>
      </g>
      <g className="tidy-cup">
        <g transform="translate(347 263)">
          <path d="M0 0h66l-6 74H7Z" fill="#679F9E" />
          <ellipse cx="33" rx="33" ry="9" fill="#315F5E" />
          <path
            d="m21-2-9-70m33 70 11-84"
            stroke="#7EADDB"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="m33-3 1-60"
            stroke="#E6D4BE"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </g>
      </g>
      <g
        className="tidy-finish"
        stroke="#679F9E"
        strokeWidth="7"
        strokeLinecap="round"
      >
        <path d="m331 171 10-13m23 24 16-4m-56-28-1-15" />
      </g>
    </svg>
  );
}

function MascotScene({
  kind,
  priority,
}: {
  kind: "hero" | "welcome";
  priority: boolean;
}) {
  return (
    <>
      <svg viewBox="0 0 520 430" className="object-scene" aria-hidden="true">
        {kind === "hero" ? (
          <>
            <g
              className="hero-resting-phone"
              transform="translate(63 305) rotate(-18)"
            >
              <rect width="81" height="123" rx="17" fill="#7EADDB" />
              <rect
                x="10"
                y="11"
                width="61"
                height="91"
                rx="9"
                fill="#315F5E"
              />
              <path
                d="M32 113h17"
                stroke="#FAF8F4"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
            <g
              className="hero-open-book"
              transform="translate(347 300) rotate(9)"
            >
              <path
                d="M0 5Q37-8 70 5 105-8 140 5V88Q106 77 70 88 36 77 0 88Z"
                fill="#679F9E"
              />
              <path
                d="M4 0Q37-13 70 0 104-13 136 0V77Q104 66 70 77 37 66 4 77Z"
                fill="#E6D4BE"
              />
              <path
                d="M70 0v77m-52-51h35m-35 13h27m42-13h32m-32 13h24"
                stroke="#CBAF8B"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
          </>
        ) : (
          <>
            <g className="welcome-sprout" transform="translate(102 299)">
              <path
                d="M0 66V-5"
                stroke="#315F5E"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M0 25C-48 18-43-20-43-20 2-21 0 25 0 25Zm0-13c1-47 47-49 47-49 1 43-47 49-47 49Z"
                fill="#679F9E"
              />
              <path d="M-36 41h74l-11 48h-53Z" fill="#E6D4BE" />
            </g>
            <g
              className="welcome-step"
              transform="translate(383 323) rotate(12)"
            >
              <rect width="76" height="70" rx="19" fill="#7EADDB" />
              <path
                d="m24 37 14 12 21-28"
                stroke="#FAF8F4"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </>
        )}
      </svg>
      <div className={`c1-portrait c1-${kind}`}>
        <Image
          src={`/brand/landing/motion/c1-${kind === "hero" ? "idle" : "wave"}.webp`}
          alt=""
          width={800}
          height={800}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          unoptimized
          draggable={false}
        />
      </div>
    </>
  );
}

export function LandingScene({
  kind,
  priority = false,
  minutes = 5,
}: {
  kind: LandingSceneKind;
  priority?: boolean;
  minutes?: number;
}) {
  return (
    <div
      className={`alive-scene scene-${kind}`}
      data-alive-scene={kind}
      role="img"
      aria-label={descriptions[kind]}
    >
      <div className="scene-ground" aria-hidden="true" />
      {(kind === "hero" || kind === "welcome") && (
        <MascotScene kind={kind} priority={priority} />
      )}
      {kind === "phone" && <LandingAnimation name="phone" />}
      {kind === "journal" && <LandingAnimation name="diary" />}
      {kind === "time" && <TimeStory minutes={minutes} />}
      {kind === "move" && <StretchStory />}
      {kind === "tidy" && <Tidy />}
    </div>
  );
}
