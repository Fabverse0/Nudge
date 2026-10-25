# Aplikasi Nudge lebih ekspresif

Tanggal: 25 Oktober 2026. Lingkup: `/app`. Arah dan implementasi disetujui pengguna melalui rencana polesan aplikasi.

## Arah

Reading this as: aplikasi pemilihan aktivitas untuk pengguna yang ingin beralih dari scrolling, dengan C1, Nunito, dan bidang sage/biru/sand; ENERGY 2 / RHYTHM 2 / MOTION 2. Timer tetap ENERGY 1 / MOTION 1.

Taste dibaca untuk prinsip komposisi dan identitas; alur khusus landing, pemilihan arah acak, dan aturan halaman pemasaran tidak dipaksakan pada aplikasi. Impeccable mode Operate memandu kontrol dan hierarki. Anti Slop memakai pilihan sesi During. Lingkup landing dalam PRODUCT.md adalah catatan pekerjaan terdahulu, bukan batas izin permintaan aplikasi yang baru.

## Keputusan dan alasan

| Bagian       | Keputusan                                                                          | Alasan                                                                              |
| ------------ | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Pembuka      | Bidang sand dan C1 menyapa 144 px, diperkecil pada ponsel.                         | Membawa karakter Nudge ke titik mulai tanpa adegan panjang.                         |
| Navigasi     | Tiga menu dalam satu bidang, menu aktif sage gelap.                                | Membedakan navigasi dari kelompok radio di bawahnya.                                |
| Kolom tugas  | Lebar maksimum 720 px.                                                             | Memberi ruang untuk ilustrasi dan label sambil mempertahankan satu kolom keputusan. |
| Progres      | Nomor bulat, label, serta centang langkah yang dilewati.                           | Menjelaskan urutan dan posisi tanpa bergantung pada warna.                          |
| Mood         | Empat ikon wajah Phosphor duotone dengan ukuran dan warna setara.                  | Membantu mengenali konteks tanpa memberi peringkat mood.                            |
| Tujuan       | Ilustrasi C1 berbeda untuk produktivitas, gerak, dan refleksi.                     | Menghubungkan label dengan aktivitas yang dapat dibayangkan.                        |
| Durasi       | Ikon jam, angka besar, label menit, centang terpilih, dan respons gerak satu kali. | Menjadikan batas waktu mudah dipindai; pilihan terasa hidup tanpa animasi berulang. |
| Saran        | Ilustrasi 128 px, kategori, judul, dan instruksi bernomor.                         | Memberi karakter pada saran sekaligus memperjelas pelaksanaannya.                   |
| Timer        | Permukaan putih, angka sage gelap, pendamping statis.                              | Mengurangi distraksi setelah kegiatan dimulai.                                      |
| Penyelesaian | Bidang sage lembut di belakang C1 dan ekspresi mood yang konsisten.                | Menandai akhir kegiatan dengan ramah tanpa tekanan.                                 |
| Favorit      | Ikon kategori tetap hadir pada ponsel, baris dan judul jelas.                      | Memudahkan pemindaian daftar nyata yang disimpan pengguna.                          |
| Pengingat    | Header sage lembut, formulir putih, status tersimpan terpisah.                     | Membedakan jadwal tersimpan dari draft yang belum disimpan.                         |
| Gerak        | Pilihan mood merespons satu kali selama 220 ms; transisi warna 160 ms.             | Mengakui tindakan tanpa loop atau menahan kontrol.                                  |

Tidak ada aset baru, instalasi, API, perubahan katalog/algoritma, perubahan format penyimpanan, atau perubahan perhitungan timer. Seluruh aset C1 tetap utuh. Tiga langkah, mood opsional, penyelesaian manual, favorit lokal, serta izin pengingat setelah tindakan pengguna dipertahankan.

## Aset dan variasi sistem

Ilustrasi menggunakan `public/brand/mascot/`, `public/brand/illustrations/`, dan `public/brand/small-steps/` yang sudah tersedia. Ikon dari paket Phosphor yang sudah terpasang. Tidak ada font, gambar, atau library eksternal tambahan.

Detector Impeccable dijalankan sekali pada empat berkas UI. Hasilnya sepuluh advisory skala radius/ukuran font, tanpa temuan blocking. Ukuran 28 px sudah tercakup pada judul aplikasi di DESIGN.md; 18 px untuk kategori dan judul favorit mendukung hierarki ringkas. Radius 20 px pada wadah navigasi, 14 px pada kontrol/baris lama, 12 px pada feedback, dan 10 px pada nomor instruksi merupakan variasi terbatas sesuai peran; tidak mengubah radius token bersama. Bentuk organik penyelesaian mengikuti karakter tempurung C1.

## Pemeriksaan

Build final `npm run build -- --webpack` berhasil pada 26 Oktober 2026 setelah satu percobaan prerender gagal membuat direktori `.next` dengan `EPERM`. Percobaan ulang selesai kompilasi, TypeScript, lima halaman statis, dan build trace. Server produksi memberi HTTP 200 pada `/app`.

Regresi Playwright produksi 78/78 sebelumnya lulus pada desktop dan emulasi mobile untuk alur aktivitas, polesan, pengingat, lebar 320 sampai 1440 px, teks 200%, dan Axe. Setelah itu nomor instruksi dekoratif diubah agar tersembunyi dari pohon aksesibilitas. Pada build final, 10/10 pemeriksaan fokus `app-expressive.spec.ts` kembali lulus pada desktop dan mobile, mencakup keempat lebar, alur UI penuh, gambar, overflow, Axe, keyboard, serta reduced motion. Hasil 78 dan 10 berasal dari dua pemanggilan yang tumpang tindih, bukan 88 skenario unik.

Vitest lulus 25/25 pada delapan berkas. ESLint target lulus. Pemeriksaan Prettier pada sumber UI dan tes lulus; pemeriksaan dokumentasi lama `app-polish.md` dan `verification.md` melaporkan format tidak sesuai, sehingga file lama tersebut tidak diformat ulang massal. `git diff --check` lulus.

Screenshot regresi tersimpan dalam `.impeccable/review/app-expressive-{mood,goal,time,suggestion,favorites,timer,completion,reminders}-{320,390,768,1440}-{desktop,mobile}.png`. Screenshot mood, saran, timer, penyelesaian, pengingat, favorit, dan tujuan ditinjau; capture yang digunakan untuk dokumentasi berasal dari regresi terbaru. Pengecekan pohon aksesibilitas manual sebelumnya mendeteksi nomor ganda pada instruksi, lalu markup diperbaiki dengan label nomor dekoratif yang tersembunyi. Pemeriksaan 10 tes sesudah perubahan mengonfirmasi ulang state aksesibilitas otomatis.

Gerbang akhir: scope tetap terbatas pada empat berkas Activity UI, tanpa menyentuh landing, domain, storage, timer, paket, atau aset; standar aplikasi dipertahankan; bukti build, lint, unit, regresi UI, reflow, dan Axe tersedia; artefak sebelum/sesudah diberi label sesuai sumber; keterbatasan perangkat nyata dinyatakan di bawah. Pengujian awal development yang terputus oleh Turbopack dan percobaan fokus yang dijalankan sebelum akses localhost benar tidak dihitung sebagai lulus.

Pemeriksaan Android fisik dengan Chrome, pembaca layar nyata, dan observasi pengguna belum dilakukan. Emulasi mobile adalah pemeriksaan viewport/browser automation, bukan ponsel fisik. Tidak ada klaim bahwa audit otomatis membuktikan seluruh aksesibilitas atau kegunaan.

Penyempurnaan lanjutan 26 Oktober: kartu durasi masuk berurutan dalam 260 ms dengan jeda maksimum 70 ms. Memilih durasi memberi gerak kecil pada ikon jam dan angka untuk menegaskan state. Efek hanya berjalan ketika langkah Waktu tampil, di dalam preferensi gerak bawaan, tanpa loop. Reduced motion mempertahankan warna/centang tetapi menghilangkan pergeseran. Build produksi berhasil; 10/10 regresi fokus lulus (desktop dan emulasi mobile, empat lebar). Pemeriksaan Chrome mengonfirmasi urutan `duration-choice-arrive`, respons `duration-clock-tick` dan `duration-value-confirm`, serta nol animasi ketika reduced motion aktif. Tidak ada perubahan area layar lain.

Referensi visual sebelum polesan tersedia pada capture historis `.impeccable/review/polish-app-*`, `goal-icons.png`, serta `timer-production-*`. Capture tersebut berasal dari pemeriksaan sebelumnya, bukan rekonstruksi sebelum/sesudah yang dibuat dengan memodifikasi DOM.
