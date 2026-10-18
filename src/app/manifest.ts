import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return { name: "Nudge | Satu langkah kecil", short_name: "Nudge", description: "Teman untuk memulai satu kegiatan kecil.", lang: "id", id: "/app", start_url: "/app", scope: "/", display: "standalone", background_color: "#FAF8F4", theme_color: "#FAF8F4", icons: [{ src: "/icons/192", sizes: "192x192", type: "image/png", purpose: "any" }, { src: "/icons/512", sizes: "512x512", type: "image/png", purpose: "any" }] };
}
