import Link from "next/link";
import { TurtleIcon } from "./ui/turtle-icon";

export function Brand() {
  return <Link href="/" className="brand" aria-label="Nudge, beranda"><TurtleIcon size={34} aria-hidden="true" /><span>nudge<span className="brand-period">.</span></span></Link>;
}
