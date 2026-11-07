import {
  Human,
  Turtle,
} from "@/components/duo-landing/illustrations/characters";
import "./scene-anywhere.css";

/** Puffy flat cloud, reused by the band scenes. Decorative. */
export function SceneCloud({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`scene-cloud ${className}`.trim()}
      viewBox="0 0 120 56"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M22 52h80a16 16 0 0 0 0-32 22 22 0 0 0-40-10 18 18 0 0 0-30 12A15 15 0 0 0 22 52Z"
        fill="#ffffff"
      />
      <path
        d="M22 52h80a16 16 0 0 0 13-6H12a15 15 0 0 0 10 6Z"
        fill="#e4eef6"
      />
    </svg>
  );
}

const backTowers = [
  { x: 30, w: 70, h: 120 },
  { x: 110, w: 54, h: 160 },
  { x: 175, w: 80, h: 100 },
  { x: 268, w: 60, h: 180 },
  { x: 340, w: 90, h: 130 },
  { x: 445, w: 56, h: 170 },
  { x: 512, w: 84, h: 110 },
  { x: 608, w: 62, h: 190 },
  { x: 682, w: 92, h: 124 },
  { x: 786, w: 58, h: 166 },
  { x: 856, w: 86, h: 116 },
  { x: 950, w: 50, h: 150 },
];

const frontHouses = [
  { x: 0, w: 120, h: 92, roof: "#7eaddb", body: "#ffffff" },
  { x: 132, w: 96, h: 120, roof: "#45b29d", body: "#f4ece1" },
  { x: 780, w: 110, h: 104, roof: "#ff8a65", body: "#ffffff" },
  { x: 900, w: 100, h: 128, roof: "#7eaddb", body: "#f4ece1" },
];

/** Wide city strip: skyline, houses, a bench, the turtle and two friends. */
export function SceneAnywhere() {
  const ground = 262;
  return (
    <div className="scene-anywhere" data-dl-scene aria-hidden="true">
      <div className="scene-anywhere__frame">
        <svg
          className="scene-anywhere__bg"
          viewBox="0 0 1000 300"
          preserveAspectRatio="xMidYMax meet"
          focusable="false"
        >
          {/* Sun peeking over the skyline */}
          <circle cx="840" cy="70" r="34" fill="#ffc94a" />
          <circle cx="840" cy="70" r="46" fill="#ffc94a" opacity="0.25" />

          {/* Back skyline */}
          {backTowers.map((t) => (
            <g key={t.x}>
              <rect
                x={t.x}
                y={ground - t.h}
                width={t.w}
                height={t.h}
                rx="8"
                fill="#bcdcf0"
              />
              {Array.from({ length: Math.floor(t.h / 34) }).map((_, row) => (
                <rect
                  key={row}
                  className={
                    (t.x + row) % 3 === 0 ? "scene-anywhere__lit" : undefined
                  }
                  x={t.x + t.w / 2 - 12}
                  y={ground - t.h + 16 + row * 34}
                  width="24"
                  height="12"
                  rx="4"
                  fill="#ffffff"
                  opacity="0.75"
                />
              ))}
            </g>
          ))}

          {/* Front houses at the edges */}
          {frontHouses.map((h) => (
            <g key={h.x}>
              <rect
                x={h.x}
                y={ground - h.h}
                width={h.w}
                height={h.h}
                rx="10"
                fill={h.body}
              />
              <path
                d={`M${h.x - 6} ${ground - h.h + 8} L${h.x + h.w / 2} ${
                  ground - h.h - 34
                } L${h.x + h.w + 6} ${ground - h.h + 8} Z`}
                fill={h.roof}
                strokeLinejoin="round"
                stroke={h.roof}
                strokeWidth="10"
              />
              <rect
                x={h.x + 18}
                y={ground - h.h + 26}
                width="30"
                height="26"
                rx="6"
                fill="#ffc94a"
                className="scene-anywhere__lit"
              />
              <rect
                x={h.x + h.w - 44}
                y={ground - 46}
                width="26"
                height="46"
                rx="8"
                fill="#315f5e"
              />
            </g>
          ))}

          {/* Round bushes */}
          <circle cx="250" cy={ground - 10} r="26" fill="#45b29d" />
          <circle cx="282" cy={ground - 4} r="18" fill="#2f8a78" />
          <circle cx="740" cy={ground - 8} r="24" fill="#45b29d" />

          {/* Street */}
          <rect x="0" y={ground} width="1000" height="14" fill="#e6d4be" />
          <rect x="0" y={ground + 14} width="1000" height="30" fill="#45b29d" />
          <rect
            x="0"
            y={ground + 14}
            width="1000"
            height="6"
            fill="#2f8a78"
            opacity="0.5"
          />

          {/* Bench for Tono */}
          <g>
            <rect
              x="590"
              y="214"
              width="130"
              height="14"
              rx="7"
              fill="#c9ae8a"
            />
            <rect
              x="590"
              y="232"
              width="130"
              height="10"
              rx="5"
              fill="#c9ae8a"
            />
            <rect
              x="602"
              y="240"
              width="10"
              height="24"
              rx="4"
              fill="#315f5e"
            />
            <rect
              x="698"
              y="240"
              width="10"
              height="24"
              rx="4"
              fill="#315f5e"
            />
          </g>
        </svg>

        <SceneCloud className="scene-anywhere__cloud scene-anywhere__cloud--a" />
        <SceneCloud className="scene-anywhere__cloud scene-anywhere__cloud--b" />
        <SceneCloud className="scene-anywhere__cloud scene-anywhere__cloud--c" />

        <div className="scene-anywhere__actor scene-anywhere__actor--lina">
          <Human variant="lina" pose="walk" />
          <span className="scene-anywhere__chip scene-anywhere__chip--a">
            <PhoneGlyph /> 2 mnt
          </span>
        </div>
        <div className="scene-anywhere__actor scene-anywhere__actor--turtle">
          <Turtle pose="walk" />
        </div>
        <div className="scene-anywhere__actor scene-anywhere__actor--tono">
          <Human variant="tono" pose="sit" />
          <span className="scene-anywhere__chip scene-anywhere__chip--b">
            <PhoneGlyph /> jeda
          </span>
        </div>
      </div>
    </div>
  );
}

function PhoneGlyph() {
  return (
    <svg viewBox="0 0 16 22" width="12" height="16" focusable="false">
      <rect x="1" y="1" width="14" height="20" rx="4" fill="currentColor" />
      <rect x="4" y="4" width="8" height="11" rx="2" fill="#ffffff" />
      <circle cx="8" cy="18" r="1.4" fill="#ffffff" />
    </svg>
  );
}
