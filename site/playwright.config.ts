import { defineConfig, devices } from "@playwright/test";

// E2E tests run against the real static export in out/ — the exact bytes
// CloudFront will serve — not the dev server.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:4300",
    trace: "on-first-retry",
  },
  expect: {
    toHaveScreenshot: {
      // Small tolerance for font antialiasing differences between runs.
      maxDiffPixelRatio: 0.01,
    },
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
    {
      // Pixel 7 keeps everything on Chromium — one browser to install in CI.
      name: "mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    command: "npx serve out -l 4300",
    url: "http://localhost:4300",
    reuseExistingServer: !process.env.CI,
  },
});
