"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRightIcon, CheckIcon } from "@phosphor-icons/react";

const previews = {
  2: {
    title: "Kembalikan lima benda",
    copy: "Satu benda, lalu satu lagi. Cukup mulai dari yang ada di dekatmu.",
    category: "Produktif ringan",
  },
  5: {
    title: "Jalan santai sebentar",
    copy: "Letakkan ponsel. Langkahkan kaki di rumah atau jalur aman di dekatmu.",
    category: "Bergerak",
  },
  10: {
    title: "Jeda tanpa layar",
    copy: "Cari posisi nyaman. Perhatikan sekitar dan beri pikiranmu sedikit ruang.",
    category: "Refleksi/jeda layar",
  },
};
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function ActivityPreview() {
  const interactive = useSyncExternalStore(
    subscribe,
    clientSnapshot,
    serverSnapshot,
  );
  const [minutes, setMinutes] = useState<2 | 5 | 10>(5);
  const previewRef = useRef<HTMLDivElement>(null);
  const previousMinutes = useRef(minutes);
  const item = previews[minutes];

  useEffect(() => {
    if (previousMinutes.current === minutes) return;
    previousMinutes.current = minutes;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.hidden
    )
      return;
    const animation = previewRef.current?.animate(
      [
        { opacity: 0.65, transform: "translateY(8px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 220, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
    );
    const stop = () => animation?.cancel();
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    preference.addEventListener("change", stop);
    document.addEventListener("visibilitychange", stop);
    return () => {
      stop();
      preference.removeEventListener("change", stop);
      document.removeEventListener("visibilitychange", stop);
    };
  }, [minutes]);
  return (
    <section
      className="hero-demo studio-demo content-width"
      aria-label="Coba pilihan waktu"
    >
      <div className="studio-duration">
        <fieldset className="demo-duration" disabled={!interactive}>
          <legend>Punya waktu berapa menit?</legend>
          <div>
            {([2, 5, 10] as const).map((time) => (
              <label key={time}>
                <input
                  type="radio"
                  name="preview-time"
                  checked={minutes === time}
                  onChange={() => setMinutes(time)}
                />
                <span>
                  {time}
                  <small>menit</small>
                  <CheckIcon
                    size={14}
                    className="demo-selection"
                    aria-hidden="true"
                  />
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <Link href={`/app?minutes=${minutes}`} className="demo-link">
          Pilih kegiatanku
          <ArrowUpRightIcon size={20} aria-hidden="true" />
        </Link>
        <p className="studio-preview-note">
          {interactive
            ? "Pilihan waktumu akan dibawa ke Nudge."
            : "Contoh ini memakai lima menit. Buka Nudge untuk memilih waktu kegiatanmu."}
        </p>
      </div>
      <div
        ref={previewRef}
        className="demo-activity"
        aria-live="polite"
        aria-atomic="true"
      >
        <h2>{item.title}</h2>
        <p className="small">Contoh kegiatan · {item.category}</p>
        <p>{item.copy}</p>
      </div>
    </section>
  );
}
