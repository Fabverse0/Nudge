import Link from "next/link";
import { Brand } from "@/components/brand";
import { AliveMotion } from "@/components/landing/alive-motion";
import { AliveDuration } from "@/components/landing/alive-duration";
import { LandingScene } from "@/components/landing/landing-scene";
import { StartActivityIcon } from "@/components/landing/start-activity-icon";
import { HowStory } from "@/components/landing/how-story";
import { ControlStory } from "@/components/landing/control-story";
import { activities } from "@/lib/activities/catalog";
import "@/components/landing/landing-alive.css";
import "@/components/landing/alive-scenes.css";
import "@/components/landing/time-story.css";
import "@/components/landing/stretch-story.css";
import "@/components/landing/how-story.css";
import "@/components/landing/control-story.css";

export default function HomePage() {
  return (
    <AliveMotion>
      <header className="alive-header">
        <div className="alive-header-inner">
          <Brand />
          <nav aria-label="Navigasi utama">
            <a href="#cara-pakai" className="alive-how-link">
              Cara pakai
            </a>
            <Link href="/app" className="alive-button alive-header-cta">
              Mulai kegiatan
            </Link>
          </nav>
        </div>
      </header>
      <main id="main">
        <section
          className="alive-hero alive-section"
          aria-labelledby="hero-title"
        >
          <LandingScene kind="hero" priority />
          <div className="alive-copy">
            <h1 id="hero-title" lang="en">
              Small steps.
              <br />
              <span>A fuller life.</span>
            </h1>
            <p>Temukan kegiatan kecil yang pas dengan mood dan waktumu.</p>
            <Link href="/app" className="alive-button alive-hero-cta">
              Mulai kegiatan
              <StartActivityIcon />
            </Link>
            <p className="alive-note">Tanpa akun. Dua menit juga boleh.</p>
          </div>
        </section>
        <div
          className="alive-activity-ribbon"
          aria-label="Pilihan kegiatan Nudge"
        >
          <span>Bergerak</span>
          <span>Merapikan</span>
          <span>Journaling</span>
          <span>Jeda tanpa layar</span>
        </div>
        <section
          className="alive-section alive-phone-section"
          aria-labelledby="phone-title"
        >
          <div className="alive-copy">
            <h2 id="phone-title">
              Scroll sebentar.
              <br />
              Lalu kebablasan?
            </h2>
            <p>
              Kadang yang kamu butuhkan cuma satu ide untuk beranjak. Nudge
              membantumu memilih kegiatan kecil yang bisa langsung dicoba.
            </p>
            <p className="alive-copy-soft">
              Letakkan ponsel. Beri hal lain kesempatan.
            </p>
          </div>
          <LandingScene kind="phone" />
        </section>
        <AliveDuration />
        <HowStory />
        <section
          className="alive-section alive-move-section"
          aria-labelledby="move-title"
        >
          <LandingScene kind="move" />
          <div className="alive-copy">
            <h2 id="move-title">
              Beri badanmu
              <br />
              giliran.
            </h2>
            <p>
              Regangkan bahu atau jalan santai sebentar. Ikuti kenyamanan
              badanmu, dengan pilihan di dalam ruangan dan tanpa alat.
            </p>
          </div>
        </section>
        <section
          className="alive-section alive-tidy-section"
          aria-labelledby="tidy-title"
        >
          <div className="alive-copy">
            <h2 id="tidy-title">
              Rapikan
              <br />
              satu sudut.
            </h2>
            <p>
              Kembalikan lima benda. Rapikan meja. Tidak perlu membereskan
              semuanya untuk membuat satu sudut terasa lebih lega.
            </p>
          </div>
          <LandingScene kind="tidy" />
        </section>
        <section
          className="alive-section alive-journal-section"
          aria-labelledby="journal-title"
        >
          <LandingScene kind="journal" />
          <div className="alive-copy">
            <h2 id="journal-title">
              Tuangkan
              <br />
              satu pikiran.
            </h2>
            <p>
              Satu kalimat tentang harimu juga cukup. Journaling di kertas atau
              media pilihanmu, dengan panduan kegiatan yang sederhana.
            </p>
            <p className="alive-copy-soft">
              Tulisanmu tetap milikmu. Nudge tidak menyimpannya.
            </p>
          </div>
        </section>
        <ControlStory
          examples={activities
            .filter(({ id }) =>
              ["stretch-2", "desk-5", "journal-5"].includes(id),
            )
            .map(({ id, title, minutes }) => ({ id, title, minutes }))}
        />
        <section className="alive-closing" aria-labelledby="closing-title">
          <LandingScene kind="welcome" />
          <div className="alive-closing-copy">
            <div lang="en">
              <h2 id="closing-title">
                Your next small step
                <br />
                starts here.
              </h2>
              <p>Make room for what matters, one small act at a time.</p>
            </div>
            <Link href="/app" className="alive-button">
              Mulai kegiatan
              <StartActivityIcon />
            </Link>
          </div>
        </section>
      </main>
      <footer className="alive-footer">
        <Brand />
        <p>Teman untuk satu langkah kecil.</p>
        <Link href="/app">Masuk ke kegiatan</Link>
      </footer>
    </AliveMotion>
  );
}
