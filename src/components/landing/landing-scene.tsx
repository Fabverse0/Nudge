import Image from "next/image";
import { LandingAnimation } from "./landing-animation";

export type LandingSceneKind =
  "hero" | "phone" | "time" | "move" | "tidy" | "journal" | "welcome";
const descriptions: Record<LandingSceneKind, string> = {
  hero: "Nudge bersama ponsel yang ditinggalkan dan satu langkah menuju kegiatan kecil",
  phone:
    "Feed berwarna bergulir pada ponsel, berhenti pada Jeda sebentar, lalu buku dan tanaman muncul dari layar",
  time: "Jam dan kartu waktu mengikuti pilihan dua, lima, atau sepuluh menit",
  move: "Sepasang langkah bergantian menapak dan meninggalkan jejak di jalur kecil",
  tidy: "Buku dan benda meja tersusun satu per satu ke tempatnya",
  journal:
    "Pena bergerak di atas jurnal terbuka, dengan catatan pendek yang muncul",
  welcome: "Kura-kura Nudge menyambut langkah kecilmu di samping daun dan buku",
};

function Steps() {
  return (
    <svg viewBox="0 0 520 430" className="object-scene" aria-hidden="true">
      <path
        d="M60 346C154 374 235 329 283 253s92-134 182-142"
        className="walking-route"
      />
      {[0, 1, 2, 3].map((i) => (
        <g
          key={i}
          className={`trail-print trail-${i}`}
          transform={`translate(${105 + i * 78} ${327 - i * 57}) rotate(28)`}
        >
          <ellipse rx="11" ry="21" fill="#679F9E" />
          <circle cy="-31" r="8" fill="#679F9E" />
        </g>
      ))}
      <g className="walking-shoe shoe-left">
        <g transform="translate(155 215) rotate(-24)">
          <path
            d="M-35-72c-7-26 21-46 45-30l28 52 47 24c22 11 15 38-8 39L-4 9C-28 7-36-4-35-25Z"
            fill="#315F5E"
          />
          <path
            d="M-35-25c24 14 45 13 76 6l41-4c10 14 3 35-15 36L-4 9C-28 7-36-4-35-25Z"
            fill="#E6D4BE"
          />
          <path
            d="m-1-52 24-9m-17 23 24-8"
            stroke="#FAF8F4"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </g>
      </g>
      <g className="walking-shoe shoe-right">
        <g transform="translate(316 223) rotate(17)">
          <path
            d="M-35-72c-7-26 21-46 45-30l28 52 47 24c22 11 15 38-8 39L-4 9C-28 7-36-4-35-25Z"
            fill="#7EADDB"
          />
          <path
            d="M-35-25c24 14 45 13 76 6l41-4c10 14 3 35-15 36L-4 9C-28 7-36-4-35-25Z"
            fill="#E6D4BE"
          />
          <path
            d="m-1-52 24-9m-17 23 24-8"
            stroke="#FAF8F4"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </g>
      </g>
      <g transform="translate(405 315)">
        <path
          d="M0 34V-20"
          stroke="#315F5E"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M0 0C-38 0-39-33-39-33 0-37 0 0 0 0Zm1-12c0-36 35-39 35-39 5 35-35 39-35 39Z"
          fill="#679F9E"
        />
      </g>
    </svg>
  );
}

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

function Time({ minutes }: { minutes: number }) {
  return (
    <svg viewBox="0 0 520 430" className="object-scene" aria-hidden="true">
      <g transform="translate(242 204)">
        <circle r="131" fill="#679F9E" />
        <circle r="114" fill="#FAF8F4" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
          (angle) => (
            <path
              key={angle}
              d="M0-94v10"
              transform={`rotate(${angle})`}
              stroke="#679F9E"
              strokeWidth="6"
              strokeLinecap="round"
            />
          ),
        )}
        <g className="clock-minute" style={{ rotate: `${minutes * 6}deg` }}>
          <path
            d="M0 0V-67"
            stroke="#315F5E"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </g>
        <path
          d="M0 0 43 24"
          stroke="#315F5E"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <circle r="10" fill="#7EADDB" />
      </g>
      <g className="time-ticket" key={minutes} transform="translate(296 276)">
        <rect y="6" width="125" height="91" rx="21" fill="#CBAF8B" />
        <rect width="125" height="91" rx="21" fill="#E6D4BE" />
        <text
          x="62"
          y="48"
          textAnchor="middle"
          fill="#315F5E"
          fontSize="36"
          fontWeight="850"
        >
          {minutes}
        </text>
        <text
          x="62"
          y="72"
          textAnchor="middle"
          fill="#315F5E"
          fontSize="17"
          fontWeight="750"
        >
          menit
        </text>
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
      {kind === "time" && <Time minutes={minutes} />}
      {kind === "move" && <Steps />}
      {kind === "tidy" && <Tidy />}
    </div>
  );
}
