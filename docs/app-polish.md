# Polesan aplikasi Nudge

Tanggal: 22 Oktober 2026. Permukaan: `/app`. Mode Impeccable: **Operate**.

Catatan lanjutan: pengguna kemudian menyetujui perluasan animasi/dekorasi. Transisi kini 200 ms dengan arah maju/kembali, konfirmasi pilihan 160 ms, serta pose penyelesaian baru dengan masuk sekali. Bukti produksi terbaru 94/94 dan rincian ada di [small-steps-motion.md](./small-steps-motion.md). Bagian berikut mencatat lingkup polesan sebelumnya.

## Arah yang disetujui

Pengguna memilih seluruh aplikasi dan pemilihan bertahap, dengan tombol Lanjut eksplisit. Pertahankan C1, Nunito, palet sage/biru/sand, bentuk membulat, Bahasa Indonesia, dan batas MVP. Landing tetap menjadi permukaan terpisah.

ENERGY 1, RHYTHM 1, MOTION 1: energi berasal dari ekspresi C1 dan warna terpilih; ritme mengikuti satu tugas pada satu waktu; gerak hanya menjelaskan pergantian langkah. Tidak ada loop, dekorasi timer, atau adegan landing besar di aplikasi.

## Alur dan state

| Bagian | Keputusan |
| --- | --- |
| Mood | Empat radio setara. Lanjut aktif setelah memilih; Lewati langsung menuju Tujuan dengan mood kosong. |
| Tujuan | Tiga baris pilihan dengan ikon dan deskripsi. Lanjut menunggu pilihan. Kembali mempertahankan state. |
| Waktu | Radio 2/5/10 menit, filter tempat/alat opsional, Kembali, dan Cari kegiatan kecil. Durasi dari landing tidak melewati langkah awal. |
| Perpindahan menu | Favorit/Pengingat tidak menghapus langkah maupun konteks pemilihan. Reload mengikuti batas sesi yang sudah ada. |
| Ubah pilihan | Dari saran kembali ke Waktu; Kembali tersedia untuk memperbaiki tujuan/mood. |
| Saran | Satu aktivitas dengan ilustrasi kategori ringkas, durasi, instruksi, kebutuhan, alasan, dan penjelasan perbedaan filter. Mulai tetap tindakan eksplisit. |
| Timer | Jeda utama saat berjalan, Lanjut utama saat dijeda, Selesai utama setelah waktu habis. Selesai tetap tersedia sebelumnya sebagai tindakan sekunder. |
| Penyelesaian | Mood kamu berubah? menyediakan empat mood dan Lewati. Kembali ke Mood dengan konteks sesi; Lewati di sini mempertahankan mood sebelumnya. |
| Favorit | Daftar lokal, keadaan kosong, buka detail, serta tambah/hapus dengan nama aksesibel. |
| Pengingat | Status tersimpan dibedakan dari draft, hari/waktu dikelompokkan, dan izin diminta hanya setelah menyimpan jadwal aktif yang valid. |

## Pilihan presentasi

- Kolom tugas maksimal 640 px, angka timer menjadi pusat perhatian pada layar timer. Panel pemilihan mengelompokkan satu keputusan, bukan rangkaian kartu informasi bersarang.
- Mood memakai dua kolom, lalu satu kolom di bawah 360 px. Tujuan berupa baris; waktu tetap tiga kolom dengan label yang dapat membungkus. Semua aksi berada dalam alur dokumen, tanpa bar melekat.
- Bidang saran membawa ilustrasi C1 kecil, menggantikan ikon kategori besar. Aset yang digunakan sudah tersedia; tidak ada generasi baru.
- Phosphor CheckCircle menandai pilihan; ruang ikon disediakan agar pilihan tidak berubah ukuran. Footprints menunjukkan gerak, Leaf menunjukkan jeda, bookmark menunjukkan favorit. Panah terbatas pada maju/kembali.
- Warna utama menunjukkan aksi dan state, permukaan netral menjaga instruksi mudah dibaca. Radius kontrol dan panel mengikuti DESIGN.md; tidak ada gradien, glow, atau bayangan dekoratif.
- Entry langkah 180 ms menggunakan opacity/transform, hanya ketika pengguna tidak meminta reduced motion. Timer, angka dan maskot pendamping tetap statis.

## Implementasi dan bukti

`SelectionFlow` mengelola presentasi tiga langkah; konteks dan langkah berada dalam state `ActivityApp`. `activity-primitives` menyediakan detail, ikon dan ilustrasi kategori. Stylesheet aplikasi memiliki lingkup `.app-studio`; token dan kontrol bersama tetap global.

Tidak ada perubahan algoritma, perhitungan timer, skema localStorage, atau pengiriman notifikasi. Pengujian memeriksa keyboard, fokus langkah, menu, konteks sesi, semua state timer, favorit, pengingat, serta regresi landing/PWA. Hasil aktual dan batas perangkat fisik ada di [verification.md](./verification.md).

## Gate penyerahan

Hasil untuk lingkup implementasi ini, bukan sertifikasi perangkat fisik. Bukti utama: build produksi, 17 unit test, 84 tes browser produksi, review source, screenshot, dan penghitungan kontras pasangan token.

| Pemeriksaan | Status dan bukti |
| --- | --- |
| Hard gate, R-02 | PASS: tidak ada em dash pada source UI aplikasi yang diperiksa. |
| Hard gate, R-03 | PASS: reflow lima lebar dan 320 px/teks 200% menguji overflow elemen pada seluruh layar; judul yang sempat meluber diperbaiki. |
| Hard gate, R-17/R-18/R-36/R-38 | PASS: tidak menambah angka manfaat, testimoni, pengguna fiktif, atau klaim keamanan/performa. Angka waktu berasal dari katalog/timer nyata. |
| Hard gate, R-23 | PASS: perubahan alur disetujui; maskot, font, dan ikon menggunakan inventaris yang tersedia. Tidak ada aset baru yang dihasilkan. |
| Hard gate, R-24/R-26 | PASS: navigasi tiga menu dan semua tindakan terhubung ke state/handler nyata; maju, kembali, cari, simpan, mulai, jeda, lanjut, berhenti, ganti dan selesai dicakup tes. |
| Hard gate, R-25 | PASS: ink/white 14,81:1; muted/canvas 5,71:1; white/action 7,17:1; action/selection 6,33:1; error 5,99:1; warning 6,33:1. Border kontrol/white 3,96:1. Axe pada layar yang diuji juga lulus. |
| Hard gate, R-27 | PASS: favorit kosong/loading, pembacaan pengaturan, validasi jadwal, penyimpanan gagal, dan izin tidak tersedia memiliki respons nyata. |
| Hard gate, R-28 | PASS: aplikasi tidak menambah FAQ atau konten pengisi. |
| Hard gate, R-32 | PASS: radio dan checkbox native, label/legend, focus ring, fokus antar langkah, dan alur keyboard diuji. |
| Hard gate, R-33 | PASS: UI dikirim sebagai source JSX/CSS yang dilacak dan di-build; tidak ada fitur berbasis injeksi markup runtime. |
| Hard gate, R-34 | PASS: light theme merupakan keputusan MVP; tidak ada toggle tema yang setengah berfungsi. |
| Hard gate, R-35 | PASS: build dan alur klik produksi dijalankan; instruksi timer juga dibuka melalui browser dan menampilkan langkah aktivitas. |
| Hard gate, R-37 | PASS: arah berasal dari DESIGN.md serta pilihan pengguna; dials dan alasan komposisi dicatat di atas. |
| Purpose, R-01/R-07/R-09/R-10/R-12/R-13 | PASS: tidak memakai gradien, glow, grid latar, badge promosi, glassmorphism atau bayangan dekoratif. |
| Purpose, R-04/R-06/R-08 | PASS: Phosphor mengikuti arti tindakan/kategori, Nunito mengikuti identitas, panah hanya menunjukkan maju/kembali. |
| Purpose, R-14 | PASS: pilihan mood setara karena keputusan radio setara; baris tujuan dan pilihan waktu mempunyai komposisi berbeda sesuai isi. |
| Purpose, R-19/R-22 | PASS: satu transisi langkah 180 ms, timer statis, dan seluruh ilustrasi merupakan C1. Assertion gambar termuat lulus pada setiap state yang diuji. |
| Liveliness, dials | PASS: ENERGY/RHYTHM/MOTION 1/1/1 konsisten dengan mode Operate; tidak meniru ekspresi landing. |
| Liveliness, fokus dan ruang | PASS: satu pertanyaan per langkah, satu saran, lalu angka waktu; jarak memisahkan progres, pilihan dan tindakan. |
| Liveliness, aksen dan motif | PASS: action sage untuk pilihan/aksi utama; bentuk membulat dan C1 menjadi motif identitas yang berulang. |
| Liveliness, Design Read | PASS: arah dan batas ditetapkan sebelum implementasi dalam rencana yang disetujui pengguna. |
| C-1/C-3/R-05/R-31 | PASS: kolom tugas, pilihan bertahap dan state pendukung mempunyai alasan produk; tidak ada bagian marketing atau dashboard pengisi. |
| C-2/C-4 | PASS: tes alur, kegagalan lokal, reflow, reduced motion, fokus, dan keyboard lulus; pemeriksaan fisik tetap dinyatakan terpisah. |
| C-5 | PASS: bukti pengujian dipisahkan dari asumsi dan pemeriksaan manual yang belum dilakukan. |
| R-11/R-15/R-16 | PASS: radius kontrol/panel dibedakan, tindakan memakai label kegiatan yang nyata, tanpa buzzword marketing. |
| R-20/R-21/R-29/R-30 | PASS: identitas C1, palet tetap dan alur aktivitas berasal dari Nudge; tidak menambah tema gelap atau meniru produk lain. |

Skala judul aplikasi 28/32 px, judul favorit 18 px, radius navigasi/simbol 14 px dan feedback 12 px dipertahankan secara sengaja. Enam advisory detector tidak dianggap pelanggaran aksesibilitas atau dihilangkan melalui ignore.
