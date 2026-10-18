# Pemeriksaan manual Nudge

Status: belum dijalankan pada perangkat fisik. Dokumen ini berisi tugas dan hasil yang diharapkan, bukan bukti kelulusan. Gunakan build produksi, bukan development server, untuk pemeriksaan PWA dan notifikasi.

Target utama yang dipilih pengguna: **Android dengan Chrome**. Model perangkat, versi Android dan versi Chrome belum dicatat.

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
5. Catat nama, ikon sementara, tampilan standalone, serta perbedaan browser yang diamati.

Status pemasangan: **belum diperiksa**. Ikon final ditunda pengguna; ikon `n.` saat ini adalah aset pengembangan.

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

Minta pengguna menjalankan tugas tanpa penjelasan langkah demi langkah: memahami manfaat, memilih/melewati mood, meminta saran, memulai, mengganti, menyelesaikan, dan memulai lagi. Catat kebingungan, kebutuhan bantuan, serta alasan kegiatan tidak cocok. Tidak perlu memasang analitik atau menyimpan isi jurnal/mood pribadi dalam laporan.

Jumlah peserta dan ambang kuantitatif belum ditetapkan. Jangan mengisi hasil atau kesimpulan sebelum observasi benar-benar dilakukan.
