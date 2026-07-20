# ADR-0006: The hosted zone is owned by domain registration, not CloudFormation

Date: 2026-07-19 · Status: accepted

## Context

Registering `juanjo.be` through Route53 Domains automatically creates a hosted zone
and points the registry's name servers at it. "All infrastructure as code" suggests
CloudFormation should own the zone — but a CFN-managed zone would be a *second* zone
with different name servers, requiring an extra registrar update step, and deleting
the stack would delete the zone while the registry still points at it (taking the
domain down in a way `cfn delete` should never be able to do).

## Decision

The hosted zone is treated as an input, not a managed resource: created once by
registration, passed to `dns-cert.yaml` and `site.yaml` as a `HostedZoneId`
parameter. Everything *inside* the zone (validation records, CAA, site aliases) is
CloudFormation-managed.

## Consequences

- Stack teardown can never orphan the domain's delegation.
- One resource lives outside IaC; it is documented in `infra/README.md` and its id
  is discoverable via `aws route53 list-hosted-zones`.
- The registration itself (contacts, auto-renew) is likewise CLI-managed, since
  Route53 Domains has no CloudFormation support at all.
