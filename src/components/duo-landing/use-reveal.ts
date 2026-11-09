"use client";

import { useEffect } from "react";

/**
 * Adds `is-visible` to every `.dl-reveal` element once it scrolls into view,
 * and toggles `is-playing` on `[data-dl-scene]` so looping illustrations
 * only animate while on screen.
 */
export function useReveal() {
  useEffect(() => {
    const reveal = document.querySelectorAll<HTMLElement>(".dl-reveal");
    const scenes = document.querySelectorAll<HTMLElement>("[data-dl-scene]");
    if (!("IntersectionObserver" in window)) {
      reveal.forEach((el) => el.classList.add("is-visible"));
      scenes.forEach((el) => el.classList.add("is-playing"));
      return;
    }
    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    const sceneObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-playing", entry.isIntersecting);
        }
      },
      { threshold: 0.05 },
    );
    reveal.forEach((el) => revealObserver.observe(el));
    scenes.forEach((el) => sceneObserver.observe(el));
    return () => {
      revealObserver.disconnect();
      sceneObserver.disconnect();
    };
  }, []);
}

export function RevealRoot() {
  useReveal();
  return null;
}
