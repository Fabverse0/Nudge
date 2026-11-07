import type { CSSProperties } from "react";
import { Human } from "@/components/duo-landing/illustrations/characters";
import "./scene-fun.css";

type VarStyle = CSSProperties & Record<`--${string}`, string | number>;

const SPARKLE =
  "M0 -10 C1 -3 3 -1 10 0 C3 1 1 3 0 10 C-1 3 -3 1 -10 0 C-3 -1 -1 -3 0 -10 Z";

/* Ring timer centre; confetti bursts from here when the ring closes. */
const RX = 92;
const RY = 132;
const RING_R = 36;
const RING_C = 2 * Math.PI * RING_R;

const CONFETTI: Array<{
  dx: number;
  dy: number;
  r: number;
  fill: string;
  shape: "rect" | "dot";
}> = [
  { dx: -58, dy: -40, r: 160, fill: "#ffc94a", shape: "rect" },
  { dx: -24, dy: -66, r: -120, fill: "#ff8a65", shape: "dot" },
  { dx: 18, dy: -70, r: 200, fill: "#7eaddb", shape: "rect" },
  { dx: 54, dy: -46, r: -180, fill: "#f49ac1", shape: "dot" },
  { dx: 70, dy: -6, r: 140, fill: "#45b29d", shape: "rect" },
  { dx: 56, dy: 40, r: -90, fill: "#a98bdb", shape: "dot" },
  { dx: -64, dy: 6, r: 220, fill: "#f49ac1", shape: "rect" },
  { dx: -50, dy: 46, r: -150, fill: "#7eaddb", shape: "dot" },
  { dx: 0, dy: -78, r: 90, fill: "#45b29d", shape: "dot" },
  { dx: -72, dy: -16, r: -60, fill: "#ff8a65", shape: "rect" },
];

const SPARKLES: Array<{
  x: number;
  y: number;
  s: number;
  fill: string;
  d: number;
}> = [
  { x: 440, y: 64, s: 1.1, fill: "#ffc94a", d: 0 },
  { x: 350, y: 26, s: 0.7, fill: "#7eaddb", d: 0.8 },
  { x: 36, y: 262, s: 0.9, fill: "#f49ac1", d: 1.4 },
  { x: 24, y: 40, s: 0.6, fill: "#45b29d", d: 2.1 },
];

const ACTIVITIES = [
  { title: "Regangkan bahu", chip: "2 MENIT", chipFill: "#45b29d" },
  { title: "Rapikan meja", chip: "5 MENIT", chipFill: "#5a8cbd" },
  { title: "Tulis 3 kalimat", chip: "10 MENIT", chipFill: "#8c6cc7" },
];

function ActivityIcon({ index }: { index: number }) {
  if (index === 0) {
    // little person stretching, arms up
    return (
      <g
        fill="none"
        stroke="#45b29d"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="218" cy="133" r="7" fill="#45b29d" stroke="none" />
        <path d="M218 143 V160" strokeWidth="7" />
        <path d="M204 130 L218 147 L232 130" strokeWidth="6" />
        <path d="M209 173 L218 160 L227 173" strokeWidth="6" />
      </g>
    );
  }
  if (index === 1) {
    // tidy box with a lid and a sparkle
    return (
      <g>
        <rect x="199" y="147" width="38" height="24" rx="6" fill="#e6d4be" />
        <rect x="195" y="139" width="46" height="11" rx="5" fill="#c9ae8a" />
        <rect x="211" y="155" width="14" height="5" rx="2.5" fill="#c9ae8a" />
        <path
          d={SPARKLE}
          transform="translate(236 126) scale(0.6)"
          fill="#ffc94a"
        />
      </g>
    );
  }
  // notebook with lines and a pencil
  return (
    <g>
      <rect x="201" y="128" width="30" height="40" rx="6" fill="#7eaddb" />
      <rect x="207" y="137" width="18" height="3.5" rx="1.75" fill="#fff" />
      <rect x="207" y="145" width="18" height="3.5" rx="1.75" fill="#fff" />
      <rect x="207" y="153" width="12" height="3.5" rx="1.75" fill="#fff" />
      <g transform="rotate(30 236 146)">
        <rect x="232" y="128" width="8" height="26" rx="3" fill="#ffc94a" />
        <path d="M232 154 L236 162 L240 154 Z" fill="#c9ae8a" />
      </g>
    </g>
  );
}

/** Row 1 art: a phone running a Nudge suggestion card (cycling 3 activities), a timer ring
 *  that fills and bursts into confetti, and a human stretching beside it. Decorative. */
export function SceneFun() {
  return (
    <div className="sf" data-dl-scene aria-hidden="true">
      <svg className="sf-svg" viewBox="0 0 480 440" focusable="false">
        {/* backdrop + ground */}
        <path
          d="M250 36 C350 30 446 104 444 214 C442 318 360 392 248 392 C130 392 40 320 40 210 C40 104 140 42 250 36 Z"
          fill="#e3f4ef"
        />
        <ellipse cx="244" cy="424" rx="200" ry="14" fill="#d3ece4" />

        {SPARKLES.map((s, i) => (
          <g key={i} transform={`translate(${s.x} ${s.y}) scale(${s.s})`}>
            <path
              className="sf-sparkle"
              d={SPARKLE}
              fill={s.fill}
              style={{ animationDelay: `${s.d}s` } as VarStyle}
            />
          </g>
        ))}

        {/* phone */}
        <g className="sf-phone-float">
          <g className="sf-phone">
            <rect
              x="118"
              y="34"
              width="200"
              height="384"
              rx="36"
              fill="#d4d4d4"
            />
            <rect
              x="118"
              y="26"
              width="200"
              height="384"
              rx="36"
              fill="#fff"
              stroke="#e5e5e5"
              strokeWidth="4"
            />
            <rect x="188" y="40" width="60" height="10" rx="5" fill="#e5e5e5" />

            {/* session progress bar */}
            <rect
              x="140"
              y="66"
              width="156"
              height="14"
              rx="7"
              fill="#e5e5e5"
            />
            <g className="sf-progress">
              <rect
                x="140"
                y="66"
                width="156"
                height="14"
                rx="7"
                fill="#45b29d"
              />
              <rect
                x="148"
                y="69"
                width="120"
                height="4"
                rx="2"
                fill="#fff"
                opacity="0.4"
              />
            </g>

            {/* suggestion card */}
            <rect
              x="140"
              y="104"
              width="156"
              height="180"
              rx="20"
              fill="#c9e6dd"
            />
            <rect
              x="140"
              y="98"
              width="156"
              height="180"
              rx="20"
              fill="#e3f4ef"
            />
            {ACTIVITIES.map((a, i) => (
              <g
                key={a.title}
                className={`sf-act sf-act--${i}`}
                style={{ animationDelay: `${-((3 - i) % 3) * 4}s` } as VarStyle}
              >
                <circle cx="218" cy="148" r="31" fill="#fff" />
                <ActivityIcon index={i} />
                <text
                  className="sf-text sf-text--title"
                  x="218"
                  y="210"
                  textAnchor="middle"
                >
                  {a.title}
                </text>
                <rect
                  x="176"
                  y="224"
                  width="84"
                  height="28"
                  rx="14"
                  fill={a.chipFill}
                />
                <text
                  className="sf-text sf-text--chip"
                  x="218"
                  y="243"
                  textAnchor="middle"
                >
                  {a.chip}
                </text>
              </g>
            ))}

            {/* which-activity dots */}
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <circle cx={202 + i * 16} cy="306" r="5" fill="#e5e5e5" />
                <circle
                  className={`sf-dot sf-dot--${i}`}
                  cx={202 + i * 16}
                  cy="306"
                  r="5"
                  fill="#45b29d"
                  style={
                    { animationDelay: `${-((3 - i) % 3) * 4}s` } as VarStyle
                  }
                />
              </g>
            ))}

            {/* MULAI push button */}
            <rect
              x="140"
              y="336"
              width="156"
              height="50"
              rx="16"
              fill="#2f8a78"
            />
            <g className="sf-btn">
              <rect
                x="140"
                y="330"
                width="156"
                height="50"
                rx="16"
                fill="#45b29d"
              />
              <rect
                x="152"
                y="336"
                width="132"
                height="6"
                rx="3"
                fill="#fff"
                opacity="0.25"
              />
              <text
                className="sf-text sf-text--btn"
                x="218"
                y="362"
                textAnchor="middle"
              >
                MULAI
              </text>
            </g>
            <circle className="sf-tap" cx="252" cy="358" r="12" fill="#fff" />
          </g>
        </g>

        {/* timer ring badge */}
        <g className="sf-ring-float">
          <g className="sf-ring-pop">
            <circle cx={RX} cy={RY + 6} r="54" fill="#d4d4d4" />
            <circle
              cx={RX}
              cy={RY}
              r="54"
              fill="#fff"
              stroke="#e5e5e5"
              strokeWidth="4"
            />
            <circle
              cx={RX}
              cy={RY}
              r={RING_R}
              fill="none"
              stroke="#e5e5e5"
              strokeWidth="12"
            />
            <circle
              className="sf-ring"
              cx={RX}
              cy={RY}
              r={RING_R}
              fill="none"
              stroke="#ffc94a"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={RING_C}
              transform={`rotate(-90 ${RX} ${RY})`}
            />
            <line
              className="sf-hand"
              x1={RX}
              y1={RY}
              x2={RX}
              y2={RY - 20}
              stroke="#182b2a"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <circle className="sf-hand" cx={RX} cy={RY} r="6" fill="#182b2a" />
            <path
              className="sf-check"
              d={`M${RX - 15} ${RY} l10 10 l20 -21`}
              fill="none"
              stroke="#45b29d"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          {CONFETTI.map((c, i) => {
            const style = {
              "--dx": `${c.dx}px`,
              "--dy": `${c.dy}px`,
              "--rot": `${c.r}deg`,
              animationDelay: `${(i % 3) * 0.04}s`,
            } as VarStyle;
            return c.shape === "rect" ? (
              <rect
                key={i}
                className="sf-confetti"
                x={RX - 4}
                y={RY - 6}
                width="8"
                height="12"
                rx="2"
                fill={c.fill}
                style={style}
              />
            ) : (
              <circle
                key={i}
                className="sf-confetti"
                cx={RX}
                cy={RY}
                r="5"
                fill={c.fill}
                style={style}
              />
            );
          })}
        </g>
      </svg>

      <div className="sf-human">
        <Human variant="bima" pose="stretch" />
      </div>
    </div>
  );
}
