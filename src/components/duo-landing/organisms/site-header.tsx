"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DlButton } from "@/components/duo-landing/atoms/dl-button";
import "./site-header.css";

const SHOW_CTA_AFTER = 420;

/** Small original turtle head used as the Nudge logo mark. */
function TurtleMark() {
  return (
    <svg
      className="dl-header__mark"
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6 26c0-11 8-19 18-19s18 8 18 19c0 2-1 3-3 3H9c-2 0-3-1-3-3Z"
        fill="#679f9e"
      />
      <path
        d="M11 24c1-8 6-13 13-13"
        fill="none"
        stroke="#8dbcbb"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ellipse cx="24" cy="31" rx="15" ry="12" fill="#e6d4be" />
      <ellipse cx="17" cy="30" rx="3.2" ry="4" fill="#4f8584" />
      <ellipse cx="31" cy="30" rx="3.2" ry="4" fill="#4f8584" />
      <circle cx="18" cy="28.6" r="1.2" fill="#f6ecdf" />
      <circle cx="32" cy="28.6" r="1.2" fill="#f6ecdf" />
      <path
        d="M19.5 36.5c2.8 2.4 6.2 2.4 9 0"
        fill="none"
        stroke="#4f8584"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <ellipse cx="12.5" cy="35" rx="2.4" ry="1.5" fill="#f2b8a2" />
      <ellipse cx="35.5" cy="35" rx="2.4" ry="1.5" fill="#f2b8a2" />
    </svg>
  );
}

export function SiteHeader() {
  const [showCta, setShowCta] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setShowCta(window.scrollY > SHOW_CTA_AFTER);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!langRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className={`dl-header${showCta ? " is-scrolled" : ""}`}>
      <div className="dl-header__inner">
        <Link href="/" className="dl-header__logo" aria-label="Nudge, beranda">
          <TurtleMark />
          <span className="dl-header__word">nudge</span>
        </Link>

        <div className="dl-header__right">
          <div className="dl-header__lang" ref={langRef}>
            <button
              type="button"
              className="dl-header__lang-btn"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              aria-controls="dl-lang-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="dl-header__lang-label">Bahasa situs:</span>{" "}
              Indonesia
              <svg
                className="dl-header__caret"
                viewBox="0 0 12 8"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M1.5 1.5 6 6l4.5-4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {menuOpen ? (
              <ul id="dl-lang-menu" className="dl-header__menu">
                <li>
                  <button
                    type="button"
                    className="dl-header__menu-item"
                    aria-current="true"
                    onClick={() => setMenuOpen(false)}
                    autoFocus
                  >
                    <span className="dl-header__flag" aria-hidden="true" />
                    Indonesia
                    <svg
                      className="dl-header__check"
                      viewBox="0 0 16 12"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        d="M1.5 6.5 6 10.5 14.5 1.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            ) : null}
          </div>

          <div
            className="dl-header__cta"
            aria-hidden={!showCta}
            inert={!showCta}
          >
            <DlButton href="/app">Mulai</DlButton>
          </div>
        </div>
      </div>
    </header>
  );
}
