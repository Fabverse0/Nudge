"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function LandingMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<Element>();
    const active = new Set<Animation>();
    const targets = root.querySelectorAll<HTMLElement>("[data-studio-motion]");
    const hero = root.querySelector<HTMLImageElement>(".studio-hero-art");
    const easing = "cubic-bezier(0.16, 1, 0.3, 1)";

    function play(element: HTMLElement, heroEntrance = false) {
      if (preference.matches || document.hidden || seen.has(element)) return;
      seen.add(element);
      if (!heroEntrance) {
        element.dataset.studioVisible = "true";
        return;
      }
      const animation = element.animate(
        [
          { opacity: 0.65, transform: "translate(-12px, 18px) scale(0.96)" },
          { opacity: 1, transform: "none" },
        ],
        {
          duration: 760,
          easing,
        },
      );
      active.add(animation);
      animation.onfinish = () => active.delete(animation);
      animation.oncancel = () => active.delete(animation);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || document.hidden || preference.matches)
            continue;
          play(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.16 },
    );

    function stop() {
      observer.disconnect();
      for (const target of targets)
        target.removeAttribute("data-studio-visible");
      for (const animation of active) animation.cancel();
      active.clear();
    }

    function startHero() {
      if (hero) play(hero, true);
    }

    function sync() {
      if (preference.matches || document.hidden) {
        stop();
        return;
      }
      for (const target of targets) {
        if (!seen.has(target)) observer.observe(target);
      }
      if (hero?.complete && hero.naturalWidth > 0) startHero();
    }

    sync();
    hero?.addEventListener("load", startHero);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      stop();
      hero?.removeEventListener("load", startHero);
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div ref={rootRef} className="landing landing-studio">
      {children}
    </div>
  );
}
