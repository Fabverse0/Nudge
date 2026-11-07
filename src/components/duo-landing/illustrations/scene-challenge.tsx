import {
  Human,
  Turtle,
} from "@/components/duo-landing/illustrations/characters";
import "./scene-challenge.css";

const confetti = [
  { left: "18%", color: "#ffc94a", delay: "0s", shape: "round" },
  { left: "30%", color: "#ff8a65", delay: "-0.8s", shape: "bar" },
  { left: "46%", color: "#7eaddb", delay: "-1.6s", shape: "round" },
  { left: "58%", color: "#f49ac1", delay: "-2.2s", shape: "bar" },
  { left: "72%", color: "#45b29d", delay: "-0.4s", shape: "round" },
  { left: "84%", color: "#a98bdb", delay: "-1.2s", shape: "bar" },
];

/** Big 2:00 countdown card, Tono and the turtle high-fiving below it. */
export function SceneChallenge() {
  return (
    <div className="scene-challenge" data-dl-scene aria-hidden="true">
      <svg
        className="scene-challenge__bg"
        viewBox="0 0 500 400"
        focusable="false"
      >
        <path
          d="M60 250c-30-90 40-190 170-200s230 50 220 160-80 170-210 170S80 330 60 250Z"
          fill="#e3f4ef"
        />
        <ellipse cx="250" cy="372" rx="190" ry="16" fill="#cfe9e1" />
      </svg>

      {confetti.map((c) => (
        <span
          key={c.left}
          className={`scene-challenge__confetti scene-challenge__confetti--${c.shape}`}
          style={{ left: c.left, background: c.color, animationDelay: c.delay }}
        />
      ))}

      <div className="scene-challenge__card">
        <svg
          className="scene-challenge__ring"
          viewBox="0 0 120 120"
          focusable="false"
        >
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#e5e5e5"
            strokeWidth="12"
          />
          <circle
            className="scene-challenge__progress"
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="#45b29d"
            strokeWidth="12"
            strokeLinecap="round"
            pathLength="100"
          />
        </svg>
        <span className="scene-challenge__time">
          <span className="scene-challenge__digits">2:00</span>
          <span className="scene-challenge__unit">menit</span>
        </span>
        <span className="scene-challenge__tag">siap, mulai!</span>
      </div>

      <svg
        className="scene-challenge__burst"
        viewBox="0 0 100 100"
        focusable="false"
      >
        <path
          d="M50 4l9 25 26-8-15 22 22 15-27 3 3 27-18-20-18 20 3-27-27-3 22-15-15-22 26 8Z"
          fill="#ffc94a"
        />
        <circle cx="50" cy="52" r="14" fill="#ffffff" />
      </svg>

      <div className="scene-challenge__tono">
        <Human variant="tono" pose="wave" />
      </div>
      <div className="scene-challenge__turtle">
        <Turtle pose="cheer" />
      </div>
    </div>
  );
}
