# Nudge

Teman untuk memulai satu kegiatan kecil ketika sedang gabut atau ingin jeda dari scrolling. Satu codebase untuk web responsif dan PWA, dengan antarmuka Bahasa Indonesia.

## Menjalankan lokal

Gunakan Node.js 22.12 atau lebih baru dan npm.

```powershell
npm ci
npm run dev
```

Buka [landing page](http://localhost:3000) atau [aplikasi](http://localhost:3000/app). Untuk build produksi:

```powershell
npm run build
npm start
```

## Pemeriksaan

```powershell
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
npm run test:pwa
npm run format:check
```

Playwright memakai Chrome yang sudah terpasang, dengan profil pengujian terpisah. `test:pwa` memerlukan build produksi terbaru dan port 3100 yang bebas untuk server sementara. Server pengembangan menggunakan port 3000. Pemasangan PWA dan izin OS pada perangkat fisik memerlukan pemeriksaan manual.

## Struktur dan data

- `src/app`: landing `/`, aplikasi `/app`, manifest, dan ikon PNG sementara.
- `src/components`: antarmuka dan integrasi browser.
- `src/lib`: katalog, rekomendasi, timer, sesi, penyimpanan, dan jadwal.
- `tests/e2e`: pemeriksaan alur browser serta PWA.
- `public`: service worker dan halaman offline.

Favorit dan pengaturan pengingat disimpan lokal pada browser/perangkat ini. Mood serta feedback hanya di memori sesi. Reload mengakhiri sesi aktif; timer tidak dipulihkan. Nudge tidak menyediakan kolom jurnal, akun, sinkronisasi, atau analitik pribadi.

Pengingat default nonaktif, meminta izin hanya setelah opt-in, dan membutuhkan aplikasi terbuka/berjalan. Jadwal terlewat tidak dikirim susulan. PWA membuka pemilihan `/app`, tanpa memulai timer. Pembukaan penuh saat offline belum didukung.

## Dokumen

Gunakan [PRD](./prd.md) untuk perilaku, [desain](./DESIGN.md) untuk identitas, [rencana implementasi](./implementation.md) untuk progres, dan [keputusan implementasi](./docs/implementation-decisions.md) untuk rincian teknis. Ikuti [panduan kontribusi](./AGENTS.md) sebelum mengubah proyek.

Tugas dan lembar hasil untuk pemasangan PWA, izin OS, dan observasi pengguna tersedia di [pemeriksaan manual](./docs/manual-checks.md).

Logo final dan ilustrasi maskot ditunda atas arahan pengguna. Ikon kura-kura garis dan ikon aplikasi `n.` adalah aset sementara untuk pengembangan. Nunito dan Phosphor dipakai dari paket resminya; pemberitahuan lisensi tersedia di [docs/licenses](./docs/licenses).
