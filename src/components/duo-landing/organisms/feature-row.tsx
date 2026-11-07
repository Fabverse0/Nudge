import type { ReactNode } from "react";
import "./feature-row.css";

type Props = {
  id?: string;
  title: string;
  body: ReactNode;
  art: ReactNode;
  /** Put the art on the left on desktop (text stays second in the DOM). */
  reverse?: boolean;
};

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Duolingo-style alternating feature block: big lowercase heading + lead copy beside
 * a looping illustration. On phones the art stacks above the text.
 */
export function FeatureRow({ id, title, body, art, reverse = false }: Props) {
  const headingId = `${id ?? slug(title)}-title`;
  return (
    <section
      id={id}
      className={`dl-feature${reverse ? " dl-feature--reverse" : ""}`}
      aria-labelledby={headingId}
    >
      <div className="dl-container dl-feature__inner">
        <div className="dl-feature__art dl-reveal">{art}</div>
        <div className="dl-feature__text">
          <h2 id={headingId} className="dl-title dl-feature__title dl-reveal">
            {title}
          </h2>
          <div className="dl-lead dl-feature__body dl-reveal">{body}</div>
        </div>
      </div>
    </section>
  );
}
