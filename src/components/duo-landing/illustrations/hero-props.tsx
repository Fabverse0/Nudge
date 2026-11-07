/*
 * Small flat props that float around the hero cluster.
 * Original artwork: rounded shapes, no outlines, Nudge palette.
 * Every prop uses a 100x100 viewBox and is decorative.
 */

type PropArt = { className?: string };

export function AlarmClock({ className }: PropArt) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g className="hp-ring">
        <circle cx="24" cy="22" r="13" fill="#ffc94a" />
        <circle cx="76" cy="22" r="13" fill="#ffc94a" />
        <rect x="46" y="8" width="8" height="10" rx="3" fill="#e0663f" />
        <rect
          x="22"
          y="80"
          width="10"
          height="14"
          rx="4"
          fill="#e0663f"
          transform="rotate(25 27 87)"
        />
        <rect
          x="68"
          y="80"
          width="10"
          height="14"
          rx="4"
          fill="#e0663f"
          transform="rotate(-25 73 87)"
        />
        <circle cx="50" cy="55" r="36" fill="#ff8a65" />
        <circle cx="50" cy="55" r="27" fill="#ffffff" />
        <circle cx="50" cy="35" r="2.6" fill="#c9ae8a" />
        <circle cx="70" cy="55" r="2.6" fill="#c9ae8a" />
        <circle cx="50" cy="75" r="2.6" fill="#c9ae8a" />
        <circle cx="30" cy="55" r="2.6" fill="#c9ae8a" />
        <rect x="47.5" y="38" width="5" height="19" rx="2.5" fill="#182b2a" />
        <rect x="48" y="52.5" width="16" height="5" rx="2.5" fill="#45b29d" />
        <circle cx="50" cy="55" r="4" fill="#182b2a" />
        <path
          d="M30 34 Q36 26 46 24"
          stroke="#ffffff"
          strokeOpacity="0.55"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function Notebook({ className }: PropArt) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect x="18" y="12" width="62" height="78" rx="10" fill="#5a8cbd" />
      <rect x="14" y="10" width="62" height="78" rx="10" fill="#7eaddb" />
      <rect x="26" y="20" width="42" height="60" rx="6" fill="#ffffff" />
      <rect x="32" y="32" width="30" height="5" rx="2.5" fill="#ddf0fb" />
      <rect x="32" y="44" width="24" height="5" rx="2.5" fill="#ddf0fb" />
      <rect x="32" y="56" width="28" height="5" rx="2.5" fill="#ddf0fb" />
      <path
        d="M33 68 l5 5 l10 -11"
        stroke="#45b29d"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[20, 34, 48, 62, 76].map((y) => (
        <rect
          key={y}
          x="8"
          y={y - 3}
          width="14"
          height="6"
          rx="3"
          fill="#e6d4be"
        />
      ))}
      <g transform="rotate(32 82 44)">
        <rect x="76" y="18" width="12" height="52" rx="4" fill="#ffc94a" />
        <rect x="76" y="18" width="12" height="9" rx="4" fill="#f49ac1" />
        <path d="M76 70 L82 82 L88 70 Z" fill="#e6d4be" />
        <path d="M80 78 L82 82 L84 78 Z" fill="#182b2a" />
      </g>
    </svg>
  );
}

export function WaterGlass({ className }: PropArt) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M22 14 H78 L70 88 Q69 94 63 94 H37 Q31 94 30 88 Z"
        fill="#ddf0fb"
      />
      <path
        className="hp-water"
        d="M26 42 Q38 36 50 42 T74 42 L70 88 Q69 94 63 94 H37 Q31 94 30 88 Z"
        fill="#7eaddb"
      />
      <rect
        x="32"
        y="22"
        width="7"
        height="58"
        rx="3.5"
        fill="#ffffff"
        opacity="0.7"
      />
      <circle
        className="hp-bubble"
        cx="58"
        cy="76"
        r="4"
        fill="#ffffff"
        opacity="0.8"
      />
      <circle
        className="hp-bubble hp-bubble--2"
        cx="50"
        cy="66"
        r="2.6"
        fill="#ffffff"
        opacity="0.8"
      />
      <rect
        x="54"
        y="4"
        width="8"
        height="46"
        rx="4"
        fill="#ff8a65"
        transform="rotate(14 58 27)"
      />
    </svg>
  );
}

export function Sneaker({ className }: PropArt) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M8 62 Q8 34 30 32 Q40 31 46 44 Q58 50 80 54 Q94 57 94 70 L94 74 H8 Z"
        fill="#ff8a65"
      />
      <path d="M30 32 Q40 31 46 44 L36 50 Q30 42 24 40 Z" fill="#e0663f" />
      <rect x="6" y="70" width="90" height="14" rx="7" fill="#ffffff" />
      <rect x="6" y="80" width="90" height="6" rx="3" fill="#e5e5e5" />
      <rect
        x="40"
        y="46"
        width="14"
        height="5"
        rx="2.5"
        fill="#ffffff"
        transform="rotate(-20 47 48)"
      />
      <rect
        x="50"
        y="51"
        width="14"
        height="5"
        rx="2.5"
        fill="#ffffff"
        transform="rotate(-20 57 53)"
      />
      <path
        d="M70 60 Q80 60 86 64"
        stroke="#ffc94a"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="18" cy="56" r="5" fill="#ffc94a" />
    </svg>
  );
}

export function PottedPlant({ className }: PropArt) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g className="hp-leaves">
        <path d="M50 64 Q22 58 18 28 Q44 30 50 64 Z" fill="#45b29d" />
        <path d="M50 64 Q78 56 84 24 Q56 28 50 64 Z" fill="#2f8a78" />
        <path d="M50 66 Q40 36 52 8 Q66 34 50 66 Z" fill="#45b29d" />
        <path
          d="M51 60 Q49 36 52 16"
          stroke="#e3f4ef"
          strokeOpacity="0.6"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <path d="M26 62 H74 L68 94 H32 Z" fill="#ff8a65" />
      <rect x="22" y="58" width="56" height="12" rx="6" fill="#e0663f" />
      <circle cx="42" cy="82" r="3" fill="#ffc94a" />
      <circle cx="56" cy="80" r="3" fill="#ffc94a" />
    </svg>
  );
}

export function PausePhone({ className }: PropArt) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect x="22" y="4" width="56" height="92" rx="14" fill="#13233a" />
      <rect x="27" y="12" width="46" height="74" rx="9" fill="#e3f4ef" />
      <rect x="42" y="7" width="16" height="3" rx="1.5" fill="#3c4b4a" />
      <g className="hp-pulse">
        <circle cx="50" cy="46" r="17" fill="#45b29d" />
        <rect x="43" y="37" width="5" height="18" rx="2.5" fill="#ffffff" />
        <rect x="52" y="37" width="5" height="18" rx="2.5" fill="#ffffff" />
      </g>
      <rect x="35" y="70" width="30" height="5" rx="2.5" fill="#7eaddb" />
      <rect x="40" y="78" width="20" height="4" rx="2" fill="#c9ae8a" />
    </svg>
  );
}

export function Sparkle({
  className,
  color = "#ffc94a",
}: PropArt & { color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 4 Q56 44 96 50 Q56 56 50 96 Q44 56 4 50 Q44 44 50 4 Z"
        fill={color}
      />
    </svg>
  );
}
