import { defineConfig, type Plugin } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Next's bundler turns static image imports into { src, width, height }
// objects (StaticImageData); mirror that shape so components using
// next/image render the same way under test.
const staticImageStub: Plugin = {
  name: "static-image-stub",
  enforce: "pre",
  load(id) {
    if (/\.(jpe?g|png|webp|avif|gif)$/.test(id)) {
      const src = `/${path.basename(id)}`;
      return `export default { src: ${JSON.stringify(src)}, width: 800, height: 751 };`;
    }
  },
};

export default defineConfig({
  plugins: [staticImageStub, react()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.test.{ts,tsx}"],
      // The CI gate: anything below 100% fails the build. Config files
      // (next.config.ts etc.) are declarative and excluded via `include`
      // scoping to src/ — the exclusion list is this comment, keep it honest.
      thresholds: { lines: 100, functions: 100, branches: 100, statements: 100 },
    },
  },
});
