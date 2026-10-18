"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="app-main empty-state">
      <h1>Nudge belum bisa dibuka.</h1>
      <p>
        Coba muat kembali halaman. Favorit yang tersimpan di browser tetap bisa
        dibaca saat aplikasi berhasil dibuka.
      </p>
      <button className="button primary" onClick={reset}>
        Coba lagi
      </button>
      <Link className="button secondary" href="/">
        Ke beranda
      </Link>
    </main>
  );
}
