# ADR-0002: Next.js with static export for the frontend

Date: 2026-07-19 · Status: accepted

## Context

The site is content-focused (bio, experience, projects, writing) and will be served
from S3 + CloudFront, which can only serve static files. Candidates considered:

- **Astro** — purpose-built for content sites, ships zero JS by default, likely the
  best pure technical fit for this workload.
- **Next.js (static export)** — React, the most widely used frontend framework in
  industry; `output: "export"` produces a fully static site.
- **Hand-rolled HTML/CSS + Vite** — maximum control, most manual upkeep.

A goal of this site is marketability: demonstrating current, in-demand skills.

## Decision

Next.js with `output: "export"`, App Router, TypeScript strict mode. Constraints
accepted up front: no server features (Image Optimization API, middleware, server
actions) — everything must render at build time. `trailingSlash: true` so every route
emits `<route>/index.html`, which pairs with a CloudFront URL-rewrite function
(see ADR-0004).

## Consequences

- React/Next.js experience is demonstrable in a public repo; hiring signal is strong.
- We carry more framework than a static site strictly needs (accepted trade-off,
  chosen over Astro with eyes open).
- Any future feature requiring a server (forms, comments) needs an external service
  or a rethink — flagged now so it's never an accident.
