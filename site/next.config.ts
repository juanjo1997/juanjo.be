import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` emits plain HTML/CSS/JS into out/,
  // which is all S3+CloudFront can serve. No Node server anywhere.
  output: "export",
  // Emit each route as <route>/index.html so CloudFront can serve
  // directory URLs with a small URL-rewrite function at the edge.
  trailingSlash: true,
  // The Image Optimization API needs a server; unavailable under output: "export".
  images: { unoptimized: true },
  // PR previews deploy under staging.juanjo.be/pr-<n>/, so asset and link
  // URLs must be prefixed at build time. Unset for staging root and prod.
  basePath: process.env.BASE_PATH ?? "",
};

export default nextConfig;
