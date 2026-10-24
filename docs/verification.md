# Pemeriksaan implementasi Nudge

Revisi jam landing 24 Oktober 2026: build produksi berhasil; suite landing 31 lulus/1 dilewati. Ketiga pilihan durasi diperiksa secara visual. Lingkup, fallback, kritik, dan hasil Taste ada di [cerita jam](./time-story.md).

Revisi ponsel landing 24 Oktober 2026: suite penuh 31 lulus/1 dilewati, kemudian pemeriksaan terfokus versi lintasan final 5 lulus/1 dilewati. Build produksi berhasil. Sumber, ukuran, screenshot, pengecualian Taste, dan batas bukti ada di [cerita ponsel](./phone-story.md). Aplikasi tidak termasuk perubahan ini.

Diperbarui: 23 Oktober 2026. Status: kode MVP dan aset C1 terintegrasi; penerimaan perangkat fisik serta observasi pengguna masih menunggu.

## Landing hidup, pemeriksaan terbaru 23 Oktober 2026

- Build `npm run build -- --webpack` berhasil pada kode UI akhir, termasuk TypeScript. ESLint, format target perubahan, dan diff whitespace berhasil.
- `npx playwright test --config playwright.landing.config.ts`: 30/30 lulus dalam 1,4 menit. Dua kasus landing pada small-steps-motion dengan config review terfilter: 4/4 lulus dalam 12,4 detik. Pengujian ini tidak membuka aplikasi.
- Cakupan: tujuh adegan dan gambar, lifecycle viewport/hidden/reduced motion, ekspresi tanpa ghosting pada sampel timeline, keyboard/radio/handoff, 320/390/710/768/1440 px, pembesaran CSS 200%, tanpa JavaScript, kegagalan gambar, header/anchor, efek tekan, dan Axe pada mode statis.
- Taste akhir: 0 FAIL setelah pengecualian `empty-screens` untuk komposisi Duolingo dan `eyebrow` untuk legend formulir nyata. Dua WARN dipertahankan: canvas cream dan tanpa footage. Laporan tanpa pengecualian serta alasan lengkap disimpan dalam laporan landing; tidak diklaim lolos tanpa pengecualian.
- Detector Impeccable setelah perbaikan kontak: 0 error, 3 warning primer tentang tepi bawah kontrol, 35 advisory token. Exit 1 memiliki output lengkap, bukan crash; bentuk depth disengaja dan nilai kemudian dicatat di DESIGN.md. Review independen lanjutan menemukan ghosting yang kemudian diperbaiki dan diperiksa regresinya.
- Hasil render desktop, tablet, mobile dan kontak properti ditinjau. Isolasi Git membuktikan tidak ada perubahan aplikasi, globals, root layout, UI bersama, domain, Brand, atau aset aplikasi lama.
- Batas: tidak ada pemeriksaan Android fisik, pembaca layar nyata, pengukuran frame rate, atau zoom browser fisik baru. Hidden-document dan pembesaran teks diuji secara simulasi. Loop tanpa tombol jeda mengikuti keputusan pengguna dan bukan klaim kepatuhan aksesibilitas penuh.

Rincian, riwayat kegagalan yang diperbaiki, sumber aset, kritik, dan Anti Slop Delivery Gate: [landing-alive.md](./landing-alive.md). Bukti ini menggantikan acuan visual landing lama pada bagian berikutnya, tanpa mengubah hasil historis aplikasi.

## Landing adaptasi Duolingo

Adaptasi kuat yang disetujui memakai hero C1 baru, komposisi terbuka, manfaat sebelum cara pakai, header sticky ringkas, dan lapisan tombol tonal. Panduan alpha Duolingo disimpan sebagai referensi, lalu dipetakan ke identitas Nudge. Tidak ada perubahan kode produksi aplikasi, logika domain, penyimpanan, atau notifikasi.

- Build produksi, TypeScript, ESLint, Prettier dan diff check lulus; unit **17/17**. Suite produksi final **102/102 lulus dalam 6,1 menit**, Chrome desktop dan emulasi viewport Pixel 7.
- Regresi baru memeriksa alpha/dimensi dan anggaran aset, komposisi desktop/mobile, CTA mobile sebelum demo, header satu baris pada 320 px, anchor yang tidak tertutup, urutan bagian, bingkai kategori dan efek tekan tanpa layout shift. Regresi lama tetap memeriksa keyboard, Axe, teks 200%, fallback tanpa JavaScript, reduced motion, handoff waktu, aplikasi dan PWA.
- WebP hero: 1200 × 900 / 75.690 byte. Pada 1920 px dan DPR 1, hint baru memilih gambar 640 px / 23.866 encoded bytes dibanding reproduksi hint `52vw` untuk aset yang sama, 1080 px / 50.888 byte. Ini pengukuran pemilihan gambar, bukan klaim peningkatan kecepatan halaman secara keseluruhan.
- Taste source lint 0 FAIL / 0 WARN; inspector render 1440/768/390 menghasilkan 0 FAIL / 2 WARN (canvas krem tetap dan tidak ada footage). Impeccable regex scan 0 temuan utama / 15 advisory ukuran font/radius khusus landing. Screenshot langsung serta lembar inspector ditinjau pada desktop, tablet dan mobile.
- Setup tes distabilkan: clock dibekukan sebelum assertion timer tepat, snapshot keyboard/Axe memakai reduced motion, dan skenario empat audit diberi batas total 90 detik. Seluruh assertion dipertahankan. Riwayat kegagalan awal, kritik visual, gate Anti Slop, dan bukti lengkap ada di [landing-duolingo.md](./landing-duolingo.md).
- Pemasangan Android fisik, pembaca layar nyata dan observasi pengguna tetap memerlukan tahap tersendiri.

## Animasi dan dekorasi small steps

Perluasan yang disetujui menambahkan tiga ilustrasi C1 transparan, jejak langkah dan lengkung tempurung, koreografi landing, arah transisi langkah, respons pilihan/favorit/umpan balik, serta penyelesaian sekali. Timer tetap statis. Tidak ada perubahan kontrak domain, penyimpanan, atau notifikasi.

- Build produksi, TypeScript, ESLint, Prettier, dan diff check lulus. Unit 17/17; pemeriksaan terarah 28/28; suite produksi final **94/94 dalam 6,2 menit**, Chrome desktop dan emulasi viewport Pixel 7.
- Taste lint 0 FAIL/0 WARN; inspector render 1440/768/390 menghasilkan 0 FAIL/2 WARN, yaitu canvas krem tetap dan tidak ada footage. Keduanya dipertahankan sesuai identitas C1. Impeccable regex scan: 0 temuan utama, 22 advisory font/radius pada gaya landing dan aplikasi yang sudah ada.
- Aset baru terdekode, alpha WebP terbukti, dekorasi tidak menangkap input, gerak terbatas berhenti di luar layar, reduced motion aktif saat runtime membatalkan animasi, fokus/arah langkah benar, dan timer tidak beranimasi. Uji tab tersembunyi menggunakan simulasi event lifecycle; bukan bukti OS Android.
- Tinjauan browser dan screenshot mencakup hero, galeri peregangan, bagian kendali, penutup, dan penyelesaian aplikasi. Rincian, kritik visual, inventaris/prompt aset, gate Anti Slop dan batas pemeriksaan ada di [small-steps-motion.md](./small-steps-motion.md).
- Build awal gagal pada worker PostCSS Turbopack. Build bersih berhasil setelah cache gagal dipindahkan ke folder pemulihan lokal; penyebab tingkat lebih rendah belum dipastikan. Pemeriksaan Android fisik dan pembaca layar nyata tetap terbuka.

## Lingkungan

Windows, Node.js 22.19.0, npm 11.19.0. Next.js 16.4.2, React 19.3.1, TypeScript 6.0.3, Tailwind 4.3.3, Vitest 5.0.5, Playwright 1.64.1. Versi terkunci dalam package-lock.json.

## Polesan seluruh aplikasi, 22 Oktober 2026

Pengguna menyetujui [rencana aplikasi](./app-polish.md): pemilihan Mood/Tujuan/Waktu dengan Lanjut eksplisit, polesan saran, timer, penyelesaian, favorit, dan pengingat. Konteks/posisi langkah bertahan saat berpindah menu; Ubah pilihan kembali ke Waktu; filter aktif terlihat meskipun kontrol ditutup. Tidak ada perubahan file domain `src/lib`, format penyimpanan, atau pengiriman notifikasi.

- Build produksi dan TypeScript lulus. Unit: **17/17 lulus**, enam berkas. Run produksi final: **84/84 lulus dalam 3,4 menit**, pada Chrome desktop dan viewport Pixel 7. Konfigurasi produksi mencakup activity-flow, app-polish, reminder-polish, landing-studio, dan pwa.
- Tes membuktikan langkah eksplisit, tombol wajib nonaktif sebelum pilihan, Kembali mempertahankan nilai, fokus pada langkah, Lewati mood awal, pembaruan/pelewatan mood setelah selesai, reset penolakan saat konteks berubah, pilihan menit dari landing, dan tidak ada timer otomatis.
- Seluruh layar diperiksa pada 320/390/710/768/1440 serta teks CSS 200% pada 320. Assertion mencakup overflow elemen, tidak ada gerak dengan reduced motion, dan seluruh gambar C1 di main selesai dimuat. Keadaan yang dicakup: mood, tujuan, waktu/filter, saran, favorit kosong/terisi, pengingat, timer berjalan/jeda/habis, dan penyelesaian. Axe memeriksa pemilihan, saran, timer, penyelesaian, favorit, serta pengingat.
- Pengingat diuji melalui UI dengan mock izin yang terisolasi: belum meminta izin pada kunjungan atau draft aktif, hari kosong ditolak, izin hanya diminta setelah save aktif yang valid, jadwal dimatikan/disimpan/reload, izin ditolak/tidak didukung, serta storage diblokir. Aktivitas manual tetap dapat dimulai pada kondisi tersebut. Uji PWA terpisah tetap memeriksa penerimaan API service worker produksi; ini bukan bukti notifikasi OS pada perangkat fisik.
- Run awal 73/76 lulus menemukan overflow judul saran pada teks 200%, diperbaiki dengan pembungkusan teks scoped. Satu kegagalan penulisan trace Playwright tidak berulang pada run final. Tes pengingat awal memiliki locator alert yang juga memilih route announcer Next; locator dipersempit ke main tanpa mengurangi assertion. Build sempat menemukan tipe mock izin yang belum dipersempit; diperbaiki sebelum build dan run final.
- Review source independen tidak menemukan temuan actionable. Impeccable pada komponen aplikasi: **0 temuan primer, 6 advisory** ukuran/radius. Nilai yang dipertahankan: judul mobile/timer 28 px, judul favorit 18 px, radius navigasi/simbol 14 px dan kontrol feedback 12 px. Tidak ada ignore baru. Laporan lokal: `.impeccable/review/app-polish-detector.json`.
- Tinjauan langsung browser mencakup pilihan desktop/mobile, saran, timer dijeda, penyelesaian dengan artwork termuat, favorit kosong, dan pengingat. Bukti lokal memakai prefiks `.impeccable/review/polish-app-`; screenshot reflow per state berada di output Playwright. Screenshot yang diambil ketika server tes berhenti tidak dipakai sebagai bukti gambar rusak aplikasi; bukti penyelesaian diambil ulang setelah server hidup.
- Zoom browser nyata untuk versi aplikasi baru, pembaca layar, instalasi Android, notifikasi OS, dan observasi peserta tetap menunggu. Teks CSS 200% dan viewport seluler bukan pengganti perangkat fisik atau pembaca layar.

Gate penyerahan Anti Slop dan alasan desain dicatat dalam [app-polish.md](./app-polish.md). Perubahan hanya pada implementasi lokal; tidak ada deployment atau push.

## Polesan landing studio, 22 Oktober 2026

### Penyempurnaan setelah audit Impeccable

Pengguna menyetujui seluruh temuan relevan sambil mempertahankan galeri besar pada desktop dan mobile. CTA umum diseragamkan, perpindahan dari demo waktu dijelaskan, informasi tanpa akun didekatkan ke CTA pertama, teks langkah diringkas, dan jarak mobile dirapikan. Aturan layout landing dipindahkan dari globals ke stylesheet scoped; aturan bersama aplikasi tetap dipertahankan. Review independen menemukan satu aturan langkah lama pada 720 px yang sudah dihapus dan tercakup pemeriksaan 710 px.

- Build produksi, TypeScript, lint, format check, dan `git diff --check` lulus. Run produksi final: **26/26 lulus dalam 1,1 menit** pada dua proyek Chrome desktop/viewport seluler. Tes mencakup reflow 320/390/710/768/1440, galeri tetap besar, semua CTA umum, penjelasan demo, alt hero, keyboard, pergantian durasi cepat, handoff menit tanpa timer otomatis, teks CSS 200%, reduced motion dinamis, tanpa JavaScript, Axe, dan regresi PWA. Ini bukan pengujian Android fisik atau pembaca layar.
- Dua skenario pengukuran memakai konteks Chrome baru dengan viewport 1920 x 900, DPR 1, dan reduced motion. Pada layout yang sama, hint baru memilih varian 750 px dengan **28.376 encoded bytes**; reproduksi hint lama memilih 1080 px dengan **48.938 byte**. Lebar render 672,17 px, pengurangan payload sekitar **42%** pada kondisi tersebut. Tidak ada klaim perubahan LCP/INP/CLS atau kecepatan jaringan nyata. Attachment JSON berada dalam hasil Playwright.
- Impeccable final: **0 temuan primer, 16 advisory** ukuran huruf/radius. Enam advisory tambahan muncul karena aturan lama yang sebelumnya berada di globals kini ikut masuk cakupan scan komponen landing. Nilai tipografi/bentuk mengikuti identitas yang dipertahankan; tidak ada ignore baru. Laporan lokal: `.impeccable/review/refinement-detector.json`.
- Preview produksi berhasil dibuka langsung setelah audit awal hanya mendapatkan fallback offline. Tinjauan browser memastikan copy baru, susunan tablet, dan galeri mobile tetap besar. Screenshot: `.impeccable/review/refinement-desktop.png` dan `refinement-mobile-gallery.png`. Screenshot lama tidak dipakai sebagai bukti hasil revisi ini.
- Penilaian awal dua subagen (22/28 desain, 17/20 teknis) bersifat sementara berdasarkan source dan screenshot saat live belum tersedia. Tidak dibuat skor pascaperbaikan tanpa mengulang seluruh metode critique.

### Revisi lima komentar browser

Revisi setelah review pengguna mencakup CheckCircle fill 24 px sebagai badge pilihan durasi, ikon Footprints dalam inset 34 px pada CTA hero/penutup, ilustrasi berjalan C1 baru, dan teks penutup Inggris dengan penanda `lang="en"`. Label tombol dan alur aplikasi tetap Indonesia. Ruang tombol penutup diperbaiki setelah tinjauan langsung pada viewport komentar 767 x 524.

- Build produksi/typecheck, lint, format check, serta diff check lulus. `npm run test:pwa` terbaru: **22/22 lulus dalam 1,3 menit**, termasuk dua skenario baru untuk revisi ini pada desktop/viewport seluler, reflow empat lebar, teks 200%, reduced motion, no-script, Axe, dan delapan regresi PWA.
- Taste source lint: 0 FAIL/0 WARN. Inspector akhir: **0 FAIL/2 WARN** pada 1440/768/390; kedua WARN tetap mengenai canvas identitas dan tidak adanya video. Screenshot ketiga ukuran ditinjau pada `.taste-skill/landing-review-final/`.
- Impeccable scan halaman/komponen landing: 0 temuan primer dan 10 advisory ukuran/radius. Tidak ada ignore baru.
- Bukti langsung: `.impeccable/review/review-check.png`, `review-walking.png`, dan `review-closing-final.png`. Fokus keyboard terlihat pada screenshot penutup karena navigasi Tab digunakan untuk memeriksa area tersebut.
- Aset berjalan memakai acuan C1 lama melalui tool gambar bawaan. Sumber 1254 x 1254 dan turunan WebP 900 x 900 (67.588 byte) beserta prompt/hash dicatat dalam inventaris landing. Tidak ada pemalsuan anatomi dengan CSS; gerak digambarkan dalam pose baru. Ini bukan pengujian Android fisik.

Landing memakai satu adegan hero C1 baru, tiga ilustrasi kategori lama yang diperbesar, demo durasi terpisah, bingkai lengkung tempurung, dan animasi yang berjalan sekali. [Catatan studio](./landing-studio.md) memuat arah, adaptasi skill, serta batas gerak; [inventaris aset](./assets/landing-studio/README.md) memuat sumber PNG, prompt, WebP 83.254 byte, ukuran, dan hash. Tidak ada paket runtime, backend, atau media stok baru.

- Build produksi dan typecheck lulus. Lint, format check, serta `git diff --check` lulus untuk perubahan ini.
- `npm run test:pwa`: **20/20 lulus dalam 55,9 detik**, terdiri dari 12 skenario landing dan delapan regresi produksi/PWA pada Chrome desktop dan viewport Pixel 7. Konfigurasi produksi kini juga memasukkan `landing-studio.spec.ts`.
- Landing diuji pada lebar 320, 390, 768, dan 1440 px. Gambar ditunggu hingga benar-benar dimuat setelah perubahan viewport. Screenshot tersedia di `.impeccable/review/studio-*-*.png`.
- Tes membuktikan pilihan awal lima menit, keyboard, perubahan durasi berulang, tautan dengan durasi terpilih, tidak ada timer otomatis, reduced motion yang berubah saat halaman terbuka, hero masuk sekali, serta landing terbaca tanpa JavaScript. Kontrol preview dinonaktifkan sebelum hydration; tautan statis dan penjelasan lima menit tetap tersedia tanpa script.
- Axe pada landing dengan reduced motion tidak menemukan pelanggaran otomatis. Pemeriksaan teks CSS 200% pada lebar 320 px lulus; ini bukan pengganti zoom browser nyata atau pembaca layar.
- Taste source lint: **0 FAIL, 0 WARN**. Inspector final pada 1440/768/390: **0 FAIL, 2 WARN**, empat gambar utama, 21 elemen bergerak tercatat, judul maksimal dua baris pada ukuran teks standar, dan daftar console error kosong. Laporan/screenshot: `.taste-skill/landing-studio/final/`.
- Dua WARN dipertahankan secara eksplisit: canvas hangat berasal dari palet tetap DESIGN.md; tidak ada video karena pengguna memilih studio ilustrasi dengan gerak terarah tanpa loop. Tidak ada penyembunyian aturan untuk overflow atau gambar rusak.
- Impeccable detector pada halaman dan komponen landing: **0 temuan primer**, 10 advisory ukuran font/radius. Rentang display dan bentuk lengkung khusus landing dijelaskan dalam DESIGN.md; tidak ada pengubahan ignore global atau perbaikan drift skill sebagai efek samping.
- Screenshot final desktop disimpan di `.impeccable/review/studio-desktop-final.png`; viewport alat dikembalikan setelah peninjauan. Android fisik tetap ditunda, dan tidak ada klaim baru mengenai pemasangan atau notifikasi OS.

Putaran awal menemukan lapisan visual menutupi klik radio, logo/teks besar meluber pada lebar sempit, dan landing tanpa JavaScript tertahan pada fallback pemuatan. Perbaikan menargetkan penyebab: lapisan label noninteraktif, reflow kontrol/teks, serta memindahkan loading boundary ke `/app`. Teks loading aplikasi tidak berubah. Tes terakhir juga menunggu varian hero responsif selesai dimuat setelah resize; assertion gambar tetap dipertahankan. Pencatat Taste melewatkan transisi WAAPI yang selesai di antara sampelnya; animasi bagian kini memakai CSS native, sementara hero/preview tetap memakai WAAPI. Tidak ada timeout atau pemaksaan klik yang ditambahkan untuk menutupi kegagalan tersebut.

Unit/domain dan seluruh suite development lama tidak diulang untuk perubahan presentasi ini. Bukti historis di bawah tetap dipisahkan dari 20 skenario produksi terbaru. Penerimaan menyeluruh MVP masih mengikuti pekerjaan manual yang sudah dicatat.

## Integrasi C1, 21–22 Oktober 2026

Empat pose, tiga ilustrasi aktivitas, simbol ringkas/monokrom, wordmark, dan logo komposit telah dibuat. Header, hero, kelompok aktivitas, pemilihan, saran, keadaan kosong, timer dan penyelesaian memakai keluarga C1. Inventaris, prompt, sumber font, ukuran, dan hash tersimpan di [inventaris aset](./assets/turtle-c1/README.md).

- Typecheck dan lint lulus. `npm run format:check` serta pemeriksaan Prettier untuk `scripts/export-wordmark.mjs` lulus.
- `npm run assets:wordmark` berhasil. Tiga wordmark memiliki outline vektor; dua logo horizontal menyertakan simbol raster dengan tulisan vektor.
- Run alur awal: 27 dari 28 skenario lulus. Satu navigasi landing desktop belum mencapai `/app` dalam assertion lima detik. Pengulangan terarah skenario yang sama tiga kali lulus tanpa perubahan kode atau timeout. Seluruh suite kemudian dijalankan pada build produksi di port 3000: **28/28 lulus dalam satu run, 1.7 menit**. Penyebab kegagalan awal pada dev belum dibuktikan; tidak ada timeout assertion yang dilonggarkan untuk menyembunyikannya.
- Kedua proyek browser lulus pemeriksaan gambar termuat dan overflow pada 320/768/1440 px. Screenshot seluruh halaman ditinjau untuk seluler, tablet, dan desktop; teks besar/reduced motion serta Axe/keyboard dalam suite alur juga lulus.
- Build default sempat gagal ketika worker CSS Turbopack keluar sebelum koneksi. Kegagalan muncul di dalam maupun di luar sandbox dan tetap muncul setelah server dev dihentikan. Setelah hanya cache `.next` dibersihkan, `npm run build` berhasil, termasuk TypeScript dan pembuatan halaman. Tidak ada perubahan bundler atau konfigurasi untuk menghindarinya. Ini bukti pemulihan setelah cache bersih, bukan pembuktian akar masalah.
- `npm run test:pwa`: 8/8 lulus dalam 43.6 detik, pada build Turbopack bersih. Memeriksa alur produksi tanpa error hydration/browser, worker, offline/pemulihan, cache tanpa navigasi privat, penerimaan API notifikasi, ikon PNG 32/180/192/512/maskable-512, metadata maskable, dan respons 404 untuk ukuran tak didukung.
- Ikon 32, 512, dan maskable 512 ditinjau dari hasil render produksi. Wajah masih terbaca pada 32 px. Audit geometri memperkecil kotak maskable menjadi sekitar 56% kanvas (287 × 287 pada 512 px), sehingga sudutnya berjarak 202.94 px dari pusat, di dalam radius aman 204.8 px. Pemotongan launcher nyata tetap pemeriksaan Android fisik.
- Impeccable: 14 advisory skala huruf dan 10 advisory radius; tidak ada temuan non-advisory dalam scan berkas UI yang berubah. Nilai ini berasal dari skala responsif serta motif tempurung yang sudah dipakai. Tidak ada aturan detector yang dimatikan.
- Inspector Taste pada 1440/768/390 px menemukan overflow 0 dan gambar rusak 0. Tetap ada lima jenis FAIL (`shadow`, `button-fx`, `few-pictures`, `focal-point`, `still-page`) dan dua WARN (`palette-cream`, `no-footage`). Dasar tombol mengikuti keputusan kedalaman yang sudah ada; canvas dan gerak tenang mengikuti DESIGN.md. Inspector menghitung satu gambar besar; tiga ilustrasi kategori tetap tersedia dan diperiksa lewat screenshot. Tidak menambah video, animasi berulang, atau gambar besar hanya untuk memenuhi kuota alat. Ini bukan klaim seluruh gate Taste lulus.
- Screenshot C1: `.impeccable/review/c1-*`; laporan detector: `.impeccable/review/c1-detector.json`; laporan Taste: `.taste-skill/inspect/c1/`. Berkas pemeriksaan lokal tidak dianggap aset produk.

Tinjauan screenshot produksi menemukan pose timer belum termuat ketika snapshot diambil. Maskot pada layar aplikasi kini memakai pemuatan eager; gambar kategori landing tetap lazy. Skenario produksi diperkuat dengan pemeriksaan `complete` dan `naturalWidth > 0` sebelum screenshot timer dan penyelesaian. Gambar penyelesaian juga direkam terpisah. Build default setelah perubahan ini berhasil; **8/8 tes PWA akhir lulus dalam 49.4 detik**, termasuk pemeriksaan gambar. Screenshot timer dan penyelesaian yang diperbarui ditinjau langsung.

Pemeriksaan setelah koreksi maskable dan pembaruan cache v3: **8/8 lulus dalam 41.0 detik**. Test membaca piksel hasil PNG dan memastikan tidak ada gambar depan di luar lingkaran aman beradius 40%. Test juga menanam cache `nudge-static-obsolete` sebelum registrasi worker dan membuktikan cache tersebut dibersihkan. Instalasi cache baru mengambil ulang aset melalui `Request` dengan `cache: "reload"`; siklus worker tidak memaksa reload sesi. Build default untuk route ikon 56% berhasil. Typecheck, lint, dan format check terakhir juga lulus.

Batas waktu keseluruhan skenario layout menjadi 90 detik karena memuat enam halaman, menunggu gambar, dan merekam screenshot. Assertion navigasi lima detik tetap dipertahankan. Suite unit dan skenario pengingat terpisah tidak dijalankan ulang untuk perubahan aset ini; hasil baseline tetap dibedakan dari bukti terbaru.

## Bukti baseline, 18 Oktober 2026

- Build produksi akhir berhasil untuk `/`, `/app`, manifest, dan ikon.
- Vitest: 17 test lulus pada 6 berkas. Meliputi seluruh tujuan/waktu, mood, feedback sesi, penolakan/alternatif, timer, data lokal, jadwal, serta adapter notifikasi service worker dan pembatalannya.
- Typecheck, lint dan format:check berhasil setelah perbaikan.
- Playwright utama: 44 skenario lulus pada desktop dan viewport Pixel 7. Memuat timer habis tanpa selesai otomatis, mood dipilih/dilewati/diubah, penolakan/kehabisan saran, favorit, journaling, izin ditolak/unsupported/tertunda, pengingat jatuh tempo, pembatalan jadwal, keyboard, Axe dan teks 200% pada seluruh layar utama serta judul katalog.
- Playwright produksi: delapan skenario lulus, mencakup alur lengkap tanpa error browser/hydration, registrasi worker, ikon PNG 192/512, cache tanpa navigasi/data pribadi, fallback offline lalu pemulihan koneksi, serta penerimaan notifikasi oleh API asli Chrome.
- Pemeriksaan tambahan keyboard dan Axe pada timer, penyelesaian, favorit, dan pengingat sudah lulus di desktop/seluler. Pembesaran teks 200% menemukan overflow pilihan waktu pada 320 px, sudah diperbaiki dan lulus pada keduanya.
- Enam pengujian terarah terakhir untuk keyboard, teks 200% sesudah hydration, serta izin pengingat juga lulus setelah penyesuaian fokus dan penjelasan pengaturan.
- Audit lanjutan menemukan dan memperbaiki pengingat yang tidak bisa dimatikan bila kolom waktu dikosongkan. Test mereproduksi kegagalan pada desktop/seluler sebelum perbaikan. Regresi dalam suite utama membuktikan validasi jadwal aktif tetap berlaku dan deduplikasi bertahan saat visibility kembali aktif serta setelah reload.
- Screenshot aplikasi/timer dari build produksi tersimpan di `.impeccable/review/`. Laporan dan screenshot merupakan cache lokal, tidak dikomit sebagai aset produk.

## Visual dan aset

Render landing sudah diperiksa pada 1440, 768, dan 390 px melalui Taste Skill. Alur aplikasi juga dibuka di browser. Screenshot inspector disimpan dalam cache lokal `.taste-skill/inspect/`.

Inspector tahap implementasi awal melaporkan tiga FAIL: kuota gambar, ambang elemen dominan, dan kuota gerak. Empat gambar serta delapan elemen bergerak tidak diterapkan karena aset ditunda pengguna dan DESIGN.md menetapkan gerak tenang. Ambang dominasi tipografi inspector juga tidak diadopsi untuk menggantikan skala awal 64 px; hero dibaca bersama demo interaktif. Warna canvas mengikuti palet pengguna. Label demo yang berlebihan telah dihapus. Ini bukan laporan bahwa semua gate Taste Skill lulus.

Penilaian render awal oleh agen: desain 7/10, kegunaan 8/10, kreativitas 5/10, isi 8/10. Ini penilaian internal, bukan hasil riset pengguna. Aset final masih dibutuhkan untuk identitas yang lebih kuat.

Detector Impeccable dijalankan manual karena konteks sesi melaporkan hook otomatis tidak aktif. Laporan tahap implementasi memuat 14 advisory ukuran huruf, 11 advisory radius, dan satu warning nama family font. Family font kemudian diselaraskan ke nama paket `Nunito Variable`; hasil pemeriksaan ulang ada pada subbagian polesan di bawah. Kurva panel hero merupakan eksplorasi motif tempurung. Tidak ada klaim semua pemeriksaan engine bersih.

### Polesan landing page, 18 Oktober 2026

Pengguna memilih fokus landing page. Perubahan mencakup padding hero/demo, tanda centang durasi aktif, ikon panah demo, dasar tombol utama, simbol kategori, serta susunan footer. Copy, palet, routing, dan perilaku aplikasi dipertahankan. Alasan perubahan tercatat di [implementation-decisions.md](./implementation-decisions.md#polesan-landing-page).

- `npm run lint`, `npm run typecheck`, pemeriksaan Prettier pada dua source yang berubah, dan `git diff --check` berhasil.
- Dua percobaan `npm run build`, di sandbox dan di luar sandbox, gagal ketika proses pengolah CSS Turbopack keluar sebelum terhubung dengan exit code 0. Log tidak menjelaskan penyebabnya; belum ada bukti bahwa sandbox merupakan penyebab. Source tidak diubah untuk menyiasati kegagalan ini.
- `npm run build -- --webpack` berhasil, termasuk TypeScript serta pembuatan halaman. Ini opsi perintah untuk preview kali ini; script build dan konfigurasi Next.js tidak diganti. Kegagalan Turbopack tetap perlu diperiksa bila build default digunakan lagi.
- Preview produksi terbaru berjalan pada `http://127.0.0.1:3100/`. Inspector membaca build Webpack tersebut pada 1440, 768, dan 390 px: overflow horizontal 0, daftar kontras rendah kosong, Nunito Variable dimuat, serta `consoleErrors` kosong pada ketiganya. Screenshot fold dan lembar seluruh halaman ditinjau langsung.
- Pemeriksaan interaksi melalui browser: radio 2 menit dengan klik, lalu 5 dan 10 menit dengan tombol panah mengubah contoh serta URL link. Membuka demo pada 10 menit menghasilkan `/app?minutes=10`, dan pilihan 10 menit aktif pada aplikasi. Fokus radio terlihat pada screenshot.
- Kelima link masuk umum dibuka dan menuju `/app`; link demo, anchor cara pakai, skip link, serta dua link merek juga diperiksa. Anchor menuju `#cara-pakai` dan `#main`; merek menuju beranda. Ini pemeriksaan interaksi landing, bukan pengulangan suite otomatis aplikasi.
- Vitest dan suite Playwright tidak dijalankan ulang dalam polesan ini. Hasil suite di atas berasal dari tahap implementasi sebelumnya.

Cache lokal sebelum/sesudah: `.taste-skill/polish-before/` dan `.taste-skill/polish-after/`, masing-masing berisi `report.json` dan screenshot. Cache tidak dikomit sebagai aset produk.

Taste source lint melaporkan dua FAIL `shadow`, pada dasar tombol normal dan ditekan. Inspector sesudah melaporkan lima jenis FAIL: `shadow`, `button-fx`, `few-pictures`, `focal-point`, dan `still-page`; dua WARN: `palette-cream` dan `no-footage`. Dasar tombol 3/1 px mengikuti DESIGN.md, canvas mengikuti palet pengguna, hero mengikuti skala awal 64 px, gerak mengikuti MOTION 1, dan aset final ditunda pengguna. Temuan tetap dilaporkan, bukan disembunyikan atau dianggap lulus.

Detector Impeccable dijalankan sekali sesudah perubahan source dengan `.codex/impeccable.cmd detect --json src/app/globals.css src/components/landing/activity-preview.tsx`. Hasil: 14 advisory ukuran huruf dan 11 advisory radius; tidak ada warning family font. Detector membaca seluruh stylesheet, termasuk aturan aplikasi di luar lingkup polesan. Tidak ada perubahan skala/radius global untuk menghapus advisory tersebut.

#### Critique render

ROUND 1, sebelum polesan:

- Seen in one second: judul jeda dan panel biru pilihan waktu.
- Idea: kurva tempurung menjadi wadah satu pilihan kegiatan kecil.
- Live thing: pilih 2/5/10 menit untuk melihat contoh dan meneruskan durasi ke aplikasi.
- Layout words by section: hero=split / cara pakai=alur teks / tujuan=bidang sand dan daftar / kendali=split / penutup=bar / footer=flex.
- Scores: design 6.5, usability 8, creativity 6, content 8; arithmetic 7.0, overall 6.0 setelah cap.
- Caps applied: gambar kurang dari empat membatasi design ke 6.5; FAIL inspector membatasi overall ke 6.0.
- Top three problems: panel demo terlalu berat dibanding isi hero (`polish-before/desktop-page-01.jpg`), simbol refleksi menyatu dengan bidang sand (lembar desktop yang sama), dan keterangan footer terpisah kurang rapi di ponsel (`polish-before/mobile-page-01.jpg`). Perbaikan: padatkan padding, perjelas bidang simbol, lalu kelompokkan footer dengan grid responsif.

ROUND 2, sesudah polesan:

- Seen in one second: ajakan jeda dan pilihan menit dalam bidang tempurung biru.
- Idea dan live thing: tetap seperti ROUND 1; arah `one-motif`, seed `469094123`, tanpa draw ulang.
- Layout words by section: hero=split / cara pakai=alur teks / tujuan=bidang sand dan daftar / kendali=split / penutup=bar / footer=grid responsif.
- Scores: design 6.5, usability 8, creativity 6, content 8; arithmetic 7.0, overall 6.0 setelah cap. Perbaikan detail tidak membenarkan kenaikan nilai satu poin penuh.
- Caps applied: sama seperti ROUND 1; resting shadow juga memiliki cap 6.5, lebih longgar daripada cap overall 6.0 yang sudah berlaku.
- Top three remaining problems: identitas visual masih mengandalkan simbol sementara, tanpa ilustrasi maskot final (`polish-after/desktop-page-01.jpg`); hero belum memenuhi ambang dominasi inspector (`polish-after/desktop-fold.jpg`); halaman tidak memenuhi kuota gambar/gerak Taste (`polish-after/mobile-page-01.jpg`). Aset tetap menunggu arahan pengguna; skala dan gerak tidak diperbesar di luar panduan Nudge hanya untuk mengubah angka inspector.

Penilaian ini oleh agen, bukan hasil peserta atau riset pengguna. Tidak ada foto, video, kandidat logo, atau konten contoh baru yang ditambahkan pada polesan ini. Katalog contoh tetap diberi label sebagai contoh kegiatan.

### Pemeriksaan build default lanjutan

18 Oktober 2026, sesudah polesan landing:

- `npm run build` sempat mereproduksi kegagalan worker CSS yang sama dalam sekitar tujuh detik, di luar sandbox.
- Probe sementara menjalankan worker PostCSS yang dihasilkan Turbopack dengan server TCP localhost. Worker terhubung, mengirim frame siap empat byte, lalu keluar setelah probe menutup koneksi. Ini membuktikan worker dapat mulai berjalan, bukan membuktikan seluruh pemrosesan CSS atau akar kegagalan build.
- Build dengan pencatatan sementara pada startup/koneksi worker berhasil. Dua worker teramati terhubung ke port lokal masing-masing. Build default berikutnya, tanpa pencatatan, juga berhasil.
- Setelah seluruh direktori `.next` dipindahkan ke cache sementara, `npm run build` dari keluaran kosong berhasil: kompilasi 10.0 detik, TypeScript, pengumpulan data, dan pembuatan seluruh halaman selesai. Tidak memakai `--webpack` atau preload pada percobaan ini.
- Script instrumentasi dan cadangan build sementara kemudian dihapus. Package, konfigurasi, dan source aplikasi tidak diubah untuk membuat build lulus. Tidak ada perubahan variabel lingkungan yang dipersistenkan.
- Preview pada port 3100 dijalankan kembali memakai build Turbopack yang bersih tersebut. Landing dimuat dan pilihan dua menit menuju `/app?minutes=2` diperiksa melalui browser.

Status saat pemeriksaan ini: build default kembali berhasil, termasuk dari direktori keluaran yang bersih. Penyebab kegagalan awal belum dibuktikan; jangan menyebutnya perbaikan akar masalah atau jaminan masalah tidak akan muncul lagi. Jika berulang, gunakan log kegagalan aktual. Suite Vitest/Playwright tidak dijalankan ulang pada pemeriksaan build ini.

### Audit penerimaan sesudah build bersih

Audit lanjutan pada 18 Oktober 2026 menggunakan source pada `f980ddf` dan build Turbopack bersih dari pemeriksaan sebelumnya:

- `npm test`: 17 test pada enam berkas lulus, durasi runner 1.49 detik.
- `npm run test:pwa`: delapan skenario lulus dalam 30.6 detik pada Chrome desktop dan viewport Pixel 7. Konfigurasi menjalankan server produksi baru pada port 3100 dan mengizinkan service worker.
- Source skenario diperiksa: alur dari landing ke pemilihan, saran, timer, jeda/lanjut, Selesai, dan Lewati; tidak ada pageerror/console error pada skenario alur tersebut; registrasi worker, ikon PNG, cache tanpa navigasi, serta offline/pemulihan koneksi memiliki assertion nyata.
- Pengujian notifikasi tetap memanggil `showNotification` asli sesudah izin diberikan pada profil pengujian. Kelulusannya membuktikan penerimaan API, bukan tampilan notifikasi atau izin OS Android.
- Source rekomendasi tetap menyaring tujuan/durasi, mengeluarkan penolakan sesi, memberi bobot mood/feedback, serta menjelaskan perbedaan filter. Timer deadline membedakan elapsed dari completed; fungsi pembaruan mood mempertahankan mood sebelumnya saat skip. Suite unit di atas menguji kontrak modul tersebut.
- Suite utama 44 skenario tetap merupakan bukti tahap implementasi sebelumnya; tidak dijalankan ulang pada audit ini. Tidak ada perubahan logika aplikasi atau penambahan test pada audit lanjutan.

| Item rencana yang belum selesai | Bukti keadaan saat audit | Dependensi untuk melanjutkan |
| --- | --- | --- |
| P2-01/P2-02/P5-03 | Source memakai TurtleIcon serta ikon PNG `n.` sementara; aset final belum tersedia dan ditunda pengguna. | Pengguna membuka kembali tahap aset. |
| P6-04/P7-03/P7-04 | Uji produksi lokal lulus; kolom lingkungan/hasil Android pada manual-checks.md masih kosong, hosting HTTPS belum ditetapkan. | URL HTTPS yang disepakati serta pemeriksaan pada Android Chrome fisik. |
| P8-02 | Bukti otomatis dan screenshot tersedia; pengguna melaporkan zoom Chrome 200% tanpa error pada 22 Oktober 2026. Rincian layar belum dicatat; pembaca layar belum diperiksa. | Lengkapi rincian lingkungan dan pemeriksaan pembaca layar nyata. |
| P8-04 | Laporan pengguna menyebut desktop lancar, tanpa rincian tugas/perangkat atau catatan observasi terstruktur. | Sesi observasi pengguna dengan tugas PRD. |
| P8-05 | README, keputusan, laporan, serta lisensi font/ikon tersedia; penerimaan rilis masih bergantung pada item di atas. | Melengkapi bukti manual dan aset sebelum menyatakan seluruh rencana selesai. |

Audit ini tidak mencentang item yang masih memerlukan bukti eksternal. Pekerjaan kode yang diperiksa dapat ditinjau, sedangkan penyelesaian seluruh rencana menunggu dependensi di tabel.

### Eksplorasi logo dan maskot dibuka kembali

Pengguna melanjutkan tahap logo, maskot dan ilustrasi pada 18 Oktober 2026. Persetujuan enam kandidat dan penggunaan tool gambar bawaan dari percakapan sebelumnya digunakan kembali. Tiga arah dipresentasikan: tempurung bulat kompak, kura-kura beristirahat, serta wajah ramah dengan tempurung besar.

Enam generasi independen, A1/A2/B1/B2/C1/C2, menghasilkan enam PNG asli 1254 x 1254. Setiap kandidat dibuat sekali, tanpa memakai kandidat lain sebagai referensi. Gambar dan prompt lengkap tersimpan di [docs/assets/logo-exploration-01](./assets/logo-exploration-01/README.md); metadata dan hash ada pada manifest.json di direktori yang sama. Nama model/provider tidak diekspos oleh hasil tool dan tidak ditebak.

Metadata berkas serta kesamaan hash salinan diperiksa. Sesuai alur satu batch IP as Logo, hasil disampaikan tanpa pemeringkatan, perbaikan gambar, resampling, atau regenerasi otomatis. Belum ada klaim kandidat lulus audit visual, kemiripan merek, atau keterbacaan ukuran kecil. Pengguna perlu memilih bentuk induk sebelum pose dan ilustrasi turunannya diproduksi. Kandidat belum diintegrasikan ke aplikasi dan belum menjadi logo atau ikon PWA final.

## Batas yang masih perlu diperiksa

Target fisik yang dipilih pengguna adalah Android dengan Chrome. Tugas dan lembar pencatatan tersedia pada [manual-checks.md](./manual-checks.md); seluruh kolom hasil perangkat fisik masih kosong.

- Pemasangan PWA dari menu browser dan peluncuran dari ikon pada perangkat fisik.
- Izin OS, pengiriman notifikasi nyata, penundaan saat tidur, dan pembaruan worker pada perangkat sasaran.
- Pembaca layar nyata dan pengujian alur dengan peserta. Pemeriksaan otomatis tidak membuktikan seluruh aksesibilitas atau kegunaan produk.
- Aset C1 sudah tersedia. Pemeriksaan pemotongan dan peluncuran ikon pemasangan pada Android fisik masih menunggu.
- Hosting HTTPS belum dipilih; aplikasi belum dipublikasikan.

## Dependensi

`npm audit` melaporkan 5 temuan high dalam rantai alat lint: eslint-config-next, plugin Next, fast-glob, micromatch, dan braces. Advisory utama GHSA-vfj7-8cjw-p6xm terkait pola glob bertingkat dalam braces. Registry masih memberikan braces 3.0.3 tanpa versi perbaikan. Dependensi ini bukan bagian runtime aplikasi. Tidak menjalankan `audit fix --force` karena usulan npm menurunkan eslint-config-next ke mayor 14. `npm audit --omit=dev --json` lulus dengan nol temuan runtime.

## Pemetaan kebutuhan

| Kebutuhan | Bukti otomatis | Sisa pemeriksaan |
| --- | --- | --- |
| FR-01 konteks | Validasi, mood/Lewati, keyboard, semua tujuan/waktu pada unit test | Observasi pemahaman pengguna |
| FR-02 saran/alternatif | Metadata, satu saran, penolakan, penjelasan filter berbeda, keadaan habis/kosong | Kecocokan aktivitas dan variasi katalog pada pengguna |
| FR-03 umpan balik | Ranking sesi, Cocok tanpa auto-mulai, Kurang cocok memberi alternatif, reload menghapus feedback | Observasi pemahaman pengguna |
| FR-04 timer | Deadline, jeda/lanjut, habis, berhenti/ganti, selesai manual | Sleep/resume perangkat nyata |
| FR-05 siklus mood | Lewati mempertahankan mood/kosong; perubahan mood dan kembali ke aplikasi | Observasi alur pengguna |
| FR-06 favorit | Reload, tambah/hapus, data rusak/tidak tersedia, deduplikasi | Kehilangan data browser dijelaskan UI |
| FR-07 journaling | Prompt dan timer tanpa textarea/penyimpanan tulisan | Kecocokan prompt |
| FR-08 pengingat | Opt-in, penolakan, jadwal jatuh tempo, deduplikasi, ubah/matikan | Izin/pengiriman OS nyata |
| FR-09 jalur web/PWA | Landing ke aplikasi, URL langsung, manifest, worker dan offline | Pemasangan serta peluncuran ikon nyata |

## Tinjauan kode

Review mandiri lima aspek memakai panduan Code Review and Quality: perilaku dibandingkan PRD, keterbacaan, pemisahan modul, keamanan data, dan kinerja. Logika murni dipisahkan dari UI, notifikasi dipisahkan dari scheduler, state sesi tidak dipersistenkan, timer memakai deadline, dan katalog tidak memanggil layanan luar. Feedback positif diperbaiki agar memengaruhi peringkat aktivitas, bukan seluruh tujuan yang sudah terfilter. Callback pengingat membatalkan pengiriman yang masih antre setelah pengaturan berubah.

Keterbatasan pemeliharaan: komponen ActivityApp masih cukup besar karena memuat beberapa layar. Pemisahan presentasi per layar bisa dilakukan bila iterasi desain selanjutnya membutuhkannya; aturan domain sudah berada pada modul terpisah. Ini review oleh pembuat implementasi, bukan persetujuan reviewer independen.

Peringatan hydration pada pengujian pembesaran teks disebabkan test mengubah atribut HTML sebelum hydration selesai. Setup test disesuaikan untuk menunggu interaksi aplikasi lebih dulu. Alur produksi terpisah menangkap pageerror dan console error, dan keduanya kosong pada skenario tersebut.

Audit pengingat lanjutan: formulir memvalidasi jadwal aktif melalui aturan aplikasi. Saat mematikan pengingat dengan waktu belum lengkap, waktu valid yang terakhir tersimpan dipertahankan sehingga pembatalan tidak tertahan oleh validasi input. Test adapter membuktikan pemakaian showNotification melalui service worker, penghentian setelah pembatalan saat menunggu registrasi, dan tidak mengirim ketika izin ditolak. Ini bukti kontrak API dengan mock, bukan bukti notifikasi OS nyata.

Test produksi tambahan menggunakan izin pada profil Chrome pengujian dan pembungkus observasi yang tetap memanggil `showNotification` asli. Assertion memeriksa judul/tag hanya setelah Promise API tersebut selesai tanpa penolakan. Pemeriksaan awal yang mengharuskan `getNotifications()` mempertahankan entri tidak stabil; probe menunjukkan API asli berhasil meskipun daftar segera kosong. Test akhir membuktikan penerimaan API, bukan tampilan atau retensi notifikasi OS. Pemeriksaan Android tetap diperlukan.

Pada pemeriksaan menyeluruh awal, 37 skenario lulus dan satu skenario tiga audit Axe melewati batas gabungan 30 detik. Batas skenario tersebut diperpanjang menjadi 60 detik tanpa mengurangi assertion. Seluruh 38 skenario kemudian lulus dalam satu pemanggilan; skenario yang sebelumnya timeout selesai sekitar 11 detik pada desktop dan seluler dalam pemanggilan itu. Penyebab perubahan waktu antar-pemanggilan belum dipastikan.

Pemeriksaan izin tertunda mereproduksi pengingat yang hilang ketika jadwal tiba sebelum pengguna menjawab dialog izin. Penanda kejadian tersimpan terlalu awal, sementara adapter belum boleh mengirim. Scheduler kini menunggu keputusan izin dan memeriksa waktu saat itu lagi. Dua skenario pada desktop/seluler membuktikan pengiriman saat masih pada menit jadwal serta tidak mengirim susulan setelah menit itu lewat; suite pengingat berisi 16 skenario dan telah lulus.

Perluasan pemeriksaan teks 200% menemukan ikon judul favorit keluar dari layar 320 px pada Chrome desktop. Header kini dapat membungkus ke baris berikutnya. Regresi reflow mencakup pemilihan, panduan pemasangan terbuka, saran, timer, penyelesaian, favorit kosong/terisi, dan pengingat. Seluruh judul pada katalog juga diperiksa melalui daftar favorit. Bukti ini memeriksa pembesaran teks, bukan seluruh perilaku zoom browser atau pembaca layar nyata.

Tinjauan screenshot menemukan label navigasi bertumpuk meskipun kotak tombol masih berada dalam viewport. Pemeriksaan batas teks dengan DOM Range mereproduksi masalah pada desktop/seluler. Navigasi kini membungkus dan basis flex tombol mengikuti isinya; screenshot ulang menunjukkan label terbaca tanpa tumpang tindih. Gambar teks besar favorit/pengingat tersimpan di `.impeccable/review/large-text-*.png`.

Peringatan hydration lain muncul ketika pengujian mengambil screenshot sebelum interaksi pertama. Diff browser menunjukkan atribut `caret-color: transparent` pada input, sesuai perubahan caret yang dilakukan alat screenshot. Snapshot awal kini diambil setelah pilihan mood merespons keyboard; skenario tersebut juga menangkap `pageerror` serta console error. Ini perubahan setup pengujian, tanpa menekan peringatan pada kode aplikasi.

## Pekerjaan yang memerlukan tahap berikutnya

- P2-02/P5-03 sudah diselesaikan dengan C1 dan inventaris produksi; lihat hasil terbaru pada bagian integrasi C1 di atas.
- P6-04/P7-03/P7-04: pemasangan, peluncuran ikon, izin OS, sleep/resume, serta notifikasi pada Android Chrome fisik belum dibuktikan. Belum ada URL produksi/preview yang diizinkan dan bisa digunakan pada perangkat tersebut.
- P8-02: pemeriksaan otomatis dan screenshot tersedia. Pada 22 Oktober 2026 pengguna melaporkan percobaan zoom Chrome 200% berjalan baik tanpa error; rincian layar dan versi browser belum tersedia. Pembaca layar nyata belum diperiksa. Lihat laporan pengguna di docs/manual-checks.md.
- P8-04: pengguna melaporkan percobaan desktop berjalan lancar, tetapi tugas yang dicoba, lingkungan, serta hasil per langkah belum dicatat. Observasi tugas secara terstruktur belum dilakukan; tidak ada hasil tambahan yang boleh diisi dari simulasi agen.
- P8-05 dan kesiapan rilis masih bergantung pada bukti manual tersebut. Status kode yang dapat ditinjau tidak menyatakan seluruh rencana selesai.

## Revisi motion landing, 23 Oktober 2026

- Produksi: `next build --webpack` berhasil dan HTTP 200 di port 3100.
- Tes final `playwright.landing.config.ts`: 31 passed, 1 skipped, 2,1 menit. Pengulangan dua siklus hanya desktop; lifecycle mobile tetap diuji.
- TypeScript, ESLint file landing/tes, serta pemeriksaan format file berubah dijalankan terpisah.
- Tujuh cerita memiliki bentuk berbeda; hanya hero dan penutup memakai C1. Dua animasi Lottie diperiksa terus bergerak setelah lebih dari dua siklus, dengan fallback SVG dan pemuatan lokal.
- Taste: source lint 0 FAIL/0 WARN; inspector final 0 FAIL/2 WARN setelah tiga pengecualian terdokumentasi, bukan kelulusan tanpa pengecualian. Rubric internal 7,2 dengan keterbatasan campuran gaya dan ruang terbuka.
- Sumber/lisensi, pengecualian, screenshot, kritik visual, serta batas bukti lengkap ada di [revisi motion landing](./landing-motion-revision.md). Android fisik dan kualitas artistik menurut pengguna tidak disimpulkan dari tes otomatis.

## Pemulihan hydration dari cache development, 24 Oktober 2026

Tab pengguna memperlihatkan HTML hero v7 berhadapan dengan kode klien hero SVG lama. Worker `nudge-static-v3` menyimpan seluruh `/_next/static/` secara cache-first, termasuk respons development `no-store` yang URL-nya dapat digunakan kembali setelah perubahan kode. Reproduksi browser dengan worker cache-first lama dan bundle hero yang sengaja dibedakan menghasilkan hydration mismatch yang sama.

Perbaikan:

- Cache `nudge-static-v4` hanya menyimpan dan menggunakan ulang bundle Next yang responsnya bertanda `immutable`. Halaman offline dan ikon tetap masuk cache statis.
- Root layout memuat loader `beforeInteractive` khusus development untuk membatalkan registrasi `/sw.js` milik Nudge dan menghapus cache dengan awalan `nudge-static-`. Jika dokumen masih dikendalikan worker lama, satu reload melepaskan controller tersebut dan mengambil kode terbaru. Pemulihan mengganti dokumen yang telanjur memakai bundle lama; validasi hydration dilakukan pada dokumen sesudah pemulihan.
- Loader tidak mengakses localStorage. Regresi memeriksa bahwa nilai localStorage tetap ada setelah pemulihan.

Bukti pemeriksaan:

- `npx vitest run src/lib/service-worker.test.ts`: 3 lulus, mencakup bundle development yang berubah, cache mutable lama, dan penggunaan cache bundle produksi immutable saat offline.
- `tests/e2e/landing-hydration.spec.ts`: desktop Chrome dan emulasi Pixel 7 lulus. Worker lama serta bundle yang berbeda dipasang hanya dalam profil pengujian terpisah. Sesudah pemulihan, controller/registrasi/cache Nudge development sudah tidak aktif, markup hero sesuai, dan reload berikutnya tidak menghasilkan hydration error.
- Tab in-app browser pengguna dimuat ulang. Tombol hero aktif dan tidak ada log error baru setelah reload; log historis dipisahkan dari hasil pemeriksaan baru.
- Build produksi `npm run build -- --webpack` berhasil, termasuk TypeScript. ESLint file yang diubah dan pemeriksaan whitespace Git lulus.
- Server produksi sementara pada port 3102 diperiksa melalui Chrome: tidak ada error hydration, loader development tidak ada dalam HTML produksi, 13 chunk immutable tersimpan di cache v4, serta navigasi offline menampilkan halaman “Koneksi sedang terputus”. Server development utama tetap di port 3100. Ini bukan pemeriksaan instalasi Android fisik.
