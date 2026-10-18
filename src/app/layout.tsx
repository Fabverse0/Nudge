import type { Metadata, Viewport } from "next";
import "@fontsource-variable/nunito";
import "./globals.css";
import { PwaRegistration } from "@/components/pwa-registration";

export const metadata: Metadata = {
  title: { default: "Nudge | Satu langkah kecil", template: "%s | Nudge" },
  description: "Sedang gabut atau ingin jeda dari scrolling? Pilih satu kegiatan kecil sesuai mood dan waktumu.",
  applicationName: "Nudge",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Nudge" },
};
export const viewport: Viewport = { themeColor: "#FAF8F4", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body><a className="skip-link" href="#main">Lewati ke isi</a>{children}<PwaRegistration /></body></html>;
}
