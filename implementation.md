# Rencana Implementasi Nudge

Status: kode MVP dan polesan landing dapat ditinjau; penerimaan menyeluruh menunggu aset final serta pemeriksaan manual. Aset final ditunda atas arahan pengguna.
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
| D-01 | npm dipilih pengguna, satu package-lock.json. | Sebelum P1 | Ditetapkan |
| D-02 | Versi kompatibel diperiksa pada registry/dokumentasi resmi, terkunci dalam package-lock.json; lihat docs/verification.md. | P1 | Ditetapkan |
| D-03 | State klien di memori. Kembali ke pemilihan mempertahankan konteks/feedback; reload mengakhiri sesi. | P3 | Ditetapkan dan diuji |
| D-04 | Tujuan/waktu wajib; ranking mood 2 dan aktivitas disukai 1; urutan katalog memecah nilai sama. | P3 | Ditetapkan dan diuji |
| D-05 | Jam lokal, pemeriksaan 15 detik/visibility, deduplikasi lokal dan Web Locks bila tersedia, tanpa susulan jadwal terlewat. | P6 | Kode dan simulasi diperiksa; perangkat nyata menunggu |
| D-06 | Cache aset statis lokal dan halaman offline, tanpa cache navigasi/data pribadi. Worker baru tidak memaksa reload sesi. | P7 | Implementasi dan uji produksi otomatis lulus |
| D-07 | Chrome Windows dan viewport Pixel 7 untuk otomatis. Pengguna memilih Android dengan Chrome untuk pemeriksaan fisik; model dan versi perangkat belum dicatat. | Sebelum pemeriksaan P6/P7 | Otomatis tersedia; manual menunggu perangkat dan URL HTTPS |
| D-08 | Hosting HTTPS dan distribusi preview. Pilih berdasarkan kebutuhan deploy Next.js serta PWA; publikasi mengikuti instruksi pengguna. | Sebelum pemeriksaan deployment | Belum ditetapkan |

Keputusan yang sudah diterapkan dijelaskan di docs/implementation-decisions.md dan dibuktikan di docs/verification.md. Pilihan rutin mengikuti izin implementasi yang diberikan. Keputusan yang memperluas perilaku produk, pengumpulan data, atau layanan eksternal tetap membutuhkan pembahasan pengguna.

## 5. Urutan tahap dan dependensi

| Tahap | Fokus | Dependensi | Status implementasi |
| --- | --- | --- | --- |
| P0 | Persiapan pelaksanaan dan keputusan awal | Dokumen tersedia dan izin pelaksanaan | Selesai |
| P1 | Fondasi proyek dan alat pemeriksaan | P0 | Selesai |
| P2 | Token visual, komponen dasar, dan aset induk | P0; kode komponen memerlukan P1 | Komponen/token tersedia; aset final ditunda pengguna |
| P3 | Katalog, rekomendasi, state sesi, dan timer | P1 serta keputusan D-03/D-04 | Selesai |
| P4 | Alur aplikasi utama | P2 komponen, P3 | Alur teruji; pendamping kura-kura masih ikon sementara |
| P5 | Landing page | P1, P2, P4 | Fungsional dan dipoles; ilustrasi/logo final menunggu |
| P6 | Favorit dan pengingat opt-in | P3/P4/P7 | Otomatis diuji; notifikasi OS nyata belum diperiksa |
| P7 | PWA dan integrasi browser/perangkat | P1, P2, P4/P5 | Delapan skenario produksi lulus; instalasi nyata menunggu |
| P8 | Pemeriksaan rilis dan pemolesan | P4 sampai P7 | Bukti otomatis tersedia; penerimaan manual dan aset masih menunggu, lihat docs/verification.md |

Eksplorasi aset P2 dapat berlangsung sebelum atau bersama fondasi kode. Logika murni P3 tidak harus menunggu logo final. P7 dapat mulai sebelum P6 selesai, lalu keduanya digabungkan untuk memeriksa notifikasi yang membutuhkan service worker. Tabel dependensi tidak memerintahkan penggunaan subagent otomatis.

## 6. Rincian pekerjaan

### P0. Persiapan pelaksanaan

**Tujuan:** memastikan titik awal dan batas pekerjaan jelas sebelum mengubah proyek.

- [x] **P0-01:** aturan, PRD, desain, workspace, dan Git diperiksa sebelum implementasi.
- [x] **P0-02:** npm dipilih pengguna; seluruh kode MVP diizinkan, aset kemudian ditunda pengguna.
- [x] **P0-03:** bekerja pada main yang semula bersih, commit kecil diizinkan berkelanjutan; belum ada izin push baru.

**Keluaran:** daftar keputusan awal dan lingkup tahap yang akan dikerjakan.  
**Kriteria selesai:** workspace yang benar terkonfirmasi dan keputusan yang diperlukan untuk P1 tercatat.  
**Verifikasi:** pemeriksaan file/config/Git yang relevan; belum ada klaim aplikasi dapat dijalankan.

### P1. Fondasi proyek

**Kebutuhan terkait:** dukungan seluruh FR; struktur rute FR-09.

- [x] **P1-01:** Next.js, TypeScript, Tailwind tersedia di struktur src, dokumen lama dipertahankan.
- [x] **P1-02:** root layout, metadata, rute `/` dan `/app` lulus build dan navigasi browser; API browser hanya pada klien.
- [x] **P1-03:** lint, Prettier, Vitest, Playwright dikonfigurasi dan dijalankan.
- [x] **P1-04:** npm, lockfile, perintah aktual, dan pengecualian output/cache tersedia.

**Keluaran:** fondasi aplikasi dan konfigurasi pemeriksaan.  
**Kriteria selesai:** rute dasar dapat dibuka; script yang dicatat cocok dengan package.json; pemeriksaan awal relevan berjalan.  
**Verifikasi:** type checking, lint, build, serta satu pemeriksaan bermakna pada perilaku/rute yang sudah ada. Hindari test kosong yang hanya membuktikan runner menyala.

### P2. Sistem visual dan aset awal

**Acuan:** DESIGN.md; tidak mengubah kebutuhan FR.

- [ ] **P2-01:** gunakan IP as Logo untuk menawarkan arah simbol kura-kura dan jumlah kandidat. Pastikan kemampuan model tersedia; generasi mengikuti persetujuan pengguna pada tahap aset.
- [ ] **P2-02:** tetapkan satu bentuk induk, lalu produksi pose ringkas, ekspresi yang dipakai, ilustrasi tiga kelompok aktivitas, logo/wordmark, dan turunan ikon PWA. Catat sumber, lisensi/atribusi, ukuran, serta lokasi berkas nyata.
- [x] **P2-03:** token, Nunito Variable dan Phosphor diintegrasikan; lisensi ada di docs/licenses.
- [x] **P2-04:** kontrol, kartu, pilihan, status, fokus dan ikon kura-kura sementara tersedia; diperiksa lewat browser/Axe/keyboard.

**Keluaran:** token terpakai, komponen bersama, serta inventaris aset yang membedakan referensi, sementara, dan siap pakai.  
**Kriteria selesai:** komponen konsisten dan dapat dioperasikan; maskot tetap dikenali pada ukuran kecil; aset yang ditandai siap benar-benar tersedia.  
**Verifikasi:** render komponen, keyboard, ukuran sentuh, pasangan warna, reduced motion, dan tampilan maskot pada ukuran penggunaan.

Aset sementara boleh membantu pengembangan jika diberi label jujur. Placeholder tidak dianggap memenuhi syarat aset pada P8. Jangan memakai karakter Duo atau berkas contoh skill sebagai aset final Nudge.

### P3. Model dan logika inti

**Kebutuhan terkait:** FR-01, FR-02, FR-03, FR-04, FR-05, FR-07.

- [x] **P3-01:** tipe dan kontrak domain tersedia; D-03/D-04 tercatat.
- [x] **P3-02:** katalog 14 aktivitas, termasuk journaling dan refleksi tanpa alat, diuji pada setiap tujuan/waktu.
- [x] **P3-03:** filter, ranking, penolakan, alternatif berbeda kondisi, dan keadaan habis tersedia dengan pengujian.
- [x] **P3-04:** timer memakai deadline, jeda/lanjut, habis tanpa auto-selesai, berhenti/ganti dan selesai manual diuji.
- [x] **P3-05:** mood setelah selesai mengikuti pilihan; Lewati mempertahankan mood atau kondisi kosong. Reload menghapus state sesi.

**Keluaran:** logika yang dapat diperiksa tanpa menjalankan seluruh UI.  
**Kriteria selesai:** setiap aturan dan transisi utama memiliki hasil yang jelas, termasuk kasus tanpa kandidat dan feedback yang tidak diwariskan lintas sesi.  
**Verifikasi:** Vitest pada perilaku input/output dan transisi, memakai kontrol waktu. Tidak perlu menunggu 10 menit secara nyata untuk menguji countdown. Uji perubahan referensi waktu sesuai strategi yang dipilih.

### P4. Alur aplikasi utama

**Kebutuhan terkait:** FR-01 sampai FR-05, FR-07, bagian aplikasi FR-09.

- [x] **P4-01:** pemilihan konteks dan filter tersedia, pilihan aktif ditandai teks/check dan dapat dioperasikan dengan keyboard.
- [x] **P4-02:** satu saran, detail, alasan, feedback, alternatif dan keadaan habis terhubung. Cocok tidak memulai timer.
- [x] **P4-03:** timer lengkap dengan status dan penyelesaian manual lulus uji waktu terkendali serta browser.
- [x] **P4-04:** respons selesai, pembaruan mood/Lewati dan kembali ke pemilihan aplikasi teruji.
- [x] **P4-05:** journaling eksternal tanpa isian jurnal; ikon kura-kura sementara hadir juga pada timer.

**Keluaran:** satu alur yang dapat digunakan dari `/app` sampai aktivitas berikutnya.  
**Kriteria selesai:** alur berfungsi dengan atau tanpa mood, semua kontrol memiliki efek nyata, dan Selesai selalu merupakan tindakan pengguna.  
**Verifikasi:** Playwright untuk alur lengkap dan kasus penting; pemeriksaan visual desktop/seluler, keyboard/fokus, serta pengumuman status timer yang tidak berbunyi tiap detik.

### P5. Landing page

**Kebutuhan terkait:** FR-09.

- [x] **P5-01:** arah one-motif dipilih di dalam identitas tetap; batas hasil detector tercatat pada docs/verification.md.
- [x] **P5-02:** landing menampilkan isi PRD, demo waktu interaktif, dan CTA nyata menuju `/app`.
- [ ] **P5-03:** integrasikan logo dan kura-kura lebih ekspresif; jaga teks utama serta tindakan tetap terlihat pada seluler. Tambahkan ajakan PWA hanya sesuai dukungan dan hasil P7.

**Keluaran:** halaman `/` yang memperkenalkan produk dan mengantar pengguna ke aplikasi.  
**Kriteria selesai:** CTA dapat digunakan, isi tidak menjanjikan fitur/hasil yang tidak ada, dan tidak ada navigasi mati, statistik palsu, akun, atau badge toko aplikasi yang tidak relevan.  
**Verifikasi:** Playwright untuk navigasi, pemeriksaan render pada ukuran rilis, kontras, reflow, dan reduced motion; periksa gambar sesuai ketentuan lisensinya.

### P6. Favorit dan pengingat

**Kebutuhan terkait:** FR-06 dan FR-08.

- [x] **P6-01:** storage favorit berversi, deduplikasi, ID usang/data rusak dan kegagalan storage ditangani serta diuji.
- [x] **P6-02:** tambah/hapus, keadaan kosong, persistensi reload, detail favorit dan timer bersama lulus uji browser.
- [x] **P6-03:** pengaturan lokal default nonaktif tersedia; hari/waktu, perubahan dan pembatalan jadwal teruji.
- [ ] **P6-04:** pemeriksa jadwal dan adapter sudah dipisahkan; opt-in, izin ditolak/unsupported, pembatalan, dan penerimaan API service worker diuji otomatis. Penerimaan pada Android Chrome fisik melalui P7 masih menunggu pemeriksaan manual.
- [x] **P6-05:** pemeriksaan visibility dan deduplikasi setelah reload lulus simulasi browser; batas pengiriman disampaikan dalam UI. Sleep/resume dan notifikasi OS nyata tetap menunggu P7-04.

**Keluaran:** favorit lokal dan pengingat yang berada dalam kendali pengguna.  
**Kriteria selesai:** favorit bertahan pada reload jika penyimpanan tersedia; izin tidak diminta saat kunjungan awal; ubah/matikan pengingat berfungsi. Integrasi notifikasi nyata yang bergantung pada P7 tidak boleh dinyatakan selesai sebelum diperiksa.  
**Verifikasi:** Vitest pada adapter/jadwal, Playwright pada UI dan izin yang dikendalikan, serta pemeriksaan browser/perangkat untuk dukungan notifikasi nyata. Uji data lokal rusak, diblokir, kosong, dan perubahan jadwal.

### P7. PWA dan integrasi perangkat

**Kebutuhan terkait:** FR-09, dukungan notifikasi FR-08.

- [x] **P7-01:** manifest `/app`, scope dan PNG sementara 192/512 tersedia dan diuji; ikon final mengikuti aset P2 yang ditunda.
- [x] **P7-02:** worker produksi, cache statis berversi, fallback offline dan navigasi tanpa cache diuji. Pembaruan tidak memaksa reload sesi; versi cache dinaikkan saat rilis aset berubah.
- [ ] **P7-03:** adapter P6 memakai service worker dan API asli Chrome menerima pengiriman pada uji produksi. Tampilan notifikasi serta izin OS Android belum diperiksa. Tidak ada backend pengirim push atau janji notifikasi saat aplikasi tertutup.
- [ ] **P7-04:** periksa instalasi, peluncuran ikon, jalur masuk, serta akses browser normal di lingkungan D-07/D-08. Pembukaan PWA tidak memulai aktivitas/timer.

**Keluaran:** pengalaman instalasi dan peluncuran PWA sesuai dukungan platform, dengan batas yang dijelaskan.  
**Kriteria selesai:** web `/` tetap landing page, `/app` dapat diakses langsung, dan ikon PWA meluncurkan aplikasi pada perangkat sasaran yang diperiksa. Perilaku cache/update dan batas offline diketahui.  
**Verifikasi:** pemeriksaan manifest/rute dapat diautomasi; instalasi OS, ikon, izin, pembaruan, dan perilaku tidur/aktif memerlukan perangkat nyata. Catat perangkat yang belum dapat diperiksa sebagai keterbatasan, bukan hasil lulus.

### P8. Pemeriksaan rilis dan pemolesan

**Kebutuhan terkait:** seluruh FR dan kebutuhan nonfungsional PRD.

- [x] **P8-01:** typecheck, lint, format, build, 17 Vitest, 44 alur browser dan delapan skenario produksi lulus; lihat docs/verification.md untuk batas setiap pemeriksaan.
- [ ] **P8-02:** Axe/keyboard, screenshot, teks 200%, seluruh judul katalog, lebar sempit dan reduced motion lulus pemeriksaan otomatis pada layar utama. Zoom browser dan pembaca layar nyata belum diperiksa; bukti otomatis tidak menggantikan penerimaan manual.
- [x] **P8-03:** konteks menyatakan hook otomatis tidak aktif, sehingga detector dijalankan manual dan hasil/keterbatasannya dicatat; bukan klaim hook otomatis teruji.
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

## 8. Struktur kode

Struktur implementasi memakai `src/` sesuai keputusan pengguna. Alias `@/*` menuju `src/*`. Jangan membuat root `app/` kedua.

```text
src/
  app/
    layout.tsx
    page.tsx
    app/page.tsx
    globals.css
    manifest.ts
    icons/[size]/route.tsx
  components/
    ui/
    landing/
    activity/
  lib/
    activities/
    recommendation/
    session/
    timer/
    storage/
    reminders/
public/
  sw.js
  offline.html
tests/
  e2e/
    activity-flow.spec.ts
    reminders.spec.ts
    pwa.spec.ts
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
- [x] Build serta pemeriksaan yang dikonfigurasi lulus, atau ada keterbatasan yang dinyatakan jelas dan diputuskan sebelum rilis.
- [x] Pengguna dapat menyelesaikan satu alur dan memulai lagi tanpa akun.
- [x] Mood opsional, penyelesaian manual, dan batas sesi sesuai PRD.
- [ ] Maskot hadir, aset final tersedia, dan state UI memenuhi DESIGN.md.
- [x] Favorit/pengingat menangani kegagalan tanpa memblokir penggunaan manual.
- [ ] PWA dan notifikasi diperiksa pada lingkungan sasaran; batas dukungan disampaikan.
- [ ] Catatan uji alur, masalah tersisa, dan lisensi/sumber aset tersedia.
- [x] Dokumentasi perintah sesuai konfigurasi aktual; tidak ada rahasia atau data jurnal pada laporan/log.
- [x] Tindakan publikasi dan Git dilakukan hanya dalam izin pengguna.

**Langkah berikutnya:** pemeriksaan Android Chrome fisik pada P6/P7 dan observasi pengguna pada P8. P2/P5 melanjutkan aset final ketika pengguna membuka kembali tahap tersebut. Seluruh rencana belum selesai selama bukti manual dan aset yang diwajibkan belum tersedia; lihat docs/manual-checks.md dan docs/verification.md.
