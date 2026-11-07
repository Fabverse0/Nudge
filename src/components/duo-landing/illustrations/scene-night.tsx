import {
  Human,
  Turtle,
} from "@/components/duo-landing/illustrations/characters";
import "./scene-night.css";

const STAR =
  "M10 0l2.6 6.9L20 7.6l-5.7 4.8 1.8 7.6L10 16l-6.1 4 1.8-7.6L0 7.6l7.4-.7Z";

const floaters = [
  { left: "6%", top: "8%", size: "7%", delay: "0s" },
  { left: "78%", top: "6%", size: "5%", delay: "-1.2s" },
  { left: "88%", top: "30%", size: "4%", delay: "-2.4s" },
  { left: "12%", top: "64%", size: "5%", delay: "-0.6s" },
  { left: "40%", top: "80%", size: "3.5%", delay: "-3s" },
];

/** Night scene: turtle asleep on the moon, Sari reading by a lamp. */
export function SceneNight() {
  return (
    <div className="scene-night" data-dl-scene aria-hidden="true">
      <svg className="scene-night__bg" viewBox="0 0 400 400" focusable="false">
        <defs>
          <mask id="dl-night-moon-cut">
            <rect width="400" height="400" fill="#ffffff" />
            <circle cx="222" cy="112" r="96" fill="#000000" />
          </mask>
          <radialGradient id="dl-night-lamp-glow">
            <stop offset="0" stopColor="#ffc94a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ffc94a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Moon halo + crescent */}
        <circle
          className="scene-night__halo"
          cx="170"
          cy="150"
          r="138"
          fill="#a98bdb"
          opacity="0.18"
        />
        <g mask="url(#dl-night-moon-cut)">
          <circle cx="170" cy="150" r="112" fill="#ffe3a1" />
          <circle cx="132" cy="196" r="14" fill="#f5cf7c" />
          <circle cx="104" cy="148" r="9" fill="#f5cf7c" />
          <circle cx="160" cy="236" r="8" fill="#f5cf7c" />
        </g>

        {/* Lamp glow, rug and floor lamp */}
        <circle
          className="scene-night__glow"
          cx="352"
          cy="230"
          r="110"
          fill="url(#dl-night-lamp-glow)"
        />
        <ellipse cx="280" cy="384" rx="118" ry="14" fill="#3a2d63" />
        <rect x="350" y="214" width="8" height="166" rx="4" fill="#c9ae8a" />
        <ellipse cx="354" cy="382" rx="26" ry="7" fill="#c9ae8a" />
        <path d="M326 216h56l-12-44h-32Z" fill="#ff8a65" />
        <path d="M326 216h56l-2-8h-52Z" fill="#e0663f" />

        {/* Stack of books by the reader */}
        <rect x="196" y="352" width="54" height="12" rx="4" fill="#7eaddb" />
        <rect x="200" y="340" width="46" height="12" rx="4" fill="#f49ac1" />
        <rect x="194" y="364" width="58" height="14" rx="4" fill="#45b29d" />
      </svg>

      {floaters.map((f) => (
        <svg
          key={f.left}
          className="scene-night__star"
          viewBox="0 0 20 20"
          style={{
            left: f.left,
            top: f.top,
            width: f.size,
            animationDelay: f.delay,
          }}
          focusable="false"
        >
          <path d={STAR} fill="#ffc94a" />
        </svg>
      ))}

      <div className="scene-night__turtle">
        <Turtle pose="sleep" />
        <span className="scene-night__z scene-night__z--1">z</span>
        <span className="scene-night__z scene-night__z--2">z</span>
        <span className="scene-night__z scene-night__z--3">z</span>
      </div>

      <div className="scene-night__sari">
        <Human variant="sari" pose="sit" />
      </div>
    </div>
  );
}
