import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRightIcon,
  BookmarkSimpleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { TurtleMascot } from "@/components/ui/turtle-mascot";
import { Brand } from "@/components/brand";
import { ActivityPreview } from "@/components/landing/activity-preview";
import { LandingMotion } from "@/components/landing/landing-motion";
import "@/components/landing/landing-studio.css";

export default function HomePage() {
  return (
    <LandingMotion>
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
          <div className="studio-scene">
            <Image
              src="/brand/landing/nudge-small-step.webp"
              alt="C1 beranjak dari ponsel menuju buku catatan dan kegiatan kecil"
              width={1200}
              height={900}
              sizes="(max-width: 700px) 100vw, 52vw"
              loading="eager"
              fetchPriority="high"
              className="studio-hero-art"
            />
          </div>
        </section>
        <ActivityPreview />
        <section className="small-start content-width" id="cara-pakai">
          <div className="section-heading">
            <h2 data-studio-motion="copy">Tak harus langsung banyak.</h2>
            <p data-studio-motion="copy" data-studio-delay="70">
              Kamu tidak perlu menyusun hari yang sempurna untuk mulai melakukan
              sesuatu.
            </p>
          </div>
          <div className="how-flow">
            <article data-studio-motion="step">
              <span className="flow-word">Pilih.</span>
              <p>
                Ceritakan sedikit: ingin apa, punya berapa menit? Mood boleh
                dilewati.
              </p>
            </article>
            <article data-studio-motion="step" data-studio-delay="70">
              <span className="flow-word">Coba.</span>
              <p>
                Satu saran, bukan daftar tanpa akhir. Belum pas? Cari kegiatan
                lain.
              </p>
            </article>
            <article data-studio-motion="step" data-studio-delay="140">
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
              <h2 data-studio-motion="copy">Ke mana langkah kecilmu?</h2>
              <p data-studio-motion="copy" data-studio-delay="70">
                Bereskan sesuatu, gerakkan badan, atau ambil jeda. Pilih yang
                kamu butuhkan sekarang.
              </p>
              <Link className="text-link" href="/app">
                Cari yang pas untukku
                <ArrowUpRightIcon size={20} />
              </Link>
            </div>
            <div className="category-list">
              <article className="studio-category studio-category-tidy">
                <div className="studio-art-frame" data-studio-motion="image">
                  <TurtleMascot
                    pose="tidy"
                    size={320}
                    className="category-illustration"
                  />
                </div>
                <div>
                  <h3 data-studio-motion="copy">Produktif ringan</h3>
                  <p data-studio-motion="copy" data-studio-delay="70">
                    Kembalikan lima benda. Rapikan satu sudut. Siapkan langkah
                    berikutnya.
                  </p>
                </div>
              </article>
              <article className="studio-category studio-category-move">
                <div className="studio-art-frame" data-studio-motion="image">
                  <TurtleMascot
                    pose="move"
                    size={320}
                    className="category-illustration"
                  />
                </div>
                <div>
                  <h3 data-studio-motion="copy">Bergerak</h3>
                  <p data-studio-motion="copy" data-studio-delay="70">
                    Regangkan bahu atau jalan santai. Ikuti kenyamanan badanmu.
                  </p>
                </div>
              </article>
              <article className="studio-category studio-category-journal">
                <div className="studio-art-frame" data-studio-motion="image">
                  <TurtleMascot
                    pose="journal"
                    size={320}
                    className="category-illustration"
                  />
                </div>
                <div>
                  <h3 data-studio-motion="copy">Refleksi dan jeda</h3>
                  <p data-studio-motion="copy" data-studio-delay="70">
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
            <h2 data-studio-motion="copy">Kamu pegang kendalinya.</h2>
          </div>
          <div className="pace-copy">
            <p data-studio-motion="copy" data-studio-delay="70">
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
            <h2 data-studio-motion="copy">Mulai dari yang kecil.</h2>
            <p data-studio-motion="copy" data-studio-delay="70">
              Satu kegiatan untuk waktu yang kamu punya.
            </p>
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
    </LandingMotion>
  );
}
