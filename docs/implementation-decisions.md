# Keputusan implementasi

Tanggal: 18 Oktober 2026.

- npm dipilih pengguna; satu `package-lock.json`.
- Kode aplikasi di `src/app`, `src/components`, dan `src/lib`; alias `@/*` menuju `src/*`. Unit test di dekat modul, Playwright di `tests/e2e`. `public` dan konfigurasi tetap di root.
- Sesi, mood, dan feedback hanya di memori. Reload memulai sesi baru. Kembali ke pemilihan dalam aplikasi mempertahankan konteks dan feedback sesi.
- Filter tujuan dan waktu wajib. Mood cocok bernilai 2, kategori yang disukai sesi bernilai 1; urutan katalog menjadi pemecah nilai sama. Penolakan dikecualikan sampai pengguna mengubah konteks atau memulai sesi baru.
- Pengingat memakai jam lokal perangkat. Satu pemeriksaan per menit aktif, pemeriksaan lagi ketika kembali terlihat. Jadwal yang terlewat tidak dikirim susulan. Catat kejadian terakhir secara lokal agar reload/tab lain tidak mengirim ulang kejadian yang sama.
- Service worker tidak menyimpan mood, favorit, respons HTML, atau respons navigasi. Cache hanya aset statis lokal yang diberi versi, dengan halaman offline penjelas. Pembaruan worker menunggu aktivasi berikutnya, tanpa memuat ulang aktivitas secara otomatis.
- Pengujian otomatis awal: Chromium desktop dan viewport seluler. Pemasangan PWA dari ikon dan perilaku OS pada perangkat fisik tetap memerlukan pemeriksaan manual.
- Tidak ada deployment atau push tanpa instruksi pengguna.

## Arah visual implementasi

Anti Slop mode `during` mengikuti pilihan sesi. Landing: ENERGY 2 / RHYTHM 3 / MOTION 1. Aplikasi: ENERGY 1 / RHYTHM 1 / MOTION 1.

Motif tempurung membulat menghubungkan ilustrasi, bidang hero, dan pilihan waktu. Nunito mendukung karakter ramah. Phosphor Regular memberi simbol tindakan yang konsisten. Sage menekankan tindakan, biru menjadi bidang ilustrasi, sand mendampingi refleksi. Timer statis agar pengguna dapat meninggalkan layar.

Inventaris isi: satu aktivitas, 2/5/10 menit, mood opsional, lewati, journaling di luar aplikasi, tanpa akun, favorit per perangkat, pengingat opt-in, kura-kura, kembali ke pemilihan.

Argumen landing: beralih dari scroll dengan satu langkah kecil (contoh kegiatan nyata); memilih menurut waktu (pilihan 2/5/10 menuju aplikasi); tiga tujuan (contoh dari katalog); kendali pengguna (mood opsional, selesai manual, penyimpanan lokal).

Taste Skill menawarkan `one-motif`, `borrowed-category`, `loud-flat-poster`. Dipilih `one-motif`: bentuk tempurung menyatukan halaman tanpa menambah kategori visual lain. Palet dan tipe mengikuti DESIGN.md. Batas gerak serta jumlah bagian mengikuti kebutuhan Nudge, bukan kuota gambar/animasi skill.
