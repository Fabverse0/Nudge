"use client";

import { useEffect, type RefObject } from "react";

export function useSurfaceMotion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const entranceTargets =
      ".screen-focus, .selection-step, .turtle-mascot, .step-trail ellipse, .shell-echo, [data-studio-motion]";
    function finishEntrance(event: AnimationEvent) {
      const target = event.target;
      if (target instanceof Element && target.matches(entranceTargets)) {
        target.setAttribute("data-motion-finished", "true");
      }
    }
    function sync() {
      if (!root) return;
      const allowed = !preference.matches && !document.hidden;
      if (!allowed) {
        root.getAnimations({ subtree: true }).forEach((animation) => {
          const target = (animation.effect as KeyframeEffect | null)?.target;
          if (target instanceof Element && target.matches(entranceTargets)) {
            target.setAttribute("data-motion-finished", "true");
          }
          animation.cancel();
        });
      }
      root.dataset.motionAllowed = String(allowed);
    }
    root.addEventListener("animationend", finishEntrance);
    sync();
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      preference.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      root.removeEventListener("animationend", finishEntrance);
      root
        .getAnimations({ subtree: true })
        .forEach((animation) => animation.cancel());
    };
  }, [rootRef]);
}
