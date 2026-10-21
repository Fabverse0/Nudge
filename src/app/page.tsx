import Link from "next/link";
import {
  ArrowUpRightIcon,
  BookmarkSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { TurtleMascot } from "@/components/ui/turtle-mascot";
import { Brand } from "@/components/brand";
import { ActivityPreview } from "@/components/landing/activity-preview";

export default function HomePage() {
  return (
    <div className="landing">
      <header className="site-header">
        <Brand />
        <nav aria-label="Navigasi utama">
          <a href="#cara-pakai" className="desktop-link">
            Cara pakai
          </a>
          <Link href="/app" className="button secondary compact">
            Buka Nudge
            <ArrowUpRightIcon size={18} />
          </Link>
        </nav>
      </header>
      <main id="main">
        <section className="hero content-width">
          <div className="hero-copy">
            <h1>
              Jeda dulu.
              <br />
              <span>Mulai kecil.</span>
            </h1>
            <p>
              Masih scrolling, padahal ingin melakukan sesuatu? Temukan satu
              kegiatan kecil yang pas dengan mood dan waktumu.
            </p>
            <Link href="/app" className="button primary hero-cta">
              Mulai satu kegiatan
              <ArrowUpRightIcon size={20} />
            </Link>
            <p className="hero-footnote">
              <TurtleMascot pose="symbol" size={28} />
              Dua menit juga boleh.
            </p>
          </div>
          <ActivityPreview />
        </section>
        <section className="small-start content-width" id="cara-pakai">
          <div className="section-heading">
            <h2>Tak harus langsung banyak.</h2>
            <p>
              Kamu tidak perlu menyusun hari yang sempurna untuk mulai melakukan
              sesuatu.
            </p>
          </div>
          <div className="how-flow">
            <article>
              <span className="flow-word">Pilih.</span>
              <p>
                Ceritakan sedikit: ingin apa, punya berapa menit? Mood boleh
                dilewati.
              </p>
            </article>
            <article>
              <span className="flow-word">Coba.</span>
              <p>
                Satu saran, bukan daftar tanpa akhir. Belum pas? Cari kegiatan
                lain.
              </p>
            </article>
            <article>
              <span className="flow-word">Jalani.</span>
              <p>
                Mulai timer, lalu beralih dari layar. Tekan Selesai saat kamu
                selesai.
              </p>
            </article>
          </div>
        </section>
        <section className="activity-world">
          <div className="content-width world-grid">
            <div className="world-intro">
              <h2>Ke mana langkah kecilmu?</h2>
              <p>
                Bereskan sesuatu, gerakkan badan, atau ambil jeda. Pilih yang
                kamu butuhkan sekarang.
              </p>
              <Link className="text-link" href="/app">
                Cari yang pas untukku
                <ArrowUpRightIcon size={20} />
              </Link>
            </div>
            <div className="category-list">
              <article>
                <TurtleMascot
                  pose="tidy"
                  size={128}
                  className="category-illustration"
                />
                <div>
                  <h3>Produktif ringan</h3>
                  <p>
                    Kembalikan lima benda. Rapikan satu sudut. Siapkan langkah
                    berikutnya.
                  </p>
                </div>
              </article>
              <article>
                <TurtleMascot
                  pose="move"
                  size={128}
                  className="category-illustration"
                />
                <div>
                  <h3>Bergerak</h3>
                  <p>
                    Regangkan bahu atau jalan santai. Ikuti kenyamanan badanmu.
                  </p>
                </div>
              </article>
              <article>
                <TurtleMascot
                  pose="journal"
                  size={128}
                  className="category-illustration"
                />
                <div>
                  <h3>Refleksi dan jeda</h3>
                  <p>
                    Istirahatkan pandangan atau journaling di media pilihanmu.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="your-pace content-width">
          <div className="pace-heading">
            <TurtleMascot pose="think" size={100} />
            <h2>Kamu pegang kendalinya.</h2>
          </div>
          <div className="pace-copy">
            <p>
              Boleh lewati mood. Boleh ganti kegiatan. Boleh berhenti dan mulai
              lagi nanti.
            </p>
            <p>
              <BookmarkSimpleIcon size={22} />
              Simpan kegiatan favorit di perangkatmu, tanpa akun. Pengingat
              hanya aktif kalau kamu memilihnya.
            </p>
          </div>
        </section>
        <section className="closing content-width">
          <div>
            <h2>Mulai dari yang kecil.</h2>
            <p>Satu kegiatan untuk waktu yang kamu punya.</p>
          </div>
          <Link href="/app" className="button primary">
            Mulai kegiatan
            <ArrowUpRightIcon size={20} />
          </Link>
        </section>
      </main>
      <footer className="site-footer content-width">
        <Brand />
        <p>Teman untuk satu langkah kecil.</p>
        <Link href="/app">Masuk ke kegiatan</Link>
      </footer>
    </div>
  );
}
