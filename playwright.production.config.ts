import { defineConfig } from "@playwright/test";
import config from "./playwright.config";

export default defineConfig({
  ...config,
  testMatch: "pwa.spec.ts",
  testIgnore: [],
  use: {
    ...config.use,
    baseURL: "http://127.0.0.1:3100",
    serviceWorkers: "allow",
  },
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
  },
});
