import type { CSSProperties } from "react";
import {
  Human,
  Turtle,
} from "@/components/duo-landing/illustrations/characters";
import "./scene-motivation.css";

const SPARKLE =
  "M0 -10 C1 -3 3 -1 10 0 C3 1 1 3 0 10 C-1 3 -3 1 -10 0 C-3 -1 -1 -3 0 -10 Z";

const SPARKLES: Array<{
  x: number;
  y: number;
  s: number;
  fill: string;
  d: number;
}> = [
  { x: 34, y: 30, s: 1, fill: "#ffc94a", d: 0 },
  { x: 222, y: 44, s: 0.8, fill: "#7eaddb", d: 0.6 },
  { x: 380, y: 168, s: 1.1, fill: "#f49ac1", d: 1.2 },
  { x: 208, y: 196, s: 0.7, fill: "#ffc94a", d: 1.8 },
  { x: 18, y: 168, s: 0.75, fill: "#45b29d", d: 2.4 },
  { x: 300, y: 152, s: 0.6, fill: "#a98bdb", d: 0.9 },
];

/* Calendar cells: 4 columns x 2 rows; the last day is still open. `order` drives the stagger. */
const CELLS = Array.from({ length: 8 }, (_, i) => ({
  col: i % 4,
  row: Math.floor(i / 4),
  order: i < 7 ? i : -1,
}));

type VarStyle = CSSProperties & Record<`--${string}`, string | number>;

/** Row 3 art: turtle with a ringing reminder bell, a pulsing favorite heart, a calendar that
 *  fills with gentle checks, and a human jumping for joy. Fully decorative. */
export function SceneMotivation() {
  return (
    <div className="smv" data-dl-scene aria-hidden="true">
      <svg className="smv-props" viewBox="0 0 400 360" focusable="false">
        {/* soft backdrop + ground */}
        <path
          className="smv-blob"
          d="M200 46 C292 40 366 104 362 192 C358 268 296 318 206 318 C112 318 40 270 38 190 C36 106 108 52 200 46 Z"
          fill="#e3f4ef"
        />
        <ellipse cx="200" cy="334" rx="176" ry="16" fill="#e3f4ef" />
        <ellipse
          className="smv-shadow smv-shadow--human"
          cx="290"
          cy="334"
          rx="40"
          ry="7"
          fill="#c7e6dd"
        />

        {/* reminder bell */}
        <g className="smv-bell-wrap">
          <g className="smv-waves smv-waves--left">
            <path d="M48 72 Q36 92 48 112" />
            <path d="M32 62 Q16 92 32 122" />
          </g>
          <g className="smv-waves smv-waves--right">
            <path d="M162 72 Q174 92 162 112" />
            <path d="M178 62 Q194 92 178 122" />
          </g>
          <g className="smv-bell">
            <rect x="99" y="22" width="12" height="18" rx="6" fill="#e0a91c" />
            <g className="smv-clapper">
              <rect
                x="102"
                y="110"
                width="6"
                height="22"
                rx="3"
                fill="#e0663f"
              />
              <circle cx="105" cy="136" r="10" fill="#ff8a65" />
              <circle cx="102" cy="133" r="3" fill="#ffd2c2" />
            </g>
            <path
              d="M105 36 C80 36 70 58 70 84 L70 106 L58 120 L152 120 L140 106 L140 84 C140 58 130 36 105 36 Z"
              fill="#ffc94a"
            />
            <path
              d="M84 56 C80 64 79 76 79 88 L79 104"
              stroke="#fff3cf"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <rect
              x="54"
              y="116"
              width="102"
              height="14"
              rx="7"
              fill="#e0a91c"
            />
          </g>
        </g>

        {/* favorites heart */}
        <g transform="translate(206 120)">
          <g className="smv-heart">
            <path
              d="M0 22 C-38 -2 -42 -30 -22 -40 C-10 -46 0 -38 0 -28 C0 -38 10 -46 22 -40 C42 -30 38 -2 0 22 Z"
              fill="#f49ac1"
            />
            <path
              d="M-22 -30 C-28 -26 -30 -18 -26 -12"
              stroke="#fde1ee"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
          </g>
          <g className="smv-heart-ring">
            <circle r="44" fill="none" stroke="#f49ac1" strokeWidth="4" />
          </g>
        </g>

        {/* calendar with checks */}
        <g className="smv-calendar" transform="translate(256 30)">
          <rect x="0" y="6" width="116" height="104" rx="14" fill="#d4d4d4" />
          <rect
            x="0"
            y="0"
            width="116"
            height="104"
            rx="14"
            fill="#ffffff"
            stroke="#e5e5e5"
            strokeWidth="2"
          />
          <path
            d="M14 0 H102 A14 14 0 0 1 116 14 V28 H0 V14 A14 14 0 0 1 14 0 Z"
            fill="#ff8a65"
          />
          <rect x="28" y="-8" width="9" height="18" rx="4.5" fill="#3c4b4a" />
          <rect x="79" y="-8" width="9" height="18" rx="4.5" fill="#3c4b4a" />
          {CELLS.map(({ col, row, order }) => {
            const cx = 20 + col * 25.3;
            const cy = 50 + row * 30;
            const style: VarStyle = { "--i": order };
            return (
              <g key={`${col}-${row}`} transform={`translate(${cx} ${cy})`}>
                <circle r="10" fill="#f0f0f0" />
                {order >= 0 ? (
                  <g className="smv-check" style={style}>
                    <circle r="10" fill="#45b29d" />
                    <path
                      d="M-4.5 0.5 L-1.2 3.8 L4.6 -3.2"
                      stroke="#ffffff"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </g>
                ) : null}
              </g>
            );
          })}
        </g>

        {/* sparkles */}
        {SPARKLES.map((sp, i) => (
          <g key={i} transform={`translate(${sp.x} ${sp.y}) scale(${sp.s})`}>
            <path
              className="smv-sparkle"
              d={SPARKLE}
              fill={sp.fill}
              style={{ animationDelay: `${sp.d}s` } as CSSProperties}
            />
          </g>
        ))}
      </svg>

      <div className="smv-turtle">
        <Turtle pose="wave" />
      </div>
      <div className="smv-human">
        <Human variant="dewi" pose="jump" />
      </div>
    </div>
  );
}
