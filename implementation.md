# Rencana Implementasi Nudge

Status: rencana kerja v1, implementasi belum dimulai.  
Tanggal: 18 Oktober 2026.  
Cakupan: MVP web responsif dan PWA dalam satu codebase.

## 1. Tujuan dan acuan

Dokumen ini menerjemahkan kebutuhan produk menjadi pekerjaan berurutan, dependensi, kriteria selesai, dan bukti verifikasi. Gunakan sebagai daftar kerja yang diperbarui selama pengembangan. Dokumen ini tidak menggantikan aturan perilaku atau identitas visual yang sudah disepakati.

| Acuan | Peran |
| --- | --- |
| [prd.md](./prd.md) | Kebutuhan MVP, FR-01 sampai FR-09, batas produk, dan penerimaan rilis. |
| [DESIGN.md](./DESIGN.md) | Keputusan visual tetap, token awal, ruang eksplorasi, dan kebutuhan aset. |
| [AGENTS.md](./AGENTS.md) | Aturan kontribusi, izin tindakan, struktur, dan verifikasi. |
| [GLOSSARY.md](./GLOSSARY.md) | Istilah produk yang digunakan dalam kode dan antarmuka. |
| [docs/skills.md](./docs/skills.md) | Pemilihan skill dan batas runtime lokal. |
| [Riset stack](./docs/research/stack-feasibility.md) | Dasar teknis dan batas notifikasi browser. |

Jika rencana berbeda dengan PRD, sesuaikan rencana atau ajukan perubahan kebutuhan secara eksplisit. Jangan mengubah perilaku produk hanya untuk memudahkan penyelesaian tahap.

Pembuatan rencana ini tidak menjalankan scaffolding, pemasangan paket, generasi aset, deployment, commit, atau push. Kerjakan tahap berikutnya ketika pengguna memberikan instruksi pelaksanaan yang sesuai; otorisasi yang sudah mencakup pekerjaan tersebut tidak perlu diminta ulang.

## 2. Kondisi awal yang diperiksa

| Bagian | Kondisi saat penyusunan |
| --- | --- |
| Dokumen produk/desain | PRD, konsep, glossary, DESIGN.md, dan panduan kontribusi tersedia. |
| Skill | Skill pengembangan dan sembilan skill UI/desain tersedia lokal; rujuk panduan skill untuk peran. |
| Impeccable | Engine lokal dan manifest hook tersedia; persetujuan dilaporkan pengguna. Keberhasilan pemicu saat edit UI tetap perlu dibuktikan. |
| Kode aplikasi | Belum ada source aplikasi, `package.json`, lockfile, atau script build/test. |
| Aset Nudge | Logo, maskot, ilustrasi, font, dan ikon aplikasi belum dibuat/diintegrasikan. Aset contoh upstream adalah referensi. |
| Hosting dan perangkat uji | Belum dipilih atau dikonfirmasi. |

Stack produk yang dipilih: Next.js App Router, TypeScript, Tailwind CSS, manifest/service worker, localStorage, Vitest, dan Playwright. Vite tidak menjadi build server aplikasi terpisah.

## 3. Aturan status dan penyelesaian

- **Belum dimulai:** belum ada pekerjaan implementasi pada tugas tersebut.
- **Dikerjakan:** perubahan sedang dibuat; tulis langkah berikutnya.
- **Menunggu:** ada dependensi atau keputusan yang belum tersedia; sebutkan apa yang ditunggu.
- **Selesai:** keluaran dan kriteria selesai terpenuhi, dengan bukti pemeriksaan yang relevan.

Checklist tugas baru dicentang saat selesai. Jika kode sudah ada tetapi pemeriksaan belum dilakukan, pertahankan status Dikerjakan atau Menunggu. Keberhasilan unit test tidak menggantikan pemeriksaan browser, visual, atau perangkat nyata.

Perbarui status, tanggal, hasil verifikasi, dan keputusan terkait setelah menyelesaikan satu unit kerja. Jangan mengisi hasil pengujian atau estimasi keberhasilan yang belum diamati. Tidak ada persentase coverage atau estimasi waktu pengerjaan yang ditetapkan dalam rencana ini.

## 4. Keputusan teknis sebelum bagian terkait dikerjakan

| ID | Keputusan dan usulan awal | Batas waktu keputusan | Status |
| --- | --- | --- | --- |
| D-01 | Package manager. Usulan: npm agar memakai satu lockfile dan alur umum; pastikan sesuai lingkungan/repo sebelum dipilih. | Sebelum P1 | Belum ditetapkan |
| D-02 | Versi Node dan paket. Periksa kompatibilitas serta dokumentasi resmi saat scaffolding, lalu catat versi dan lockfile aktual. | P1 | Belum ditetapkan |
| D-03 | State sesi. Usulan: state/reducer di sisi klien; konteks/feedback bertahan selama alur penggunaan aktif, tanpa persistensi lintas sesi. Tetapkan reset, reload, dan navigasi internal secara eksplisit. | P3 | Belum ditetapkan |
| D-04 | Rekomendasi. Usulan: filter wajib, ranking sederhana, dan urutan kandidat stabil agar dapat diperiksa. Tetapkan pemetaan mood serta pemecah nilai sama. | P3 | Belum ditetapkan |
| D-05 | Pengingat. Tetapkan waktu lokal perangkat, pemeriksaan jadwal ketika aplikasi kembali aktif, pencegahan duplikasi, dan kebijakan jadwal yang terlewat. | P6 | Belum ditetapkan |
| D-06 | Cache/service worker. Tentukan berkas yang dicache, navigasi awal, penanganan pembaruan, dan batas offline secara sengaja. | P7 | Belum ditetapkan |
| D-07 | Matriks browser/perangkat. Pilih lingkungan desktop, browser seluler, dan PWA nyata yang dapat diperiksa. Catat akses perangkat yang belum tersedia. | Sebelum pemeriksaan P6/P7 | Belum ditetapkan |
| D-08 | Hosting HTTPS dan distribusi preview. Pilih berdasarkan kebutuhan deploy Next.js serta PWA; publikasi mengikuti instruksi pengguna. | Sebelum pemeriksaan deployment | Belum ditetapkan |

Usulan ini belum menjadi konfigurasi yang terpasang. Pilihan rutin yang tetap berada dalam cakupan implementasi dapat diselesaikan saat tahap tersebut diizinkan. Keputusan yang memperluas perilaku produk, pengumpulan data, atau layanan eksternal harus dibahas dengan pengguna.

## 5. Urutan tahap dan dependensi

| Tahap | Fokus | Dependensi | Status awal |
| --- | --- | --- | --- |
| P0 | Persiapan pelaksanaan dan keputusan awal | Dokumen tersedia dan izin pelaksanaan | Belum dimulai |
| P1 | Fondasi proyek dan alat pemeriksaan | P0 | Belum dimulai |
| P2 | Token visual, komponen dasar, dan aset induk | P0; kode komponen memerlukan P1 | Belum dimulai |
| P3 | Katalog, rekomendasi, state sesi, dan timer | P1 serta keputusan D-03/D-04 | Belum dimulai |
| P4 | Alur aplikasi utama | P2 komponen, P3; aset final dapat menyusul selama pengembangan | Belum dimulai |
| P5 | Landing page | P1, P2; CTA terintegrasi dengan P4 | Belum dimulai |
| P6 | Favorit dan pengingat opt-in | P3/P4; integrasi notifikasi tertentu memerlukan service worker P7 | Belum dimulai |
| P7 | PWA dan integrasi browser/perangkat | P1, aset P2, rute P4/P5; diuji bersama P6 | Belum dimulai |
| P8 | Pemeriksaan rilis dan pemolesan | P4 sampai P7, aset siap, lingkungan uji tersedia | Belum dimulai |

Eksplorasi aset P2 dapat berlangsung sebelum atau bersama fondasi kode. Logika murni P3 tidak harus menunggu logo final. P7 dapat mulai sebelum P6 selesai, lalu keduanya digabungkan untuk memeriksa notifikasi yang membutuhkan service worker. Tabel dependensi tidak memerintahkan penggunaan subagent otomatis.

## 6. Rincian pekerjaan

### P0. Persiapan pelaksanaan

**Tujuan:** memastikan titik awal dan batas pekerjaan jelas sebelum mengubah proyek.

- [ ] **P0-01:** baca ulang aturan proyek, perubahan kerja yang sudah ada, PRD, dan keputusan tetap desain. Pertahankan dokumen/skill yang telah tersedia.
- [ ] **P0-02:** selesaikan D-01 dan cara mencatat versi D-02, serta tentukan tahap yang sedang diizinkan pengguna.
- [ ] **P0-03:** pilih cara kerja Git tanpa mengasumsikan izin membuat commit atau push. Bila memakai branch/worktree, catat lokasi dan dasar yang benar.

**Keluaran:** daftar keputusan awal dan lingkup tahap yang akan dikerjakan.  
**Kriteria selesai:** workspace yang benar terkonfirmasi dan keputusan yang diperlukan untuk P1 tercatat.  
**Verifikasi:** pemeriksaan file/config/Git yang relevan; belum ada klaim aplikasi dapat dijalankan.

### P1. Fondasi proyek

**Kebutuhan terkait:** dukungan seluruh FR; struktur rute FR-09.

- [ ] **P1-01:** scaffold Next.js App Router, TypeScript, dan Tailwind di repository yang sudah berisi dokumen. Hindari generator yang menimpa file tanpa meninjau hasilnya.
- [ ] **P1-02:** sediakan root layout, metadata dasar, rute `/` dan `/app`, serta batas Server/Client Components untuk interaksi browser. Jangan mengakses localStorage atau izin notifikasi saat render server.
- [ ] **P1-03:** konfigurasi lint/format, Vitest, dan Playwright beserta script package yang benar-benar dapat dipanggil. Pisahkan konfigurasi test dari bundle aplikasi.
- [ ] **P1-04:** catat package manager, versi, dan perintah aktual di AGENTS.md; simpan lockfile. Tambahkan pengecualian Git untuk output build, laporan, dan cache sesuai konfigurasi yang dibuat.

**Keluaran:** fondasi aplikasi dan konfigurasi pemeriksaan.  
**Kriteria selesai:** rute dasar dapat dibuka; script yang dicatat cocok dengan package.json; pemeriksaan awal relevan berjalan.  
**Verifikasi:** type checking, lint, build, serta satu pemeriksaan bermakna pada perilaku/rute yang sudah ada. Hindari test kosong yang hanya membuktikan runner menyala.

### P2. Sistem visual dan aset awal

**Acuan:** DESIGN.md; tidak mengubah kebutuhan FR.

- [ ] **P2-01:** gunakan IP as Logo untuk menawarkan arah simbol kura-kura dan jumlah kandidat. Pastikan kemampuan model tersedia; generasi mengikuti persetujuan pengguna pada tahap aset.
- [ ] **P2-02:** tetapkan satu bentuk induk, lalu produksi pose ringkas, ekspresi yang dipakai, ilustrasi tiga kelompok aktivitas, logo/wordmark, dan turunan ikon PWA. Catat sumber, lisensi/atribusi, ukuran, serta lokasi berkas nyata.
- [ ] **P2-03:** terjemahkan token DESIGN.md ke sumber styling aplikasi. Integrasikan Nunito dan keluarga ikon awal dari sumber resmi dengan lisensi yang dipertahankan; konfirmasi pilihan pengganti bila diperlukan.
- [ ] **P2-04:** buat komponen dasar tombol, pilihan tunggal, kartu, pesan status, fokus, dan pendamping maskot. Sediakan state yang diperlukan sebelum menempatkannya ke alur utama.

**Keluaran:** token terpakai, komponen bersama, serta inventaris aset yang membedakan referensi, sementara, dan siap pakai.  
**Kriteria selesai:** komponen konsisten dan dapat dioperasikan; maskot tetap dikenali pada ukuran kecil; aset yang ditandai siap benar-benar tersedia.  
**Verifikasi:** render komponen, keyboard, ukuran sentuh, pasangan warna, reduced motion, dan tampilan maskot pada ukuran penggunaan.

Aset sementara boleh membantu pengembangan jika diberi label jujur. Placeholder tidak dianggap memenuhi syarat aset pada P8. Jangan memakai karakter Duo atau berkas contoh skill sebagai aset final Nudge.

### P3. Model dan logika inti

**Kebutuhan terkait:** FR-01, FR-02, FR-03, FR-04, FR-05, FR-07.

- [ ] **P3-01:** tetapkan tipe aktivitas, konteks pilihan, hasil rekomendasi, feedback sesi, dan status timer; selesaikan D-03/D-04. Gunakan istilah glossary.
- [ ] **P3-02:** buat katalog awal dari PRD, termasuk journaling, kondisi alat/tempat, durasi, dan alasan kecocokan. Lengkapi alternatif refleksi tanpa alat serta variasi yang cukup untuk pergantian saran.
- [ ] **P3-03:** implementasikan filter tujuan/waktu, filter opsional, ranking mood, feedback sesi, dan alternatif dengan penjelasan. Bedakan tidak ada kandidat, pilihan habis, serta alternatif berbeda filter. Jangan diam-diam melonggarkan tujuan/waktu.
- [ ] **P3-04:** implementasikan transisi timer mulai, jeda, lanjut, habis, selesai, berhenti, dan ganti. Hitung waktu dari referensi waktu yang sesuai, bukan jumlah callback yang berhasil dieksekusi.
- [ ] **P3-05:** implementasikan pembaruan mood setelah penyelesaian. Lewati mempertahankan mood sebelumnya; awal tanpa mood tetap dapat dipakai. Tetapkan perilaku reset dan berakhirnya sesi tanpa membuat profil tersimpan.

**Keluaran:** logika yang dapat diperiksa tanpa menjalankan seluruh UI.  
**Kriteria selesai:** setiap aturan dan transisi utama memiliki hasil yang jelas, termasuk kasus tanpa kandidat dan feedback yang tidak diwariskan lintas sesi.  
**Verifikasi:** Vitest pada perilaku input/output dan transisi, memakai kontrol waktu. Tidak perlu menunggu 10 menit secara nyata untuk menguji countdown. Uji perubahan referensi waktu sesuai strategi yang dipilih.

### P4. Alur aplikasi utama

**Kebutuhan terkait:** FR-01 sampai FR-05, FR-07, bagian aplikasi FR-09.

- [ ] **P4-01:** bangun pemilihan mood/Lewati, tujuan, waktu, dan filter relevan; tampilkan pilihan aktif tanpa memberi peringkat pada mood.
- [ ] **P4-02:** hubungkan satu saran dengan detail, alasan, Mulai, Cocok/Kurang cocok, serta keadaan alternatif/kehabisan pilihan. Cocok tidak memulai timer otomatis.
- [ ] **P4-03:** bangun timer dengan status tekstual, jeda/lanjut, berhenti/ganti, dan Selesai manual. Waktu habis tetap berada pada alur aktivitas.
- [ ] **P4-04:** bangun respons penyelesaian, pertanyaan “Mood kamu berubah?”, pilihan/Lewati, dan jalur memulai aktivitas berikutnya di aplikasi.
- [ ] **P4-05:** sediakan journaling sebagai prompt dengan timer, tanpa kolom penyimpanan jurnal. Tempatkan kura-kura pada layar aplikasi, termasuk versi kecil/statis di timer.

**Keluaran:** satu alur yang dapat digunakan dari `/app` sampai aktivitas berikutnya.  
**Kriteria selesai:** alur berfungsi dengan atau tanpa mood, semua kontrol memiliki efek nyata, dan Selesai selalu merupakan tindakan pengguna.  
**Verifikasi:** Playwright untuk alur lengkap dan kasus penting; pemeriksaan visual desktop/seluler, keyboard/fokus, serta pengumuman status timer yang tidak berbunyi tiap detik.

### P5. Landing page

**Kebutuhan terkait:** FR-09.

- [ ] **P5-01:** eksplorasi komposisi memakai Taste Skill dengan palet dan karakter tetap. Pilih komposisi berdasarkan isi Nudge dan aset nyata, bukan urutan template generik.
- [ ] **P5-02:** implementasikan hero, manfaat yang sesuai produk, tiga kelompok aktivitas, penjelasan cara pakai, dan CTA Mulai ke `/app`.
- [ ] **P5-03:** integrasikan logo dan kura-kura lebih ekspresif; jaga teks utama serta tindakan tetap terlihat pada seluler. Tambahkan ajakan PWA hanya sesuai dukungan dan hasil P7.

**Keluaran:** halaman `/` yang memperkenalkan produk dan mengantar pengguna ke aplikasi.  
**Kriteria selesai:** CTA dapat digunakan, isi tidak menjanjikan fitur/hasil yang tidak ada, dan tidak ada navigasi mati, statistik palsu, akun, atau badge toko aplikasi yang tidak relevan.  
**Verifikasi:** Playwright untuk navigasi, pemeriksaan render pada ukuran rilis, kontras, reflow, dan reduced motion; periksa gambar sesuai ketentuan lisensinya.

### P6. Favorit dan pengingat

**Kebutuhan terkait:** FR-06 dan FR-08.

- [ ] **P6-01:** buat adapter penyimpanan favorit dengan key/format berversi. Baca data secara defensif, hindari duplikasi, tangani aktivitas yang sudah tidak ada, dan jelaskan kegagalan simpan tanpa memblokir alur.
- [ ] **P6-02:** bangun daftar favorit, tambah/hapus, keadaan kosong, dan pembukaan detail dengan alur timer yang sama. Jangan menganggap favorit otomatis memenuhi filter saat ini.
- [ ] **P6-03:** bangun pengaturan pengingat default nonaktif dengan hari/waktu dan penyimpanan lokal; selesaikan D-05. Validasi input dan batalkan jadwal lama saat diubah/dimatikan.
- [ ] **P6-04:** pisahkan pemeriksa jadwal dari adapter notifikasi. Minta izin hanya sesudah tindakan opt-in; tangani izin ditolak/unsupported. Integrasikan notifikasi berbasis service worker pada lingkungan yang memerlukannya melalui P7.
- [ ] **P6-05:** periksa kembali jadwal ketika aplikasi aktif lagi sesuai keputusan D-05; hindari spam atau pengiriman ulang untuk kejadian yang sama. Tampilkan batas pengingat terbuka/berjalan dan ketidakpresisian browser.

**Keluaran:** favorit lokal dan pengingat yang berada dalam kendali pengguna.  
**Kriteria selesai:** favorit bertahan pada reload jika penyimpanan tersedia; izin tidak diminta saat kunjungan awal; ubah/matikan pengingat berfungsi. Integrasi notifikasi nyata yang bergantung pada P7 tidak boleh dinyatakan selesai sebelum diperiksa.  
**Verifikasi:** Vitest pada adapter/jadwal, Playwright pada UI dan izin yang dikendalikan, serta pemeriksaan browser/perangkat untuk dukungan notifikasi nyata. Uji data lokal rusak, diblokir, kosong, dan perubahan jadwal.

### P7. PWA dan integrasi perangkat

**Kebutuhan terkait:** FR-09, dukungan notifikasi FR-08.

- [ ] **P7-01:** buat manifest dengan identitas Nudge, ikon yang sesuai, serta `start_url` `/app`; tinjau scope dan metadata platform.
- [ ] **P7-02:** implementasikan registrasi service worker dan strategi cache D-06. Rencanakan perubahan versi serta pembaruan agar worker lama tidak membuat pengguna terus melihat UI/aset lama.
- [ ] **P7-03:** sambungkan adapter notifikasi P6 ketika service worker diperlukan. Tidak ada backend pengirim push atau janji notifikasi saat aplikasi tertutup.
- [ ] **P7-04:** periksa instalasi, peluncuran ikon, jalur masuk, serta akses browser normal di lingkungan D-07/D-08. Pembukaan PWA tidak memulai aktivitas/timer.

**Keluaran:** pengalaman instalasi dan peluncuran PWA sesuai dukungan platform, dengan batas yang dijelaskan.  
**Kriteria selesai:** web `/` tetap landing page, `/app` dapat diakses langsung, dan ikon PWA meluncurkan aplikasi pada perangkat sasaran yang diperiksa. Perilaku cache/update dan batas offline diketahui.  
**Verifikasi:** pemeriksaan manifest/rute dapat diautomasi; instalasi OS, ikon, izin, pembaruan, dan perilaku tidur/aktif memerlukan perangkat nyata. Catat perangkat yang belum dapat diperiksa sebagai keterbatasan, bukan hasil lulus.

### P8. Pemeriksaan rilis dan pemolesan

**Kebutuhan terkait:** seluruh FR dan kebutuhan nonfungsional PRD.

- [ ] **P8-01:** jalankan type checking, lint, build, Vitest, dan Playwright sesuai konfigurasi aktual. Selesaikan kegagalan yang memengaruhi cakupan rilis.
- [ ] **P8-02:** periksa keyboard, fokus, label, status, kontras, zoom, teks panjang, lebar sempit, dan reduced motion pada semua layar utama.
- [ ] **P8-03:** gunakan Impeccable serta Anti Slop sesuai tugas. Buktikan pemicu hook pada edit UI yang sebenarnya; jika hook tidak berjalan, jelaskan dan gunakan pemeriksaan manual yang sesuai.
- [ ] **P8-04:** uji alur penggunaan dengan tugas PRD tanpa analitik pribadi. Catat kebingungan, kebutuhan bantuan, dan ketidakcocokan katalog; perbaiki masalah yang menghalangi penggunaan.
- [ ] **P8-05:** lengkapi bukti, daftar keterbatasan, inventaris aset/lisensi, dan dokumentasi menjalankan proyek. Siapkan hasil review untuk pengguna; deployment/publikasi mengikuti izin yang diberikan.

**Keluaran:** kandidat rilis yang dapat ditinjau beserta bukti dan masalah tersisa.  
**Kriteria selesai:** syarat rilis PRD terpenuhi, masalah penghalang selesai, seluruh item yang belum diperiksa dinyatakan jelas, dan aset final tidak bergantung pada placeholder.  
**Verifikasi:** hasil command aktual, catatan perangkat/browser, bukti visual, dan observasi tugas pengguna. Tidak menyimpulkan bahwa Nudge terbukti mengurangi doomscrolling atau memperbaiki kesehatan dari uji alur ini.

## 7. Pemetaan kebutuhan ke pekerjaan

| FR | Pekerjaan utama | Bukti penerimaan yang diperlukan |
| --- | --- | --- |
| FR-01 Konteks | P3-01, P3-05, P4-01 | Mood opsional; tujuan/waktu dan filter bekerja serta dapat diubah. |
| FR-02 Saran/alternatif | P3-02/P3-03, P4-02 | Satu saran; penolakan memberi alternatif; perbedaan filter dan keadaan kosong dijelaskan. |
| FR-03 Feedback | P3-03/P3-05, P4-02 | Cocok tidak memulai timer; feedback memengaruhi sesi tanpa profil lintas sesi. |
| FR-04 Timer | P3-04, P4-03 | Mulai/jeda/lanjut/ganti/berhenti konsisten; waktu habis menunggu Selesai. |
| FR-05 Siklus berikutnya | P3-05, P4-04 | Mood dapat diperbarui/dilewati, lalu kembali ke awal aplikasi. |
| FR-06 Favorit | P6-01/P6-02 | Simpan/hapus/reload tanpa duplikasi; error penyimpanan tidak memblokir. |
| FR-07 Journaling | P3-02, P4-05 | Prompt dan timer tersedia tanpa mengumpulkan isi jurnal. |
| FR-08 Pengingat | P6-03 sampai P6-05, P7-03 | Opt-in, hari/waktu, izin setelah tindakan pengguna, perubahan/pembatalan, batas platform jelas. |
| FR-09 Web/PWA | P1-02, P4, P5, P7 | CTA landing menuju aplikasi; PWA meluncurkan `/app` tanpa mulai otomatis. |

P8 memeriksa integrasi seluruh baris. Rincian kriteria penerimaan tetap dibaca dari PRD, bukan diganti oleh ringkasan tabel ini.

## 8. Struktur kode yang direncanakan

Struktur berikut adalah target awal, belum direktori yang tersedia:

```text
app/
  layout.tsx
  page.tsx
  app/page.tsx
  globals.css
  manifest.ts
components/
  ui/
  landing/
  activity/
  mascot/
lib/
  activities/
  recommendation/
  session/
  timer/
  storage/
  reminders/
public/
  assets/
  icons/
tests/
  activity-flow.spec.ts
  favorites.spec.ts
  reminders.spec.ts
```

Test logika `*.test.ts`/`*.test.tsx` dapat ditempatkan di dekat modul terkait. Lokasi sumber/build service worker dipilih pada D-06; jangan menganggap semua tool meletakkannya pada jalur yang sama.

Landing page memanfaatkan render server bila sesuai. State interaktif, timer, penyimpanan, izin, dan registrasi worker berada di sisi klien. Gunakan boundary yang jelas agar UI tidak bergantung pada detail scheduler atau format localStorage. Hindari menambah backend, state library, UI framework, atau layanan analitik sebelum kebutuhan konkretnya terbukti.

## 9. Model state dan kontrak yang harus ditetapkan

Nama berikut adalah rancangan teknis, bukan terminologi UI final:

| Area | State/data minimum | Aturan yang wajib dipertahankan |
| --- | --- | --- |
| Konteks | Mood opsional, tujuan, waktu, tempat/alat opsional | Mood boleh kosong; filter terlihat dan terkendali pengguna. |
| Rekomendasi | Kandidat, alasan, ketidakcocokan filter, kandidat ditolak | Waktu/tujuan tidak dilonggarkan diam-diam; daftar penolakan mengikuti sesi. |
| Timer | Belum mulai, berjalan, jeda, habis, selesai, berhenti | Habis dan selesai berbeda; pergantian menghentikan timer sebelumnya. |
| Siklus mood | Mood sebelumnya dan keputusan pembaruan | Lewati tidak sama dengan menghapus mood. |
| Favorit | ID aktivitas stabil dan versi format | Deduplicasi; aktivitas yang hilang tidak merusak daftar. |
| Pengingat | Aktif, hari/waktu, status izin, penanda pengiriman | Pengaturan lokal, pencegahan duplikasi, dan pembatalan jadwal lama. |

Penyelesaian tidak membutuhkan riwayat permanen pada MVP. Reload atau tutup browser tidak dijanjikan memulihkan timer. Jangan menyimpan mood, feedback, atau tulisan jurnal hanya untuk menyederhanakan pemulihan state.

## 10. Strategi pemeriksaan dan bukti

### Pembagian pemeriksaan

| Cara | Fokus |
| --- | --- |
| Vitest | Logika katalog/filter/ranking, batas sesi, timer dengan waktu terkendali, storage, dan scheduler. |
| Playwright | Integrasi rute, pilihan, saran, timer, siklus selesai, favorit, pengaturan, dan perilaku izin yang dapat disimulasikan. |
| Pemeriksaan visual | Identitas, hierarki, maskot, reflow, kontras state, dan keterbacaan pada hasil render. |
| Keyboard/pembaca layar | Urutan fokus, nama kontrol, status, dan timer yang tidak diumumkan tiap detik. |
| Perangkat nyata | Instalasi/peluncuran PWA, izin OS/browser, notifikasi, sleep/resume, dan update worker. |

Pengujian tidak menyalin detail implementasi internal sebagai satu-satunya bukti. Periksa kontrak dan hasil yang dapat diamati. Gunakan TDD jika pendekatan tersebut dipilih; catat pengecualian pengujian yang memang belum didukung, seperti batas tool pada async Server Components. Tidak perlu menambah runtime analytics untuk memperoleh bukti uji.

### Format catatan hasil

```text
Tanggal:
Tugas/FR:
Lingkungan dan versi:
Command atau langkah pemeriksaan:
Hasil aktual:
Bukti/lokasi laporan bila ada:
Keterbatasan atau kegagalan:
Status dan langkah berikutnya:
```

Saat laporan/screenshot mulai diproduksi, pilih lokasi yang jelas dan bedakan bukti yang layak disimpan dari cache/output sementara. Jangan menulis tautan ke laporan yang belum ada.

## 11. Risiko dan penanganan

| Risiko | Tindakan dan tahap terkait |
| --- | --- |
| Scaffold menimpa dokumen atau konfigurasi lokal | Tinjau direktori dan keluaran generator; pertahankan berkas yang sudah ada pada P0/P1. |
| Katalog terlalu sedikit untuk alternatif | Uji kombinasi filter, lengkapi variasi yang relevan, dan tangani keadaan habis pada P3/P4. |
| Timer melambat saat tab tidak aktif | Gunakan referensi waktu; periksa kembali saat aktif dan uji jeda/resume pada P3/P4/P8. |
| Storage diblokir, rusak, atau hilang | Adapter defensif, pesan jujur, dan alur manual tetap tersedia pada P6. |
| Notifikasi ditunda atau tidak didukung | Feature detection, keputusan D-05, integrasi P7, dan penjelasan batas pada P6/P7. |
| Service worker menyajikan versi lama | Strategi update dan pemeriksaan versi pada P7; jangan memaksa reload yang memutus kegiatan aktif tanpa penanganan. |
| Aset berbeda proporsi atau tampak terlalu mirip referensi | Tetapkan bentuk induk, periksa penggunaan nyata, dan simpan inventaris pada P2/P8. |
| Hook tidak terpicu meski engine sehat | Periksa trust/config dan buktikan event UI; gunakan detector manual bila perlu pada P8. |
| Perangkat sasaran tidak tersedia | Catat batas bukti dan tunda klaim penerimaan untuk lingkungan tersebut. |

## 12. Batas MVP dan kendali perubahan

Streak harian, tema gelap, bahasa tambahan, akun/sinkronisasi, push saat tertutup, analitik pribadi, penyimpanan jurnal, dan offline penuh tidak menjadi pekerjaan MVP melalui rencana ini. Ide tambahan masuk daftar usulan terpisah sampai diputuskan pengguna.

Jika muncul kebutuhan baru, catat masalah yang hendak diselesaikan, dampak terhadap FR/desain/data, serta tahap yang terpengaruh. Perbarui sumber keputusan yang relevan setelah disetujui. Skill tidak memberi izin otomatis untuk layanan baru, pengambilan data, atau publikasi.

## 13. Ringkasan kesiapan peninjauan rilis

- [ ] Seluruh FR memiliki keluaran implementasi dan bukti penerimaan.
- [ ] Build serta pemeriksaan yang dikonfigurasi lulus, atau ada keterbatasan yang dinyatakan jelas dan diputuskan sebelum rilis.
- [ ] Pengguna dapat menyelesaikan satu alur dan memulai lagi tanpa akun.
- [ ] Mood opsional, penyelesaian manual, dan batas sesi sesuai PRD.
- [ ] Maskot hadir, aset final tersedia, dan state UI memenuhi DESIGN.md.
- [ ] Favorit/pengingat menangani kegagalan tanpa memblokir penggunaan manual.
- [ ] PWA dan notifikasi diperiksa pada lingkungan sasaran; batas dukungan disampaikan.
- [ ] Catatan uji alur, masalah tersisa, dan lisensi/sumber aset tersedia.
- [ ] Dokumentasi perintah sesuai konfigurasi aktual; tidak ada rahasia atau data jurnal pada laporan/log.
- [ ] Tindakan publikasi dan Git dilakukan hanya dalam izin pengguna.

**Langkah berikutnya setelah rencana ini:** P0 untuk memulai tahap yang diizinkan, kemudian fondasi P1 dan eksplorasi aset P2 sesuai dependensinya. Tidak ada pekerjaan implementasi yang ditandai selesai hanya karena rencananya sudah ditulis.
