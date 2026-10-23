import { defineConfig } from "@playwright/test";
import config from "./playwright.config";

export default defineConfig({
  ...config,
  workers: 1,
  timeout: 60000,
  testMatch: ["landing-studio.spec.ts", "landing-reference.spec.ts"],
  use: {
    ...config.use,
    baseURL: "http://127.0.0.1:3100",
    serviceWorkers: "block",
  },
  webServer: {
    command: "npm run dev -- --webpack --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: true,
  },
});
