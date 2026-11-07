"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import "./category-strip.css";

type Category = {
  label: string;
  color: string;
  glyph: ReactNode;
};

const W = {
  fill: "none",
  stroke: "#ffffff",
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const CATEGORIES: Category[] = [
  {
    label: "Bergerak",
    color: "#ff8a65",
    glyph: (
      <>
        <circle cx="23" cy="10.5" r="3" fill="#ffffff" />
        <path {...W} d="M21 15l-3 8 5 3-2 7M18 23l-5 2M21 15l5 4 4-1" />
      </>
    ),
  },
  {
    label: "Merapikan",
    color: "#ffc94a",
    glyph: (
      <>
        <rect x="11" y="18" width="18" height="12" rx="2.5" fill="#ffffff" />
        <path {...W} stroke="#ffffff" d="M9.5 14.5h21" />
        <path
          fill="none"
          stroke="#e0a91c"
          strokeWidth="2.6"
          strokeLinecap="round"
          d="M17 23h6"
        />
      </>
    ),
  },
  {
    label: "Journaling",
    color: "#7eaddb",
    glyph: (
      <>
        <rect x="11" y="9" width="16" height="22" rx="3" fill="#ffffff" />
        <path
          fill="none"
          stroke="#7eaddb"
          strokeWidth="2.2"
          strokeLinecap="round"
          d="M15 15h8M15 20h8M15 25h5"
        />
        <path {...W} strokeWidth={3.4} d="M30 13l-5 13" />
      </>
    ),
  },
  {
    label: "Jeda layar",
    color: "#a98bdb",
    glyph: (
      <>
        <rect x="13" y="8" width="14" height="24" rx="3.5" fill="#ffffff" />
        <path
          fill="none"
          stroke="#a98bdb"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 15h5l-5 6h5"
        />
        <circle cx="20" cy="28" r="1.4" fill="#a98bdb" />
      </>
    ),
  },
  {
    label: "Minum air",
    color: "#5aa8d6",
    glyph: (
      <>
        <path
          d="M12 10h16l-2.2 20a2 2 0 0 1-2 1.8h-7.6a2 2 0 0 1-2-1.8Z"
          fill="#ffffff"
        />
        <path d="M13.6 18h12.8l-1.4 12h-10Z" fill="#bfe3f7" />
        <circle cx="18" cy="23" r="1.3" fill="#ffffff" />
      </>
    ),
  },
  {
    label: "Peregangan",
    color: "#f49ac1",
    glyph: (
      <>
        <circle cx="20" cy="12" r="3" fill="#ffffff" />
        <path {...W} d="M12 8l8 9 8-9M20 17v6l-4 8M20 23l4 8" />
      </>
    ),
  },
  {
    label: "Napas tenang",
    color: "#45b29d",
    glyph: (
      <path {...W} d="M9 15h15a4 4 0 1 0-4-4M9 21h21a4 4 0 1 1-4 4M9 27h9" />
    ),
  },
  {
    label: "Jalan santai",
    color: "#c9ae8a",
    glyph: (
      <>
        <ellipse cx="15" cy="15" rx="4" ry="6" fill="#ffffff" />
        <ellipse cx="15" cy="24.5" rx="2.8" ry="2.4" fill="#ffffff" />
        <ellipse cx="25" cy="18" rx="4" ry="6" fill="#ffffff" />
        <ellipse cx="25" cy="27.5" rx="2.8" ry="2.4" fill="#ffffff" />
      </>
    ),
  },
  {
    label: "Menyiram tanaman",
    color: "#679f9e",
    glyph: (
      <>
        <path {...W} d="M20 31V19" />
        <path d="M20 21c-6 0-9-4-9-9 6 0 9 4 9 9Z" fill="#ffffff" />
        <path d="M20 19c0-5 3-8 9-8 0 5-3 8-9 8Z" fill="#dff1e9" />
        <path {...W} d="M14 31h12" />
      </>
    ),
  },
  {
    label: "Menggambar",
    color: "#e0663f",
    glyph: (
      <>
        <path d="M24.5 9.5l6 6L17 29l-7.5 1.5L11 23Z" fill="#ffffff" />
        <path d="M11 23l6 6-7.5 1.5Z" fill="#ffc94a" />
        <path
          fill="none"
          stroke="#e0663f"
          strokeWidth="2"
          strokeLinecap="round"
          d="M22 12l6 6"
        />
      </>
    ),
  },
];

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 12 20" aria-hidden="true" focusable="false">
      <path
        d={dir === "left" ? "M10 2 2 10l8 8" : "M2 2l8 8-8 8"}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CategoryStrip() {
  const listRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      if (!frame)
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          measure();
        });
    };
    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [measure]);

  const page = (dir: 1 | -1) => {
    const el = listRef.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollBy({
      left: dir * el.clientWidth * 0.9,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <nav className="dl-cats" aria-label="Kategori aktivitas">
      <div className="dl-cats__inner">
        <button
          type="button"
          className="dl-cats__nav dl-cats__nav--prev"
          onClick={() => page(-1)}
          disabled={atStart}
          aria-label="Kategori sebelumnya"
        >
          <Chevron dir="left" />
        </button>

        <ul className="dl-cats__list" ref={listRef}>
          {CATEGORIES.map((cat, i) => (
            <li key={cat.label} className="dl-cats__item">
              <Link
                href="/app"
                className="dl-cats__link"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <svg
                  className="dl-cats__icon"
                  viewBox="0 0 40 40"
                  aria-hidden="true"
                  focusable="false"
                >
                  <circle cx="20" cy="20" r="20" fill={cat.color} />
                  <ellipse
                    cx="20"
                    cy="33"
                    rx="14"
                    ry="5"
                    fill="#000000"
                    opacity="0.08"
                  />
                  {cat.glyph}
                </svg>
                <span className="dl-cats__label">{cat.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="dl-cats__nav dl-cats__nav--next"
          onClick={() => page(1)}
          disabled={atEnd}
          aria-label="Kategori berikutnya"
        >
          <Chevron dir="right" />
        </button>
      </div>
    </nav>
  );
}
