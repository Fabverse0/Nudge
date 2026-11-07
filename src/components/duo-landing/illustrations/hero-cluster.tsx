"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import {
  Human,
  Turtle,
} from "@/components/duo-landing/illustrations/characters";
import {
  AlarmClock,
  Notebook,
  PausePhone,
  PottedPlant,
  Sneaker,
  Sparkle,
  WaterGlass,
} from "./hero-props";
import "./hero-cluster.css";

type Item = {
  id: string;
  /** Position and width as a percentage of the cluster box. */
  x: number;
  y: number;
  w: number;
  /** Parallax depth: 0 = far, 1 = near. */
  depth: number;
  /** Float loop duration (s), delay (s), tilt (deg), lift (px). */
  dur: number;
  delay: number;
  rot: number;
  amp: number;
  /** Staggered pop-in delay (ms). */
  pop: number;
  z: number;
  kind?: "char" | "prop" | "spark" | "blob";
  art: ReactNode;
};

const ITEMS: Item[] = [
  {
    id: "blob-a",
    x: 14,
    y: 12,
    w: 74,
    depth: 0.15,
    dur: 9,
    delay: 0,
    rot: 4,
    amp: 6,
    pop: 0,
    z: 0,
    kind: "blob",
    art: <span className="hc-blob hc-blob--green" />,
  },
  {
    id: "blob-b",
    x: 58,
    y: 58,
    w: 34,
    depth: 0.25,
    dur: 7,
    delay: -2,
    rot: -6,
    amp: 8,
    pop: 20,
    z: 0,
    kind: "blob",
    art: <span className="hc-blob hc-blob--sky" />,
  },

  {
    id: "dewi",
    x: 41,
    y: -3,
    w: 16,
    depth: 0.35,
    dur: 4.4,
    delay: -1.2,
    rot: 3,
    amp: 10,
    pop: 100,
    z: 2,
    kind: "char",
    art: <Human variant="dewi" pose="stretch" />,
  },
  {
    id: "lina",
    x: 0,
    y: 6,
    w: 19,
    depth: 0.55,
    dur: 3.6,
    delay: -0.4,
    rot: -4,
    amp: 12,
    pop: 70,
    z: 3,
    kind: "char",
    art: <Human variant="lina" pose="wave" />,
  },
  {
    id: "bima",
    x: 79,
    y: 1,
    w: 19,
    depth: 0.6,
    dur: 2.8,
    delay: -1.6,
    rot: 5,
    amp: 16,
    pop: 90,
    z: 3,
    kind: "char",
    art: <Human variant="bima" pose="jump" />,
  },
  {
    id: "sari",
    x: 1,
    y: 59,
    w: 21,
    depth: 0.7,
    dur: 4.8,
    delay: -2.4,
    rot: 3,
    amp: 8,
    pop: 120,
    z: 4,
    kind: "char",
    art: <Human variant="sari" pose="sit" />,
  },
  {
    id: "raka",
    x: 80,
    y: 60,
    w: 19,
    depth: 0.75,
    dur: 3.2,
    delay: -0.8,
    rot: -3,
    amp: 10,
    pop: 140,
    z: 4,
    kind: "char",
    art: <Human variant="raka" pose="walk" />,
  },
  {
    id: "tono",
    x: 25,
    y: 73,
    w: 14,
    depth: 0.9,
    dur: 4.1,
    delay: -3,
    rot: -5,
    amp: 9,
    pop: 150,
    z: 6,
    kind: "char",
    art: <Human variant="tono" pose="write" />,
  },

  {
    id: "turtle",
    x: 23,
    y: 19,
    w: 56,
    depth: 0.45,
    dur: 3.4,
    delay: 0,
    rot: 2,
    amp: 14,
    pop: 50,
    z: 5,
    kind: "char",
    art: <Turtle pose="cheer" />,
  },

  {
    id: "clock",
    x: 24,
    y: 9,
    w: 11,
    depth: 0.8,
    dur: 2.6,
    delay: -0.6,
    rot: 10,
    amp: 10,
    pop: 180,
    z: 6,
    kind: "prop",
    art: <AlarmClock />,
  },
  {
    id: "phone",
    x: 66,
    y: 12,
    w: 10,
    depth: 0.85,
    dur: 3.8,
    delay: -1.4,
    rot: -9,
    amp: 12,
    pop: 190,
    z: 6,
    kind: "prop",
    art: <PausePhone />,
  },
  {
    id: "notebook",
    x: 4,
    y: 41,
    w: 12,
    depth: 0.65,
    dur: 4.6,
    delay: -2,
    rot: 8,
    amp: 9,
    pop: 210,
    z: 6,
    kind: "prop",
    art: <Notebook />,
  },
  {
    id: "glass",
    x: 87,
    y: 40,
    w: 10,
    depth: 0.7,
    dur: 3,
    delay: -0.2,
    rot: -7,
    amp: 11,
    pop: 220,
    z: 6,
    kind: "prop",
    art: <WaterGlass />,
  },
  {
    id: "plant",
    x: 44,
    y: 82,
    w: 11,
    depth: 0.95,
    dur: 5,
    delay: -1,
    rot: 5,
    amp: 7,
    pop: 240,
    z: 7,
    kind: "prop",
    art: <PottedPlant />,
  },
  {
    id: "sneaker",
    x: 62,
    y: 86,
    w: 13,
    depth: 1,
    dur: 2.9,
    delay: -2.2,
    rot: -10,
    amp: 10,
    pop: 260,
    z: 7,
    kind: "prop",
    art: <Sneaker />,
  },

  {
    id: "spark-1",
    x: 36,
    y: 4,
    w: 5,
    depth: 0.9,
    dur: 2.6,
    delay: -0.3,
    rot: 30,
    amp: 6,
    pop: 280,
    z: 8,
    kind: "spark",
    art: <Sparkle />,
  },
  {
    id: "spark-2",
    x: 77,
    y: 33,
    w: 4,
    depth: 0.95,
    dur: 3.1,
    delay: -1.1,
    rot: -30,
    amp: 8,
    pop: 300,
    z: 8,
    kind: "spark",
    art: <Sparkle color="#f49ac1" />,
  },
  {
    id: "spark-3",
    x: 18,
    y: 54,
    w: 4,
    depth: 0.8,
    dur: 2.8,
    delay: -1.9,
    rot: 25,
    amp: 6,
    pop: 310,
    z: 8,
    kind: "spark",
    art: <Sparkle color="#7eaddb" />,
  },
  {
    id: "spark-4",
    x: 74,
    y: 80,
    w: 5,
    depth: 1,
    dur: 3.4,
    delay: -0.7,
    rot: -20,
    amp: 7,
    pop: 330,
    z: 8,
    kind: "spark",
    art: <Sparkle />,
  },
  {
    id: "spark-5",
    x: 60,
    y: 2,
    w: 3.5,
    depth: 0.7,
    dur: 2.7,
    delay: -2.5,
    rot: 40,
    amp: 5,
    pop: 340,
    z: 8,
    kind: "spark",
    art: <Sparkle color="#a98bdb" />,
  },
];

/**
 * Hero collage: the Nudge turtle cheering in the middle of a floating crowd
 * of people and small "pause" props. Each piece pops in, then loops its own
 * float; on desktop with a fine pointer the layers drift by depth.
 */
export function HeroCluster({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // Keep the scene playing while on screen even if no global observer runs.
    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        ([entry]) => root.classList.toggle("is-playing", entry.isIntersecting),
        { threshold: 0.05 },
      );
      io.observe(root);
    } else {
      root.classList.add("is-playing");
    }

    const mq = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let raf = 0;
    let tx = 0;
    let ty = 0;
    const apply = () => {
      raf = 0;
      root.style.setProperty("--px", tx.toFixed(3));
      root.style.setProperty("--py", ty.toFixed(3));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (event: PointerEvent) => {
      if (!mq.matches || event.pointerType !== "mouse") return;
      tx = (event.clientX / window.innerWidth) * 2 - 1;
      ty = (event.clientY / window.innerHeight) * 2 - 1;
      schedule();
    };
    const reset = () => {
      tx = 0;
      ty = 0;
      schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    mq.addEventListener("change", reset);

    return () => {
      io?.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", reset);
      mq.removeEventListener("change", reset);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`hc ${className}`.trim()}
      data-dl-scene
      aria-hidden="true"
    >
      {ITEMS.map((item) => (
        <div
          key={item.id}
          className={`hc-item hc-item--${item.kind ?? "char"} hc-${item.id}`}
          style={
            {
              left: `${item.x}%`,
              top: `${item.y}%`,
              width: `${item.w}%`,
              zIndex: item.z,
              "--depth": item.depth,
              "--dur": `${item.dur}s`,
              "--delay": `${item.delay}s`,
              "--rot": `${item.rot}deg`,
              "--amp": `${item.amp}px`,
              "--pop": `${item.pop}ms`,
            } as CSSProperties
          }
        >
          <div className="hc-par">
            <div className="hc-pop">
              {item.id === "turtle" ? <span className="hc-shadow" /> : null}
              <div className="hc-float">
                <div className="hc-wig">{item.art}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
