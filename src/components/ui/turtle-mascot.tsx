import Image from "next/image";

const artwork = {
  idle: "/brand/mascot/nudge-turtle-idle.png",
  wave: "/brand/mascot/nudge-turtle-wave.png",
  think: "/brand/mascot/nudge-turtle-think.png",
  complete: "/brand/mascot/nudge-turtle-complete.png",
  tidy: "/brand/illustrations/nudge-turtle-tidy.png",
  move: "/brand/illustrations/nudge-turtle-move.png",
  journal: "/brand/illustrations/nudge-turtle-journal.png",
  symbol: "/brand/logo/nudge-symbol.png",
  pause: "/brand/small-steps/pause.webp",
  stretch: "/brand/small-steps/stretch.webp",
  content: "/brand/small-steps/content.webp",
} as const;

export function TurtleMascot({
  pose = "idle",
  size = 48,
  alt = "",
  className = "",
  eager = false,
}: {
  pose?: keyof typeof artwork;
  size?: number;
  alt?: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <Image
      src={artwork[pose]}
      alt={alt}
      width={size}
      height={size}
      sizes={`${size}px`}
      loading={eager ? "eager" : "lazy"}
      className={`turtle-mascot ${className}`}
      draggable={false}
    />
  );
}
