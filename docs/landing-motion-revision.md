# Revisi motion landing Nudge

Catatan berikut merekam hasil 23 Oktober. Revisi ponsel berikutnya, termasuk ukuran JSON dan jeda yang berubah, dicatat di [cerita ponsel](./phone-story.md).

## Keputusan dan batas

Menggantikan pendekatan rig berulang pada `landing-alive.md`, berdasarkan kritik pengguna: gerak terasa kaku dan semua kura-kura tampak sama. Pilihan pengguna: campuran terarah, sumber gratis, dunia visual hanya kura-kura dan benda. C1 3D hadir di hero dan penutup; lima adegan cerita memiliki siluet berbeda. Aplikasi `/app`, komponen bersama, CSS global, service worker, dan aset aplikasi tidak termasuk pekerjaan ini.

Taste: pertahankan komposisi Duolingo, Nunito, dan palet Nudge. Tidak menggambar ulang arah halaman. Arahan sebelumnya `one-motif`, seed `1197275041`, tetap menjadi konteks komposisi. Live thing: pilihan 2/5/10 menit mengubah contoh, jarum jam, kartu waktu, dan URL handoff.

Anti Slop during: ENERGY 3 / RHYTHM 2 / MOTION 3. Loop bercerita berjalan hanya ketika terlihat, dengan reduced motion statis. Keputusan tanpa tombol pause dari pengguna tetap berlaku; hasil ini tidak diklaim memenuhi seluruh ketentuan pause/stop/hide WCAG.

## Adegan dan alasan gerak

| Bagian | Bentuk dan gerak |
| --- | --- |
| Hero | Potret C1 utuh, gerak kecil pada potret dan buku terbuka. Ponsel diletakkan sebagai benda yang ditinggalkan. Tidak mensimulasikan jalan dengan potongan badan. |
| Scrolling | Adaptasi Scrolling Phone oleh Nafta R. Tangan dihapus, palet disesuaikan. Gerak layar diperlambat dan berhenti 1,6 detik sebelum siklus berikutnya. |
| Waktu | Jam dan tiket durasi, dengan jarum serta angka mengikuti radio pengguna. |
| Bergerak | Sepatu bergantian mengangkat, maju, menapak, lalu beristirahat; jejak menegaskan arah. |
| Merapikan | Dua buku berpindah bergantian, menyentuh tumpukan, lalu menetap. Tempat pensil ikut dirapikan; garis singkat menandai akhir aksi. |
| Jurnal | Adaptasi Diary oleh Brian Karungani. Afirmasi outline dihapus, diganti dua goresan netral yang muncul sepanjang gerak pena. Detail halaman menunjukkan jurnal pribadi di luar aplikasi. |
| Penutup | Pose wave C1 berbeda dari hero, dengan tanaman serta kartu langkah; potret utuh menghindari wajah bertumpuk. |

## Aset, runtime, dan fallback

Sumber, arsip asli, dan perubahan dicatat di `docs/assets/landing-motion/README.md`. JSON, poster, serta C1 WebP berada di `public/brand/landing/motion/`. Lisensi Lottie berlaku pada JSON dan poster turunannya, terpisah dari kode aplikasi. Kredit terlihat melalui tautan footer.

`LandingAnimation` memuat player SVG ringan lewat dynamic import dan data lokal saat mendekati viewport. MutationObserver mengikuti status scene dari pengatur motion landing. Player berhenti di luar viewport/tab tersembunyi, menghentikan timer jeda, dan dihancurkan saat unmount. Kegagalan fetch/render meninggalkan poster. Reduced motion menampilkan poster tanpa gerak; tanpa JavaScript tetap ada ilustrasi dan tautan masuk aplikasi.

C1 dikompresi sebagai salinan baru: idle 46.024 byte dan wave 48.490 byte. JSON ponsel 22.689 byte, jurnal 87.450 byte. Sumber PNG dan aset aplikasi tidak ditulis ulang. Ilustrasi sepatu, jam, buku, dan properti merupakan gambar kode asli untuk Nudge; tidak diklaim berasal dari LottieFiles.

## Pemeriksaan

Pemeriksaan final pada 23 Oktober 2026:

- Build produksi `next build --webpack` berhasil. Preview produksi merespons HTTP 200 pada port 3100.
- TypeScript, ESLint file landing/tes, serta Prettier file yang diubah diperiksa terpisah.
- `playwright.landing.config.ts`: 31 passed, 1 skipped dalam 2,1 menit. Tes dua siklus penuh khusus desktop; lifecycle mobile tetap diperiksa. Tidak membuka `/app`.
- Cakupan: tujuh adegan berbeda, decode gambar, kontrol keyboard, handoff semua durasi, jarum/angka mengikuti pilihan, pemutar bergerak setelah dua siklus, pause offscreen/hidden tab, reduced motion, lima lebar 320/390/710/768/1440, teks 200%, no-JavaScript, unduhan gagal, dan Axe tanpa pelanggaran pada mode statis.
- Bukti frame dua siklus: `.impeccable/review/motion/phone-cycles.png` dan `journal-cycles.png`. Screenshot CUA final: `phone-final.png`. Rekaman video tidak dibuat karena FFmpeg Playwright tidak tersedia; tes frame dan siklus tetap dijalankan.
- Taste lint: 0 FAIL, 0 WARN. Inspector tanpa pengecualian menghasilkan 3 FAIL dan 2 WARN. Inspector final dengan pengecualian eksplisit di bawah menghasilkan 0 FAIL, 2 WARN; ini bukan kelulusan seluruh preferensi bawaan Taste.
- Screenshot 1440/768/390 dan lembar halaman pada `.taste-skill/motion-final/` ditinjau. Laporan final ada di `report.json`; laporan tanpa pengecualian di `.taste-skill/motion-production/report.json`.
- Diff dari baseline `57320f8` kosong untuk seluruh source di luar route landing dan `src/components/landing`, serta seluruh public di luar folder motion baru. Dependensi `lottie-web` ditambah untuk pemutar yang dimuat hanya oleh landing. Aset aplikasi tidak ditulis ulang.

Pengecualian Taste: `eyebrow` mendeteksi legend radio durasi yang diperlukan; `few-pictures` bertentangan dengan pilihan pengguna untuk campuran potret C1 dan adegan vektor; `empty-screens` mempertahankan ruang terbuka/komposisi Duolingo yang dipilih pengguna. Warn `palette-cream` mempertahankan canvas merek; `no-footage` memakai animasi vektor bercerita, tanpa menambahkan video stok yang tidak sesuai dunia kura-kura dan benda.

## Kritik visual

ROUND 1
Seen in one second: wajah C1 dan ajakan satu langkah kecil.
Idea (one sentence): beranjak dari scrolling menuju kegiatan sederhana lewat benda yang mulai bergerak.
Live thing: pilih menit dan lihat jam, contoh kegiatan, serta handoff berubah.
Layout words by section: hero=split / phone=reverse-split / time=interactive-split / steps=list / move=split / tidy=reverse-split / journal=split / control=field / closing=split.
Scores: design 6.5 · usability 8 · creativity 7 · content 8 → overall 7.2.
Caps applied: design maksimal 6.5 karena kurang dari empat gambar raster dan komposisi desktop yang sangat lapang; kreativitas maksimal 7 untuk pendekatan referensi yang sudah dikenal.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Ponsel kurang dominan di desktop-page-01: perbesar area animasi; sudah diterapkan.
2. Garis gestur terlepas setelah tangan dihapus pada preview ponsel: hapus tiga layer gestur dari turunan; sudah diterapkan.
3. Buku terlalu kecil terhadap kolomnya di desktop-page-01: perbesar adegan merapikan 10%; sudah diterapkan.

ROUND 2
Seen in one second: C1 tetap menjadi identitas; objek setiap aktivitas kini berbeda.
Idea (one sentence): satu langkah kecil ditunjukkan melalui pilihan waktu dan tindakan yang dapat dikenali.
Live thing: kontrol durasi, jarum jam, dan handoff yang bekerja.
Layout words by section: struktur halaman tetap mengikuti referensi pengguna.
Scores: design 6.5 · usability 8 · creativity 7 · content 8 → overall 7.2.
Caps applied: batas raster dan ruang terbuka tetap berlaku, meskipun pengecualian sesuai arah pengguna.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Campuran C1 clay dan jurnal bergaris belum menjadi satu keluarga ilustrasi sepenuhnya, terlihat di desktop-page-01 dan mobile-page-01. Palet sudah disatukan; karakteristik aset sumber dipertahankan sesuai pendekatan campuran yang dipilih.
2. Ruang antaradegan masih lapang pada desktop-page-01. Tetap mengikuti komposisi referensi Duolingo yang dipilih, bukan dipadatkan hanya untuk memenuhi meter.
3. Gerak C1 adalah gerak kecil potret utuh, bukan animasi karakter 3D dengan deformasi tubuh. Tidak menambahkan kembali simulasi tubuh potongan yang menjadi sumber keluhan pengguna.

Skor ini penilaian internal berbasis rubric Taste, bukan penilaian pengguna atau juri eksternal. Tidak diklaim setara animasi karakter Duolingo. Pemeriksaan otomatis membuktikan kontrak serta lifecycle, bukan kualitas artistik atau kelancaran pada Android fisik.

## Delivery Gate Anti Slop

- Hard Gate: tidak menambah akun, data pengguna, statistik/ulasan palsu, kontrol mati, atau sumber aset tanpa izin. Tombol tetap menuju aplikasi yang nyata; aplikasi tidak dibuka dalam pemeriksaan landing ini.
- Purpose Gate: bentuk membulat dan CTA berlapis mengikuti merek/referensi; jejak, buku, jam, serta jurnal berhubungan langsung dengan kegiatan. Detail bunga/bintang merupakan gambar pada halaman jurnal sumber, bukan badge atau klaim produk.
- Liveliness: tiap cerita memiliki siluet dan tempo berbeda; satu objek tidak bergerak terus bersamaan dengan seluruh halaman. Loop dijeda secara otomatis di luar layar dan menghormati reduced motion.
- Craft: kontrol keyboard dan link, state tanpa JavaScript/unduhan gagal, tampilan sempit, teks besar, serta Axe diperiksa. Pengecualian tanpa tombol pause dicatat, tanpa klaim kepatuhan WCAG menyeluruh.
