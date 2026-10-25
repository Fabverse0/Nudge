# Aplikasi Nudge lebih ekspresif

Tanggal: 25 Oktober 2026. Lingkup: `/app`. Arah dan implementasi disetujui pengguna melalui rencana polesan aplikasi.

## Arah

Reading this as: aplikasi pemilihan aktivitas untuk pengguna yang ingin beralih dari scrolling, dengan C1, Nunito, dan bidang sage/biru/sand; ENERGY 2 / RHYTHM 2 / MOTION 2. Timer tetap ENERGY 1 / MOTION 1.

Taste dibaca untuk prinsip komposisi dan identitas; alur khusus landing, pemilihan arah acak, dan aturan halaman pemasaran tidak dipaksakan pada aplikasi. Impeccable mode Operate memandu kontrol dan hierarki. Anti Slop memakai pilihan sesi During. Lingkup landing dalam PRODUCT.md adalah catatan pekerjaan terdahulu, bukan batas izin permintaan aplikasi yang baru.

## Keputusan dan alasan

| Bagian | Keputusan | Alasan |
| --- | --- | --- |
| Pembuka | Bidang sand dan C1 menyapa 144 px, diperkecil pada ponsel. | Membawa karakter Nudge ke titik mulai tanpa adegan panjang. |
| Navigasi | Tiga menu dalam satu bidang, menu aktif sage gelap. | Membedakan navigasi dari kelompok radio di bawahnya. |
| Kolom tugas | Lebar maksimum 720 px. | Memberi ruang untuk ilustrasi dan label sambil mempertahankan satu kolom keputusan. |
| Progres | Nomor bulat, label, serta centang langkah yang dilewati. | Menjelaskan urutan dan posisi tanpa bergantung pada warna. |
| Mood | Empat ikon wajah Phosphor duotone dengan ukuran dan warna setara. | Membantu mengenali konteks tanpa memberi peringkat mood. |
| Tujuan | Ilustrasi C1 berbeda untuk produktivitas, gerak, dan refleksi. | Menghubungkan label dengan aktivitas yang dapat dibayangkan. |
| Durasi | Ikon jam, angka besar, label menit, dan centang terpilih. | Menjadikan batas waktu mudah dipindai. |
| Saran | Ilustrasi 128 px, kategori, judul, dan instruksi bernomor. | Memberi karakter pada saran sekaligus memperjelas pelaksanaannya. |
| Timer | Permukaan putih, angka sage gelap, pendamping statis. | Mengurangi distraksi setelah kegiatan dimulai. |
| Penyelesaian | Bidang sage lembut di belakang C1 dan ekspresi mood yang konsisten. | Menandai akhir kegiatan dengan ramah tanpa tekanan. |
| Favorit | Ikon kategori tetap hadir pada ponsel, baris dan judul jelas. | Memudahkan pemindaian daftar nyata yang disimpan pengguna. |
| Pengingat | Header sage lembut, formulir putih, status tersimpan terpisah. | Membedakan jadwal tersimpan dari draft yang belum disimpan. |
| Gerak | Pilihan mood merespons satu kali selama 220 ms; transisi warna 160 ms. | Mengakui tindakan tanpa loop atau menahan kontrol. |

Tidak ada aset baru, instalasi, API, perubahan katalog/algoritma, perubahan format penyimpanan, atau perubahan perhitungan timer. Seluruh aset C1 tetap utuh. Tiga langkah, mood opsional, penyelesaian manual, favorit lokal, serta izin pengingat setelah tindakan pengguna dipertahankan.

## Aset dan variasi sistem

Ilustrasi menggunakan `public/brand/mascot/`, `public/brand/illustrations/`, dan `public/brand/small-steps/` yang sudah tersedia. Ikon dari paket Phosphor yang sudah terpasang. Tidak ada font, gambar, atau library eksternal tambahan.

Detector Impeccable dijalankan sekali pada empat berkas UI. Hasilnya sepuluh advisory skala radius/ukuran font, tanpa temuan blocking. Ukuran 28 px sudah tercakup pada judul aplikasi di DESIGN.md; 18 px untuk kategori dan judul favorit mendukung hierarki ringkas. Radius 20 px pada wadah navigasi, 14 px pada kontrol/baris lama, 12 px pada feedback, dan 10 px pada nomor instruksi merupakan variasi terbatas sesuai peran; tidak mengubah radius token bersama. Bentuk organik penyelesaian mengikuti karakter tempurung C1.

## Pemeriksaan

Bukti akhir pengujian, screenshot, dan batas lingkungan ditambahkan setelah pemeriksaan produksi selesai. Pengujian development awal terputus oleh kompilasi Turbopack berulang dan navigasi yang menghancurkan konteks tes, sehingga tidak dihitung sebagai lulus. Validasi dialihkan ke build produksi webpack.

Referensi visual sebelum polesan tersedia pada capture historis `.impeccable/review/polish-app-*`, `goal-icons.png`, serta `timer-production-*`. Capture tersebut berasal dari pemeriksaan sebelumnya, bukan rekonstruksi sebelum/sesudah yang dibuat dengan memodifikasi DOM.
