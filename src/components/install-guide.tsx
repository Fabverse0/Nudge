"use client";
import { useEffect, useState } from "react";
type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
};

export function InstallGuide() {
  const [install, setInstall] = useState<InstallEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  useEffect(() => {
    const isInstalled = () =>
      setInstalled(
        window.matchMedia("(display-mode: standalone)").matches ||
          Boolean(
            (navigator as Navigator & { standalone?: boolean }).standalone,
          ),
      );
    const timeout = window.setTimeout(isInstalled, 0);
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setInstall(event as InstallEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstall(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);
  if (installed) return null;
  return (
    <details className="install-guide">
      <summary>Buka Nudge dari layar utama</summary>
      <p>
        Jika tersedia di browsermu, pilih menu browser lalu Pasang aplikasi atau
        Tambahkan ke layar utama. Di Safari iPhone, gunakan menu Bagikan lalu
        Tambahkan ke Layar Utama.
      </p>
      <p>
        Dari ikon, Nudge membuka pemilihan kegiatan langsung. Timer tetap kamu
        mulai sendiri. Pembukaan penuh masih membutuhkan koneksi.
      </p>
      {install && (
        <button
          className="button secondary"
          onClick={async () => {
            await install.prompt();
            await install.userChoice;
            setInstall(null);
          }}
        >
          Pasang Nudge
        </button>
      )}
    </details>
  );
}
