# ADR-0005: Testing strategy and the 100% coverage gate

Date: 2026-07-19 · Status: accepted

## Context

The requirement is 100% code coverage with unit, integration, and regression tests.
100% coverage is controversial: it can incentivize vacuous tests. The counter is to
keep the covered surface meaningful and the exclusion list tiny and public.

## Decision

Three layers:

1. **Unit** — Vitest + React Testing Library over everything in `site/src/`.
   Coverage thresholds pinned to 100% (statements, branches, functions, lines) in
   `vitest.config.ts`; CI fails below. Only `src/` is measured: config files
   (`next.config.ts`, etc.) are declarative wiring exercised by the build itself.
2. **Integration** — Playwright against the real static export (`out/` served
   locally): navigation, links, content, feeds.
3. **Regression** — Playwright visual snapshots (desktop + mobile) and Lighthouse CI
   budgets (performance ≥ 95, accessibility = 100) so design and performance
   regressions fail the PR, not the user.

Infrastructure is linted (`cfn-lint`) and validated in CI; the CloudFront function
is plain JavaScript and gets unit tests like app code.

## Consequences

- A red bar means something real: every branch of app code is executed by tests.
- The gate forces small, testable components — a design pressure we want anyway.
- Visual snapshots need occasional intentional updates when the design changes;
  that churn is the price of catching unintentional changes.
