"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { CheckCircleIcon } from "@phosphor-icons/react";
import { LandingScene } from "./landing-scene";
import { StartActivityIcon } from "./start-activity-icon";

const subscribe = () => () => {};
const examples = {
  2: [
    "Kembalikan lima benda",
    "Satu benda, lalu satu lagi. Mulai dari yang ada di dekatmu.",
  ],
  5: [
    "Jalan santai sebentar",
    "Letakkan ponsel. Langkahkan kaki di rumah atau jalur aman di dekatmu.",
  ],
  10: [
    "Jeda tanpa layar",
    "Cari posisi nyaman dan beri pandanganmu jeda dari layar.",
  ],
} as const;

export function AliveDuration() {
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [minutes, setMinutes] = useState<2 | 5 | 10>(5);
  return (
    <section
      className="alive-section alive-duration"
      id="cara-pakai"
      aria-labelledby="time-title"
    >
      <div className="alive-copy">
        <h2 id="time-title">Ada dua menit?</h2>
        <p>
          Kegiatan kecil bisa dimulai dari waktu yang kamu punya. Pilih tujuan
          dan waktu, dengan mood yang boleh dilewati.
        </p>
        <fieldset className="alive-time-picker" disabled={!ready}>
          <legend>Punya waktu berapa menit?</legend>
          <div className="alive-time-options">
            {([2, 5, 10] as const).map((time) => (
              <label key={time}>
                <input
                  type="radio"
                  name="preview-time"
                  value={time}
                  checked={minutes === time}
                  onChange={() => setMinutes(time)}
                />
                <span>
                  {time}
                  <small>menit</small>
                  <CheckCircleIcon size={21} weight="fill" aria-hidden="true" />
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="alive-example" aria-live="polite" aria-atomic="true">
          <p className="alive-example-label">Contoh kegiatan</p>
          <h3>{examples[minutes][0]}</h3>
          <p>{examples[minutes][1]}</p>
        </div>
        <Link
          href={`/app?minutes=${minutes}`}
          className="alive-button alive-button-outline"
        >
          Lanjut ke Nudge
          <StartActivityIcon />
        </Link>
        <p className="alive-note">
          {ready
            ? "Hanya pilihan waktumu yang dibawa. Kamu memilih tujuan di Nudge."
            : "Contoh ini memakai lima menit. Buka Nudge untuk memilih waktu kegiatanmu."}
        </p>
      </div>
      <LandingScene kind="time" minutes={minutes} />
    </section>
  );
}
