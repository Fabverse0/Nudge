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

Selesai untuk lingkup landing yang disetujui pada 23 Oktober 2026. Tujuh adegan sudah terpasang; sumber rig dan enam ekspornya ada pada inventaris aset. Total enam WebP 76.828 byte. Aplikasi tidak diubah atau dibuka dalam pemeriksaan ini.

## Kritik independen dan perbaikan

Assessment A dan B Impeccable dijalankan melalui dua agen terpisah. A meninjau tab baru pada desktop sekitar 1265 × 712 dan mobile 390 × 844; B memeriksa kode, DOM/lifecycle pada tab baru, isolasi Git, dan detector CLI. Keduanya tidak membuka aplikasi. Skor heuristik awal A adalah 21/28, bukan hasil penelitian pengguna.

Temuan A: kontak pensil dengan kaki kurang jelas; benda yang dirapikan melayang karena transform terpisah; siluet antarscene terlalu sama; ponsel belum memperlihatkan tindakan beranjak yang kuat. Perbaikan: kaki dan pensil ditempatkan dalam satu grup SVG, kaki dan benda memakai satu lintasan lalu benda dilepas di balik depan kotak, kepala journaling menunduk, badan merapikan condong, dan kura-kura ponsel melangkah menjauh. Pada follow-up, A mengonfirmasi dua masalah kontak utama sudah jauh lebih jelas pada render. Follow-up juga menemukan wajah ganda ketika crossfade; perbaikan terakhir memakai transform yang sama dan pergantian opacity diskret. Tes mengambil sampel tujuh posisi timeline dan membuktikan tepat satu ekspresi terlihat.

B mengonfirmasi sumber/DOM hero bermain saat terlihat dan berhenti setelah anchor menuju bagian waktu, native radio terhidrasi, serta anchor tidak tertutup header. Detector pada empat target TSX menghasilkan exit 0 dan `[]`; ini pemindaian sumber, bukan bukti kepatuhan aksesibilitas atau kelancaran perangkat fisik. Tidak ada overlay yang diinjeksi karena browser evaluate hanya read-only.

Questions skipped: pengguna telah mengunci arah dan mengizinkan implementasi lengkap; temuan konkret ditangani dalam lingkup tersebut.

## Bukti akhir

| Pemeriksaan | Hasil aktual |
| --- | --- |
| `npm run build -- --webpack` | Berhasil, termasuk TypeScript dan generasi halaman. Konfigurasi bundler proyek tidak diubah. |
| `npx playwright test --config playwright.landing.config.ts` | 30/30 lulus dalam 1,4 menit pada desktop Chrome dan profil Pixel 7. Semua kasus hanya membuka landing. |
| Dua kasus landing dari small-steps-motion melalui config review terfilter | 4/4 lulus dalam 12,4 detik. Kasus aplikasi dalam berkas yang sama tidak dijalankan. |
| ESLint, Prettier target yang diubah, `git diff --check` | Berhasil. |
| Taste 1440/768/390 | 0 FAIL setelah dua pengecualian eksplisit, 2 WARN yang dipertahankan sesuai dunia visual. Laporan asli sebelum pengecualian tetap tersedia lokal. |
| Detector Impeccable checkpoint `9af4437`, empat TSX dan dua CSS | 0 error, 3 warning primer border-accent-on-rounded, 35 advisory (17 ukuran font, 12 warna, 6 radius); exit 1 karena warning. Nilai serta alasan tepi bawah kemudian dicatat di DESIGN.md. Tidak diklaim sebagai scan ulang setelah dokumentasi. |
| Isolasi Git terhadap `f149172` | Sumber/aset hanya route landing, lima berkas landing, dan enam WebP baru. Tidak ada diff pada aplikasi, Brand, UI bersama, domain, globals, root layout, atau aset aplikasi lama. |

Kasus lulus mencakup ketujuh adegan dan decoding, radio/keyboard/handoff, loop saat terlihat, pause di luar viewport, hidden-document simulasi dan reduced-motion dinamis, pertukaran ekspresi tanpa ghosting, reflow lima lebar, pembesaran teks CSS 200% pada 320 px, anchor/header, efek tekan, tanpa JavaScript, serta kegagalan unduhan gambar. Pada kegagalan gambar, ilustrasi dapat hilang tetapi cerita, ruang layout, dan kontrol tetap berfungsi. Pembesaran CSS bukan zoom browser fisik; simulasi hidden-document bukan bukti perilaku OS Android.

### Pengecualian Taste dan alasan

- `empty-screens`: ruang kosong dan gambar transparan mengikuti komposisi Duolingo yang dikunci pengguna. Review gambar tetap memeriksa skala dan ritme. Ambang kepadatan generik tidak dipakai untuk memaksa panel warna atau isi tambahan.
- `eyebrow`: temuan akhir menunjuk legend fieldset “Punya waktu berapa menit?” di atas radio, bukan label dekoratif. Pertahankan label kontrol dan pemeriksaan Axe. Unit dekoratif berulang yang ditemukan sebelumnya sudah dihapus.
- WARN `palette-cream`: canvas `#FAF8F4` adalah keputusan identitas yang dipertahankan.
- WARN `no-footage`: gerak menggunakan rig ilustrasi dan SVG sesuai permintaan; tidak menambahkan video stok yang tidak berhubungan.

Inspector akhir: `.taste-skill/alive-reviewed/report.json` dan screenshot fold/page pada folder yang sama. Laporan tanpa pengecualian eyebrow berada pada `.taste-skill/alive-final/`; bukti awal pada `.taste-skill/alive-review/`. Screenshot IAB dan tes pada `.impeccable/review/alive-*`. Berkas review lokal diabaikan Git.

Arsip kritik terstruktur tersimpan di `.impeccable/critique/2026-10-23T14-12-13Z__src-app-page-tsx.md` dan disertakan Git. Trend pertama 21/28 mempertahankan skor awal A secara eksplisit, bukan skor ulang setelah polish. Dua penilaian independen, tidak adanya ignore list, detector, tidak adanya overlay mutable, serta pembersihan tab review dicatat. Berkas sementara body kritik telah dihapus setelah penyimpanan. Preview produksi tetap berjalan untuk peninjauan pengguna.

### Catatan pelaksanaan dan batas

Percobaan awal dev menghasilkan timeout navigasi; hasil itu tidak dianggap lulus. Build produksi pertama memperlihatkan dua masalah yang kemudian diperbaiki: assertion fieldset dan kontras unit waktu. Pemeriksaan persetujuan build pernah gagal akibat batas penggunaan akun. Setelah waktu reset pada pesan terlewati, build dicoba ulang melalui jalur persetujuan yang sama dan berhasil; tidak ada bypass.

Preview produksi akhir berjalan di port 3100. Tidak ada push atau publikasi hosting. Android fisik, pembaca layar nyata, zoom browser fisik baru, dan pengukuran frame rate perangkat tidak dikerjakan pada lingkup ini. Larangan tombol jeda dihormati; tidak mengklaim kepatuhan penuh pause/stop/hide.

## Kritik Taste pada render akhir

ROUND FINAL. Terlihat dalam satu detik: C1 mengambil langkah di antara ponsel dan kartu kegiatan. Ide: langkah kecil memutus urutan feed dan menjadi kegiatan nyata. Hal interaktif: pilihan 2/5/10 menit membawa nilai yang dipilih ke Nudge. Komposisi: hero split, strip kegiatan, cerita ponsel, demo waktu, langkah ringkas, manfaat bergantian, kendali, ajakan penutup, footer ringkas.

Skor mandiri: design 6,5 / usability 8 / creativity 7 / content 8, keseluruhan 7,2. Batas skor ilustrasi tanpa fotografi serta ruang kosong tetap diterapkan; ini bukan penilaian pengguna atau penghargaan desain. Top tiga temuan sebelumnya, kontak properti, wajah ghosting, dan konsistensi ukuran teks, telah diperbaiki. Gambar akhir desktop/tablet/mobile diperiksa; temuan mekanis dan pengecualian tidak dipakai sebagai pengganti penilaian gambar.

## Anti Slop Delivery Gate

| Item | Status dan bukti |
| --- | --- |
| R-02/R-03 | PASS: teks baru tanpa em dash; tes lima lebar dan pembesaran teks lulus. |
| R-17/R-18/R-23/R-36/R-38 | PASS: tidak ada statistik atau testimoni buatan; aset baru diizinkan pengguna dan sumbernya tercatat. |
| R-24/R-26 | PASS: anchor nyata, semua CTA memiliki href, radio mengubah contoh dan handoff pada tes keyboard. |
| R-25/R-32 | PASS: Axe statis tidak menemukan pelanggaran, fokus terlihat, radio keyboard lulus. Batas loop tanpa jeda tetap dicatat. |
| R-27/R-28/R-34 | PASS: keadaan tanpa JavaScript dan gagal unduh diperiksa; tidak menambahkan FAQ atau theme toggle. |
| R-33/R-35 | PASS: sumber ditulis melalui apply_patch, build/format/lint dan 30+4 pemeriksaan landing dijalankan; tidak mengeksekusi kasus aplikasi. |
| Purpose R-01/R-04/R-06/R-07/R-08/R-09/R-10/R-12/R-13/R-14 | PASS: palet/font asli, tanpa glow/glass/gradient dekoratif; properti dan kartu mewakili kegiatan, radius serta depth dijelaskan. |
| Purpose R-19/R-22 | PASS: tujuh koreografi sesuai aktivitas, rig asli C1, lifecycle dan ekspresi diperiksa. |
| Liveliness | PASS: dials dan Design Read tercatat sebelum kode; C1 menjadi fokus, langkah/kartu menjadi motif, ruang kosong mengikuti referensi pengguna. |
| Craft C-1–C-5 dan consistency locks | PASS: konten menjelaskan produk yang ada, variasi komposisi sesuai cerita, kontrol nyata, ketahanan tampilan diperiksa, tidak ada klaim hasil penelitian. |
