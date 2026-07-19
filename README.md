# juanjo.be

Personal site of Juan Jose Beltran — software engineering, DevOps, cloud
infrastructure, FinOps.

This repo is deliberately over-engineered for a static site: it doubles as a working
example of how I build things — infrastructure as code, GitOps, CI/CD with OIDC,
and a test suite that gates every change.

## Stack

- **Site**: Next.js (static export, App Router, strict TypeScript) — [`site/`](site/)
- **Infra**: AWS CloudFormation — S3 (private) + CloudFront (OAC) + Route53 + ACM — [`infra/`](infra/)
- **CI/CD**: GitHub Actions with OIDC to AWS (no stored credentials) — [`.github/workflows/`](.github/workflows/)
- **Tests**: Vitest + Testing Library (100% coverage, enforced), Playwright, Lighthouse CI

Every significant decision has an ADR in [`docs/adr/`](docs/adr/).

## Environments

| Env | URL | Deployed by |
|-----|-----|-------------|
| PR preview | `staging.juanjo.be/pr-<n>/` | every pull request |
| Staging | `staging.juanjo.be` | merge to `main` |
| Production | `juanjo.be` | published GitHub Release |

## Develop

```sh
cd site
npm install
npm run dev        # local dev server
npm test           # unit tests + 100% coverage gate
npm run build      # static export to out/
```
