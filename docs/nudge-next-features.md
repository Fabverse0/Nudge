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
- [ ] Unit, browser, lint, format, typecheck, build, audit visual dan aksesibilitas.

## Pemeriksaan penerimaan

Durasi tepat tetap diutamakan dan batas waktu tidak dilampaui. Energi yang tidak tersedia dijelaskan. Alat yang tidak tersedia tidak dilonggarkan. Mulai, Selesai, serta penghapusan seluruh riwayat menunggu tindakan pengguna. Waktu habis, Berhenti, dan Ganti tidak mencatat penyelesaian. Satu penyelesaian tidak dicatat dua kali. Riwayat bertahan setelah reload, dibatasi 100, menangani data rusak/storage gagal, serta mengikuti perubahan antartab. Favorit/pengingat lama tetap dapat dibaca.

Periksa 320/390/768 px dan desktop, keyboard/fokus, teks besar, reduced motion, hydration, empat langkah maju/mundur, kedua Lewati, koleksi, alasan setelah pergantian, dan Coba lagi dari riwayat. Catat hasil aktual di bagian berikut; server Ready bukan bukti browser berfungsi.

## Bukti

Pemeriksaan awal: 40 tes unit lulus. Suite produksi awal memeriksa 118 skenario desktop/emulasi ponsel: 107 lulus, 11 perlu penyesuaian harness (placeholder loading Next, mock Notification yang harus terpisah dari service worker, serta selector aset landing lama). Seluruh 22 skenario fitur baru pada putaran itu lulus. Pemeriksaan ulang harness, gerak C1, serta CSS akhir masih berjalan; status akhir dicatat setelah hasil tersedia.
