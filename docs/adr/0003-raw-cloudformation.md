# ADR-0003: Raw CloudFormation for infrastructure as code

Date: 2026-07-19 · Status: accepted

## Context

All infrastructure must be IaC, deployed via GitOps. The site is AWS-only by
requirement. Candidates:

- **Terraform** — industry standard, largest job-market footprint, but introduces
  state management (S3 backend, locking) and a third-party dependency.
- **AWS CDK** — infrastructure as TypeScript, unit-testable, synthesizes to
  CloudFormation; adds a build step and an abstraction layer over what actually runs.
- **Raw CloudFormation** — AWS-native, no state to manage (AWS holds it), no
  toolchain beyond the AWS CLI; verbose YAML and no unit tests for infra.

## Decision

Raw CloudFormation templates in `infra/`, one concern per template:
`bootstrap.yaml` (CI identity, one-time), `dns-cert.yaml`, `site.yaml`
(parameterized, deployed once per environment). Compensating controls for the lack
of testability: `cfn-lint` and template validation in CI, small single-purpose
templates, and stack drift detection on a schedule.

## Consequences

- Zero state infrastructure to babysit; the deployed stack *is* the source of truth
  AWS reconciles against.
- Deep familiarity with the layer Terraform/CDK abstract away — CloudFormation
  knowledge transfers upward to both.
- YAML verbosity and slower iteration than CDK; accepted. If the infra outgrows
  three templates, revisit this ADR.
