"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useSurfaceMotion } from "@/components/ui/use-surface-motion";

export function LandingMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useSurfaceMotion(rootRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<Element>();
    const active = new Set<Animation>();
    const targets = root.querySelectorAll<HTMLElement>(
      "[data-studio-motion], .studio-scene, .how-flow, .closing",
    );
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
          const target = entry.target as HTMLElement;
          if (!entry.isIntersecting) {
            target.getAnimations({ subtree: true }).forEach((animation) => {
              const animated = (animation.effect as KeyframeEffect | null)
                ?.target;
              if (animated instanceof Element)
                animated.setAttribute("data-motion-finished", "true");
              animation.cancel();
            });
            continue;
          }
          if (!entry.isIntersecting || document.hidden || preference.matches)
            continue;
          play(target);
        }
      },
      { threshold: 0.16 },
    );

    function stop() {
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
        observer.observe(target);
      }
      if (hero?.complete && hero.naturalWidth > 0) startHero();
    }

    sync();
    hero?.addEventListener("load", startHero);
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      stop();
      observer.disconnect();
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
