# Sapaan C1 pada hero

## Keputusan dan lingkup

Pengguna memilih C1 2D yang dapat bergerak lebih ekspresif untuk menggantikan potret 3D hero. Identitas C1, Nunito, dan palet sage, sand, serta biru dipertahankan. Penutup tetap memakai potret 3D. Route aplikasi dan datanya tidak diubah.

Ilustrasi dibuat sebagai SVG di `src/components/landing/hero-story.tsx`, dengan koreografi CSS terpisah. Tidak ada video, dependensi baru, atau unduhan aset pihak ketiga.

## Koreografi

Siklus 10,8 detik memperlihatkan C1 melirik ponsel, menghadap pengunjung, mengangkat kaki depan untuk menyapa, dan tersenyum. Kepala, mata, serta tubuh bergerak dengan jeda berbeda. Kaki yang menapak tetap di tanah. Ponsel bergeser ke samping, buku muncul dan membuka halaman, lalu pose kembali tenang.

Ilustrasi merupakan tombol dengan petunjuk “Sapa Nudge”. Klik atau Enter memulai ulang sapaan. Tombol memiliki nama aksesibel dan status pengulangan untuk pembaca layar. Replay dinonaktifkan sebelum hidrasi; tanpa JavaScript, ilustrasi tetap tersedia sebagai komposisi statis.

Lifecycle mengikuti `AliveMotion`: animasi dijeda ketika adegan keluar viewport atau tab tersembunyi. CSS reduced motion mematikan animasi dan mempertahankan susunan statis.

## Bukti pemeriksaan

- TypeScript `npm run typecheck` lulus.
- ESLint pada komponen hero, integrasi adegan, dan halaman landing lulus.
- Detektor Impeccable pada komponen dan CSS hero mengembalikan daftar temuan kosong.
- Preview desktop memperlihatkan animasi kepala, kaki, tubuh, dan halaman berjalan.
- Replay melalui klik dan Enter berhasil; status pengulangan muncul.
- Viewport 320 dan 390 px diperiksa tanpa overflow horizontal.
- Setelah berpindah ke bagian cara pakai, adegan hero menjadi tidak aktif dan animasinya berstatus paused.
- Log error browser pada pemeriksaan tersebut kosong.

Build produksi dan suite otomatis penuh tidak dijalankan untuk revisi ini. Reduced motion dan fallback tanpa JavaScript tersedia pada kode, tetapi belum diperiksa ulang melalui browser pada revisi ini. Kelancaran di Android fisik serta penilaian estetika akhir masih memerlukan peninjauan pengguna.
