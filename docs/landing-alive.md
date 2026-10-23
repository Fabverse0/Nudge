# Landing Nudge: dari scrolling ke bergerak

Mode: Persuade. Taste dan Impeccable shape, animate, critique, polish digunakan bersama Anti Slop during. Keputusan pengguna mengunci komposisi Duolingo, palet Nudge, C1 3D lembut, properti vektor ekspresif, tujuh adegan, dan tidak mengubah aplikasi.

## Design Read

Satu langkah menjadi tindakan nyata: kura-kura meninggalkan feed ponsel, memilih waktu, bergerak, merapikan, menulis, lalu menyambut pengguna. ENERGY 3 / RHYTHM 2 / MOTION 3 pada landing. Aplikasi tidak termasuk pekerjaan ini.

Inventaris subjek: kura-kura C1, tempurung sage, wajah sand, ponsel telungkup, pilihan 2/5/10 menit, mood opsional, satu saran, benda yang dirapikan, jurnal pribadi di luar aplikasi, pengguna menentukan selesai, favorit lokal, tanpa akun.

## Argumen dan adegan

1. Small steps. A fuller life. Kura-kura melangkah menuju kegiatan; CTA langsung tersedia.
2. Scroll sebentar. Lalu kebablasan? Ponsel memperlihatkan feed abstrak lalu kartu kegiatan. Ini ilustrasi, bukan klaim pemantauan screen time.
3. Ada dua menit? Pilihan waktu nyata membawa durasi ke aplikasi; jam dan kartu mendukung pilihan.
4. Beri badanmu giliran. Kura-kura berjalan dan meregangkan kaki di pijakan kartu.
5. Rapikan satu sudut. Kaki mengambil dan meletakkan benda.
6. Tuangkan satu pikiran. Kaki menulis dan garis jurnal muncul. Nudge tidak mengumpulkan tulisan.
7. Your next small step starts here. Kura-kura melambaikan kaki dan mengajak mulai.

## Arah dan batas

Taste menghasilkan page-is-the-object, one-motif, dan loud-flat-poster. Gunakan gagasan one-motif melalui langkah/kartu aktivitas. Komposisi raksasa, mask berulang, dan poster keras tidak diadopsi karena bertentangan dengan referensi Duolingo yang secara eksplisit dikunci pengguna. Nunito, palet, dan komposisi gambar/teks bergantian tetap menjadi arahan pengguna.

Gunakan gambar berlapis dengan kepala, badan, dan kaki terpisah. Properti vektor berbentuk ponsel, jam, kartu, jurnal, dan benda sederhana. Tidak ada karakter SVG pengganti C1. Pembuatan raster memakai ImageGen; ekspor dan pemotongan atlas memakai Sharp tanpa mengubah aset aplikasi.

Loop adegan 6–10 detik, dengan jeda tenang. Hanya bermain saat terlihat, berhenti di luar viewport/tab tersembunyi. Tanpa tombol jeda sesuai keputusan pengguna. Reduced motion dan tanpa JavaScript menampilkan pose statis. Pengulangan tanpa kontrol jeda tidak dinyatakan patuh penuh terhadap kriteria aksesibilitas pause/stop/hide.

## Batas file

Perubahan UI hanya pada route landing dan `src/components/landing/`. Aset baru pada `public/brand/landing/alive/`. Jangan mengubah `src/app/app/`, `src/app/globals.css`, komponen UI bersama, atau aset lama. Catat baseline Git dan periksa diff pada akhir pekerjaan.

## Status

Implementasi berlangsung. Bukti render, pemeriksaan, inventaris aset, dan kritik akhir akan dicatat setelah tersedia. Tidak ada klaim pengujian atau penyelesaian sebelum hasil aktual.
