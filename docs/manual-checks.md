# Pemeriksaan manual Nudge

Status: pemeriksaan Android Chrome pada perangkat fisik belum dijalankan. Pengguna telah melaporkan percobaan desktop berjalan lancar; rincian tugas dan lingkungan percobaan itu belum tersedia. Tabel berikut tetap berisi tugas dan hasil yang diharapkan, bukan bukti kelulusan. Gunakan build produksi, bukan development server, untuk pemeriksaan PWA dan notifikasi.

Target utama yang dipilih pengguna: **Android dengan Chrome**. Model perangkat, versi Android dan versi Chrome belum dicatat.

## Kandidat yang siap diperiksa

Kandidat kode dan aset C1: commit `5e4355b`, 22 Oktober 2026. Inventaris berada di [keluarga C1](./assets/turtle-c1/README.md), sedangkan hasil otomatis terbaru berada di [verification.md](./verification.md). Pembaruan dokumen setelah commit ini tidak otomatis menjadi hasil pengujian perangkat.

Untuk menjalankan build produksi lokal di komputer, gunakan `npm start -- --hostname 127.0.0.1 --port 3100` setelah build berhasil. Landing ada di `http://127.0.0.1:3100/` dan aplikasi di `/app`. Alamat ini belum menjadi alamat pemeriksaan Android. Pilih preview HTTPS yang dapat dibuka ponsel sebelum memeriksa pemasangan dan izin OS.

Urutan pemeriksaan: jalankan alur desktop, periksa zoom browser dan pembaca layar nyata, lalu lakukan pemasangan serta pengingat pada Android Chrome. Isi hasil nyata pada tabel setelah tugas dilakukan. Jika suatu langkah gagal, catat langkah, hasil yang terlihat, dan apakah pengguna memerlukan bantuan; biarkan item yang belum dicoba tetap kosong.

## Lingkungan pemeriksaan

Isi dari perangkat yang benar-benar digunakan:

| Informasi | Catatan |
| --- | --- |
| Perangkat dan OS | |
| Browser dan versi | |
| URL build dan commit | |
| Tanggal | |
| Mode browser atau PWA terpasang | |
| Izin notifikasi browser/OS | |

Untuk seluler, URL localhost komputer tidak menunjuk komputer tersebut dari ponsel. Gunakan preview HTTPS yang memang dapat diakses perangkat setelah hosting disepakati. Jangan menganggap emulasi viewport sebagai perangkat fisik.

## Alur dan aksesibilitas

| Tugas | Hasil yang diharapkan | Hasil nyata/catatan |
| --- | --- | --- |
| Buka landing lalu masuk aplikasi | Membuka `/app`, belum ada timer aktif | |
| Lewati mood, pilih tujuan dan waktu | Satu saran muncul; tidak ada penilaian kesehatan | |
| Pilih Kurang cocok beberapa kali | Berganti saran, menjelaskan kondisi alternatif, lalu menjelaskan bila pilihan habis | |
| Mulai, jeda, lanjut, berhenti | Jeda mempertahankan sisa waktu; berhenti tidak mencatat selesai | |
| Biarkan timer habis | Tetap berada pada aktivitas sampai Selesai ditekan | |
| Selesaikan lalu lewati pembaruan mood | Kembali ke pemilihan; mood lama atau kondisi tanpa mood dipertahankan | |
| Buka journaling | Prompt dan timer tersedia, tulisan dibuat di luar aplikasi | |
| Simpan favorit lalu reload | Favorit tetap ada pada browser/perangkat yang sama | |
| Gunakan keyboard dan pembaca layar | Label, fokus, status dan tindakan dapat dipahami; timer tidak diumumkan setiap detik | |
| Perbesar teks dan periksa orientasi layar | Kontrol tetap terbaca, tidak tertutup, dan dapat dijangkau | |

## Pemasangan dan peluncuran PWA

1. Buka URL build produksi pada browser sasaran.
2. Pada Chrome Android, buka menu browser lalu pilih pemasangan aplikasi atau Tambahkan ke layar utama bila tersedia. Catat pilihan yang benar-benar ditawarkan browser dan selesaikan dialog pemasangan.
3. Tutup tampilan aplikasi lalu buka dari ikon yang baru dipasang.
4. Pastikan layar awal adalah pemilihan `/app`, bukan landing, dan timer belum dimulai.
5. Catat nama, ikon kura-kura C1, tampilan standalone, serta perbedaan browser yang diamati. Periksa wajah dan tempurung pada ikon launcher, termasuk bila sistem memotong ikon menjadi lingkaran atau bentuk lain.

Status pemasangan: **belum diperiksa pada Android fisik**. Kandidat sudah memakai ikon C1 dengan varian maskable. Pemeriksaan PNG, area aman, dan metadata otomatis telah lulus; penerimaan launcher tetap memerlukan perangkat nyata.

### Pembaruan service worker

Pemeriksaan ini menunggu dua build pada alamat yang sama, dengan perubahan nyata pada berkas worker dan versi cache. Catat commit build lama dan baru.

1. Buka build lama, mulai kegiatan, lalu sediakan build baru pada alamat yang sama.
2. Periksa bahwa kegiatan yang sedang berlangsung tidak dimuat ulang atau dianggap selesai secara paksa.
3. Setelah kegiatan selesai, tutup semua tab dan jendela PWA Nudge, lalu buka kembali dengan koneksi tersedia.
4. Catat versi worker yang aktif dan pastikan jalur `/app`, ikon, serta navigasi masih bekerja. Jika worker baru belum aktif, catat keadaan sebenarnya dan langkah untuk mereproduksinya.

Status pembaruan: **belum diperiksa**. Langkah ini merupakan rencana pemeriksaan, bukan hasil pengujian.

## Pengingat dan waktu perangkat

| Tugas | Hasil yang diharapkan | Hasil nyata/catatan |
| --- | --- | --- |
| Kunjungi aplikasi pertama kali | Tidak ada permintaan izin notifikasi otomatis | |
| Aktifkan dan simpan hari/waktu | Izin diminta setelah tindakan opt-in; status izin ditampilkan | |
| Biarkan dialog izin terbuka sampai jadwal tiba, lalu izinkan pada menit jadwal yang sama | Pengingat masih dapat dikirim setelah keputusan izin, sesuai batas browser | |
| Izinkan setelah menit jadwal sudah berakhir | Jadwal yang sudah lewat tidak dikirim susulan | |
| Atur pengingat beberapa menit mendatang dan biarkan aplikasi berjalan | Pengiriman mengikuti batas browser, tidak dianggap alarm presisi | |
| Ubah waktu atau matikan sebelum jadwal lama | Jadwal lama tidak mengirim | |
| Kosongkan waktu lalu matikan pengingat | Pembatalan tetap tersimpan; waktu valid terakhir dipertahankan | |
| Muat ulang pada menit pengingat yang sama | Tidak mengirim kejadian yang sama lagi bila penyimpanan tersedia | |
| Tolak izin notifikasi | Pemilihan dan timer manual tetap dapat digunakan | |
| Tidurkan perangkat ketika timer berjalan, lalu kembali | Sisa waktu mengikuti deadline; habis tidak dianggap selesai | |
| Lewati jadwal dengan aplikasi tidak berjalan | Tidak ada janji pengiriman saat tertutup atau kiriman susulan | |

Menguji izin pada browser/OS sungguhan memerlukan tindakan pemilik perangkat. Jangan melaporkan mock Notification atau showNotification sebagai keberhasilan pengiriman OS.

## Observasi penggunaan

### Tinjauan desktop oleh agen, 22 Oktober 2026

Preview produksi lokal pada `http://127.0.0.1:3100`, melalui browser dalam aplikasi Codex. Area halaman yang diukur saat pemilihan kegiatan adalah 583 x 524 CSS px; ini panel desktop sempit, bukan perangkat Android atau bukti zoom browser.

- Mengirim pilihan kosong menampilkan arahan untuk memilih tujuan dan waktu.
- Mood dilewati, tujuan refleksi dan waktu dua menit menghasilkan saran beserta instruksi kegiatan di luar Nudge.
- Memulai kegiatan membuka timer. Tab lalu Enter mengaktifkan jeda; status berubah menjadi sedang dijeda.
- Menekan Selesai menampilkan pertanyaan perubahan mood. Lewati mengembalikan pemilihan dengan tujuan dan waktu sebelumnya tetap dipilih.
- Favorit kosong menjelaskan cara menyimpan dan batas penyimpanan lokal. Penambahan serta persistensi favorit tidak diulang dalam tinjauan ini.
- Pengingat ditampilkan nonaktif, dengan penjelasan batas aplikasi terbuka. Izin notifikasi dan jadwal tersimpan tidak diubah.
- Tombol panah pada pilihan durasi landing mengubah lima menjadi sepuluh menit. Tautan pilihan membuka `/app?minutes=10`, dengan sepuluh menit terpilih dan tanpa timer aktif.
- Pada halaman pemilihan yang diukur, tidak ada overflow horizontal atau gambar gagal dimuat. Screenshot landing: `.impeccable/review/desktop-review-2026-10-22.png`.

Tidak ditemukan masalah baru pada langkah tersebut. Ini peninjauan agen, bukan observasi peserta. Zoom browser nyata, pembaca layar, pengiriman notifikasi OS, dan Android tetap belum diperiksa. Pengguna memilih menunda Android dan meninjau desktop terlebih dahulu.

Minta pengguna menjalankan tugas tanpa penjelasan langkah demi langkah: memahami manfaat, memilih/melewati mood, meminta saran, memulai, mengganti, menyelesaikan, dan memulai lagi. Catat kebingungan, kebutuhan bantuan, serta alasan kegiatan tidak cocok. Tidak perlu memasang analitik atau menyimpan isi jurnal/mood pribadi dalam laporan.

Jumlah peserta dan ambang kuantitatif belum ditetapkan. Jangan mengisi hasil atau kesimpulan sebelum observasi benar-benar dilakukan.
