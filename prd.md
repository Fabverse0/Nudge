# Product Requirements Document: Nudge

Status: draf v1 untuk ditinjau sebelum implementasi  
Tanggal: 18 Oktober 2026  
Bahasa produk: Bahasa Indonesia  
Platform: web responsif dan PWA seluler dalam satu codebase

## 1. Ringkasan produk

Nudge membantu pengguna yang sedang gabut atau merasa terlalu lama doomscrolling untuk memilih dan memulai satu aktivitas kecil. Pengguna menentukan tujuan dan waktu tersedia, dapat menyertakan mood serta kondisi tempat atau alat, lalu menerima satu saran dengan instruksi singkat dan timer.

Tujuan MVP adalah mempermudah perpindahan dari memilih ke melakukan aktivitas. Dampak terhadap kebiasaan doomscrolling merupakan hipotesis produk yang perlu dievaluasi; MVP belum mengukur atau membuktikan penurunan screen time.

Dokumen ini menjadi acuan kebutuhan MVP. [CONCEPT.md](./CONCEPT.md) menjelaskan visi dan latar riset, sedangkan [GLOSSARY.md](./GLOSSARY.md) menetapkan istilah produk. Bila rincian konsep lama berbeda dengan keputusan di sini, gunakan PRD ini untuk implementasi MVP.

## 2. Masalah, pengguna, dan asumsi

### Masalah yang dituju

- Pengguna ingin melakukan sesuatu tetapi kesulitan menentukan langkah kecil yang bisa segera dimulai.
- Pilihan aktivitas dapat terasa terlalu banyak, membutuhkan waktu panjang, atau memerlukan persiapan.
- Pengguna yang ingin berhenti scrolling memerlukan tindakan dengan awal dan akhir yang jelas.

### Target pengguna

Pengguna umum yang memiliki waktu singkat dan ingin melakukan kegiatan ringan. Mahasiswa dan pekerja merupakan contoh pengguna, bukan batas segmen. Penggunaan tidak memerlukan akun atau pengalaman dengan aplikasi produktivitas.

### Asumsi yang perlu diuji

- Satu saran pada satu waktu membantu pengguna mengambil keputusan.
- Pilihan 2, 5, dan 10 menit terasa cukup mudah untuk dimulai.
- Mood opsional membantu relevansi tanpa menghambat masuk ke aktivitas.
- Timer mendukung pelaksanaan kegiatan; pengguna tetap menentukan kapan kegiatan dinyatakan selesai.

## 3. Tujuan dan batas MVP

### Tujuan

1. Pengguna dapat memilih dan memulai aktivitas melalui alur singkat.
2. Pengguna dapat menemukan alternatif ketika saran tidak cocok.
3. Pengguna dapat menjalankan timer, menyelesaikan aktivitas secara sadar, dan memulai aktivitas lain.
4. Pengguna memiliki kendali atas mood, favorit, dan pengingat.

### Di luar MVP

- Akun, sinkronisasi cloud, dan favorit lintas perangkat.
- Pemantauan aplikasi lain, pemblokiran media sosial, atau pengukuran screen time otomatis.
- Diagnosis, terapi, atau penilaian kesehatan berdasarkan mood.
- Penyimpanan isi journaling dan analitik penggunaan pribadi.
- Profil rekomendasi lintas sesi, rekomendasi AI generatif, dan feed tanpa akhir.
- Notifikasi ketika aplikasi tertutup, streak harian, dan dukungan multibahasa.
- Jaminan penggunaan offline penuh atau pemulihan sesi aktif setelah browser ditutup.

## 4. Prinsip pengalaman

- Gunakan Bahasa Indonesia yang ringan, jelas, dan tidak menghakimi.
- Tawarkan satu aktivitas dengan tindakan awal yang konkret.
- Sediakan kontrol untuk melewati mood, mengganti saran, menjeda, dan berhenti.
- Utamakan kegiatan ringan, pilihan dalam ruangan, dan alternatif tanpa alat.
- Hindari tekanan untuk terus memakai aplikasi atau mempertahankan pencapaian.
- Jelaskan batas pengingat dan penyimpanan lokal dengan bahasa yang mudah dipahami.

## 5. Jalur masuk dan alur utama

### Web dan PWA

| Jalur | Perilaku yang dibutuhkan |
| --- | --- |
| Web `/` | Menampilkan landing page berisi manfaat Nudge, gambaran cara pakai, dan CTA **Mulai** menuju `/app`. Berlaku juga pada kunjungan browser seluler. |
| Aplikasi `/app` | Menampilkan awal alur memilih aktivitas, dengan akses favorit dan pengaturan pengingat. Dapat dibuka langsung. |
| PWA terpasang | Menggunakan `/app` sebagai `start_url` agar peluncuran menuju aplikasi. Aktivitas dan timer tetap menunggu tindakan pengguna. |

Landing page tidak menambahkan kewajiban mendaftar. Kemampuan pemasangan PWA mengikuti browser dan perangkat; tampilan ajakan memasang harus menyesuaikan dukungan yang tersedia.

### Alur pengguna

1. Masuk melalui CTA landing page, URL aplikasi, atau ikon PWA.
2. Pilih mood atau **Lewati**, lalu pilih tujuan dan waktu tersedia.
3. Sesuaikan tempat atau alat bila relevan.
4. Lihat satu saran, durasi, instruksi, dan alasan kecocokannya.
5. Pilih **Mulai**, **Kurang cocok**, atau simpan ke favorit.
6. Setelah mulai, gunakan timer dengan kontrol jeda, lanjut, dan akhiri lebih awal.
7. Saat waktu habis, aplikasi menunggu pengguna menekan **Selesai**.
8. Setelah selesai, tampilkan **“Mood kamu berubah?”** dengan pilihan mood dan **Lewati**.
9. Kembali ke awal alur aplikasi untuk memilih aktivitas berikutnya.

## 6. Kebutuhan fungsional dan kriteria penerimaan

### FR-01: Memilih konteks

- Mood awal: **Lelah**, **Bosan**, **Gelisah**, dan **Siap bergerak**, disertai **Lewati**. Kata-kata dapat diperbaiki melalui uji alur tanpa mengubah sifatnya yang opsional.
- Tujuan: **Produktif ringan**, **Bergerak**, dan **Refleksi/jeda layar**.
- Waktu tersedia: **2**, **5**, atau **10 menit**.
- Tempat dan alat menjadi filter tambahan yang ditampilkan saat relevan dengan pilihan aktivitas.

**Kriteria penerimaan:** pengguna yang melewati mood tetap dapat menerima saran setelah memilih tujuan dan waktu. Mood tidak menghasilkan skor kesehatan. Filter yang aktif terlihat dan dapat diubah pengguna.

### FR-02: Menampilkan dan mengganti saran

Tampilkan nama aktivitas, durasi, instruksi singkat, kebutuhan tempat atau alat, serta alasan sederhana yang sesuai dengan input. Penjelasan tidak boleh mengaku menggunakan mood ketika pengguna melewatinya.

**Kriteria penerimaan:** hanya satu saran utama ditampilkan. **Kurang cocok** meminta alternatif tanpa memaksa pengguna mengisi ulang konteks. Aktivitas yang baru ditolak tidak langsung diberikan kembali selama alternatif yang memenuhi syarat masih tersedia. Bila pilihan habis, jelaskan keadaan tersebut dan tawarkan perubahan filter.

### FR-03: Memberi umpan balik

Sediakan **Cocok** dan **Kurang cocok** sebagai penilaian saran. Umpan balik membantu urutan rekomendasi selama sesi berjalan; pilihan **Cocok** tidak menjalankan timer secara otomatis.

**Kriteria penerimaan:** **Kurang cocok** memunculkan alternatif. Umpan balik tidak membentuk preferensi permanen atau dikirim sebagai analitik pribadi. Sesi penggunaan baru tidak mewarisi profil rekomendasi dari sesi sebelumnya.

### FR-04: Menjalankan timer

Timer dimulai hanya setelah **Mulai** ditekan. Pengguna dapat menjeda, melanjutkan, mengakhiri lebih awal, atau mengganti aktivitas. Pergantian aktivitas menghentikan timer sebelumnya dan kembali ke pemilihan saran.

**Kriteria penerimaan:** jeda mempertahankan sisa waktu; lanjut meneruskan dari sisa tersebut. Waktu habis menampilkan status yang jelas dan tombol **Selesai**, tanpa otomatis mencatat penyelesaian atau berpindah halaman. Mengakhiri lebih awal tidak langsung dianggap selesai; pengguna menentukan penyelesaian melalui **Selesai**. Perubahan tampilan timer setelah tab kembali aktif mengikuti waktu yang benar, bukan jumlah render layar.

### FR-05: Menyelesaikan dan memulai lagi

**Selesai** menutup aktivitas yang sedang dijalankan. Pertanyaan **“Mood kamu berubah?”** menyediakan pilihan mood dan **Lewati**, lalu mengembalikan pengguna ke awal alur aplikasi, bukan landing page.

**Kriteria penerimaan:** memilih mood memperbarui konteks mood untuk saran berikutnya. **Lewati** melewati pembaruan dan mempertahankan mood sebelumnya; bila sebelumnya tidak ada mood, kondisi itu tetap berlaku. Aplikasi tidak otomatis mengubah mood menjadi “Lewati”. Pengguna dapat menyesuaikan kembali konteks sebelum memulai aktivitas lain.

### FR-06: Favorit lokal

Pengguna dapat menambah dan menghapus favorit dari saran serta membukanya dari awal aplikasi. Memilih favorit membuka detail aktivitas dan tombol **Mulai** melalui alur timer yang sama.

**Kriteria penerimaan:** favorit bertahan setelah halaman dimuat ulang pada browser dan perangkat yang sama bila penyimpanan tersedia. Tidak ada duplikasi favorit untuk aktivitas yang sama. Kegagalan penyimpanan dijelaskan tanpa menghalangi alur utama. Favorit tidak diperlakukan sebagai saran yang otomatis memenuhi filter saat ini; informasi aktivitas tetap terlihat sebelum mulai.

### FR-07: Journaling

Journaling termasuk aktivitas **Refleksi/jeda layar**. Nudge memberikan prompt singkat dan menyarankan menulis di kertas atau media pilihan pengguna di luar aplikasi.

**Kriteria penerimaan:** pengguna dapat menjalankan timer journaling tanpa menulis ke aplikasi. Tidak ada kolom pengumpulan atau penyimpanan isi jurnal. Instruksi tidak menjanjikan hasil terapi.

### FR-08: Pengingat sesuai pilihan pengguna

Pengingat default nonaktif. Pengguna dapat mengaktifkan, menentukan hari dan waktu, mengubah, serta mematikannya. Pengaturan disimpan lokal bila penyimpanan tersedia, terpisah dari umpan balik rekomendasi.

Izin notifikasi browser diminta setelah tindakan pengguna mengaktifkan pengingat. MVP menjadwalkan pengingat selama Nudge terbuka dan berjalan. Browser dapat menunda pengiriman ketika tab dibatasi atau perangkat tidur; pengingat tidak dijanjikan sebagai alarm presisi.

**Kriteria penerimaan:** kunjungan awal tidak meminta izin notifikasi. Menolak izin atau memakai browser yang tidak mendukung notifikasi tetap memungkinkan penggunaan manual. UI menjelaskan status izin dan batas pengingat. Mematikan atau mengubah jadwal membatalkan jadwal lama yang masih aktif. Tidak ada janji pengingat berjalan saat aplikasi tertutup.

### FR-09: Landing page dan akses aplikasi

Landing page menjelaskan manfaat, tiga kelompok aktivitas, alur singkat, serta CTA **Mulai**. Aplikasi memiliki tampilan yang menyesuaikan desktop dan seluler.

**Kriteria penerimaan:** CTA menuju `/app`; URL `/app` dapat dibuka langsung. Manifest menetapkan `/app` sebagai jalur peluncuran. Pembukaan aplikasi tidak memulai timer, termasuk saat diluncurkan dari PWA.

### FR-10 sampai FR-15: Penambahan aplikasi yang disetujui 26 Oktober 2026

- FR-10: Pilihkan saja langsung memberi satu kegiatan ringan 2 menit, dalam ruangan, tanpa alat; timer tetap manual.
- FR-11: Alur biasa Mood, Tujuan, Energi, Waktu. Mood dan Energi dapat dilewati. Energi adalah preferensi, bukan penilaian kesehatan.
- FR-12: Tiga koleksi memakai alur tema, waktu, satu saran; pergantian tetap dalam koleksi.
- FR-13: Kurang cocok langsung mengganti saran. Alasan opsional menyusul dan hanya memengaruhi sesi; alat yang dinyatakan tidak tersedia tidak disarankan kembali.
- FR-14: Selesai mencatat kegiatan otomatis di perangkat ini, termasuk penyelesaian lebih awal. Waktu habis, Berhenti, dan Ganti tidak mencatat. Riwayat dapat dibuka ulang, dihapus, dan dinonaktifkan.
- FR-15: C1 memberi respons kontekstual yang singkat; timer statis dan reduced motion dihormati.

Kriteria penerimaan, koleksi awal, batas data, serta urutan pengerjaan ada di [rencana fitur aplikasi](./docs/nudge-next-features.md). Keputusan ini memperluas MVP sebelumnya tanpa akun, cloud, atau analitik pribadi.

## 7. Aturan rekomendasi dan alternatif

1. Bentuk kandidat berdasarkan tujuan dan durasi yang tidak melebihi waktu tersedia.
2. Terapkan filter tempat dan alat yang dipilih. Tidak memilih filter berarti tidak membatasi atribut tersebut.
3. Utamakan durasi yang sama dengan pilihan pengguna, lalu energi opsional, kecocokan mood, dan umpan balik dalam sesi. Bila durasi tepat atau energi tidak tersedia, jelaskan alternatif yang tidak melampaui waktu pengguna. Aturan harus dapat dijelaskan dan diperiksa melalui pengujian.
4. Tampilkan satu saran; pergantian saran memprioritaskan kandidat yang belum ditolak selama masih tersedia.
5. Jika filter tempat atau alat mengosongkan kandidat, tawarkan alternatif dalam ruangan atau tanpa alat yang tetap memenuhi tujuan dan waktu. Jelaskan atribut mana yang berbeda dari filter pengguna sebelum pengguna memulainya.
6. Jika tidak ada aktivitas yang memenuhi tujuan dan waktu, tampilkan keadaan kosong dan pilihan mengubah konteks. Jangan diam-diam mengubah tujuan atau melampaui waktu tersedia.

Gunakan aturan berbasis katalog untuk MVP. Detail bobot, urutan pemecah nilai sama, dan pemetaan mood per aktivitas ditetapkan saat implementasi serta ditinjau melalui uji alur. Aturan tersebut tidak membuat profil lintas sesi.

## 8. Katalog awal

Katalog berikut adalah titik awal yang dapat direvisi berdasarkan kecocokan aktivitas dan pengujian. Durasi merupakan pilihan pengalaman produk. Gerakan dilakukan sesuai kenyamanan pengguna.

| Tujuan | Durasi | Aktivitas | Tempat/alat |
| --- | --- | --- | --- |
| Bergerak | 2 menit | Berdiri dan regangkan badan dengan gerakan ringan. | Dalam ruangan, tanpa alat |
| Bergerak | 5 menit | Berjalan santai di rumah atau jalur aman dekat rumah. | Dalam atau luar ruangan, tanpa alat |
| Bergerak | 10 menit | Berjalan santai di lokasi aman atau bergerak ringan di rumah. | Dalam atau luar ruangan, tanpa alat |
| Produktif ringan | 2 menit | Kembalikan lima benda ke tempatnya. | Dalam ruangan, tanpa alat khusus |
| Produktif ringan | 5 menit | Rapikan satu permukaan kecil, seperti bagian meja. | Dalam ruangan, tanpa alat khusus |
| Produktif ringan | 10 menit | Siapkan barang untuk kegiatan berikutnya atau bereskan satu bagian kecil. | Dalam ruangan, tanpa alat khusus |
| Refleksi/jeda layar | 2 menit | Letakkan ponsel, minum air, lalu tulis satu hal kecil yang ingin dilakukan berikutnya. | Air minum; kertas dan pena disarankan |
| Refleksi/jeda layar | 5 menit | Journaling: “Apa yang sedang memenuhi pikiranmu, dan langkah kecil apa yang ingin kamu ambil setelah ini?” | Kertas dan pena disarankan |
| Refleksi/jeda layar | 10 menit | Tulis beberapa kalimat tentang keadaan sekarang, lalu pilih satu kegiatan kecil berikutnya. | Kertas dan pena disarankan |

Sebelum rilis, lengkapi alternatif refleksi tanpa alat, misalnya berhenti menatap layar dan memikirkan satu langkah kecil berikutnya. Setiap variasi yang memiliki syarat berbeda harus memiliki metadata yang sesuai, bukan mengaku tanpa alat ketika instruksinya membutuhkan alat.

Metadata minimum aktivitas: identitas stabil, judul, tujuan, durasi, instruksi, tempat yang didukung, alat yang diperlukan atau opsional, dan kecocokan mood. Alasan rekomendasi harus mengikuti metadata serta konteks aktual.

## 9. Data dan privasi

| Data | Penanganan MVP |
| --- | --- |
| Katalog aktivitas | Data produk dalam codebase, tanpa backend personalisasi. |
| Mood, tujuan, filter, dan umpan balik sesi | State alur penggunaan; tidak disimpan menjadi profil lintas sesi. |
| Aktivitas dan timer aktif | State sesi; pemulihan setelah browser ditutup belum menjadi kebutuhan MVP. |
| Favorit | Identitas aktivitas di `localStorage`, per browser/perangkat. |
| Riwayat | Otomatis saat Selesai, maksimal 100 catatan lokal terbaru; dapat dihapus dan dimatikan. Tidak menyimpan mood, alasan penolakan, atau isi jurnal. |
| Pengaturan pengingat | Pengaturan lokal; eksekusi jadwal bergantung pada aplikasi yang berjalan dan izin browser. |
| Isi jurnal dan analitik pribadi | Tidak dikumpulkan. |

Menghapus data browser dapat menghapus favorit dan pengaturan. Jangan mengklaim data tersinkronisasi antarperangkat. Kegagalan membaca data lokal, termasuk data rusak, ditangani agar aplikasi tetap dapat digunakan.

## 10. Kebutuhan nonfungsional

- **Aksesibilitas:** kontrol dapat dipakai dengan keyboard, fokus terlihat, label jelas, kontras terbaca, dan status timer tidak hanya dibedakan melalui warna. Pembaca layar menerima status penting tanpa pengumuman setiap detik yang mengganggu.
- **Responsivitas:** pemilihan, detail, timer, favorit, dan pengaturan dapat digunakan pada layar desktop maupun seluler tanpa kontrol terpotong.
- **Ketahanan:** kegagalan notifikasi atau penyimpanan tidak memblokir pemilihan aktivitas dan timer manual.
- **Keandalan waktu:** hitung sisa waktu dari referensi waktu yang sesuai; penundaan eksekusi browser tidak boleh memperpanjang countdown secara tidak sengaja.
- **Kinerja:** alur inti memakai katalog lokal dan tidak memerlukan panggilan layanan rekomendasi. Target angka performa ditetapkan setelah implementasi dapat diukur.
- **Keamanan:** gunakan HTTPS pada deployment yang membutuhkan kemampuan PWA/notifikasi, dan hindari pencatatan mood atau konten pribadi ke log.
- **Gerak visual:** bila memakai animasi, hormati preferensi pengurangan gerak.

## 11. Stack yang dipilih

| Teknologi | Peran |
| --- | --- |
| Next.js App Router | Routing landing page dan aplikasi dalam satu proyek. |
| TypeScript | Tipe untuk katalog, konteks, state aktivitas, dan aturan rekomendasi. |
| Tailwind CSS | Styling responsif dan konsistensi tampilan. |
| Web app manifest dan service worker | Dasar pengalaman PWA sesuai cakupan fitur yang diterapkan. |
| `localStorage` | Favorit dan pengaturan lokal. |
| Vitest | Pengujian logika dan komponen yang didukung. |
| Playwright | Pengujian alur pengguna di browser. |

Stack ini merupakan keputusan untuk implementasi berikutnya; dependensi dan script belum tersedia di repository saat PRD dibuat. Vite tidak ditambahkan sebagai build server aplikasi terpisah. Vitest memakai ekosistem Vite untuk kebutuhan pengujiannya dan dapat dipakai dalam proyek Next.js.

Backend tidak diperlukan untuk cakupan MVP ini. Notifikasi saat tertutup memerlukan keputusan layanan pengirim Web Push dan penyimpanan subscription pada fase terpisah. Pemilihan package manager, versi paket, hosting, dan strategi cache service worker dilakukan sebelum bagian terkait diimplementasikan.

## 12. Strategi pengujian

### Vitest

- Penyaringan tujuan, durasi, tempat, dan alat, termasuk keadaan tanpa kandidat.
- Pengaruh mood opsional serta umpan balik yang hanya berlaku selama sesi.
- Pergantian alternatif dan penjelasan filter yang tidak terpenuhi.
- Transisi timer: mulai, jeda, lanjut, habis, ganti, berhenti, dan selesai manual.
- Pembaruan mood setelah selesai, termasuk **Lewati** yang mempertahankan konteks sebelumnya.
- Favorit tanpa duplikasi serta penanganan penyimpanan kosong, rusak, atau tidak tersedia.
- Perubahan dan pembatalan jadwal pengingat dengan waktu/izin yang dikendalikan pengujian.

### Playwright

- Landing page menuju `/app` dan akses langsung `/app`.
- Alur mood dipilih maupun dilewati, pemilihan tujuan/waktu, dan mulai aktivitas.
- Saran kurang cocok, alternatif dengan penjelasan, dan keadaan kosong.
- Timer dan penyelesaian manual, lalu pertanyaan mood dan aktivitas berikutnya.
- Favorit setelah reload pada browser yang sama.
- Pengingat opt-in, perubahan jadwal, izin ditolak, dan penggunaan manual.
- Alur inti pada viewport desktop dan seluler, serta interaksi keyboard.

Uji manifest dan jalur masuk dapat diautomasi. Pemasangan PWA, peluncuran dari ikon, izin OS, dan perilaku perangkat saat tidur memerlukan pemeriksaan manual pada browser/perangkat yang menjadi sasaran rilis. Vitest tidak mencakup seluruh perilaku Next.js, termasuk async Server Components; gunakan pengujian browser untuk alur yang melibatkannya.

Belum ada target persentase coverage. Prioritaskan perilaku dan kasus kegagalan di atas, lalu dokumentasikan perintah aktual setelah konfigurasi pengujian dibuat.

## 13. Evaluasi dan syarat kesiapan rilis

Evaluasi awal memakai pengujian alur dan catatan observasi tanpa memasang analitik penggunaan pribadi. Minta peserta memahami tujuan Nudge, masuk ke aplikasi, memilih atau melewati mood, meminta saran, memulai timer, mengganti saran, menyelesaikan aktivitas, dan memulai lagi.

Catat titik kebingungan, kebutuhan bantuan, alasan saran dianggap tidak cocok, dan apakah kontrol selesai dipahami. Jumlah peserta dan ambang keberhasilan kuantitatif belum ditetapkan; jangan melaporkan asumsi sebagai hasil riset.

MVP siap ditinjau untuk rilis ketika:

- FR-01 sampai FR-09 memiliki bukti pemeriksaan dan tidak ada kegagalan yang menghalangi alur inti.
- Katalog memiliki pilihan yang dapat digunakan untuk setiap tujuan dan pilihan waktu, termasuk alternatif dalam ruangan/tanpa alat yang relevan.
- Penyelesaian selalu membutuhkan tindakan pengguna; mood dapat dilewati dan diperbarui sesuai aturan.
- Favorit dan pengingat berfungsi sesuai batas penyimpanan serta izin.
- Jalur web dan PWA diperiksa pada lingkungan sasaran, dengan keterbatasan yang disampaikan melalui UI.
- Masalah aksesibilitas yang menghalangi pemilihan, timer, atau penyelesaian telah ditangani.

## 14. Tahapan implementasi dan pengembangan berikutnya

Urutan pengerjaan yang disarankan: fondasi proyek dan model katalog; landing page serta alur rekomendasi; timer dan siklus selesai; favorit dan pengingat; PWA serta pemeriksaan alur menyeluruh. Semua kebutuhan MVP tetap termasuk dalam cakupan rilis, meskipun dikerjakan bertahap.

| Ide lanjutan | Batas keputusan |
| --- | --- |
| Streak per hari | Opsional, dapat disembunyikan, tanpa pesan yang menyalahkan pengguna. Belum masuk MVP. |
| Pengingat saat aplikasi tertutup | Tinjau kebutuhan backend/Web Push, dukungan perangkat, dan batas ketepatan waktu. |
| Bahasa tambahan | Dipertimbangkan setelah alur Bahasa Indonesia diuji. |
| Akun atau sinkronisasi | Memerlukan keputusan produk baru; tidak menjadi prasyarat arsitektur MVP. |
| Offline lebih lengkap | Tentukan cakupan cache, pembaruan katalog, dan pemulihan state sebelum dijanjikan. |

## 15. Risiko dan keputusan implementasi terbuka

| Risiko/pertanyaan | Penanganan |
| --- | --- |
| Katalog terlalu kecil atau berulang | Uji kecocokan, tambah variasi yang memenuhi metadata, dan jelaskan saat alternatif habis. |
| Pengingat tertunda atau izin ditolak | Jelaskan batas browser dan pertahankan alur manual. |
| Data lokal hilang atau rusak | Tangani kegagalan tanpa memblokir aplikasi dan jelaskan batas penyimpanan. |
| PWA berbeda antarbrowser | Periksa pemasangan dan peluncuran pada perangkat sasaran sebelum rilis. |
| Penentuan bobot rekomendasi | Tetapkan aturan sederhana, terdokumentasi, dan dapat diuji saat implementasi. |
| Batas berakhirnya sesi | Tetapkan perilaku reset/navigasi secara eksplisit saat merancang state; umpan balik tetap tidak diwariskan lintas sesi. |
| Dukungan browser dan hosting | Pilih matriks perangkat/browser, hosting HTTPS, versi paket, dan strategi cache sebelum pemeriksaan rilis. |

## 16. Referensi

- [Konsep Nudge dan latar riset](./CONCEPT.md).
- [Riset kelayakan stack dan batas notifikasi](./docs/research/stack-feasibility.md).
- [Next.js: Progressive Web Applications](https://nextjs.org/docs/app/guides/progressive-web-apps).
- [Next.js: Vitest](https://nextjs.org/docs/app/guides/testing/vitest) dan [panduan pengujian](https://nextjs.org/docs/app/guides/testing).
- [Vitest: Getting Started](https://vitest.dev/guide/).
- [MDN: manifest start_url](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/start_url).
- [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API), dan [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API).
