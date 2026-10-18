"use client";
import Link from "next/link";
import { useState } from "react";
import { CheckIcon, ClockIcon, FootprintsIcon, LeafIcon } from "@phosphor-icons/react";

const previews = {
  2: { title: "Kembalikan lima benda", copy: "Satu benda, lalu satu lagi. Cukup mulai dari yang ada di dekatmu.", category: "Produktif ringan", icon: <CheckIcon size={36} /> },
  5: { title: "Jalan santai sebentar", copy: "Letakkan ponsel. Langkahkan kaki di rumah atau jalur aman di dekatmu.", category: "Bergerak", icon: <FootprintsIcon size={36} /> },
  10: { title: "Jeda tanpa layar", copy: "Cari posisi nyaman. Perhatikan sekitar dan beri pikiranmu sedikit ruang.", category: "Refleksi/jeda layar", icon: <LeafIcon size={36} /> },
};
export function ActivityPreview() {
  const [minutes, setMinutes] = useState<2 | 5 | 10>(5);
  const item = previews[minutes];
  return <div className="hero-demo"><div className="demo-topline"><span>Waktu kecil, ruang untukmu.</span><ClockIcon size={22} /></div><fieldset className="demo-duration"><legend>Punya waktu berapa menit?</legend><div>{([2, 5, 10] as const).map((time) => <label key={time}><input type="radio" name="preview-time" checked={minutes === time} onChange={() => setMinutes(time)} /><span>{time}<small>menit</small></span></label>)}</div></fieldset><div className="demo-activity" aria-live="polite"><div className="demo-symbol">{item.icon}</div><p className="small">Contoh kegiatan · {item.category}</p><h2>{item.title}</h2><p>{item.copy}</p></div><Link href={`/app?minutes=${minutes}`} className="demo-link">Pilih kegiatanku<span aria-hidden="true">↗</span></Link></div>;
}
