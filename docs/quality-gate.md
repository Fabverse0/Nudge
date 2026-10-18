# Pemeriksaan kualitas tahap kode

18 Oktober 2026. Cakupan: implementasi fungsional dan tampilan sementara. Logo/ilustrasi final ditunda pengguna. Pemeriksaan ini tidak menyatakan kesiapan rilis atau menggantikan uji perangkat fisik.

## Hard Gate Anti Slop

- R-02 PASS: pencarian pada source dan tulisan baru tidak menemukan em dash.
- R-03 PASS pada cakupan otomatis: Playwright memeriksa overflow 320/768/1440; teks 200% pada seluruh layar utama, judul favorit, dan batas teks navigasi juga diperiksa. Zoom browser nyata masih memerlukan pemeriksaan manual.
- R-17 PASS: tidak ada statistik pengguna atau manfaat yang diciptakan.
- R-18 PASS: tidak ada testimoni atau profil fiktif.
- R-23 PASS untuk tahap kode: ikon sementara didokumentasikan, aset final ditunda pengguna; kandidat gambar tidak diadopsi sebagai logo.
- R-24 PASS: link header, anchor cara pakai, CTA, dan jalur aplikasi memiliki tujuan nyata; navigasi utama diuji.
- R-25 PASS pada layar yang diperiksa: Axe dijalankan pada landing dan seluruh keadaan utama aplikasi; pasangan token mengikuti DESIGN.md. Ini bukan sertifikasi aksesibilitas menyeluruh.
- R-26 PASS: kontrol terhubung ke state/aksi; test mencakup memilih, feedback, timer, mood, favorit, pengingat dan navigasi.
- R-27 PASS: favorit kosong, saran habis, error storage, status baca, error rute dan offline punya penjelasan serta jalan lanjut.
- R-28 PASS: tidak ada FAQ template.
- R-32 PASS pada alur yang diperiksa: skip link, radio via keyboard, Enter, fokus dan Axe diperiksa.
- R-33 PASS: perubahan source ditulis langsung dengan patch; formatter hanya merapikan format.
- R-34 PASS: MVP hanya tema terang sesuai keputusan produk; tidak ada toggle tema yang belum berfungsi.
- R-35 PASS untuk tahap kode: aplikasi dijalankan, build berhasil, 44 alur browser dan delapan skenario produksi lulus. Instalasi perangkat fisik masih menunggu.
- R-36 PASS: tidak ada klaim medis, angka manfaat, keamanan bersertifikat atau performa yang dibuat-buat.
- R-37 PASS: arah visual berasal dari DESIGN.md pengguna; dials tercatat pada keputusan implementasi.
- R-38 PASS: contoh kegiatan berasal dari katalog nyata dan ditandai contoh pada landing.

## Purpose Gate

- R-01 PASS: bidang warna membedakan tindakan dan bagian isi; tanpa glow/gradient.
- R-04 PASS: ikon Check, Footprints, Leaf, Bookmark, Bell dan kontrol timer mengikuti tugas; Phosphor Regular digunakan konsisten.
- R-06 PASS: Nunito mendukung bentuk ramah membulat; angka timer tabular, tanpa monospace dekoratif.
- R-07 PASS: tidak ada grid latar dekoratif.
- R-08 PASS: panah hanya pada link perpindahan; tombol operasi memakai label tindakan.
- R-09 PASS: label hero yang berlebihan dihapus, tidak ada badge pemasaran.
- R-10 PASS: tidak ada glassmorphism.
- R-12 PASS: tidak ada kumpulan bayangan besar.
- R-13 PASS: tidak ada glow atau indikator status berdenyut.
- R-14 PASS: tiga pilihan tujuan seragam untuk keputusan setara; bagian landing memakai susunan berbeda sesuai isi.
- R-19 PASS: feedback tekan dan respons selesai satu kali; timer statis, reduced motion mematikan gerak.
- R-22 PASS dalam tahap kode: ikon kura-kura sementara mengikuti spesies yang dipilih; ilustrasi final tidak diklaim selesai.

## Liveliness dan konsistensi

- Dials PASS: landing ENERGY 2 / RHYTHM 3 / MOTION 1; aplikasi 1 / 1 / 1, mengikuti brief tenang.
- Fokus dan whitespace PASS: keputusan konteks/saran/angka timer menjadi pusat masing-masing layar, diperiksa pada screenshot.
- Identitas sementara PASS: sage, biru, sand, Nunito, kurva tempurung dan kura-kura hadir pada kode. Kualitas identitas final tetap menunggu P2.
- R-05 PASS: landing memisahkan demo, urutan penggunaan, daftar tujuan dan kendali pengguna dengan komposisi berbeda.
- R-11 PASS: radius kontrol/kartu berbeda; kurva besar hanya untuk panel hero.
- R-15/R-16 PASS: CTA menyebut kegiatan, tanpa jargon pemasaran.
- R-20/R-30 PASS untuk draft: mekanisme satu saran dengan 2/5/10 menit dan pendamping kura-kura terlihat; tidak menyalin struktur atau aset Duolingo.
- R-21/R-29 PASS: tema terang dan palet tetap mengikuti pilihan pengguna.
- R-31 PASS: alasan tipografi, warna, motif dan gerak tercatat dalam keputusan implementasi.

## Craftsmanship

- C-1 PASS: keputusan visual mengikuti tujuan tugas dan desain yang diberikan.
- C-2 PASS: aksi utama diuji melalui browser.
- C-3 PASS: setiap bagian landing menjelaskan kebutuhan dalam PRD.
- C-4 PASS dalam cakupan otomatis: keadaan gagal, keyboard, lebar sempit, teks besar dan reduced motion diperiksa. Pemeriksaan pembaca layar/perangkat fisik masih terpisah.
- C-5 PASS: tidak ada hasil riset, testimoni atau manfaat yang direkayasa. Jumlah test berasal dari output nyata.

Taste Skill dan Impeccable memiliki laporan mekanis tersendiri. Temuan yang belum diterapkan beserta alasan dan batas tahap aset dijelaskan di verification.md; laporan ini tidak mengubahnya menjadi hasil lulus.

## Delivery Gate polesan landing page

Cakupan: perubahan landing pada 18 Oktober 2026. Bukti suite pada bagian sebelumnya berasal dari tahap implementasi; suite tersebut tidak dijalankan ulang untuk polesan ini. Bukti baru: source diff, build Webpack, screenshot 1440/768/390, serta interaksi browser yang dicatat di [verification.md](./verification.md#polesan-landing-page-18-oktober-2026).

### Hard Gate

- R-02 PASS: pencarian em dash pada source landing dan catatan perubahan tidak menghasilkan temuan.
- R-03 PASS pada tiga viewport: overflow 0 dan screenshot menunjukkan teks/ikon tetap dalam susunannya.
- R-17 PASS: tidak ada statistik baru; source landing tidak memuat angka klaim manfaat/pengguna.
- R-18 PASS: tidak ada testimoni atau profil fiktif pada landing.
- R-23 PASS dalam lingkup polesan: tidak membuat logo/ilustrasi atau struktur navigasi baru; simbol sementara tetap didokumentasikan.
- R-24 PASS: sepuluh link landing dibuka melalui browser dan tujuan URL/anchor sesuai label.
- R-25 PASS pada pasangan yang diperiksa: daftar kontras rendah inspector kosong di ketiga viewport; palet teks tetap mengikuti DESIGN.md.
- R-26 PASS: tiga radio merespons klik/tombol panah, contoh serta URL berubah, link membawa pilihan ke aplikasi.
- R-27 PASS dalam lingkup ini: contoh lokal selalu tersedia dari tiga pilihan tetap; halaman transisi aplikasi menampilkan Membuka Nudge. Penanganan error rute yang sudah ada tidak diubah.
- R-28 PASS: tidak menambah FAQ template.
- R-32 PASS pada kontrol yang berubah: radio native dapat dipilih dengan panah dan fokus terlihat pada screenshot; source mempertahankan link native dan aturan focus-visible.
- R-33 PASS: perubahan source memakai patch; tidak ada script eksternal yang menyisipkan fitur.
- R-34 PASS: tema terang tetap sesuai MVP; tidak ada toggle tema.
- R-35 PASS untuk preview polesan: build Webpack berhasil, aplikasi dijalankan, seluruh link dan pilihan landing diperiksa. Build Turbopack gagal dan dicatat terpisah, bukan diklaim lulus.
- R-36 PASS: tidak menambah klaim keamanan, kesehatan, atau performa.
- R-37 PASS: arah, dials, palet dan motif berasal dari DESIGN.md serta keputusan implementasi.
- R-38 PASS: contoh kegiatan yang sama tetap diberi label contoh; tidak ada bukti sosial atau produk fiktif.

### Purpose Gate

- R-01 PASS: tidak ada gradient atau glow pada perubahan ini.
- R-04 PASS: centang menandai pilihan aktif; panah Phosphor menandai perpindahan ke aplikasi.
- R-06 PASS: Nunito Variable tetap dimuat; pilihan font membulat mendukung karakter Nudge.
- R-07 PASS: tidak ada pola latar dekoratif.
- R-08 PASS: panah demo mengganti karakter panah yang sudah ada, untuk tujuan perpindahan yang sama.
- R-09 PASS: tidak menambah badge atau label pemasaran.
- R-10 PASS: tidak menambah glassmorphism.
- R-12 PASS: dasar 3/1 px terbatas pada tombol utama landing dan mengikuti efek tekan DESIGN.md; bukan bayangan besar pada semua elemen.
- R-13 PASS: tidak ada glow.
- R-14 PASS: tiga simbol kategori mengikuti kedudukan tujuan yang setara; kategori tetap berupa daftar pada bidang sand.
- R-19 PASS: feedback durasi dan tekan sesuai MOTION 1, tanpa animasi scroll baru.
- R-22 PASS dalam tahap ini: ilustrasi final masih ditunda; tidak mengambil ilustrasi generik sebagai pengganti.

### Liveliness

- Dials PASS: ENERGY 2 / RHYTHM 3 / MOTION 1, dipertahankan sepanjang landing.
- Kesesuaian dials PASS: bidang warna cukup ekspresif, komposisi beragam, perubahan gerak hanya feedback kontrol.
- Fokus PASS dalam tinjauan visual: judul dan demo menjadi pusat hero; bagian berikutnya dipimpin judul, daftar kategori, atau tindakan utama.
- Whitespace PASS: pengurangan padding menyeimbangkan hero; jarak antarbagian tetap lebih besar daripada jarak isi terkait.
- Aksen PASS: action sage menandai tindakan dan kata utama, biru mewadahi pilihan waktu, sand membedakan tujuan.
- Motif PASS untuk tahap ini: kurva tempurung dan simbol kura-kura menghubungkan header, hero, dan bagian kendali; kualitas aset final belum dinilai.
- Design Read PASS: lingkup landing, karakter playful membulat dan dials sudah ditetapkan sebelum patch, lalu dicatat pada implementation-decisions.md.

### Craftsmanship dan konsistensi

- C-1 PASS: setiap perubahan memiliki alasan satu baris dalam implementation-decisions.md.
- C-2 PASS: semua link dan radio landing memiliki aksi yang diamati melalui browser.
- C-3 PASS: tidak menambah bagian; demo, cara pakai, tujuan, kendali, dan penutup tetap mendukung alur produk.
- C-4 PASS pada kondisi yang diperiksa: tiga viewport dan radio keyboard tidak menunjukkan clipping atau kerusakan. Zoom browser/pembaca layar nyata belum diperiksa ulang.
- C-5 PASS: tidak ada bukti pengguna, hasil riset, atau klaim manfaat yang dibuat.
- R-05 PASS: split hero, urutan teks, daftar pada bidang sand, dan bar penutup tetap memiliki fungsi isi berbeda.
- R-11 PASS: kontrol 16 px dan wadah besar tempurung tetap memiliki hierarki radius yang berbeda.
- R-15 PASS: CTA tetap menyebut kegiatan dan tindakan masuk.
- R-16 PASS: tidak menambah jargon pemasaran.
- R-20 PASS untuk refinemen identitas sementara: demo 2/5/10, bentuk tempurung dan pendamping kura-kura dipertahankan; identitas final menunggu aset.
- R-21 PASS: tema terang mengikuti keputusan produk.
- R-29 PASS: sage, biru dan sand memakai token yang sudah disepakati.
- R-30 PASS: tidak mengadopsi aset, struktur, atau karakter Duolingo.
- R-31 PASS: alasan spacing, ikon, tombol, kategori dan footer ditulis di catatan keputusan.

Gate ini terbatas pada polesan landing. Lima jenis FAIL Taste Skill dan 25 advisory Impeccable tetap dicatat sebagai hasil alat, dengan pengecualian panduan dan batas aset. Gate ini bukan pernyataan seluruh pemeriksaan alat lulus atau aplikasi siap rilis.
