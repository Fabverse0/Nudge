# Adegan regangan kura-kura

Tanggal: 24 Oktober 2026.

## Keputusan dan cakupan

Pengguna menolak hasil video dan memilih meninggalkan pendekatan video. Implementasi ini mengganti sepatu melayang pada scene `move` di landing dengan karakter vektor C1 yang meregangkan badan di atas alas, dengan ponsel diam di samping. Hero, cerita lain, aplikasi, dan aset C1 bersama tetap di luar cakupan. Tidak ada pemasangan paket, layanan eksternal, atau pemakaian kredit tambahan.

Ini merupakan interpretasi C1 dalam bentuk 2D, bukan klaim animasi 3D atau hasil rig profesional. Tempurung sage tanpa pola, wajah sand, mata oval, senyum kecil, dan empat kaki membulat dipertahankan. SVG karakter secara khusus diminta dan disetujui pengguna, sehingga menjadi pengecualian terhadap larangan ilustrasi SVG generik pada panduan skill.

## Koreografi

Penyempurnaan setelah komentar pengguna: warna tempurung disatukan ke sage. Aksen pendek di atas tempurung muncul pada puncak regangan, dua garis tekanan di alas mengikuti jangkauan kaki depan, embusan napas memakai garis melengkung yang melebar lalu hilang, bayangan kontak mengikuti perpindahan berat, dan senyum sedikit membesar saat lega. Efek mengikuti siklus yang sama dan berhenti bersama lifecycle adegan. Preview `127.0.0.1` sempat menyajikan CSS lama; keyframe tambahan diverifikasi pada origin `localhost:3100` yang belum memiliki cache sebelumnya. Pemeriksaan ini tidak mengubah service worker atau aplikasi.

Siklus 8,4 detik: diam, persiapan menurunkan badan, kaki depan menjangkau, kepala terangkat dan mata menyipit, embusan napas, lalu kembali santai. Kaki belakang dan alas menjadi tumpuan tetap. Kepala, torso, kaki depan dekat/jauh, dan ekspresi memakai kurva serta waktu yang terkoordinasi. Tidak ada perpindahan seluruh gambar melintasi layar. Dials mengikuti landing: ENERGY 3, RHYTHM 2, MOTION 3.

`stretch-story.tsx` menyimpan bentuk, `stretch-story.css` menyimpan gerak. Lifecycle `AliveMotion` yang sudah ada mengendalikan `data-running`; aturan khusus menghentikan animasi tanpa status `true`. Reduced motion menampilkan pose kepala sedikit terangkat tanpa animasi. Tanpa JavaScript, SVG tetap terlihat dan diam. Deskripsi aksesibel berada di pembungkus scene; detail SVG disembunyikan dari pembaca layar.

## Bukti dan batas

- TypeScript `npm run typecheck`: lulus.
- Impeccable detector pada komponen/stylesheet adegan dan integrasinya: `[]`.
- Render Chrome dan preview dalam aplikasi menampilkan karakter, alas, ponsel, dan teks bagian bergerak.
- DOM saat terlihat: `data-running=true`, animasi bagian tubuh berjalan. Saat di luar layar: `data-running=false`, animasi kepala `paused` setelah koreksi aturan cascade.
- Pada viewport 320 dan 390 piksel tidak ada overflow horizontal; komposisi desktop juga ditinjau. Log error preview kosong saat diperiksa.
- Reduced motion dan fallback tanpa JavaScript ditinjau pada source, belum diemulasi pada browser dalam pemeriksaan ini. Pergantian tab dan satu siklus lengkap belum direkam sebagai bukti otomatis baru. Tidak ada klaim pengujian penuh aplikasi atau perangkat Android.
- Preview menggunakan development server port 3100. Penerimaan estetika dan keluwesan gerak menunggu peninjauan pengguna. Screenshot diam tidak membuktikan keluwesan animasi.

Taste Skill dipakai untuk kesinambungan satu bagian dengan arah landing yang sudah ada, tanpa mengundi ulang desain. Impeccable dipakai untuk koreografi, fallback, dan kritik render. Adegan tidak menambahkan kontrol atau mengubah handoff durasi menuju aplikasi.
