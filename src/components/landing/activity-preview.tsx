"use client";
import Link from "next/link";
import { useState } from "react";
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
export function ActivityPreview() {
  const [minutes, setMinutes] = useState<2 | 5 | 10>(5);
  const item = previews[minutes];
  return (
    <section
      className="hero-demo studio-demo content-width"
      aria-label="Coba pilihan waktu"
    >
      <div className="studio-duration">
        <fieldset className="demo-duration">
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
      </div>
      <div className="demo-activity" aria-live="polite">
        <p className="small">Contoh kegiatan · {item.category}</p>
        <h2>{item.title}</h2>
        <p>{item.copy}</p>
      </div>
    </section>
  );
}
