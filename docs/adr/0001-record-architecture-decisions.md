# ADR-0001: Record architecture decisions

Date: 2026-07-19 · Status: accepted

## Context

This repo is both a personal site and a public portfolio of engineering practice.
Decisions (framework, IaC tool, hosting, testing policy) involve real trade-offs, and
the reasoning is worth more than the conclusion — to future me, and to anyone reading
the repo to evaluate how I work.

## Decision

Record every significant decision as an Architecture Decision Record in `docs/adr/`,
numbered sequentially, in the format: Context, Decision, Consequences. An ADR is
written when the decision is made, not retrofitted. Superseded ADRs are marked, never
deleted.

## Consequences

- The "why" survives after memory fades; reviewers can audit reasoning, not just code.
- Small writing overhead per decision — acceptable at this project's pace.
