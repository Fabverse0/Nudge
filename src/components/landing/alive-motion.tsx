"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function AliveMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const scenes = Array.from(
      element.querySelectorAll<HTMLElement>("[data-alive-scene]"),
    );
    const visible = new Set<Element>();
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function sync() {
      for (const scene of scenes) {
        scene.dataset.running = String(
          visible.has(scene) && !document.hidden && !preference.matches,
        );
      }
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.12)
            visible.add(entry.target);
          else visible.delete(entry.target);
        }
        sync();
      },
      { threshold: [0, 0.12, 0.35] },
    );
    scenes.forEach((scene) => observer.observe(scene));
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      scenes.forEach((scene) => {
        scene.dataset.running = "false";
      });
    };
  }, []);
  return (
    <div ref={root} className="nudge-alive">
      {children}
    </div>
  );
}
