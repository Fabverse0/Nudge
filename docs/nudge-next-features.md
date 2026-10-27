# Penambahan fitur aplikasi Nudge

Disetujui pengguna 26 Oktober 2026. Implementasi bertahap, setiap perubahan kecil memakai Conventional Commit; push menunggu permintaan pengguna.

## Keputusan

- Pilihkan saja langsung memberi saran ringan 2 menit, dalam ruangan, tanpa alat. Variasi dalam sesi, tidak otomatis mulai.
- Alur biasa Mood, Tujuan, Energi, Waktu. Mood dan Energi opsional. Energi merupakan preferensi setelah kecocokan durasi, sebelum mood/feedback.
- Koleksi: tema, durasi, satu saran. Jeda setelah kuliah (refleksi), Beres kecil sebelum tidur (produktif), Bangkit dari kursi (bergerak). Setiap koleksi memiliki dua kegiatan per durasi 2/5/10 menit.
- Kurang cocok langsung memberi alternatif. Panel alasan menyebut kegiatan sebelumnya; alat yang tidak tersedia menjadi pembatas sesi, Terlalu berat memilih energi ringan, Sudah pernah mengecualikan kegiatan dalam sesi.
- Riwayat aktif otomatis, hanya setelah Selesai ditekan, maksimal 100 catatan terbaru. Simpan ID penyelesaian, ID/judul/tujuan/durasi kegiatan, waktu selesai. Tidak menyimpan mood, feedback, atau isi jurnal. Hapus satu/semua, matikan pencatatan, dan Coba lagi tersedia. Kegiatan yang hilang tetap terbaca tetapi tidak dapat dimulai.
- C1 memakai aset yang tersedia; respons sekali pada mulai cepat/selesai, menerima Lewati/Berhenti, timer statis, reduced motion dan offscreen dihormati.

## Status

- [x] Sinkronisasi keputusan produk/desain dan rencana implementasi.
- [x] Model energi, metadata katalog, pemeringkatan, dan langkah Energi.
- [x] Mulai cepat dan variasi kandidat.
- [x] Definisi koleksi, pemilihan durasi, dan alternatif dalam koleksi.
- [x] Alasan penolakan dalam sesi dan panel opsional.
- [x] Penyimpanan, pencatatan, dan layar riwayat lokal.
- [x] Respons maskot dan penyesuaian responsif.
- [x] Unit, browser, lint, format, typecheck, build, audit visual dan aksesibilitas otomatis untuk lingkup fitur ini.

## Pemeriksaan penerimaan

Durasi tepat tetap diutamakan dan batas waktu tidak dilampaui. Energi yang tidak tersedia dijelaskan. Alat yang tidak tersedia tidak dilonggarkan. Mulai, Selesai, serta penghapusan seluruh riwayat menunggu tindakan pengguna. Waktu habis, Berhenti, dan Ganti tidak mencatat penyelesaian. Satu penyelesaian tidak dicatat dua kali. Riwayat bertahan setelah reload, dibatasi 100, menangani data rusak/storage gagal, serta mengikuti perubahan antartab. Favorit/pengingat lama tetap dapat dibaca.

Periksa 320/390/768 px dan desktop, keyboard/fokus, teks besar, reduced motion, hydration, empat langkah maju/mundur, kedua Lewati, koleksi, alasan setelah pergantian, dan Coba lagi dari riwayat. Catat hasil aktual di bagian berikut; server Ready bukan bukti browser berfungsi.

## Bukti

Pemeriksaan akhir 27 Oktober 2026:

- Unit: 40 tes dalam 12 file lulus. Cakupan meliputi energi, prioritas durasi, mulai cepat, koleksi, alasan penolakan, batas alat, validasi/batas/deduplikasi riwayat.
- Suite produksi awal: 107 dari 118 skenario lulus. Sebelas kegagalan berasal dari asumsi harness tentang placeholder loading Next, mock Notification yang harus terpisah dari service worker, dan selector aset landing lama. Kesebelasnya lulus pada pemeriksaan ulang dengan `--last-failed --workers=1`.
- Pemeriksaan akhir `app-features.spec.ts`, `app-expressive.spec.ts`, dan `pwa.spec.ts`: 38 dari 42 skenario desktop/emulasi ponsel lulus pada putaran pertama. Empat kasus tersisa lulus saat diperiksa ulang setelah tes menunggu transisi klik selesai, memakai tombol landing aktual, dan memastikan controller service worker serta URL baru untuk navigasi offline. Ini bukti beberapa putaran terfokus, bukan satu putaran penuh tanpa kegagalan.
- Seluruh 24 kasus fitur baru, 10 kasus tampilan ekspresif, dan 8 kasus PWA akhirnya memiliki hasil lulus. Cakupan mencakup maju/mundur empat langkah, kedua Lewati, variasi mulai cepat, durasi 10 menit, alternatif koleksi, alasan setelah pergantian, persistensi/sinkronisasi riwayat, storage gagal, kegiatan yang hilang, dan penghapusan. Waktu habis/Berhenti/Ganti tidak mencatat penyelesaian.
- Axe tidak menemukan pelanggaran pada permukaan baru yang diperiksa. Alur yang diperiksa tidak menghasilkan console/page error atau hydration error. Ukuran 320/390/768/1440 px diperiksa; suite regresi awal juga memeriksa pembesaran CSS 200%.
- Respons C1 sekali selesai, offscreen, reduced motion, dan timer statis lulus di kedua proyek. Probe browser tambahan mensimulasikan dokumen tersembunyi: `data-motion-allowed=false`, nol animasi maskot berjalan, dan kembali aktif setelah visibility dipulihkan.
- Format, TypeScript, dan ESLint lulus. File generator `next-env.d.ts` dikecualikan dari Prettier. Build produksi webpack dengan BUILD_ID `A-CPQoJ2wt4bRf73J2fXc` dibuat setelah CSS terakhir dan dipakai untuk pemeriksaan browser akhir.
- Audit visual meninjau pembuka/koleksi, Energi, dan riwayat pada 390 px serta hasil desktop. Detector Impeccable mencatat 13 advisory token pada CSS aplikasi yang sudah ada (8 ukuran huruf, 5 radius), tanpa severity error/warning. Nilai baru mengikuti Design Read di DESIGN.md; hasil ini tidak diklaim sebagai nol advisory.

Laporan JSON lokal: `.impeccable/review/next-features-production.json`, `next-features-rerun.json`, `next-features-final.json`, `next-features-final-rerun.json`, dan `next-features-detect.json`. Screenshot akhir: `features-home-390-desktop.png`, `app-expressive-energy-390-desktop.png`, serta `features-history-390-final.png` pada direktori yang sama. Artefak pemeriksaan lokal ini tidak disertakan dalam Git.

Lingkup enam penambahan fitur selesai. Instalasi/peluncuran ikon dan notifikasi pada Android fisik, pembaca layar nyata, serta publikasi HTTPS tetap mengikuti pekerjaan MVP yang sebelumnya ditunda. Hasil browser di atas tidak menggantikan pemeriksaan tersebut.
