import type { CSSProperties } from "react";
import {
  Human,
  Turtle,
} from "@/components/duo-landing/illustrations/characters";
import "./scene-science.css";

type VarStyle = CSSProperties & Record<`--${string}`, string | number>;

const SPARKLE =
  "M0 -10 C1 -3 3 -1 10 0 C3 1 1 3 0 10 C-1 3 -3 1 -10 0 C-3 -1 -1 -3 0 -10 Z";

const ROWS = [
  { y: 94, label: "Pilih 1 hal" },
  { y: 142, label: "Mulai timer" },
  { y: 190, label: "Selesai!" },
];

const BARS = [
  { x: 182, h: 22, fill: "#7eaddb" },
  { x: 214, h: 34, fill: "#ffc94a" },
  { x: 246, h: 46, fill: "#ff8a65" },
  { x: 278, h: 58, fill: "#45b29d" },
];
const BASE_Y = 280;

const RAYS = [-60, -30, 0, 30, 60];

const SPARKLES: Array<{
  x: number;
  y: number;
  s: number;
  fill: string;
  d: number;
}> = [
  { x: 392, y: 70, s: 1, fill: "#ffc94a", d: 0 },
  { x: 436, y: 186, s: 0.7, fill: "#a98bdb", d: 1 },
  { x: 120, y: 54, s: 0.65, fill: "#f49ac1", d: 1.8 },
  { x: 380, y: 222, s: 0.55, fill: "#45b29d", d: 2.5 },
];

/** Row 2 art: a thinking turtle with a glowing idea bulb, a clipboard whose three steps tick
 *  in sequence above a growing bar chart, and a human writing notes. Decorative. */
export function SceneScience() {
  return (
    <div className="ss" data-dl-scene aria-hidden="true">
      <svg className="ss-svg" viewBox="0 0 480 440" focusable="false">
        {/* backdrop + ground */}
        <path
          d="M246 30 C356 26 448 100 444 210 C440 316 356 390 240 390 C124 390 38 314 40 206 C42 102 136 34 246 30 Z"
          fill="#ddf0fb"
        />
        <ellipse cx="240" cy="424" rx="206" ry="14" fill="#cfe6f5" />

        {SPARKLES.map((s, i) => (
          <g key={i} transform={`translate(${s.x} ${s.y}) scale(${s.s})`}>
            <path
              className="ss-sparkle"
              d={SPARKLE}
              fill={s.fill}
              style={{ animationDelay: `${s.d}s` } as VarStyle}
            />
          </g>
        ))}

        {/* clipboard */}
        <g className="ss-board-float">
          <g className="ss-board">
            <rect
              x="142"
              y="42"
              width="210"
              height="276"
              rx="28"
              fill="#c9ae8a"
            />
            <rect
              x="142"
              y="34"
              width="210"
              height="276"
              rx="28"
              fill="#e6d4be"
            />
            <rect x="158" y="56" width="178" height="238" rx="16" fill="#fff" />
            <rect
              x="207"
              y="25"
              width="80"
              height="30"
              rx="12"
              fill="#5a8cbd"
            />
            <rect
              x="207"
              y="20"
              width="80"
              height="30"
              rx="12"
              fill="#7eaddb"
            />
            <circle cx="247" cy="32" r="5" fill="#ddf0fb" />

            {ROWS.map((r, i) => {
              const style = { animationDelay: `${i * 0.9}s` } as VarStyle;
              return (
                <g key={r.label}>
                  <rect
                    x="172"
                    y={r.y - 15}
                    width="30"
                    height="30"
                    rx="9"
                    fill="#fff"
                    stroke="#e5e5e5"
                    strokeWidth="3"
                  />
                  <rect
                    className="ss-box"
                    x="172"
                    y={r.y - 15}
                    width="30"
                    height="30"
                    rx="9"
                    fill="#45b29d"
                    style={style}
                  />
                  <path
                    className="ss-tick"
                    d={`M180 ${r.y} l6 6 l11 -12`}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={style}
                  />
                  <text className="ss-label" x="214" y={r.y + 5} style={style}>
                    {r.label}
                  </text>
                </g>
              );
            })}

            <rect
              x="172"
              y="212"
              width="150"
              height="3"
              rx="1.5"
              fill="#e5e5e5"
            />

            {/* bar chart */}
            {BARS.map((b, i) => (
              <rect
                key={b.x}
                className="ss-bar"
                x={b.x}
                y={BASE_Y - b.h}
                width="22"
                height={b.h}
                rx="6"
                fill={b.fill}
                style={{ animationDelay: `${i * 0.12}s` } as VarStyle}
              />
            ))}
            <rect
              x="172"
              y={BASE_Y}
              width="150"
              height="4"
              rx="2"
              fill="#d4d4d4"
            />
            <g transform={`translate(289 ${BASE_Y - 72}) scale(0.8)`}>
              <path className="ss-star" d={SPARKLE} fill="#ffc94a" />
            </g>
          </g>
        </g>

        {/* thought dots + idea bulb */}
        <circle className="ss-thought" cx="96" cy="252" r="6" fill="#fff" />
        <circle
          className="ss-thought"
          cx="84"
          cy="228"
          r="8"
          fill="#fff"
          style={{ animationDelay: "0.25s" } as VarStyle}
        />
        <g className="ss-bulb-float">
          <circle className="ss-glow" cx="72" cy="160" r="46" fill="#ffc94a" />
          <g className="ss-rays">
            {RAYS.map((deg) => (
              <rect
                key={deg}
                x="69"
                y="98"
                width="6"
                height="14"
                rx="3"
                fill="#ffc94a"
                transform={`rotate(${deg} 72 160)`}
              />
            ))}
          </g>
          <circle className="ss-bulb" cx="72" cy="158" r="25" />
          <rect
            x="66"
            y="146"
            width="5"
            height="16"
            rx="2.5"
            fill="#fff"
            opacity="0.6"
          />
          <rect x="61" y="180" width="22" height="9" rx="4" fill="#9aa6a5" />
          <rect x="63" y="188" width="18" height="9" rx="4" fill="#7c8a89" />
        </g>
      </svg>

      <div className="ss-turtle">
        <Turtle pose="think" />
      </div>
      <div className="ss-human">
        <Human variant="sari" pose="write" />
      </div>
    </div>
  );
}
