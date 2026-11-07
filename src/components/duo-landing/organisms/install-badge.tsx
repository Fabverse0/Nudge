"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

/**
 * Store-badge style button that opens a small popover explaining how to add
 * Nudge to the phone home screen. Escape, the close button or a click outside
 * closes it; focus returns to the badge.
 */
export function InstallBadge() {
  const [open, setOpen] = useState(false);
  const badgeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) badgeRef.current?.focus();
  }, []);

  // Open when someone lands on #cara-pasang (for example from the header).
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === "#cara-pasang") setOpen(true);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !badgeRef.current?.contains(target)
      ) {
        close(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  return (
    <div className="anywhere-badge-wrap">
      <button
        ref={badgeRef}
        type="button"
        className="anywhere-badge"
        aria-expanded={open}
        aria-controls="cara-pasang"
        aria-haspopup="dialog"
        onClick={() => setOpen((value) => !value)}
      >
        <HomeScreenIcon />
        <span className="anywhere-badge__text">
          <span className="anywhere-badge__small">Pasang di</span>
          <span className="anywhere-badge__big">Layar utama HP</span>
        </span>
      </button>

      <div
        ref={panelRef}
        id="cara-pasang"
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="anywhere-pop"
        hidden={!open}
      >
        <p id={titleId} className="anywhere-pop__title">
          Pasang Nudge dalam 3 ketukan
        </p>
        <ol className="anywhere-pop__steps">
          <li>
            <span className="anywhere-pop__num">1</span>
            Buka menu browser (ikon titik tiga atau tombol bagikan).
          </li>
          <li>
            <span className="anywhere-pop__num">2</span>
            Pilih <strong>Tambahkan ke layar utama</strong>.
          </li>
          <li>
            <span className="anywhere-pop__num">3</span>
            Ketuk ikon kura-kura Nudge kapan pun kamu butuh jeda.
          </li>
        </ol>
        <button
          type="button"
          className="anywhere-pop__close"
          onClick={() => close()}
        >
          Oke, paham
        </button>
      </div>
    </div>
  );
}

function HomeScreenIcon() {
  return (
    <svg
      className="anywhere-badge__icon"
      viewBox="0 0 32 40"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="2" width="26" height="36" rx="7" fill="#ffffff" />
      <rect x="7" y="7" width="8" height="8" rx="3" fill="#45b29d" />
      <rect x="17" y="7" width="8" height="8" rx="3" fill="#7eaddb" />
      <rect x="7" y="17" width="8" height="8" rx="3" fill="#ffc94a" />
      <path
        d="M21 17v8M17 21h8"
        stroke="#ff8a65"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="12" y="31" width="8" height="3" rx="1.5" fill="#c9ae8a" />
    </svg>
  );
}
