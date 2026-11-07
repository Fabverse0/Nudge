import Link from "next/link";
import type { ReactNode } from "react";
import "./dl-button.css";

type Variant = "primary" | "secondary" | "ghost" | "sun" | "white";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  external?: boolean;
};

/** Chunky 3D push button: a solid face sitting on a darker bottom edge. */
export function DlButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
}: Props) {
  const cls = `dl-btn dl-btn--${variant} dl-btn--${size} ${className}`.trim();
  if (external || href.startsWith("#")) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
