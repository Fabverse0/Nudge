import Link from "next/link";
import { Turtle } from "@/components/duo-landing/illustrations/characters";
import "./site-footer.css";

type FooterLink = { label: string; href: string };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Tentang Nudge",
    links: [
      { label: "Cerita kami", href: "#fitur" },
      { label: "Cara kerjanya", href: "#fitur" },
      { label: "Kenapa kura-kura?", href: "#koleksi" },
      { label: "Prinsip kami", href: "#tantangan" },
    ],
  },
  {
    title: "Produk",
    links: [
      { label: "Mulai sekarang", href: "/app" },
      { label: "Aktivitas 2 menit", href: "/app" },
      { label: "Pasang di layar utama", href: "#di-mana-saja" },
      { label: "Koleksi aktivitas", href: "#koleksi" },
    ],
  },
  {
    title: "Bantuan & dukungan",
    links: [
      { label: "Pusat bantuan", href: "#fitur" },
      { label: "Pakai tanpa internet", href: "#di-mana-saja" },
      { label: "Tantangan kecil", href: "#tantangan" },
    ],
  },
  {
    title: "Privasi & ketentuan",
    links: [
      { label: "Data tetap di perangkatmu", href: "#di-mana-saja" },
      { label: "Tanpa akun, tanpa iklan", href: "#fitur" },
      { label: "Ketentuan", href: "#fitur" },
    ],
  },
  {
    title: "Sosial",
    links: [
      { label: "Ajak teman jeda", href: "#tantangan" },
      { label: "Bagikan Nudge", href: "#tantangan" },
      { label: "Kabar terbaru", href: "#koleksi" },
    ],
  },
];

const LANGUAGES = [
  { label: "Bahasa Indonesia", active: true },
  { label: "English", active: false },
  { label: "Basa Jawa", active: false },
  { label: "Basa Sunda", active: false },
  { label: "Bahasa Melayu", active: false },
  { label: "日本語", active: false },
];

function FooterAnchor({ link }: { link: FooterLink }) {
  if (link.href.startsWith("#")) {
    return (
      <a className="dl-footer__link" href={link.href}>
        {link.label}
      </a>
    );
  }
  return (
    <Link className="dl-footer__link" href={link.href}>
      {link.label}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="dl-footer">
      <div className="dl-footer__peek" data-dl-scene aria-hidden="true">
        <div className="dl-footer__peek-bob">
          <Turtle pose="wave" className="dl-footer__turtle" />
        </div>
      </div>

      <div className="dl-footer__inner">
        <div className="dl-footer__cols">
          {COLUMNS.map((col) => (
            <section key={col.title} className="dl-footer__col">
              <h2 className="dl-footer__heading">{col.title}</h2>
              <ul className="dl-footer__list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterAnchor link={link} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <hr className="dl-footer__rule" />

        <div className="dl-footer__langs">
          <h2 className="dl-footer__langs-title">Bahasa situs:</h2>
          <ul className="dl-footer__langs-list">
            {LANGUAGES.map((lang) => (
              <li key={lang.label}>
                {lang.active ? (
                  <span
                    className="dl-footer__lang is-active"
                    aria-current="true"
                  >
                    {lang.label}
                  </span>
                ) : (
                  <span
                    className="dl-footer__lang"
                    aria-disabled="true"
                    title="Segera hadir"
                  >
                    {lang.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <p className="dl-footer__copy">
          © 2026 Nudge. Satu langkah kecil, kapan saja.
        </p>
      </div>
    </footer>
  );
}
