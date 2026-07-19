# ADR-0004: Private S3 + CloudFront with OAC for hosting

Date: 2026-07-19 · Status: accepted

## Context

A static site on AWS can be hosted several ways: S3 website endpoints (public
bucket, HTTP only, no custom-domain TLS), Amplify Hosting (managed, less visible
machinery), or S3 + CloudFront.

## Decision

Private S3 buckets (Block Public Access on) fronted by CloudFront using **Origin
Access Control (OAC)** — only the distribution can read the bucket. TLS via ACM
certificate in us-east-1 (a CloudFront requirement). A **CloudFront Function**
rewrites viewer requests: `/writing/` → `/writing/index.html`, because CloudFront's
default-root-object only applies at the domain root, while the static export emits
per-directory index files. Security headers (HSTS, CSP, X-Content-Type-Options,
Referrer-Policy) attached via a ResponseHeadersPolicy. Two environments from one
parameterized template: staging (`staging.juanjo.be`, PR previews under `/pr-<n>/`)
and prod (`juanjo.be`, plus `www` redirect).

## Consequences

- No public buckets anywhere; the only entry point is CloudFront over HTTPS.
- Monthly cost is cents (plus $0.50 hosted zone); ACM and OAC are free.
- The URL-rewrite function is a small piece of edge JavaScript we own — it gets
  unit tests like any other code.
- Deploys must invalidate CloudFront or wait out cache TTLs — handled in CI/CD.
