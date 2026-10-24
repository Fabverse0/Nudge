---
name: Nudge
description: "Teman untuk memulai satu aktivitas kecil, dengan tampilan playful, membulat, hangat, dan tenang."
colors:
  primary: "#679F9E"
  secondary: "#7EADDB"
  tertiary: "#E6D4BE"
  canvas: "#FAF8F4"
  surface: "#FFFFFF"
  ink: "#182B2A"
  ink-muted: "#506765"
  action: "#315F5E"
  action-hover: "#284F4E"
  action-pressed: "#224240"
  selection-surface: "#EAF3EE"
  border-control: "#6B8583"
  border-subtle: "#D5E0DB"
  disabled-surface: "#E8EBE7"
  error-ink: "#9B3B34"
  error-surface: "#FBEDE9"
  warning-ink: "#785300"
  warning-surface: "#FFF4DB"
typography:
  display:
    fontFamily: "Nunito Variable, Nunito, ui-rounded, system-ui, sans-serif"
    fontSize: "64px"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "Nunito Variable, Nunito, ui-rounded, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Nunito Variable, Nunito, ui-rounded, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0em"
  body:
    fontFamily: "Nunito Variable, Nunito, ui-rounded, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "0em"
  label:
    fontFamily: "Nunito Variable, Nunito, ui-rounded, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0em"
  caption:
    fontFamily: "Nunito Variable, Nunito, ui-rounded, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0em"
  timer:
    fontFamily: "Nunito Variable, Nunito, ui-rounded, system-ui, sans-serif"
    fontSize: "80px"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "0em"
rounded:
  sm: "8px"
  control: "16px"
  card: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
  3xl: "48px"
  4xl: "64px"
  5xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
    textColor: "{colors.surface}"
  button-primary-pressed:
    backgroundColor: "{colors.action-pressed}"
    textColor: "{colors.surface}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.action}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  choice-selected:
    backgroundColor: "{colors.selection-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
  activity-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "24px"
---

# Nudge Design Guide

Catatan implementasi 21 Oktober 2026: Nunito Variable sudah diintegrasikan dari Fontsource dan ikon Phosphor dari paket resminya. Pengguna memilih C1 dari [eksplorasi batch 01](./docs/assets/logo-exploration-01/README.md). Empat pose, tiga ilustrasi aktivitas, simbol ringkas, wordmark, logo komposit, dan ikon browser/PWA sudah dibuat dan diintegrasikan; lihat [inventaris produksi](./docs/assets/turtle-c1/README.md). Ikon garis dan ikon `n.` telah diganti. Nama family CSS tetap `Nunito Variable`. Angka timer dibatasi viewport saat teks diperbesar. Tabel kebutuhan aset di bawah mencatat kondisi awal; inventaris produksi menjadi acuan status aktual.

## Overview

Status: panduan visual v1 dengan aset C1 terintegrasi; pemeriksaan perangkat fisik masih menunggu.

Tanggal: 18 Oktober 2026.  
Tema MVP: terang. Bahasa antarmuka: Bahasa Indonesia.

Nudge adalah teman untuk memulai satu aktivitas kecil ketika pengguna sedang gabut atau ingin beralih dari scrolling. Tampilannya harus playful, membulat, hangat, dan tenang. Bentuk yang ramah mengundang pengguna mencoba; instruksi dan kontrol membuat langkah berikutnya jelas.

Dokumen ini menetapkan arah visual dan perilaku presentasi. [prd.md](./prd.md) tetap menjadi acuan kebutuhan produk, [GLOSSARY.md](./GLOSSARY.md) menjadi acuan istilah, dan [panduan skill](./docs/skills.md) menjelaskan pembagian alat. Token di frontmatter adalah target implementasi awal, bukan hasil ekstraksi dari aplikasi yang sudah berjalan. Nilai numerik dapat diperbaiki setelah pengujian tampilan; perubahan identitas yang sudah disepakati memerlukan keputusan pengguna.

### Keputusan tetap dan ruang eksplorasi

| Status     | Keputusan                                                                                            |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| Tetap      | Karakter playful, membulat, hangat, dan tenang; ramah untuk pengguna umum.                           |
| Tetap      | Palet identitas Tidal Sage, Glacial Periwinkle, dan Toasted Sand; tema terang untuk MVP.             |
| Tetap      | Maskot kura-kura induk C1 yang hadir juga di aplikasi, termasuk saat timer berjalan.                 |
| Tetap      | Landing page lebih ekspresif; layar aplikasi mengutamakan pemilihan dan pelaksanaan aktivitas.       |
| Tetap      | Bahasa tidak menghakimi, pilihan mood setara, serta kontrol lewati dan berhenti yang jelas.          |
| Nilai awal | Nunito, turunan warna aksesibel, skala ukuran, radius, jarak, dan durasi transisi dalam dokumen ini. |
| Eksplorasi | Nama karakter, pose tambahan, dan detail ilustrasi; identitas serta proporsi induk C1 dipertahankan. |
| Eksplorasi | Komposisi hero, susunan bagian landing page, detail logo, dan penyempurnaan layout tiap layar.       |

Nilai awal dipakai konsisten sampai ada alasan dan hasil pemeriksaan untuk mengubahnya. Eksplorasi memperluas pilihan di dalam identitas yang sudah disepakati; jangan mengganti spesies maskot atau palet utama secara sepihak.

### Referensi dan peran skill

Dokumen Duolingo yang diberikan pengguna adalah referensi bentuk membulat, keramahan, dan respons tombol. Token, konten, font khusus, karakter Duo, dan struktur situs Duolingo tidak menjadi spesifikasi Nudge. Berkas referensi tersebut masih berada di luar repository; jangan membuat ketergantungan runtime pada lokasi Downloads pengguna.

- **Impeccable:** perancangan dan penyempurnaan sistem UI, terutama layar aplikasi. Acuan produk di proyek ini adalah PRD yang sudah ada; kebutuhan produk tidak perlu diulang menjadi asumsi baru hanya karena tool belum menemukan `PRODUCT.md`.
- **Taste Skill:** eksplorasi komposisi landing page, dengan palet dan karakter visual tetap dipertahankan. Bukan panduan layout layar timer.
- **IP as Logo:** eksplorasi simbol kura-kura sederhana. Arah, jumlah kandidat, komposisi, dan penggunaan warna dijelaskan sebelum generasi sesuai instruksi skill.
- **Anti Slop:** kualitas UI, tulisan, aksesibilitas, responsivitas, dan komentar sesuai tugas. Mode `during` dipilih dalam percakapan penyusunan dokumen ini; tidak mengubah preferensi global untuk sesi lain.

Pembuatan dokumen ini tidak berarti gambar atau komponen telah dibuat. Ikuti otorisasi pengguna sebelum memulai produksi aset atau implementasi berikutnya.

## Colors

### Palet identitas dan netral

| Token       | Warna                        | Peran dan alasan                                                                               |
| ----------- | ---------------------------- | ---------------------------------------------------------------------------------------------- |
| `primary`   | Tidal Sage `#679F9E`         | Identitas utama; bidang aksen, ilustrasi, dan bagian pilihan yang membutuhkan penekanan ramah. |
| `secondary` | Glacial Periwinkle `#7EADDB` | Bidang pendamping dan ilustrasi agar tampilan memiliki variasi yang tetap tenang.              |
| `tertiary`  | Toasted Sand `#E6D4BE`       | Bidang hangat, bagian refleksi, dan area ilustrasi.                                            |
| `canvas`    | Putih hangat `#FAF8F4`       | Latar utama yang memberi ruang bagi palet identitas.                                           |
| `surface`   | Putih `#FFFFFF`              | Kartu, panel, dan latar kontrol.                                                               |
| `ink`       | Hijau sangat gelap `#182B2A` | Judul, teks utama, label, dan ikon penting.                                                    |
| `ink-muted` | Hijau abu `#506765`          | Deskripsi dan metadata pada latar netral terang.                                               |
| `action`    | Sage gelap `#315F5E`         | Tombol utama dan link agar terbaca dengan jelas.                                               |

Warna identitas menentukan suasana; warna semantik menentukan status. Jangan mengartikan sage sebagai mood yang lebih baik, biru sebagai mood buruk, atau sand sebagai pilihan yang kurang dianjurkan. Semua pilihan mood mendapat perlakuan visual setara.

### State dan batas kontrol

- Tombol utama: `action`, hover `action-hover`, ditekan `action-pressed`; label putih pada ketiganya.
- Pilihan aktif: `selection-surface`, border `action`, dan tanda centang atau indikator pilihan. Keadaan aktif tidak bergantung pada warna saja.
- `border-control` dipakai pada batas input dan kontrol di atas permukaan putih. `border-subtle` hanya untuk pemisah dekoratif; jangan menjadikannya satu-satunya petunjuk bahwa elemen dapat dioperasikan.
- Error: `error-ink` pada `error-surface`, disertai penjelasan masalah dan tindakan pemulihan.
- Peringatan: `warning-ink` pada `warning-surface`, misalnya keterbatasan pengingat. Merah/kuning hanya muncul saat ada status yang memerlukannya.
- Nonaktif: `disabled-surface`, label yang tetap mudah dikenali, serta penjelasan persyaratan bila diperlukan. Jangan membuat seluruh panel transparan karena bisa ikut memudarkan petunjuk penting.
- Keberhasilan: teks singkat dengan ikon atau ilustrasi, memakai sage dalam sistem yang sama; tidak membutuhkan warna identitas baru.

### Pasangan warna yang telah dihitung

Rasio berikut dihitung dari hex solid menggunakan checker kontras Anti Slop. Rasio ditampilkan dalam pembulatan, sedangkan keputusan memakai hasil sebelum pembulatan.

| Teks/batas       | Latar                             | Rasio sekitar    | Penggunaan                        |
| ---------------- | --------------------------------- | ---------------- | --------------------------------- |
| `ink`            | `canvas`                          | 13,96:1          | Teks utama.                       |
| `ink`            | `primary`                         | 4,96:1           | Label pada bidang sage.           |
| `ink`            | `secondary`                       | 6,27:1           | Label pada bidang biru.           |
| `ink`            | `tertiary`                        | 10,24:1          | Label pada bidang sand.           |
| `ink-muted`      | `canvas`                          | 5,71:1           | Deskripsi pada latar utama.       |
| Putih            | `action`                          | 7,17:1           | Tombol utama.                     |
| Putih            | `action-hover` / `action-pressed` | 9,06:1 / 10,93:1 | State tombol utama.               |
| `error-ink`      | `error-surface`                   | 5,99:1           | Pesan error.                      |
| `warning-ink`    | `warning-surface`                 | 6,33:1           | Pesan peringatan.                 |
| `border-control` | Putih                             | 3,96:1           | Batas kontrol, bukan teks normal. |

Targetkan minimal 4,5:1 untuk teks normal, 3:1 untuk teks besar yang memenuhi definisi WCAG, serta 3:1 untuk bagian nonteks penting yang dikenai kriteria tersebut. Jangan memakai putih sebagai label kecil di atas ketiga warna identitas. Periksa ulang ketika opacity, gradasi, gambar, atau latar berubah. Tabel ini bukan sertifikasi aksesibilitas seluruh aplikasi.

## Typography

### Keluarga dan karakter

Gunakan **Nunito** untuk judul dan UI. Bentuknya mendukung karakter membulat; satu keluarga dengan perbedaan bobot menjaga instruksi tetap sederhana. Gunakan bobot 500 untuk isi, 700 untuk kontrol/subjudul, dan 800 untuk penekanan utama. Font sudah dipasang melalui Fontsource; wordmark memakai outline bobot 900.

Gunakan berkas berlisensi jelas dari sumber resmi dan simpan pemberitahuan lisensinya saat integrasi. Hindari ketergantungan pada font khusus Duolingo. Fallback awal: `Nunito, ui-rounded, system-ui, sans-serif`. Saat font belum dimuat, teks dan kontrol harus tetap terbaca tanpa layout rusak.

| Peran                | Ukuran awal                                        | Aturan                                                                               |
| -------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Hero landing         | 40 px seluler, sampai 92 px desktop pada studio C1 | Tebal 800, line-height 1,02; responsif, dua baris pada ukuran teks standar.          |
| Judul bagian landing | 28 px seluler, sampai 40 px desktop                | Line-height 1,2; lebih kecil dari hero.                                              |
| Judul layar aplikasi | 28–32 px                                           | Tebal 800; tujuan layar terbaca sebelum pilihan.                                     |
| Judul kartu          | 20–24 px                                           | Tebal 700, line-height 1,3.                                                          |
| Isi dan label        | 16 px                                              | Isi line-height 1,6, label 1,4; instruksi panjang dapat memakai 18 px bila membantu. |
| Keterangan           | 14 px                                              | Line-height 1,5; jangan gunakan untuk instruksi atau tindakan utama.                 |
| Angka timer          | 64 px seluler, sampai 80 px desktop                | Tebal 800, line-height 1,1; tetap muat ketika zoom.                                  |

Frontmatter memuat nilai dasar; penyesuaian responsif di tabel ini berlaku pada peran terkait. Saat implementasi, gunakan nilai CSS valid seperti `clamp()` atau breakpoint, bukan rentang literal seperti `28-32px`.

Gunakan kapitalisasi kalimat pada label. Hindari semua huruf kapital dan tracking lebar pada seluruh tombol. Batasi paragraf sekitar 60–70 karakter per baris di landing page; instruksi aplikasi disusun dalam kalimat atau langkah pendek.

Angka timer memakai `font-variant-numeric: tabular-nums` dan area dengan lebar yang stabil. Verifikasi dukungan font yang dimuat; bila digit tetap bergeser, pilih fallback angka yang mendukung tabular tanpa mengubah seluruh keluarga UI. Jangan menganimasikan perpindahan tiap digit.

## Layout

### Dasar ukuran

Gunakan basis 4 px dan skala spacing pada frontmatter. Nilai awal:

- Margin horizontal: 16 px pada layar kecil, 24 px mulai 640 px, dan 32 px mulai 1024 px.
- Lebar maksimum landing: 1200 px; konten tetap terpusat.
- Lebar maksimum alur aplikasi: 720 px; layar timer dan formulir pendek dapat memakai 560 px.
- Padding kartu: 16–24 px, mengikuti ruang yang tersedia; gap kontrol 12–16 px.
- Jarak bagian landing: 48 px seluler dan 80–96 px desktop; jarak antarkelompok aplikasi 24–32 px.
- Gunakan tinggi minimum viewport dinamis bila perlu. Konten menentukan tinggi layar; bagian landing tidak dipaksa setinggi 800–900 px.

Angka breakpoint adalah awal untuk mengatur reflow, bukan daftar perangkat eksklusif. Periksa sejak lebar 320 CSS px, desktop, orientasi lanskap, dan pembesaran teks. Hindari scroll horizontal pada alur utama. Tombol boleh membungkus label dan bertambah tinggi.

### Landing page `/`

Mode permukaan: **Persuade**. Dalam satu alur baca, jelaskan apa yang dapat pengguna lakukan dan sediakan CTA **Mulai** menuju `/app`.

Isi minimum mengikuti PRD: pengenalan manfaat, gambaran cara pakai, dan tiga kelompok aktivitas. Contoh judul kerja: “Mulai dari satu kegiatan kecil.” Contoh ini masih boleh disempurnakan selama makna produk tetap benar.

Hero menampilkan tulisan yang jelas, CTA, dan ilustrasi kura-kura atau aktivitas yang relevan. Komposisi split, keseimbangan teks/gambar, serta detail motif masih terbuka untuk Taste Skill. Pada seluler, prioritaskan teks dan tindakan sebelum ilustrasi yang panjang. Jangan menambah bagian kosong hanya untuk meniru urutan situs lain.

Header cukup memuat identitas Nudge dan akses masuk aplikasi yang diperlukan. Tidak ada tombol akun, harga langganan, pemilih bahasa, testimoni, angka pengguna, atau badge App Store yang tidak didukung produk. Ajakan memasang PWA menyesuaikan dukungan browser, terpisah dari tindakan memulai aktivitas.

### Aplikasi `/app`

Mode permukaan: **Operate**. Gunakan satu pusat perhatian pada setiap langkah. Pengguna memilih alur bertahap Mood, Tujuan, lalu Waktu dengan tombol Lanjut eksplisit. Pemilihan tidak otomatis memindahkan langkah. Mood memiliki Lewati; tujuan dan waktu wajib. Tempat/alat berada pada langkah Waktu. Pilihan dan langkah bertahan ketika berpindah menu dalam sesi, sedangkan penyelesaian kembali ke langkah Mood. Rincian ada di [polish aplikasi](./docs/app-polish.md).

| Layar/keadaan   | Fokus dan komposisi                                                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Memilih konteks | Tiga langkah dengan progres tekstual, pilihan native, Lanjut/Kembali, dan Lewati mood. Durasi dari landing tetap terpilih pada langkah Waktu. Akses Favorit dan Pengingat tetap mudah ditemukan. |
| Saran           | Satu kartu utama berisi judul, durasi, instruksi, kondisi, dan alasan. Mulai paling menonjol; Kurang cocok dan Favorit menjadi pendamping.                                                       |
| Timer           | Judul aktivitas, angka waktu, status berjalan/jeda/habis, kontrol yang jelas, dan maskot kecil. Instruksi tetap dapat dilihat kembali.                                                           |
| Setelah selesai | Respons singkat, “Mood kamu berubah?”, pilihan mood setara dan Lewati, kemudian kembali ke awal aplikasi.                                                                                        |
| Favorit         | Daftar ringkas yang membuka detail aktivitas melalui alur yang sama; keadaan kosong memiliki jalan kembali ke pemilihan.                                                                         |
| Pengingat       | Status aktif/nonaktif, hari/waktu, status izin, batas pengiriman, dan kontrol ubah/matikan.                                                                                                      |

Desktop tidak perlu menjadi dashboard dengan banyak panel. Pada seluler, tindakan utama dekat dengan konten yang diputuskan dan mudah dijangkau. Jika memakai action bar melekat, sediakan ruang konten dan safe area agar tidak menutup instruksi, maskot, fokus, atau kontrol terakhir.

### Reflow dan aksesibilitas

- Susun pilihan dalam grid hanya bila setiap label tetap nyaman dibaca; ubah menjadi satu kolom bila ruang sempit.
- Tinggi target sentuh awal minimal 44 CSS px; tombol utama sekitar 48 px atau lebih. Ikon kecil boleh berada di dalam target yang lebih besar.
- Urutan fokus mengikuti urutan baca. Modal mengelola fokus, dapat ditutup dengan Escape bila sesuai, dan mengembalikan fokus ke pemicu.
- Label, instruksi, dan status tetap terlihat saat zoom; maskot diperkecil atau dipindahkan, bukan mengorbankan kontrol penting.
- Keberadaan maskot tidak mensyaratkan elemen floating yang menutupi layar. Tempatkan di dalam layout agar tetap hadir dan tidak mengganggu.

## Elevation & Depth

Kedalaman memberi petunjuk bahwa kontrol dapat ditekan. Gunakan secara selektif agar layar tetap tenang.

- Tombol utama: bayangan bawah pendek, nilai awal `0 3px 0 #224240`. Saat ditekan, geser 2 px dan kurangi bayangan menjadi 1 px; warna mengikuti token state.
- Tombol sekunder: border 2 px dan efek tekan singkat yang konsisten; tidak membutuhkan bayangan besar.
- Kartu aktivitas: permukaan putih dengan radius besar dan pemisah halus bila diperlukan. Warna dan ruang cukup untuk membentuk hierarki; jangan menambahkan kartu di dalam kartu tanpa kebutuhan pengelompokan.
- Panel dialog: bayangan lembut boleh digunakan untuk memisahkan lapisan. Backdrop harus tetap memungkinkan pengguna memahami bahwa konteks sebelumnya masih ada.
- Logo dan maskot boleh memiliki kedalaman sangat ringan jika dipilih saat eksplorasi. Versi satu warna atau sederhana tetap diperlukan untuk penggunaan kecil.

Jangan memakai glow, glassmorphism, grain, atau gerak latar sebagai dekorasi default. Teknik visual baru memerlukan alasan yang mendukung identitas atau hierarki. Bayangan bukan satu-satunya tanda bahwa elemen dapat dioperasikan.

## Shapes

### Bahasa bentuk

Bentuk utama membulat dan cukup padat, dengan garis yang tegas namun ramah. Radius awal: 8 px untuk detail kecil, 16 px untuk kontrol, dan 24 px untuk kartu. Radius penuh hanya untuk elemen yang bentuk atau isinya memang sesuai, misalnya avatar maskot kecil atau chip pendek. Instruksi panjang tidak dibungkus menjadi pil.

Pola tempurung boleh menjadi motif identitas setelah bentuk maskot dipilih. Gunakan sedikit bagian besar; jangan menyebar pola di belakang semua teks. Ruang kosong tetap menjadi bagian komposisi.

### Maskot kura-kura

Karakter: santai, penasaran, suportif, dan sedikit jenaka. Gagasan internalnya adalah “pelan juga tetap bergerak”; kalimat ini bukan kewajiban untuk semua headline.

Induk terpilih C1: tempurung berupa lengkungan sage lebar tanpa pola, wajah sand besar, mata oval sage berjauhan dengan detail sand kecil, senyum melengkung, dan kaki depan besar membulat. Pertahankan anatomi serta rendering lembut ini ketika mengembangkan pose baru. Nama karakter masih terbuka.

Pembagian warna terpilih: sage untuk tempurung serta mata/senyum, sand untuk tubuh/wajah, serta periwinkle untuk objek pendamping dan bidang ikon. Versi ringkas membesarkan wajah; versi monokrom mengandalkan bidang dan ruang negatif.

| Konteks                       | Kehadiran dan perilaku                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Landing page                  | Lebih besar dan ekspresif; pose mengajak atau sedang melakukan aktivitas.                                                |
| Pemilihan konteks dan saran   | Maskot kecil di dekat judul atau area bantuan, tanpa menggantikan label.                                                 |
| Timer berjalan/jeda           | Tetap hadir, sekitar 32–48 px sebagai titik awal; pose tenang atau statis, tanpa animasi berulang.                       |
| Penyelesaian                  | Ekspresi senang yang singkat, kemudian diam. Tidak menutupi pertanyaan mood atau tombol.                                 |
| Lewati, ganti, atau berhenti  | Tetap ramah dan menerima; tidak sedih, marah, menuduh, atau menunjukkan kehilangan pencapaian.                           |
| Favorit, pengingat, dan error | Kehadiran kecil yang konsisten melalui header/pendamping; ilustrasi lebih besar hanya bila membantu menjelaskan keadaan. |

Maskot harus hadir dalam layar aplikasi, meskipun kecil. Pada layar sempit, pertahankan bentuk ringkas di header atau area status, tanpa mengurangi keterbacaan dan akses tindakan. Jangan memakai maskot untuk menyampaikan error atau status penting tanpa teks.

### Logo, ikon, dan aset

Logo produksi memakai wajah C1 yang disederhanakan bersama tulisan `nudge.` dari outline Nunito bobot 900. Simbol berformat PNG; wordmark berformat SVG path. Ekspor horizontal menyatukan simbol raster dan tulisan vektor, termasuk varian satu warna. Ikon pemasangan memakai bidang biru dan varian maskable dengan area aman.

Rencanakan simbol + tulisan, tulisan saja, simbol saja, serta versi satu warna. Periksa simbol pada ukuran kecil sebelum menggunakannya sebagai favicon. Ikon PWA perlu versi yang aman dari pemotongan sistem; gambar eksplorasi bersudut dari IP as Logo belum otomatis memenuhi kebutuhan tersebut.

Gunakan satu keluarga **Phosphor Icons Regular** untuk ikon kontrol, dengan ukuran 20–24 px dan bobot konsisten. Paket sudah diintegrasikan untuk bentuk yang ramah dan cakupan tindakan umum. Pasangkan ikon dengan label pada tindakan utama. Jangan menambah ikon sekadar untuk mengisi ruang.

| Kebutuhan                                                 | Status saat dokumen dibuat           | Ketentuan produksi                                                       |
| --------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------ |
| Maskot utama dan pose ringkas                             | Perlu dibuat                         | Tetapkan bentuk induk agar proporsi antargambar konsisten.               |
| Ekspresi menyapa, berpikir, istirahat, selesai            | Perlu dibuat                         | Prioritaskan ekspresi yang benar-benar dipakai.                          |
| Ilustrasi Produktif ringan, Bergerak, Refleksi/jeda layar | Perlu dibuat                         | Gunakan kura-kura yang sama dalam kegiatan berbeda.                      |
| Logo dan wordmark                                         | Perlu dibuat                         | Eksplorasi simbol melalui IP as Logo; susun tulisan dan varian terpisah. |
| Favicon dan ikon PWA                                      | Perlu dibuat                         | Turunkan dari desain terpilih, periksa ukuran kecil dan area aman.       |
| Font Nunito dan ikon kontrol                              | Sumber dipilih, belum diintegrasikan | Ambil dari sumber resmi, simpan lisensi, periksa hasil render.           |
| Dokumen Duolingo dan gambar showcase skill                | Referensi saja                       | Bukan berkas aset Nudge siap pakai.                                      |

Setiap aset yang diproduksi nanti dicatat dengan lokasi, fungsi, varian, sumber/model bila dihasilkan, dan lisensi/atribusi yang relevan. Nama berkas yang disarankan: `nudge-turtle-idle`, `nudge-turtle-complete`, `nudge-logo-horizontal`, dan `nudge-icon-maskable`; contoh nama ini belum menunjuk berkas nyata. SVG cocok untuk ikon/wordmark yang memang dibuat sebagai vektor; gunakan PNG/WebP untuk hasil raster. Jangan menyebut gambar raster sebagai logo vektor hanya karena dimasukkan ke pembungkus SVG.

## Components

### State bersama dan interaksi

Setiap kontrol interaktif memiliki default, hover jika tersedia, fokus keyboard, ditekan, dan state nonaktif bila memang diperlukan. Pilihan juga memiliki state terpilih. Komponen berbasis data memiliki keadaan kosong, gagal, dan loading hanya bila ada proses nyata yang menunggu.

Fokus awal: outline 3 px berwarna `ink`, offset 3 px. Pada permukaan gelap, gunakan pemisah terang agar ring tetap terbaca. Jangan menghilangkan outline tanpa pengganti. Interaksi tetap dapat dilakukan dengan keyboard dan sentuhan, tanpa bergantung pada hover.

Perubahan state tidak boleh menggeser seluruh layout. Tempatkan error dekat kontrol terkait, hubungkan secara semantik, dan pertahankan pilihan pengguna saat terjadi kegagalan yang dapat dipulihkan.

### Tombol dan pilihan

- **Utama:** satu aksi dominan per kelompok keputusan, label spesifik sesuai konteks seperti Mulai, Lanjutkan, atau Selesai.
- **Sekunder:** Kurang cocok, Ubah pilihan, dan tindakan pendamping memakai outline atau permukaan tenang yang tetap jelas sebagai kontrol.
- **Lewati:** terlihat dan dapat difokuskan; jangan disamarkan sebagai teks yang hampir tidak terbaca.
- **Pilihan mood/tujuan/waktu:** label jelas, state radio atau kelompok pilihan yang sesuai perilaku, border stabil agar tidak mengubah ukuran ketika dipilih, serta indikator terpilih selain warna.
- **Favorit:** state aktif/tidak aktif terlihat dan nama aksesibel menjelaskan tindakan tambah/hapus; bukan tombol dekoratif berbentuk hati tanpa fungsi.

Mood adalah konteks saran, bukan skor. Ilustrasi ekspresi boleh membantu pengenalan, tetapi semua mood memakai ukuran, bobot, dan akses yang setara.

### Kartu aktivitas dan alternatif

Urutan informasi: judul, durasi, instruksi awal, kebutuhan tempat/alat, alasan kecocokan, lalu tindakan. Favorit tidak mengalahkan Mulai secara visual. Jangan mengganti satu saran utama menjadi feed atau carousel otomatis.

Alternatif yang berbeda dari filter tempat/alat menampilkan penjelasan sebelum tindakan mulai. Jika tidak ada kandidat, tampilkan kalimat yang dapat ditindaklanjuti dan **Ubah pilihan**. Jangan menampilkan saran yang melampaui waktu hanya untuk mengisi kartu.

### Timer dan penyelesaian

Angka waktu adalah elemen terbesar. Tampilkan status tekstual **Berjalan**, **Dijeda**, atau **Waktu habis**; warna hanya mendukung status tersebut. Ring progres, bila dipakai, bersifat tambahan dan tidak menjadi satu-satunya informasi waktu.

Saat berjalan, Jeda mudah ditemukan. Saat dijeda, Lanjutkan menjadi tindakan utama. Pengguna tetap dapat mengakhiri lebih awal atau mengganti aktivitas sesuai PRD. Waktu habis tidak otomatis menyelesaikan kegiatan dan tidak memindahkan layar; tonjolkan **Selesai**.

Setelah pengguna menekan Selesai, tampilkan respons kerja seperti “Satu kegiatan kecil selesai.” dan pertanyaan **“Mood kamu berubah?”**. Pilihan Lewati tidak menghapus mood sebelumnya. Siklus kembali ke awal aplikasi, tanpa memulai aktivitas berikutnya secara otomatis.

Pembaca layar tidak perlu mendengar hitungan setiap detik. Umumkan perubahan penting seperti dijeda atau waktu habis dengan mekanisme status yang sesuai. Timer tetap dapat dibaca sebagai nilai teks.

### Favorit dan pengingat

Favorit kosong: maskot kecil, keterangan bahwa belum ada aktivitas favorit, serta jalan kembali mencari aktivitas. Jangan menampilkan contoh favorit yang seolah sudah disimpan pengguna. Bila penyimpanan gagal, jelaskan batas lokal dan biarkan aktivitas tetap dapat dimulai.

Pengingat default nonaktif. Gunakan label dan status switch yang eksplisit. Hari/waktu mudah diubah; minta izin browser hanya setelah pengguna mengaktifkan pengingat. Bedakan status izin ditolak, belum diminta, dan tidak didukung. Jelaskan bahwa pengingat MVP membutuhkan Nudge tetap terbuka/berjalan dan waktunya mengikuti batas browser. Tidak ada gambar lonceng yang seolah menjanjikan alarm saat tertutup.

### Tulisan antarmuka

Gunakan “kamu” secara konsisten, dengan kalimat pendek dan konkret. Contoh tulisan kerja berikut dapat dipoles tanpa mengubah perilaku:

| Situasi            | Contoh                                                                        |
| ------------------ | ----------------------------------------------------------------------------- |
| Memilih konteks    | “Mau melakukan apa sebentar ini?”                                             |
| Mood               | “Lagi merasa bagaimana?” dengan Lewati.                                       |
| Saran kurang cocok | “Cari kegiatan lain” sebagai penjelasan tindakan Kurang cocok.                |
| Waktu habis        | “Waktunya habis. Sudah selesai?” dengan tombol Selesai.                       |
| Berhenti           | “Boleh berhenti dulu. Kamu bisa mulai lagi nanti.”                            |
| Favorit kosong     | “Belum ada favorit. Simpan kegiatan yang ingin kamu coba lagi.”               |
| Tidak ada kandidat | “Belum ada kegiatan yang sesuai pilihan ini. Coba ubah waktu atau filternya.” |
| Izin ditolak       | “Notifikasi belum diizinkan. Kamu tetap bisa memulai kegiatan kapan saja.”    |

Hindari diagnosis, janji menghilangkan brainrot, janji penurunan screen time, angka manfaat, testimoni palsu, dan tekanan mempertahankan streak. Jangan menambahkan fitur hanya agar contoh teks dapat digunakan.

### Motion

| Kegunaan                    | Nilai awal       | Batas                                                                        |
| --------------------------- | ---------------- | ---------------------------------------------------------------------------- |
| Feedback tombol/pilihan     | 120–160 ms       | Perubahan warna atau gerak tekan kecil; tidak menunda aksi.                  |
| Pergantian panel            | 180–220 ms       | Fade atau perpindahan 4–8 px; tanpa perubahan alur fokus yang membingungkan. |
| Respons selesai             | 300–500 ms       | Satu gerakan maskot ringan, kemudian diam; tidak mengunci tombol.            |
| Timer dan maskot pendamping | Statis saat idle | Tanpa kedipan, bounce berulang, gerak angka, atau animasi latar.             |

Easing awal `cubic-bezier(0.2, 0.8, 0.2, 1)`. Utamakan opacity dan transform. Dengan `prefers-reduced-motion: reduce`, hilangkan perpindahan, perayaan, dan efek tekan bergerak; pertahankan feedback instan melalui warna, border, teks, dan ikon. Konten muncul tanpa menunggu scroll animation. Animasi tidak menjadi prasyarat memahami hasil tindakan.

### Landing studio C1, 22 Oktober 2026

Penyempurnaan berdasarkan audit Impeccable mempertahankan galeri besar pada desktop dan mobile. Ukuran gambar kategori tetap hingga 320 px desktop dan 280 px mobile; yang diringkas adalah teks langkah dan jarak, bukan ilustrasinya. CTA umum memakai “Mulai kegiatan”; demo memakai “Lanjut ke Nudge” dan menjelaskan bahwa hanya pilihan waktu yang dibawa. Catatan “Tanpa akun. Dua menit juga boleh.” hadir dekat CTA hero. Aturan khusus landing dikonsolidasikan dalam stylesheet landing dengan breakpoint 700/900 px, terpisah dari aturan bersama aplikasi.

Revisi berdasarkan komentar pengguna: indikator durasi memakai CheckCircle Phosphor fill 24 px; CTA hero dan penutup memakai Footprints fill 22 px dalam bidang lingkaran 34 px. Kategori Bergerak memakai ilustrasi berjalan C1 baru pada inventaris landing. Pengguna secara eksplisit meminta teks penutup berbahasa Inggris; judulnya “Your next small step starts here.” dengan “Make room for what matters, one small act at a time.” pada container `lang="en"`. Bahasa tombol dan aplikasi tetap Indonesia. Ini pengecualian lokal yang diminta pengguna, bukan perubahan bahasa produk secara menyeluruh.

Polesan yang disetujui pengguna mempertahankan palet, C1 dan Nunito. Satu adegan hero baru memperlihatkan C1 beranjak dari ponsel menuju notebook dan kotak penyimpanan. Tiga ilustrasi kategori lama diperbesar menjadi 240–320 px pada desktop. Lengkung tempurung menjadi bingkai gambar, dengan radius `50% 50% 14% 14%`; panel demo memakai radius 32 px dan penutup 64/24 px. Ini bentuk khusus landing, bukan pengganti radius kontrol aplikasi.

Hero memakai rentang 48–92 px pada desktop, 40–64 px pada layar menengah/seluler, dengan satu warna judul. Judul kategori 28–40 px dan kata langkah 32–40 px. Ketika teks diperbesar, pembungkusan teks dan kontrol didahulukan daripada mempertahankan jumlah baris standar. Lihat [arah studio dan aset](./docs/landing-studio.md).

Gerak masuk hero berlangsung sekali selama 760 ms, perpindahan 12/18 px dan skala awal 0,96. Bingkai gambar memakai 600 ms, teks/langkah 480 ms dengan jeda saudara 70–140 ms, dan pergantian contoh durasi 220 ms. Easing khusus landing adalah `cubic-bezier(0.16, 1, 0.3, 1)`. Tidak ada loop, pengambilalihan scroll, atau penundaan CTA. Reduced motion menghilangkan perpindahan; tab tersembunyi membatalkan gerak aktif. Aturan timer dan maskot aplikasi tetap berlaku.

Perluasan yang disetujui berikutnya menambahkan jejak langkah, garis lengkung tempurung, serta pose jeda, peregangan, dan penyelesaian C1. Satu aksen jejak pada landing boleh bergerak lembut tiga siklus selama total 4,8 detik, lalu diam; tidak ada loop tanpa akhir. Masuk gambar kategori mengikuti arah komposisi. Aplikasi memakai transisi maju/kembali 200 ms, konfirmasi pilihan 160 ms, serta masuk penyelesaian 560 ms sekali. Timer tetap statis. Hentikan gerak di luar layar atau ketika tab tersembunyi, hormati reduced motion, dan jangan tutupi teks/kontrol. Detail serta bukti ada di [panduan motion](./docs/small-steps-motion.md).

### Landing adaptasi Duolingo, 23 Oktober 2026

Pengguna menyetujui adaptasi kuat berdasarkan landing Duolingo dan dokumen referensi alpha yang diberikan. Pertahankan C1, Nunito, warna Nudge, Bahasa Indonesia dan penutup Inggris yang disetujui. Atas permintaan pengguna, judul hero memakai “Small steps. A fuller life.” dengan atribut `lang="en"`, sedangkan penutup mengajak mulai melalui “Your next small step starts here.” Teks pendukung hero dan tombol tetap berbahasa Indonesia. Referensi memberi prinsip komposisi dan kontrol; ukurannya dipetakan ke kebutuhan responsif Nudge. Lihat [pemetaan referensi](./docs/landing-duolingo.md).

Hero memakai adegan C1 transparan yang terbuka, gambar di kiri dan teks di kanan pada desktop, lalu gambar di atas teks pada mobile. Headline desktop 48–72 px, menengah 40–56 px, seluler 40–52 px; heading manfaat 28–44 px, isi 18 px desktop dan 16 px mobile. Pembesaran teks boleh menambah baris. Lebar konten maksimal 1080 px, dengan ruang kategori bergantian dan hanya kategori bergerak memakai bingkai tempurung biru. Urutan landing: hero, demo waktu, manfaat, cara pakai, kendali pengguna, penutup, footer.

Header sticky memakai canvas solid; logo dan CTA tetap satu baris pada 320 px dengan teks standar. Tombol landing memakai lapisan bawah tonal 4 px dan respons tekan 2 px, bukan bayangan panel. Tinggi minimal 54 px untuk CTA utama, 46 px untuk header; lebar CTA dibatasi hingga 330 px dan dapat mengecil. Radius penutup khusus landing 48/24 px desktop, 32/20 px mobile. Gaya kontrol aplikasi tetap terpisah.

Adegan baru memakai ImageGen dengan C1 sebagai referensi, diekspor WebP alpha 1200 × 900 berukuran 75.690 byte; catatan sumber/prompt ada di inventaris aset. Gerak hero 760 ms, kategori 600 ms, teks 480 ms dan jeda saudara 70–140 ms dipertahankan. Reduced motion, pembatalan gerak, fallback tanpa JavaScript, fokus, dan kontrak handoff durasi tetap berlaku.

## Do's and Don'ts

### Terapkan

- Gunakan palet identitas secara selektif dan pasangan teks yang telah diperiksa.
- Pertahankan kura-kura sebagai pendamping yang hadir di aplikasi, termasuk versi ringkas di timer.
- Susun satu keputusan utama pada satu waktu, dengan jalan kembali atau lewati yang jelas.
- Tampilkan status timer, pilihan, error, dan izin melalui teks/indikator selain warna.
- Gunakan sumber aset dan font yang nyata, dengan status ketersediaan yang jujur.
- Tinjau perubahan token di dokumen ini saat implementasi memerlukan perbaikan, lalu jaga komponen tetap konsisten.

### Hindari

- Menyalin karakter, nama font khusus, atau struktur layanan Duolingo menjadi kebutuhan Nudge.
- Mengubah mood menjadi peringkat, memberikan ekspresi kecewa saat berhenti, atau memakai pencapaian untuk menekan pengguna.
- Menyembunyikan Lewati dan kontrol berhenti, memulai timer otomatis, atau menyamakan waktu habis dengan selesai.
- Memakai seluruh warna pada setiap komponen, dekorasi berlebihan, atau layout desktop yang memaksa pengguna menggulir lama pada ponsel.
- Mengaku bahwa logo, ilustrasi, font, atau ikon sudah tersedia hanya karena tercantum dalam dokumen.
- Menganggap laporan engine atau dokumen ini sebagai bukti tampilan responsif dan aksesibilitas yang sudah diuji pada aplikasi.

### Pemeriksaan saat implementasi tersedia

Periksa landing page, konteks, saran/alternatif, timer, pembaruan mood, favorit, dan pengingat pada desktop serta seluler. Sertakan teks panjang, zoom, keyboard, reduced motion, keadaan kosong, kegagalan penyimpanan, dan izin ditolak. Pastikan maskot tetap terlihat tanpa menutupi tugas.

Jalankan pemeriksaan logika/alur sesuai PRD dan pemeriksaan visual pada hasil render. Gunakan detector Impeccable serta Delivery Gate Anti Slop sesuai lingkup perubahan; catat bukti yang benar-benar dijalankan. Karena dokumen ini mendahului implementasi, pemeriksaan browser, pemasangan PWA, respons kontrol, serta kualitas aset tetap menunggu artefak nyata.

### Sumber teknis

- [Format DESIGN.md](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md): struktur dokumen dan token.
- [Nunito, sumber Google Fonts](https://github.com/google/fonts/tree/main/ofl/nunito): berkas font dan lisensi yang perlu dipertahankan saat integrasi.
- [Phosphor Icons](https://github.com/phosphor-icons/core): sumber keluarga ikon dan lisensinya.
- [WCAG 2.2, Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): ambang kontras teks.

## Landing hidup, keputusan 23 Oktober 2026

Keputusan pengguna ini menggantikan pembatasan loop landing pada catatan versi sebelumnya. Seluruh aplikasi dan aturan timer tetap di luar perubahan.

Landing mengikuti komposisi Duolingo dengan ilustrasi besar, teks pendek, ruang antarseksi, bagian yang bergantian sisi, dan tombol berefek tekan. Identitas tetap Nudge: Nunito, sage, biru, sand, dan karakter C1. Hero memakai “Small steps. A fuller life.”; penutup memakai “Your next small step starts here.” Keduanya ditandai `lang="en"`, sedangkan isi dan tombol berbahasa Indonesia.

Tujuh adegan: langkah awal, ponsel/feed, pilihan waktu, bergerak, merapikan, journaling, dan sambutan penutup. Kura-kura memakai ilustrasi 3D clay berlapis; ponsel, jam, kartu, jurnal, serta properti lain memakai vektor ekspresif. Kepala dan kaki bergerak sendiri. Properti yang dipegang disatukan dengan kaki dalam koordinat adegan.

Adegan berulang selama terlihat, berhenti di luar viewport/tab tersembunyi, dan memakai poster statis untuk reduced motion atau tanpa JavaScript. Siklus 6–10 detik mencakup momen tenang. Tidak menambahkan tombol jeda sesuai pilihan pengguna. Batas pause/stop/hide dicatat secara terbuka; reduced motion tidak menjadi klaim kepatuhan penuh.

Semua stylesheet baru dibatasi `.nudge-alive`; lifecycle baru tidak mengubah utilitas motion bersama. Aset baru khusus landing berada pada `public/brand/landing/alive/`. Lihat [brief dan bukti](./docs/landing-alive.md) serta [inventaris aset](./docs/assets/landing-alive/README.md).

### Nilai implementasi khusus landing

Skala desktop: display 68 px; heading bagian 48 px; penutup 44 px; judul kendali/jam dekoratif 36 px; angka durasi dan langkah 28 px; judul contoh 20 px; paragraf 18 px; isi pendukung/tombol 16 px; label/catatan 14 px. Nilai display dan heading memakai clamp serta menyesuaikan mobile; pembesaran teks tetap boleh menambah baris. Ini bukan perubahan token aplikasi.

Warna utama: `#315F5E`, `#679F9E`, `#7EADDB`, `#E6D4BE`, `#FAF8F4`; teks `#17393B`, teks pendukung `#4C6E6C`, bidang sage pucat `#E8F1EC`. Turunan properti memakai `#6898C2`, `#5A8D8B`, `#CBAF8B`, `#F0E2CC`, `#F7ECD9`. Depth kontrol memakai tepi bawah gelap `#234948`; pilihan durasi memakai garis `#C9DCD7`, `#B5CECA`, `#93B5B0`. Radius kontrol 13–16 px, bidang kendali 28–36 px, dan penutup 48/24 px desktop atau 36/20 px mobile.

Tepi bawah 4–6 px pada CTA, radio, dan kartu ilustrasi adalah kedalaman tekan yang diminta melalui referensi Duolingo, bukan border aksen dekoratif. Pertahankan ketika detector menandainya sebagai `border-accent-on-rounded`.

### Revisi gerak landing setelah kritik pengguna

Pembaruan 24 Oktober 2026: pengguna membatalkan pendekatan video dan menyetujui adegan karakter SVG pada bagian bergerak. C1 2D meregangkan badan di atas alas dengan ponsel di samping, sebagai pengganti sepatu melayang. Pengguna kemudian memilih C1 2D ekspresif untuk hero; penutup tetap memakai C1 3D. Detail koreografi dan bukti ada di [adegan regangan](./docs/stretch-story.md) dan [sapaan hero](./docs/hero-story.md).

Revisi ini menggantikan arahan rig tubuh terpisah pada tujuh adegan landing. Arah terbaru memakai C1 2D pada hero dan bagian bergerak, C1 3D di penutup, serta ilustrasi benda pada bagian cerita lainnya, tanpa karakter manusia. Potret penutup tetap memakai gerak kecil dan bukan animasi karakter 3D penuh.

Hero 2D memakai sapaan dengan gerak kepala, kedipan, perubahan senyum, ayunan kaki depan, dan perpindahan berat badan. Kaki yang menapak mempertahankan kontak dengan tanah. Ponsel bergeser menjauh dan buku membuka halaman dalam siklus 10,8 detik. Pengguna dapat mengulang sapaan melalui tombol ilustrasi. Gerak berhenti ketika bagian tidak terlihat atau tab tersembunyi; reduced motion menampilkan komposisi statis. Ini keputusan khusus hero landing dan tidak mengubah maskot aplikasi.

Koreksi pengguna 24 Oktober 2026 menggantikan arahan gambar ulang hero di atas: bentuk vektor pada cuplikan v1/v2 ditolak karena berbeda dari C1 yang disepakati. Gunakan master C1 asli yang tampil di penutup sebagai acuan wajib untuk siluet, wajah, proporsi, warna, dan shading. Preview v3 memakai piksel `c1-wave.webp` dengan mask serta deformasi saat render, tanpa menggambar ulang karakter. Gerak ponsel tetap mengikuti cuplikan yang disukai. Ini masih preview terpisah; integrasi hero dan penerimaan artistik belum selesai. Lihat [perkembangan hero](./docs/hero-redesign.md). Arahan ini tidak mengganti adegan regangan yang sudah diterima atau aset aplikasi.

Ponsel memakai adaptasi Scrolling Phone oleh Nafta R; jurnal memakai adaptasi Diary oleh Brian Karungani, dengan Lottie Simple License dan kredit pada footer. Tangan serta sisa garis gestur ponsel dihapus. Afirmasi jurnal diganti goresan netral. Lima adegan cerita tidak mengulang satu siluet kura-kura. Jam/tiket mengikuti durasi pengguna; sepatu dan benda meja memiliki gerak tersendiri.

Aset, runtime, pengecualian Taste, serta bukti pemeriksaan dicatat pada [revisi motion landing](./docs/landing-motion-revision.md). Loop hanya berjalan saat terlihat, berhenti ketika tab tersembunyi, dan memiliki poster statis untuk reduced motion, tanpa JavaScript, atau kegagalan unduh. Batas aplikasi tetap berlaku.
