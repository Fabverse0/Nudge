"use client";
import { useEffect } from "react";

export function PwaRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js", { updateViaCache: "none" })
        .catch(() => {
          /* Manual activity use remains available when registration fails. */
        });
    }
  }, []);
  return null;
}
