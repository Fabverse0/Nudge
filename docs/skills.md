# Panduan Skill Proyek Nudge

Tanggal pemasangan: 18 Oktober 2026.

Panduan ini mencakup sembilan skill UI/desain tambahan dan pemilihan skill pengembangan yang sudah terpasang. Baca `SKILL.md` terkait sebelum menerapkan alurnya; keberadaan folder tidak berarti semua skill aktif bersamaan.

## Lingkup pemasangan

Sembilan skill UI/desain dipasang sebagai salinan folder lengkap di `.agents/skills/` milik proyek Nudge. Folder skill yang sudah ada dipertahankan. Tidak ada pemasangan skill global, perubahan pengaturan mode global Anti Slop, atau pemasangan plugin. Engine dan hook Impeccable ditambahkan secara lokal atas instruksi pengguna berikutnya.

Pemasangan skill memakai helper `skill-installer` dengan `--dest` eksplisit ke folder proyek dan metode download/copy. Script, referensi, library, serta konfigurasi agen yang berada di dalam folder sumber ikut disalin. Engine Impeccable telah dijalankan untuk mengaktifkan dan memeriksa hook lokal; Taste Skill juga sudah digunakan pada landing page. Hasil pemeriksaan implementasi dan batasnya dicatat di [verification.md](./verification.md).

## Paket dan sumber

| Folder lokal | Sumber folder di repository | Peran |
| --- | --- | --- |
| `antislop` | `miqdadbadjuber/anti-slop`, `skills/antislop` | Aturan inti dan mekanisme pemeriksaan kualitas. |
| `antislop-ui` | Repository yang sama, `skills/antislop-ui` | Layout, komponen, warna, dekorasi, dan motion. |
| `antislop-copywriting` | Repository yang sama, `skills/antislop-copywriting` | Headline, CTA, instruksi, dan tulisan antarmuka. |
| `antislop-human` | Repository yang sama, `skills/antislop-human` | Aksesibilitas, kontras, fokus, keyboard, dan state kontrol. |
| `antislop-layoutmobile` | Repository yang sama, `skills/antislop-layoutmobile` | Reflow, ukuran layar, overflow, dan target sentuh. |
| `antislop-code` | Repository yang sama, `skills/antislop-code` | Kualitas komentar kode. |
| `impeccable` | `pbakaus/impeccable`, `.agents/skills/impeccable` | Panduan utama perancangan dan penyempurnaan UI. |
| `design-taste-frontend` | `Leonxlnx/taste-skill`, `skills/taste-skill` | Art direction landing page. Nama folder lokal mengikuti nama skill pada frontmatter. |
| `ip-as-logo` | `s1dashu/ip-as-logo-skill`, root repository | Eksplorasi simbol maskot kura-kura. Paket mencakup `SKILL.md`, README, lisensi MIT, dan aset contoh upstream. |

Sumber diambil dari branch `main` saat pemasangan. Versi inti Anti Slop tercatat di file `VERSION`; versi skill Impeccable ada pada frontmatter, sedangkan versi engine tercatat terpisah di `scripts/VERSION`. Ini merupakan salinan yang diperbarui secara eksplisit, bukan langganan pembaruan otomatis.

Metode penyalinan mengikuti distribusi berbasis folder yang dijelaskan repository. Helper tidak membuat lockfile milik CLI `skills`, sehingga pembaruan harus menggunakan sumber dan tujuan lokal yang eksplisit, bukan mengasumsikan paket terdaftar pada CLI tersebut.

## Pembagian pemakaian

1. Baca `prd.md` untuk kebutuhan produk. Keputusan pengguna dan batas MVP tetap berlaku ketika panduan visual memberi saran fitur atau aset tambahan.
2. Gunakan Impeccable untuk perancangan layar aplikasi, alur, dan penyempurnaan desain. Bedakan kebutuhan landing page dan layar operasi aplikasi menurut mode skill tersebut.
3. Gunakan Taste Skill untuk landing page yang memang memerlukan eksplorasi arah visual. Skill ini mengecualikan layar aplikasi; jangan memaksakannya pada pemilihan mood atau timer.
4. Muat inti Anti Slop beserta skill khusus yang sesuai tugas. Tetapkan mode `during` atau `after` mengikuti instruksi inti ketika mulai memakainya; pemasangan ini belum memilih mode.
5. Gunakan [DESIGN.md](../DESIGN.md) sebagai acuan visual. Font Nunito Variable dan ikon Phosphor sudah diintegrasikan. Pengguna memilih C1 dari [eksplorasi batch 01](./assets/logo-exploration-01/README.md); pose, ilustrasi, simbol, wordmark, dan ikon turunannya tersedia dalam [inventaris C1](./assets/turtle-c1/README.md). Pertahankan identitas C1 ketika membuat turunan baru. Periksa inventaris untuk format dan sumber setiap keluaran.
6. Gunakan `ip-as-logo` saat eksplorasi simbol maskot. Presentasikan arah dan jumlah kandidat sebelum generasi sesuai skill. Pemasangan belum memberi izin membuat gambar; penulisan nama Nudge, versi vektor, dan turunan ikon memerlukan pekerjaan tersendiri.

## Prioritas dokumen dan instruksi

Dalam batas instruksi yang berlaku dan pekerjaan yang diizinkan pengguna:

- [prd.md](../prd.md) menetapkan kebutuhan, perilaku, cakupan MVP, dan kriteria penerimaan.
- [DESIGN.md](../DESIGN.md) menetapkan presentasi visual. Detail eksplorasi boleh berkembang selama tidak mengubah keputusan tetap atau perilaku produk.
- [GLOSSARY.md](../GLOSSARY.md) menetapkan istilah; [CONCEPT.md](../CONCEPT.md) menyediakan visi dan latar riset.
- Skill menyediakan cara mengerjakan tugas. Preferensi estetika, default jumlah kandidat, atau contoh fitur dalam skill tidak otomatis menjadi kebutuhan produk.

Jika PRD dan desain memberi petunjuk berbeda tentang perilaku, gunakan PRD sebagai acuan perilaku dan jelaskan ketidaksesuaian. Jika penyelesaiannya memerlukan perubahan keputusan tetap atau cakupan, minta keputusan pengguna. Jangan memperluas izin commit, push, instalasi, atau produksi aset berdasarkan rekomendasi skill.

## Pemilihan skill pengembangan

Tabel ini memetakan kebutuhan yang relevan, bukan mewajibkan seluruh alur pada setiap perubahan. Semua tautan di bawah menunjuk skill lokal yang sudah tersedia.

| Tugas | Skill | Pemakaian |
| --- | --- | --- |
| Mengembangkan fitur/perbaikan secara test-first | [tdd](../.agents/skills/tdd/SKILL.md) | Saat pendekatan TDD dipilih atau diminta; tidak otomatis wajib untuk setiap edit dokumen. |
| Mendiagnosis perilaku gagal, error, atau regresi kinerja | [diagnosing-bugs](../.agents/skills/diagnosing-bugs/SKILL.md) | Bangun bukti reproduksi yang sesuai masalah sebelum mengubah implementasi. |
| Meninjau perubahan terhadap acuan Git | [code-review](../.agents/skills/code-review/SKILL.md) | Tetapkan commit/branch acuan dan spesifikasi terkait; review bukan izin merge atau push. |
| Meneliti teknologi atau mengumpulkan bukti | [research](../.agents/skills/research/SKILL.md) | Gunakan sumber primer dan dokumentasikan temuan sesuai permintaan. |
| Merancang batas modul atau memperbaiki interface | [codebase-design](../.agents/skills/codebase-design/SKILL.md) | Cocok untuk memisahkan logika rekomendasi, timer, dan penyimpanan dari komponen UI. |
| Menetapkan istilah domain atau ADR | [domain-modeling](../.agents/skills/domain-modeling/SKILL.md) | Saat model/istilah berubah; membaca glossary saja tidak membutuhkan seluruh alur skill. |
| Menjawab pertanyaan desain dengan prototipe | [prototype](../.agents/skills/prototype/SKILL.md) | Ketika eksplorasi/prototipe diminta atau diizinkan; tandai hasil sebagai prototipe. |
| Menulis deskripsi pull request | [pr](../.agents/skills/pr/SKILL.md) | Ikuti hasil perubahan dan bukti verifikasi yang nyata. |
| Mengubah panduan agen | [writing-for-agents](../.agents/skills/writing-for-agents/SKILL.md) | Jaga AGENTS.md ringkas dan arahkan rincian tugas ke dokumen pendamping. |

Skill dapat memiliki langkah delegasi sendiri; baca instruksi aktual sebelum menjalankannya dan ikuti batas delegasi sesi. Skill dari lingkungan pengguna yang tersedia pada katalog sesi, seperti panduan frontend atau performa React, boleh dipakai bila relevan; jangan menganggapnya sudah disalin atau dipasang lokal di Nudge.

## Perintah proyek setelah scaffolding

Scaffolding sudah dibuat dengan npm dan package-lock.json. Baca package.json, README.md dan AGENTS.md untuk perintah aktual. Saat alat diperbarui, sinkronkan:

- Package manager dan lockfile yang dipakai.
- Perintah menjalankan aplikasi lokal dan membuat build produksi.
- Perintah lint/format yang benar-benar dikonfigurasi.
- Perintah Vitest dan Playwright, termasuk persiapan browser jika diperlukan.

Catat hasil aktual di docs/verification.md. Jangan menyamakan pemeriksaan otomatis dengan pemasangan PWA atau izin OS pada perangkat nyata.

## Runtime dan batas lokal

### Impeccable

Paket mencakup launcher Windows `scripts/impeccable.cmd`, referensi, dan konfigurasi agen. Engine Windows x64 `0.1.15`, sesuai `scripts/VERSION`, dipasang di `.impeccable/bin/0.1.15/impeccable.exe`. Unduhan berasal dari rilis resmi `engine-v0.1.15` dan cocok dengan checksum SHA256 upstream:

```text
981324ea15cc3c107d46b8133b5be77f639dbcd22e671f1eb7d8c69136e9693b
```

Gunakan wrapper proyek untuk perintah Impeccable, termasuk pemuatan konteks yang diminta skill:

```powershell
.\.codex\impeccable.cmd context
.\.codex\impeccable.cmd hooks status
.\.codex\impeccable.cmd doctor
```

Wrapper `.codex/impeccable.cmd` menetapkan `IMPECCABLE_HOME`, `IMPECCABLE_BIN`, dan direktori skill ke lokasi Nudge hanya selama proses tersebut. Wrapper mengembalikan working directory sesudah menjalankan launcher upstream, dan gagal dengan pesan jelas jika binary lokal hilang. Jangan memanggil launcher upstream secara langsung dengan konfigurasi default yang dapat mengunduh ke direktori pengguna.

Hook resmi dibuat melalui `hooks on`, lalu perintahnya diarahkan ke wrapper lokal. `.codex/hooks.json` memuat `PostToolUse` untuk `Edit|Write|apply_patch` dan `Stop` untuk pemeriksaan akhir. Resolusi jalur Windows menggunakan root Git, sehingga tetap menemukan wrapper ketika sesi dimulai dari subfolder. Konfigurasi bersama ada di `.impeccable/config.json`; persetujuan Impeccable lokal ada di `.impeccable/config.local.json`.

**Persetujuan Codex terpisah:** buka **Settings > Hooks** pada aplikasi atau `/hooks` pada CLI, lalu tinjau dan trust kedua definisi. Codex melewati hook yang belum dipercaya; keberhasilan pemanggilan manual tidak membuktikan pemicu otomatis sudah disetujui. Definisi yang berubah perlu ditinjau lagi.

Binary, checksum unduhan, persetujuan lokal, dan cache runtime dikecualikan melalui `.impeccable/.gitignore`. Setelah clone baru, binary lokal perlu dipulihkan dari rilis resmi dan checksum diverifikasi sebelum hook dapat berjalan. Perintah `hooks on` berikutnya dapat meregenerasi manifest upstream; pertahankan pengarahan ke wrapper lokal saat memperbaiki atau memperbaruinya.

### Taste Skill

Script membutuhkan Node.js 22+ dan Chrome, Edge, atau Chromium. Saat pemasangan, Node.js v22.19.0 serta executable Chrome dan Edge terdeteksi. Belum ada pemeriksaan browser secara langsung. Jalankan script dari root proyek agar berkas kerja `.taste-skill/` tetap lokal. Pencarian aset memerlukan jaringan dan harus mengikuti batas aset serta atribusi dalam skill.

### Anti Slop

`antislop-human` menyertakan `contrast-check.py` dan `contrast-mcp.py`. Konfigurasi mode global tidak dibuat atau diubah. Pilihan mode dalam percakapan tidak otomatis memberi izin menyimpannya secara global.

### IP as Logo

Skill berupa instruksi dan aset contoh; tidak menyertakan engine, script, atau dependensi generasi. Sebelum membuat kandidat, periksa kemampuan serta identitas model gambar yang benar-benar tersedia sesuai persyaratan skill. Gambar showcase upstream adalah referensi, bukan aset logo Nudge.

## Aktivasi dan pembaruan

Skill tersedia untuk dimuat pada giliran berikutnya; bila belum muncul, mulai sesi Codex baru di proyek Nudge. Panggil melalui nama pada frontmatter, misalnya `$impeccable` atau `$design-taste-frontend`.

Saat memperbarui, tinjau README terbaru dan gunakan tujuan lokal yang sama. Perbarui enam folder Anti Slop dari snapshot sumber yang sama. Hindari `npx antislop-ai --update` tanpa meninjau lingkupnya karena dokumentasi menyebut perintah tersebut juga mencari instalasi di direktori pengguna.

## Dokumentasi upstream

- [Anti Slop README](https://github.com/miqdadbadjuber/anti-slop#install) dan [panduan pemasangan folder skill](https://github.com/miqdadbadjuber/anti-slop/blob/main/GUIDE.md#the-skills-directory).
- [Impeccable: pemasangan dan penyalinan folder Codex](https://github.com/pbakaus/impeccable#installation). Folder distribusi hasil build yang disebut README tidak tersedia pada branch sumber yang diunduh; pemasangan ini menyalin folder skill Codex lengkap yang sudah tersedia pada `.agents/skills/impeccable`.
- [Taste Skill: pemasangan dan pilihan skill](https://github.com/Leonxlnx/taste-skill#install).
- [IP as Logo: pemasangan dan penggunaan](https://github.com/s1dashu/ip-as-logo-skill#readme).
