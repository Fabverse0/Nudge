# Konsep Nudge

Status: draf konsep
Pembaruan: 18 Oktober 2026

## Gagasan utama

Nudge membantu orang yang sedang gabut atau sadar sudah terlalu lama doomscrolling untuk beralih ke satu kegiatan kecil yang terasa produktif, membuat tubuh bergerak, atau memberi jeda dari layar. Saran dipilih dari mood, tujuan aktivitas, waktu yang tersedia, serta kondisi tempat dan alat.

Nudge memberi satu saran yang punya awal dan akhir jelas, lalu membantu pengguna mulai dengan timer. Nudge memakai bahasa ringan dan tidak menghakimi.

## Platform dan batas produk

- Satu produk untuk web desktop dan PWA yang dapat dipasang di ponsel, dengan tata letak yang menyesuaikan perangkat.
- Favorit disimpan di perangkat pengguna.
- Akun dan sinkronisasi cloud belum termasuk dalam MVP.
- Nudge adalah alat rekomendasi aktivitas ringan, bukan aplikasi kesehatan atau terapi.

## Momen penggunaan

- Pengguna sedang gabut dan ingin melakukan sesuatu yang berguna atau membuat tubuh bergerak.
- Pengguna merasa kebablasan doomscrolling dan ingin mulai melakukan hal lain.

## Input dan pemilihan saran

Pengguna memilih tiga hal:

1. **Mood**, dengan pilihan awal seperti lelah, bosan, gelisah, atau siap bergerak. Pilihan ini menggambarkan keadaan saat itu, bukan penilaian kesehatan.
2. **Tujuan aktivitas**, yaitu produktif ringan, bergerak, atau refleksi/jeda dari layar.
3. **Waktu tersedia**, dengan pilihan cepat 2, 5, atau 10 menit.

Aktivitas juga diberi label tempat, misalnya di dalam atau di luar, dan kebutuhan alat. Kondisi tempat dan alat dapat dipakai sebagai filter tambahan. Utamakan saran tanpa alat dan tawarkan alternatif jika saran luar rumah tidak sesuai.

Aturan pemilihan awal: saring aktivitas berdasarkan tujuan, waktu, tempat, dan alat; dari pilihan yang sesuai, prioritaskan saran yang cocok dengan mood dan umpan balik pengguna. Tampilkan satu saran pada satu waktu.

## Alur utama

1. Pengguna memilih mood, tujuan aktivitas, dan waktu yang tersedia.
2. Jika diperlukan, pengguna memilih kondisi tempat atau ketersediaan alat.
3. Nudge menampilkan satu aktivitas, durasi, instruksi awal yang singkat, dan alasan sederhana mengapa saran itu cocok.
4. Tombol Mulai menjalankan timer hitung mundur. Pengguna dapat menjeda, mengakhiri lebih awal, atau mengganti saran.
5. Saat aktivitas selesai, pengguna menekan Selesai dan kembali ke halaman awal untuk memulai aktivitas lain jika mau.
6. Pengguna dapat memberi umpan balik Cocok atau Kurang cocok dan menyimpan saran favorit di perangkat.

## Katalog aktivitas awal

Durasi di bawah adalah pilihan pengalaman produk, bukan resep kesehatan. Pilih gerakan ringan sesuai kenyamanan. Beri alternatif di dalam rumah bila pengguna tidak dapat atau tidak ingin pergi ke luar.

| Tujuan | Durasi | Saran | Kondisi |
| --- | --- | --- | --- |
| Bergerak | 2 menit | Berdiri dan regangkan badan dengan gerakan ringan. | Di dalam rumah, tanpa alat |
| Bergerak | 5 menit | Berjalan santai di dalam rumah atau di jalur dekat rumah yang aman. | Dalam atau luar rumah |
| Bergerak | 10 menit | Berjalan santai di lokasi yang aman atau bergerak ringan di rumah. | Sesuaikan tempat |
| Produktif ringan | 2 menit | Kembalikan lima benda ke tempatnya. | Di dalam rumah, tanpa alat |
| Produktif ringan | 5 menit | Rapikan satu permukaan kecil, seperti bagian meja. | Di dalam rumah, tanpa alat |
| Produktif ringan | 10 menit | Siapkan barang untuk kegiatan berikutnya atau bereskan satu bagian kecil. | Di dalam rumah |
| Refleksi/jeda layar | 2 menit | Letakkan ponsel, minum air, lalu tulis satu hal kecil yang ingin dilakukan berikutnya. | Kertas dan pena disarankan |
| Refleksi/jeda layar | 5 menit | Journaling dengan prompt: “Apa yang sedang memenuhi pikiranmu, dan langkah kecil apa yang ingin kamu ambil setelah ini?” | Kertas dan pena disarankan |
| Refleksi/jeda layar | 10 menit | Tulis beberapa kalimat tentang keadaanmu sekarang, lalu pilih satu kegiatan kecil berikutnya. | Kertas dan pena disarankan |

Journaling disediakan sebagai refleksi singkat yang opsional. Nudge menampilkan prompt, sedangkan tulisan dapat dibuat di kertas agar pengguna tidak perlu tetap menatap layar. Jangan menjanjikan manfaat terapi atau kesehatan mental.

## Pengingat, streak, dan umpan balik

- Pengingat otomatis hanya aktif jika pengguna sendiri meminta dan mengaturnya. Pengguna dapat mengubah atau mematikannya; penggunaan manual tetap tersedia.
- Streak per hari menjadi fitur opsional untuk dipertimbangkan setelah alur utama diuji. Streak tidak menjadi syarat memakai Nudge dan sebaiknya dapat disembunyikan.
- Umpan balik awal cukup sederhana: apakah saran cocok dan apakah pengguna memulai atau menyelesaikan aktivitas.

## Prinsip pengalaman

- Buat aktivitas kecil, jelas, mudah dimulai, dan sebisa mungkin tanpa persiapan atau alat.
- Jaga nada tetap ringan. Pengguna boleh melewati saran atau berhenti kapan saja.
- Hindari feed atau rangkaian konten tanpa akhir. Tujuan layar Nudge adalah membantu pengguna memilih lalu mulai beraktivitas.
- Jangan memakai streak untuk membuat pengguna merasa bersalah.

## Catatan riset

Riset ini membantu menentukan prinsip katalog, tetapi belum membuktikan bahwa setiap saran tertentu akan cocok untuk setiap orang.

- WHO menyatakan semua aktivitas fisik dihitung dan aktivitas dalam jumlah berapa pun lebih baik daripada tidak sama sekali. [WHO, Physical activity](https://www.who.int/news-room/fact-sheets/detail/physical-activity)
- Uji acak pada 49 pekerja perempuan dengan pekerjaan sedentari membandingkan jeda berdiri/berjalan singkat 1–2 menit setiap setengah jam dengan dua jeda 15 menit. Kelompok jeda singkat mengurangi waktu duduk selama hari kerja dalam konteks studi tersebut. Ini mendukung tersedianya opsi jeda kecil, tetapi tidak menetapkan durasi ideal untuk semua pengguna. [Randomized trial on short activity breaks](https://pmc.ncbi.nlm.nih.gov/articles/PMC4995540/)
- Tujuh eksperimen dengan 1.223 peserta menemukan bahwa berpindah cepat antarvideo dapat meningkatkan rasa bosan dan menurunkan kepuasan, perhatian, serta rasa bermakna. Hasil untuk artikel daring dan sampel nonmahasiswa kurang konklusif. Ini mendukung format satu saran terbatas dengan tindakan dan akhir yang jelas. [Tam and Inzlicht, 2024](https://pubmed.ncbi.nlm.nih.gov/39158465/)
- Tinjauan sistematis atas 51 studi tentang positive expressive writing menemukan hasil yang paling konsisten pada kesejahteraan subjektif, hasil lain yang beragam, serta kualitas studi umumnya buruk atau sedang. Journaling dimasukkan sebagai pilihan refleksi, tanpa klaim sebagai terapi. [Positive expressive writing systematic review](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0308928)

## Hal yang masih terbuka

- Kata-kata final untuk pilihan mood.
- Apakah pilihan lokasi ditampilkan setiap kali atau hanya menjadi filter saat relevan.
- Katalog final dan aturan pengingat setelah uji coba alur inti.
