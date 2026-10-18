# Pemeriksaan implementasi Nudge

Tanggal: 18 Oktober 2026. Status: kode MVP dapat ditinjau; pemeriksaan perangkat fisik dan aset final masih menunggu.

## Lingkungan

Windows, Node.js 22.19.0, npm 11.19.0. Next.js 16.4.2, React 19.3.1, TypeScript 6.0.3, Tailwind 4.3.3, Vitest 5.0.5, Playwright 1.64.1. Versi terkunci dalam package-lock.json.

## Bukti yang sudah diperoleh

- Build produksi akhir berhasil untuk `/`, `/app`, manifest, dan ikon.
- Vitest: 17 test lulus pada 6 berkas. Meliputi seluruh tujuan/waktu, mood, feedback sesi, penolakan/alternatif, timer, data lokal, jadwal, serta adapter notifikasi service worker dan pembatalannya.
- Typecheck, lint dan format:check berhasil setelah perbaikan.
- Playwright utama: 38 skenario lulus pada desktop dan viewport Pixel 7. Memuat timer habis tanpa selesai otomatis, mood dipilih/dilewati/diubah, penolakan/kehabisan saran, favorit, journaling, izin ditolak/unsupported, pengingat jatuh tempo, pembatalan jadwal, keyboard, Axe dan teks 200%.
- Playwright produksi: delapan skenario lulus, mencakup alur lengkap tanpa error browser/hydration, registrasi worker, ikon PNG 192/512, cache tanpa navigasi/data pribadi, fallback offline lalu pemulihan koneksi, serta penerimaan notifikasi oleh API asli Chrome.
- Pemeriksaan tambahan keyboard dan Axe pada timer, penyelesaian, favorit, dan pengingat sudah lulus di desktop/seluler. Pembesaran teks 200% menemukan overflow pilihan waktu pada 320 px, sudah diperbaiki dan lulus pada keduanya.
- Enam pengujian terarah terakhir untuk keyboard, teks 200% sesudah hydration, serta izin pengingat juga lulus setelah penyesuaian fokus dan penjelasan pengaturan.
- Audit lanjutan menemukan dan memperbaiki pengingat yang tidak bisa dimatikan bila kolom waktu dikosongkan. Test mereproduksi kegagalan pada desktop/seluler sebelum perbaikan. Regresi dalam suite utama membuktikan validasi jadwal aktif tetap berlaku dan deduplikasi bertahan saat visibility kembali aktif serta setelah reload.
- Screenshot aplikasi/timer dari build produksi tersimpan di `.impeccable/review/`. Laporan dan screenshot merupakan cache lokal, tidak dikomit sebagai aset produk.

## Visual dan aset

Render landing sudah diperiksa pada 1440, 768, dan 390 px melalui Taste Skill. Alur aplikasi juga dibuka di browser. Screenshot inspector disimpan dalam cache lokal `.taste-skill/inspect/`.

Inspector terakhir melaporkan tiga FAIL: kuota gambar, ambang elemen dominan, dan kuota gerak. Empat gambar serta delapan elemen bergerak tidak diterapkan karena aset ditunda pengguna dan DESIGN.md menetapkan gerak tenang. Ambang dominasi tipografi inspector juga tidak diadopsi untuk menggantikan skala awal 64 px; hero dibaca bersama demo interaktif. Warna canvas mengikuti palet pengguna. Label demo yang berlebihan telah dihapus. Ini bukan laporan bahwa semua gate Taste Skill lulus.

Penilaian render awal oleh agen: desain 7/10, kegunaan 8/10, kreativitas 5/10, isi 8/10. Ini penilaian internal, bukan hasil riset pengguna. Aset final masih dibutuhkan untuk identitas yang lebih kuat.

Detector Impeccable dijalankan manual karena konteks sesi melaporkan hook otomatis tidak aktif. Laporan terakhir memuat 14 advisory ukuran huruf, 11 advisory radius, dan satu warning nama family font. Family font telah diselaraskan ke nama paket `Nunito Variable`; laporan tersebut belum dijalankan ulang setelah penyelarasan. Kurva panel hero merupakan eksplorasi motif tempurung. Tidak ada klaim semua pemeriksaan engine bersih.

## Batas yang masih perlu diperiksa

Target fisik yang dipilih pengguna adalah Android dengan Chrome. Tugas dan lembar pencatatan tersedia pada [manual-checks.md](./manual-checks.md); seluruh kolom hasil perangkat fisik masih kosong.

- Pemasangan PWA dari menu browser dan peluncuran dari ikon pada perangkat fisik.
- Izin OS, pengiriman notifikasi nyata, penundaan saat tidur, dan pembaruan worker pada perangkat sasaran.
- Pembaca layar nyata dan pengujian alur dengan peserta. Pemeriksaan otomatis tidak membuktikan seluruh aksesibilitas atau kegunaan produk.
- Logo, ilustrasi, pose maskot, dan ikon final ditunda sesuai arahan pengguna. Ikon sementara tidak dianggap aset final.
- Hosting HTTPS belum dipilih; aplikasi belum dipublikasikan.

## Dependensi

`npm audit` melaporkan 5 temuan high dalam rantai alat lint: eslint-config-next, plugin Next, fast-glob, micromatch, dan braces. Advisory utama GHSA-vfj7-8cjw-p6xm terkait pola glob bertingkat dalam braces. Registry masih memberikan braces 3.0.3 tanpa versi perbaikan. Dependensi ini bukan bagian runtime aplikasi. Tidak menjalankan `audit fix --force` karena usulan npm menurunkan eslint-config-next ke mayor 14. `npm audit --omit=dev --json` lulus dengan nol temuan runtime.

## Pemetaan kebutuhan

| Kebutuhan | Bukti otomatis | Sisa pemeriksaan |
| --- | --- | --- |
| FR-01 konteks | Validasi, mood/Lewati, keyboard, semua tujuan/waktu pada unit test | Observasi pemahaman pengguna |
| FR-02 saran | Metadata, ranking mood/feedback, satu saran dan tanpa auto-mulai | Kecocokan aktivitas pada pengguna |
| FR-03 alternatif | Penolakan, penjelasan filter berbeda, keadaan habis, kosong pada unit test | Kecukupan variasi katalog |
| FR-04 timer | Deadline, jeda/lanjut, habis, berhenti/ganti, selesai manual | Sleep/resume perangkat nyata |
| FR-05 siklus mood | Lewati mempertahankan mood/kosong; perubahan mood dan kembali ke aplikasi | Observasi alur pengguna |
| FR-06 favorit | Reload, tambah/hapus, data rusak/tidak tersedia, deduplikasi | Kehilangan data browser dijelaskan UI |
| FR-07 journaling | Prompt dan timer tanpa textarea/penyimpanan tulisan | Kecocokan prompt |
| FR-08 pengingat | Opt-in, penolakan, jadwal jatuh tempo, deduplikasi, ubah/matikan | Izin/pengiriman OS nyata |
| FR-09 jalur web/PWA | Landing ke aplikasi, URL langsung, manifest, worker dan offline | Pemasangan serta peluncuran ikon nyata |

## Tinjauan kode

Review mandiri lima aspek memakai panduan Code Review and Quality: perilaku dibandingkan PRD, keterbacaan, pemisahan modul, keamanan data, dan kinerja. Logika murni dipisahkan dari UI, notifikasi dipisahkan dari scheduler, state sesi tidak dipersistenkan, timer memakai deadline, dan katalog tidak memanggil layanan luar. Feedback positif diperbaiki agar memengaruhi peringkat aktivitas, bukan seluruh tujuan yang sudah terfilter. Callback pengingat membatalkan pengiriman yang masih antre setelah pengaturan berubah.

Keterbatasan pemeliharaan: komponen ActivityApp masih cukup besar karena memuat beberapa layar. Pemisahan presentasi per layar bisa dilakukan bila iterasi desain selanjutnya membutuhkannya; aturan domain sudah berada pada modul terpisah. Ini review oleh pembuat implementasi, bukan persetujuan reviewer independen.

Peringatan hydration pada pengujian pembesaran teks disebabkan test mengubah atribut HTML sebelum hydration selesai. Setup test disesuaikan untuk menunggu interaksi aplikasi lebih dulu. Alur produksi terpisah menangkap pageerror dan console error, dan keduanya kosong pada skenario tersebut.

Audit pengingat lanjutan: formulir memvalidasi jadwal aktif melalui aturan aplikasi. Saat mematikan pengingat dengan waktu belum lengkap, waktu valid yang terakhir tersimpan dipertahankan sehingga pembatalan tidak tertahan oleh validasi input. Test adapter membuktikan pemakaian showNotification melalui service worker, penghentian setelah pembatalan saat menunggu registrasi, dan tidak mengirim ketika izin ditolak. Ini bukti kontrak API dengan mock, bukan bukti notifikasi OS nyata.

Test produksi tambahan menggunakan izin pada profil Chrome pengujian dan pembungkus observasi yang tetap memanggil `showNotification` asli. Assertion memeriksa judul/tag hanya setelah Promise API tersebut selesai tanpa penolakan. Pemeriksaan awal yang mengharuskan `getNotifications()` mempertahankan entri tidak stabil; probe menunjukkan API asli berhasil meskipun daftar segera kosong. Test akhir membuktikan penerimaan API, bukan tampilan atau retensi notifikasi OS. Pemeriksaan Android tetap diperlukan.

Pada pemeriksaan menyeluruh awal, 37 skenario lulus dan satu skenario tiga audit Axe melewati batas gabungan 30 detik. Batas skenario tersebut diperpanjang menjadi 60 detik tanpa mengurangi assertion. Seluruh 38 skenario kemudian lulus dalam satu pemanggilan; skenario yang sebelumnya timeout selesai sekitar 11 detik pada desktop dan seluler dalam pemanggilan itu. Penyebab perubahan waktu antar-pemanggilan belum dipastikan.
