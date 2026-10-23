# Cerita ponsel landing

## Lingkup dan arah

Revisi 24 Oktober 2026 menanggapi kritik bahwa ponsel terlalu polos. Perubahan terbatas pada ilustrasi ponsel landing dan konfigurasi pemutarnya. Aplikasi, C1, komposisi halaman, dan adegan lain tetap mengikuti keputusan sebelumnya.

Ponsel memiliki ketebalan, kamera, speaker, tombol samping, dan feed ilustratif dalam palet Nudge. Feed bergeser, melambat, lalu berganti menjadi “Jeda sebentar?” dan “Ayo mulai kecil.” Kata "Ayo" ditambahkan sesuai komentar pengguna. Buku membesar keluar dari layar melalui lintasan lengkung; tanaman tumbuh dan jejak muncul. Pose akhir ditahan sekitar 2,5 detik sebelum reset. Ini metafora kegiatan di luar layar, bukan fitur pemantauan screen time.

## Sumber dan runtime

Outline dasar diadaptasi dari Scrolling Phone oleh Nafta R. Sumber asli ada di `docs/assets/landing-motion/phone-source.json`; feed dan koreografi baru dibuat untuk Nudge. Kredit/lisensi tersedia di footer dan direktori aset. Nunito menjadi path dengan OFL disertakan.

Reproduksi: `node scripts/build-phone-story.mjs`, atau `python scripts/export-landing-motion.py` untuk kedua sumber. Setelah penambahan "Ayo", outline huruf dibulatkan ke presisi 0,1 piksel untuk menjaga ukuran tanpa mengubah timeline. JSON ponsel 59.929 byte; bersama jurnal 147.379 byte, di bawah batas tes 150 KB. Poster SVG menampilkan buku dan tanaman pada reduced motion, kegagalan pemuatan, dan tanpa JavaScript.

Player tetap lokal, berhenti di luar viewport/tab tersembunyi, dan berjalan pada kecepatan 0,65. Jeda batas siklus ponsel 400 ms karena penahanan pose sudah masuk timeline. Tidak ada tombol pause baru; keterbatasan motion yang dicatat sebelumnya tetap berlaku.

## Bukti dan kritik

- Build produksi webpack, TypeScript, ESLint, dan format file berubah berhasil.
- Suite landing: 31 lulus, 1 dilewati. Setelah lintasan buku disempurnakan, pengulangan terfokus: 5 lulus, 1 dilewati, mencakup sumber, reflow, dan dua siklus desktop. Siklus panjang mobile dilewati sebagai duplikasi; lifecycle mobile tetap tercakup pada suite penuh.
- Taste source lint: 0 FAIL/0 WARN. Inspector pada 1440, 768, dan 390 px: 0 FAIL/2 WARN dengan pengecualian `empty-screens`, `eyebrow`, dan `few-pictures`. Peringatan `palette-cream` mempertahankan palet yang disetujui; `no-footage` diterima untuk cerita vektor.
- Screenshot desktop/tablet/mobile ditinjau. Feed lebih jelas dibanding versi garis. Campuran C1 3D dengan vektor serta ruang terbuka masih membatasi keseragaman halaman. Tidak ada klaim kenaikan skor Taste halaman dari 7,2 pada revisi sebelumnya.
- Bukti ada di `.taste-skill/phone-story-final/` dan `.impeccable/review/motion/phone-story-final.png`. Screenshot diam membuktikan komposisi, bukan kelancaran di semua perangkat.

Android fisik dan penilaian artistik pengguna tetap terpisah. Revisi ini belum dipush.
