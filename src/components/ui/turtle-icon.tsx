import type { SVGProps } from "react";

export function TurtleIcon({
  size = 24,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <ellipse cx="14" cy="16" rx="9" ry="8" />
      <path d="M23 14c0-3 2-4 4-3 3 1 3 6 0 7l-4 1M8 10 6 7M18 9l2-3M8 22l-2 3M19 22l2 3M5 16H2" />
      <path d="m14 11 5 4-2 6h-6l-2-6 5-4Z" />
      <circle cx="27" cy="13.5" r=".7" fill="currentColor" stroke="none" />
    </svg>
  );
}
