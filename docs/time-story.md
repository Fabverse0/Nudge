# Cerita jam landing

## Keputusan, 24 Oktober 2026

Pengguna meminta jam diperbarui dengan pendekatan cerita ponsel dan dicommit. Lingkup hanya landing: `TimeStory`, stylesheet terpisah, integrasi scene, dan contoh durasi. Tidak ada perubahan aplikasi, komponen bersama, aset C1, atau cerita ponsel.

Design Read: bagian interaktif landing untuk pengguna umum, playful dan membulat dalam palet Nudge. ENERGY 3 / RHYTHM 2 / MOTION 3 mengikuti arah motion sebelumnya. Taste tetap memakai komposisi `one-motif` yang sudah disetujui, tanpa undian arah baru untuk satu bagian.

Ide: pilihan waktu Nudge menjadi panggung kegiatan kecil. Jam memiliki bingkai berlapis, tombol, kaki, sorotan permukaan, dan kartu durasi. Jarum bergerak singkat lalu menetap. Ini ilustrasi waktu tersedia, bukan hitung mundur atau durasi nyata yang telah berlalu.

| Pilihan | Cerita dan contoh |
| --- | --- |
| 2 menit | Jejak menapak berurutan, lalu sepatu mengambil satu langkah. Contoh berjalan santai. |
| 5 menit | Buku muncul, halaman berbalik dari engsel punggung, lalu pensil bergerak. Contoh menulis satu pikiran. |
| 10 menit | Dua buku terangkat dan mendarat bergantian pada buku dasar. Contoh merapikan satu sudut. |

Contoh adalah kemungkinan kegiatan, bukan aturan kategori berdasarkan durasi. Handoff tetap hanya `/app?minutes=...`; pengguna menentukan tujuan di aplikasi.

## Motion dan fallback

SVG dibuat dalam source untuk Nudge, tanpa aset atau paket baru. Gerak memakai transform/opacity, siklus 9 detik, perlambatan saat mendarat, serta penahanan pose akhir. Kartu, jarum, dan kegiatan memiliki jadwal berbeda. Pilihan durasi mengganti scene dan memulai koreografi terkait.

Pengatur visibility landing yang ada menjeda seluruh scene ketika keluar layar atau tab tersembunyi. Reduced motion menghapus animasi dan mempertahankan ilustrasi lengkap; tanpa JavaScript tidak ada animasi dan contoh lima menit tetap tersedia. Tidak ada tombol pause baru, sesuai keputusan motion sebelumnya; ini bukan klaim kepatuhan motion WCAG secara menyeluruh.

## Bukti

- Build produksi `next build --webpack` berhasil, termasuk TypeScript. ESLint file berubah dan format lulus.
- Suite landing yang ada: **31 lulus, 1 dilewati, 2,4 menit**. Mencakup keyboard/handoff semua durasi, pause scene, reduced motion, no-JS, reflow 320/390/710/768/1440, teks 200%, Axe statis, serta error browser. Tes siklus panjang mobile dilewati sebagai duplikasi desktop. Tes tidak mengukur kehalusan artistik per frame.
- Ketiga pilihan dicoba melalui browser dan screenshot masing-masing disimpan di `.impeccable/review/time-story/`. Screenshot Taste desktop/tablet/mobile ditinjau di `.taste-skill/time-story/`.
- Taste source lint: **0 FAIL/0 WARN**. Inspector: **0 FAIL/2 WARN**, dengan pengecualian `empty-screens`, `eyebrow`, `few-pictures` yang sudah ada. Palet cream dipertahankan sebagai keputusan brand; video tidak ditambahkan karena lingkup berupa cerita vektor. Hasil ini bukan kelulusan tanpa pengecualian.

## Kritik visual dan Delivery Gate

Jam lebih terbaca sebagai benda daripada ikon garis. Biru pada tombol, poros, dan properti memberi fokus kecil; sand mengikat kartu dan kegiatan. Buku/sepatu berada di depan kaki jam sehingga adegan terasa satu panggung. Pada 390 px detail alat tulis mengecil, tetapi bentuk buku dan kartu durasi tetap terbaca. Campuran C1 3D dan vektor serta ruang terbuka halaman masih menjadi batas halaman secara keseluruhan. Tidak ada klaim peningkatan skor Taste halaman dari 7,2 sebelumnya.

Gate berikut berlaku pada perubahan ini, bukan sertifikasi seluruh produk:

- **Hard Gate PASS:** tidak ada klaim/statistik/testimoni baru; aset dan lingkup diizinkan; kontrol native serta href diperiksa melalui browser dan suite; reflow, Axe, no-JS, serta build lulus. Teks baru tidak memakai em dash.
- **Purpose-Gate PASS:** volume menunjukkan konstruksi jam; sand adalah panggung kegiatan; gerak menjelaskan urutan tindakan dan pilihan durasi. Tidak ada gradient, glow, glass, ikon magic, atau dekorasi acak baru.
- **Liveliness PASS:** dials dan arah berasal dari desain yang disetujui; jam menjadi fokus, kartu menunjukkan pilihan, dan tiga kegiatan memakai koreografi berbeda dengan jeda.
- **Craftsmanship PASS:** contoh sesuai ilustrasi, pemilihan keyboard dan handoff bekerja, fallback statis lengkap, source terbatas landing. Radius, Nunito, dan palet mengikuti sistem Nudge; referensi Duolingo tetap sesuai permintaan pengguna tanpa mengambil asetnya.

Perangkat Android fisik dan penilaian akhir kualitas gerak oleh pengguna belum dibuktikan oleh pemeriksaan ini. Commit dibuat lokal; push tidak termasuk permintaan.
