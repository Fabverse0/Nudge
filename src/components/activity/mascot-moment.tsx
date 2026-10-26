"use client";
import { useEffect, useRef } from "react";
import { TurtleMascot } from "@/components/ui/turtle-mascot";
import { StepTrail } from "@/components/ui/step-trail";

export function MascotMoment({ kind }: { kind: "quick" | "complete" }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        element.dataset.visible = String(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={root}
      className={`mascot-moment ${kind === "complete" ? "completion-mark" : ""}`}
      data-studio-motion
      data-visible="false"
    >
      {kind === "complete" && <StepTrail className="completion-trail" />}
      <TurtleMascot
        pose={kind === "complete" ? "content" : "wave"}
        size={kind === "complete" ? 144 : 64}
        className="turtle-companion"
        eager
      />
    </div>
  );
}
