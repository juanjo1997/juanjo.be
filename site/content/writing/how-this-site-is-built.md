---
title: "This site is overengineered on purpose"
date: "2026-07-19"
description: "Why a static page with three routes has a CI/CD pipeline, PR preview environments, and a 100% coverage gate."
---

This site is a few kilobytes of HTML. It could be a single S3 bucket someone
clicks together in the console in ten minutes. Instead it has CloudFormation
stacks, OIDC-authenticated deploys, per-PR preview environments, and a test
suite that fails the build below 100% coverage.

That's the point. I work in DevOps and FinOps — "how it's deployed" and "what it
costs" are the interesting parts of any system to me. A personal site is the one
production system where I get to make every call, so the repo doubles as a
worked example of how I like infrastructure to be run. The
[whole thing is public](https://github.com/juanjo1997/juanjo.be), including an
ADR for every decision below.

## The stack, and what it deliberately isn't

The site is **Next.js with `output: "export"`** — the build emits plain HTML
into a directory, and that directory is the entire deployable artifact. No
server, no runtime, nothing to patch at 2am. Astro would honestly have been the
better pure-technical fit for a content site; I picked Next with eyes open
because React is the ecosystem I want represented here. That trade-off is
written down in ADR-0002, which future-me will appreciate when he's tempted to
rewrite everything.

Hosting is a **private S3 bucket behind CloudFront**. The bucket has Block
Public Access on; CloudFront reaches it through Origin Access Control. There is
no public bucket anywhere, which is the correct default in 2026 and still
somehow not the default in most tutorials. A ten-line CloudFront Function
rewrites `/writing/` to `/writing/index.html`, because CloudFront's default
root object only works at the root — the kind of detail you only learn by
actually shipping one of these.

## Raw CloudFormation, by choice

I use Terraform at work and like it. For this project I went with **raw
CloudFormation**, for one big reason: there is no state file. AWS holds the
state; the stack _is_ the record. For a personal project that might sit
untouched for six months, "nothing to babysit" beats "nicer syntax" every time.

The templates are small and single-purpose: one for CI identity (a GitHub OIDC
provider and two scoped deploy roles — no long-lived AWS keys exist anywhere),
one for DNS and the certificate, and one parameterized template deployed twice
for staging and production. `cfn-lint` runs in CI because YAML will absolutely
let you misspell `BucketName` at 11pm.

## GitOps for a site nobody else commits to

Every PR gets deployed to a real preview URL under `staging.juanjo.be/pr-N/`,
built with a `basePath` baked in at build time. Merging to `main` updates
staging. Production only deploys when I publish a GitHub Release. This is more
ceremony than a solo project needs — and exactly the ceremony a team needs, so
I'd rather demonstrate it here than describe it in an interview.

## The 100% coverage take

Hot take: 100% coverage is usually a bad target, because teams hit it with
vacuous tests. I set it here anyway, with two rules that keep it honest: only
`src/` is measured (config wiring is exercised by the build itself), and the
exclusion list is public and tiny. What I actually get from the gate is
pressure toward small, testable components — the coverage number is a
byproduct.

## What it costs

The FinOps section. Monthly: **$0.50** for the Route53 hosted zone, and cents
for S3 storage and CloudFront requests at personal-site traffic. Annually: $11
for the domain. The certificate is free (ACM), CI is free (public repo), and
there's a $5 budget alarm that will page me if I ever manage to make a static
site expensive. Total: roughly a dollar a month to run a setup that
demonstrates the same patterns I use to manage cloud spend at work — that's the
best ROI I can offer a hiring manager.
