import Link from "next/link";
import Image from "next/image";
import { TurtleMascot } from "./ui/turtle-mascot";

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Nudge, beranda">
      <TurtleMascot pose="symbol" size={44} eager />
      <Image
        src="/brand/logo/nudge-wordmark.svg"
        width={102}
        height={33}
        alt=""
        className="brand-wordmark"
      />
    </Link>
  );
}
