import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["src/**"],
      exclude: ["src/**/*.test.{ts,tsx}"],
      // The CI gate: anything below 100% fails the build. Config files
      // (next.config.ts etc.) are declarative and excluded via `include`
      // scoping to src/ — the exclusion list is this comment, keep it honest.
      thresholds: { lines: 100, functions: 100, branches: 100, statements: 100 },
    },
  },
});
