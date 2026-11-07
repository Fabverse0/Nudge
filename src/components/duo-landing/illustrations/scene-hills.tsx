import {
  Human,
  Turtle,
} from "@/components/duo-landing/illustrations/characters";
import { SceneCloud } from "@/components/duo-landing/illustrations/scene-anywhere";
import "./scene-hills.css";

/* Each drifting layer repeats every 1000 units so a -50% loop is seamless. */
const BACK_HILLS =
  "M0 120C120 40 260 40 380 100S640 30 760 80 920 130 1000 120" +
  "C1120 40 1260 40 1380 100S1640 30 1760 80 1920 130 2000 120V200H0Z";
const MID_HILLS =
  "M0 110C90 60 200 50 300 90S520 140 640 80 860 50 1000 110" +
  "C1090 60 1200 50 1300 90S1520 140 1640 80 1860 50 2000 110V200H0Z";

const trees = [
  { left: "4%", size: "clamp(40px, 6vw, 84px)", tone: "a", delay: "0s" },
  { left: "27%", size: "clamp(28px, 4vw, 56px)", tone: "b", delay: "-1s" },
  { left: "68%", size: "clamp(34px, 5vw, 70px)", tone: "a", delay: "-2s" },
  { left: "91%", size: "clamp(44px, 6.5vw, 92px)", tone: "b", delay: "-0.5s" },
];

/** Rolling hills with a path where the turtle and three friends stroll. */
export function SceneHills() {
  return (
    <div className="scene-hills" data-dl-scene aria-hidden="true">
      <svg className="scene-hills__sun" viewBox="0 0 120 120" focusable="false">
        <g className="scene-hills__rays">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect
              key={i}
              x="56"
              y="2"
              width="8"
              height="18"
              rx="4"
              fill="#ffc94a"
              transform={`rotate(${i * 30} 60 60)`}
            />
          ))}
        </g>
        <circle cx="60" cy="60" r="30" fill="#ffc94a" />
        <circle cx="50" cy="56" r="3" fill="#e0a91c" />
        <circle cx="70" cy="56" r="3" fill="#e0a91c" />
        <path
          d="M50 68q10 8 20 0"
          stroke="#e0a91c"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <SceneCloud className="scene-hills__cloud scene-hills__cloud--a" />
      <SceneCloud className="scene-hills__cloud scene-hills__cloud--b" />

      <div className="scene-hills__layer scene-hills__layer--back">
        <svg
          viewBox="0 0 2000 200"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path d={BACK_HILLS} fill="#c6e8dc" />
        </svg>
      </div>
      <div className="scene-hills__layer scene-hills__layer--mid">
        <svg
          viewBox="0 0 2000 200"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path d={MID_HILLS} fill="#8fd2bf" />
        </svg>
      </div>

      {trees.map((t) => (
        <svg
          key={t.left}
          className={`scene-hills__tree scene-hills__tree--${t.tone}`}
          viewBox="0 0 60 90"
          style={{ left: t.left, width: t.size, animationDelay: t.delay }}
          focusable="false"
        >
          <rect x="26" y="52" width="8" height="38" rx="4" fill="#9a7a55" />
          <circle cx="30" cy="34" r="26" className="scene-hills__leaf" />
          <circle cx="20" cy="26" r="8" fill="#ffffff" opacity="0.18" />
        </svg>
      ))}

      <div className="scene-hills__front">
        <svg
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          focusable="false"
        >
          <path
            d="M0 40C160 0 320 10 500 30S840 60 1000 20V200H0Z"
            fill="#45b29d"
          />
          <path
            d="M0 92C200 70 380 74 520 86S820 104 1000 82V122C820 140 640 128 500 120S180 108 0 128Z"
            fill="#e6d4be"
          />
          <path
            d="M0 128C180 108 360 112 500 120S820 140 1000 122V130C820 148 640 136 500 128S180 116 0 136Z"
            fill="#c9ae8a"
          />
          <circle cx="90" cy="168" r="6" fill="#ffc94a" />
          <circle cx="300" cy="176" r="5" fill="#f49ac1" />
          <circle cx="640" cy="170" r="6" fill="#ffffff" />
          <circle cx="880" cy="178" r="5" fill="#ffc94a" />
        </svg>
      </div>

      <div className="scene-hills__walker scene-hills__walker--bima">
        <Human variant="bima" pose="walk" />
      </div>
      <div className="scene-hills__walker scene-hills__walker--turtle">
        <Turtle pose="walk" />
      </div>
      <div className="scene-hills__walker scene-hills__walker--dewi">
        <Human variant="dewi" pose="jump" />
      </div>
      <div className="scene-hills__walker scene-hills__walker--raka">
        <Human variant="raka" pose="wave" />
      </div>
    </div>
  );
}
