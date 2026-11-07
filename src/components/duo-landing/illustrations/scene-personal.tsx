"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import {
  Human,
  Turtle,
} from "@/components/duo-landing/illustrations/characters";
import "./scene-personal.css";

type MoodId = "lelah" | "bosan" | "gelisah" | "siap";

type Suggestion = { text: string; tag: string };

type Mood = {
  id: MoodId;
  label: string;
  color: string;
  edge: string;
  tint: string;
  face: ReactNode;
  suggestions: [Suggestion, Suggestion];
};

const INK = "#1f4d4c";

const MOODS: Mood[] = [
  {
    id: "lelah",
    label: "Lelah",
    color: "#7eaddb",
    edge: "#5a8cbd",
    tint: "#ddf0fb",
    face: (
      <>
        <path d="M16 28 Q21.5 32 27 28" />
        <path d="M33 28 Q38.5 32 44 28" />
        <ellipse cx="30" cy="41" rx="4" ry="3.2" fill={INK} stroke="none" />
        <text
          x="44"
          y="17"
          fontSize="10"
          fontWeight="900"
          fill={INK}
          stroke="none"
        >
          z
        </text>
      </>
    ),
    suggestions: [
      { text: "Minum air & tarik napas 2 menit", tag: "Jeda layar · 2 menit" },
      { text: "Pejamkan mata & regangkan bahu", tag: "Jeda layar · 2 menit" },
    ],
  },
  {
    id: "bosan",
    label: "Bosan",
    color: "#ffc94a",
    edge: "#e0a91c",
    tint: "#fff3cf",
    face: (
      <>
        <circle cx="21.5" cy="28" r="3.6" fill={INK} stroke="none" />
        <circle cx="38.5" cy="28" r="3.6" fill={INK} stroke="none" />
        <path d="M16 25 H27" />
        <path d="M33 25 H44" />
        <path d="M23 41 H37" />
      </>
    ),
    suggestions: [
      { text: "Rapikan 5 benda", tag: "Produktif ringan · 5 menit" },
      { text: "Kosongkan satu laci kecil", tag: "Produktif ringan · 10 menit" },
    ],
  },
  {
    id: "gelisah",
    label: "Gelisah",
    color: "#a98bdb",
    edge: "#8467b8",
    tint: "#efe8fa",
    face: (
      <>
        <circle cx="21.5" cy="29" r="4" fill={INK} stroke="none" />
        <circle cx="38.5" cy="29" r="4" fill={INK} stroke="none" />
        <path d="M16 21 L26 23.5" />
        <path d="M44 21 L34 23.5" />
        <path d="M19 42 Q22 39 25 42 T31 42 T37 42 T41 41" />
      </>
    ),
    suggestions: [
      { text: "Tulis 1 kalimat", tag: "Refleksi · 2 menit" },
      {
        text: "Tulis 3 hal kecil yang kamu syukuri",
        tag: "Refleksi · 5 menit",
      },
    ],
  },
  {
    id: "siap",
    label: "Siap bergerak",
    color: "#45b29d",
    edge: "#2f8a78",
    tint: "#e3f4ef",
    face: (
      <>
        <path d="M16 29 Q21.5 22 27 29" />
        <path d="M33 29 Q38.5 22 44 29" />
        <path d="M19 36 H41 Q40 48 30 48 Q20 48 19 36 Z" fill={INK} />
        <path
          d="M24 44 Q30 40 36 44 Q33 47.5 30 47.5 Q27 47.5 24 44 Z"
          fill="#ff8a65"
          stroke="none"
        />
      </>
    ),
    suggestions: [
      { text: "Jalan santai 5 menit", tag: "Bergerak · 5 menit" },
      { text: "10 lompatan kecil & peregangan", tag: "Bergerak · 2 menit" },
    ],
  },
];

type VarStyle = CSSProperties & Record<`--${string}`, string>;

function MoodFace({ mood }: { mood: Mood }) {
  return (
    <svg
      className="spr-face"
      viewBox="0 0 60 60"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="30" cy="32" r="27" fill={mood.edge} />
      <circle cx="30" cy="29" r="27" fill={mood.color} />
      <ellipse
        cx="19"
        cy="15"
        rx="6"
        ry="3.5"
        fill="#ffffff"
        opacity="0.35"
        transform="rotate(-30 19 15)"
      />
      <g
        fill="none"
        stroke={INK}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {mood.face}
      </g>
    </svg>
  );
}

const SPARKLE =
  "M0 -10 C1 -3 3 -1 10 0 C3 1 1 3 0 10 C-1 3 -3 1 -10 0 C-3 -1 -1 -3 0 -10 Z";

/** Row 4 art: an interactive mood picker. Picking a face swaps the suggestion the turtle holds. */
export function ScenePersonal() {
  const [moodId, setMoodId] = useState<MoodId>("bosan");
  const [alt, setAlt] = useState(0);
  const [hop, setHop] = useState(0);

  const mood = MOODS.find((m) => m.id === moodId) ?? MOODS[1];
  const suggestion = mood.suggestions[alt];

  const pick = (id: MoodId) => {
    if (id !== moodId) {
      setMoodId(id);
      setAlt(0);
    }
    setHop((n) => n + 1);
  };

  const swap = () => {
    setAlt((a) => (a === 0 ? 1 : 0));
    setHop((n) => n + 1);
  };

  const sceneStyle: VarStyle = {
    "--spr-mood": mood.color,
    "--spr-mood-edge": mood.edge,
    "--spr-mood-tint": mood.tint,
  };

  return (
    <div className="spr" data-dl-scene style={sceneStyle}>
      <div className="spr-stage">
        <svg
          className="spr-bg"
          viewBox="0 0 400 320"
          aria-hidden="true"
          focusable="false"
        >
          <path
            className="spr-blob"
            d="M206 64 C300 58 370 120 364 204 C358 270 300 304 210 304 C118 304 40 268 38 196 C36 120 112 70 206 64 Z"
          />
          <ellipse cx="200" cy="304" rx="180" ry="14" fill="#e3f4ef" />
          {/* beanbag */}
          <g className="spr-beanbag">
            <ellipse cx="302" cy="300" rx="70" ry="9" fill="#c7e6dd" />
            <path
              d="M236 296 C226 262 246 222 284 214 C318 206 360 226 368 262 C374 290 352 304 302 304 C262 304 242 304 236 296 Z"
              fill="#a98bdb"
            />
            <path
              d="M246 280 C246 256 264 236 288 232"
              stroke="#c5b1ea"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M300 300 C312 280 336 270 360 276"
              stroke="#8467b8"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
          {/* little plant */}
          <g className="spr-plant">
            <path d="M22 300 L28 272 H52 L58 300 Z" fill="#ff8a65" />
            <path
              d="M40 272 C30 254 18 248 14 236 C30 236 40 248 40 262"
              fill="#45b29d"
            />
            <path
              d="M40 272 C50 252 62 246 68 232 C52 232 40 246 40 262"
              fill="#2f8a78"
            />
          </g>
          {[
            { x: 372, y: 54, s: 1, d: 0 },
            { x: 236, y: 30, s: 0.7, d: 0.8 },
            { x: 24, y: 120, s: 0.8, d: 1.6 },
          ].map((sp, i) => (
            <g key={i} transform={`translate(${sp.x} ${sp.y}) scale(${sp.s})`}>
              <path
                className="spr-sparkle"
                d={SPARKLE}
                style={{ animationDelay: `${sp.d}s` } as CSSProperties}
              />
            </g>
          ))}
        </svg>

        <div className="spr-turtle" aria-hidden="true">
          <div key={`hop-${hop}`} className={hop > 0 ? "spr-hop" : undefined}>
            <Turtle pose="read" />
          </div>
        </div>

        <div className="spr-human" aria-hidden="true">
          <Human variant="raka" pose="sit" />
        </div>

        <div className="spr-bubble">
          <div aria-live="polite" aria-atomic="true">
            <div key={`${mood.id}-${alt}`} className="spr-bubble-pop">
              <p className="spr-bubble-kicker">Saran untukmu</p>
              <p className="spr-bubble-text">{suggestion.text}</p>
              <p className="spr-bubble-tag">{suggestion.tag}</p>
            </div>
          </div>
          <button type="button" className="spr-swap" onClick={swap}>
            Kurang cocok
          </button>
        </div>
      </div>

      <div
        className="spr-moods"
        role="group"
        aria-label="Kamu sedang merasa apa?"
      >
        {MOODS.map((m) => {
          const pressed = m.id === moodId;
          const style: VarStyle = {
            "--c": m.color,
            "--c-edge": m.edge,
            "--c-tint": m.tint,
          };
          return (
            <button
              key={m.id}
              type="button"
              className="spr-mood"
              aria-pressed={pressed}
              onClick={() => pick(m.id)}
              style={style}
            >
              <MoodFace mood={m} />
              <span className="spr-mood-label">{m.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
