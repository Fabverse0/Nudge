"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

export function LandingAnimation({ name }: { name: "phone" | "diary" }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    const scene = element?.closest<HTMLElement>("[data-alive-scene]");
    const canvas = element?.querySelector<HTMLElement>(".motion-canvas");
    if (!element || !scene || !canvas) return;
    const abort = new AbortController();
    let player: AnimationItem | undefined;
    let disposed = false;
    let loading = false;
    let resting = false;
    let restTimer: ReturnType<typeof setTimeout> | undefined;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    function sync() {
      if (!player) return;
      const running = scene!.dataset.running === "true" && !preference.matches;
      if (running && resting) {
        if (!restTimer)
          restTimer = setTimeout(
            () => {
              restTimer = undefined;
              resting = false;
              player?.goToAndPlay(0, true);
            },
            name === "phone" ? 400 : 900,
          );
      } else if (running) player.play();
      else {
        player.pause();
        clearTimeout(restTimer);
        restTimer = undefined;
      }
      element!.dataset.playing = String(running);
    }
    async function load() {
      if (loading || preference.matches || disposed) return;
      loading = true;
      try {
        const [module, response] = await Promise.all([
          import("lottie-web/build/player/lottie_light"),
          fetch(`/brand/landing/motion/${name}.json`, { signal: abort.signal }),
        ]);
        if (!response.ok) throw new Error("Animation unavailable");
        const data = await response.json();
        if (disposed) return;
        player = module.default.loadAnimation({
          container: canvas!,
          renderer: "svg",
          loop: false,
          autoplay: false,
          animationData: data,
          rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
        });
        player.setSpeed(name === "phone" ? 0.65 : 0.95);
        player.addEventListener("complete", () => {
          resting = true;
          sync();
        });
        player.addEventListener("DOMLoaded", () => {
          if (disposed) return;
          element!.dataset.loaded = "true";
          sync();
        });
        player.addEventListener("data_failed", () => {
          element!.dataset.loaded = "false";
          player?.destroy();
          player = undefined;
        });
        sync();
      } catch {
        if (!disposed) element!.dataset.loaded = "false";
      }
    }
    const intersection = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) void load();
      },
      { rootMargin: "200px" },
    );
    intersection.observe(element);
    const mutation = new MutationObserver(() => {
      sync();
    });
    mutation.observe(scene, {
      attributes: true,
      attributeFilter: ["data-running"],
    });
    const onPreference = () => {
      sync();
      if (
        !preference.matches &&
        element.getBoundingClientRect().top < innerHeight + 200
      )
        void load();
    };
    preference.addEventListener("change", onPreference);
    return () => {
      disposed = true;
      abort.abort();
      clearTimeout(restTimer);
      intersection.disconnect();
      mutation.disconnect();
      preference.removeEventListener("change", onPreference);
      player?.destroy();
    };
  }, [name]);
  return (
    <div
      className={`landing-animation motion-${name}`}
      ref={root}
      data-motion-asset={name}
      aria-hidden="true"
    >
      <Image
        className="motion-poster"
        src={`/brand/landing/motion/${name}.svg`}
        width={1080}
        height={1080}
        alt=""
        loading="eager"
        unoptimized
      />
      <div className="motion-canvas" />
    </div>
  );
}
