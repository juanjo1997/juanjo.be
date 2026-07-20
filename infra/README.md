# Infrastructure

Three CloudFormation templates, all deployed in **us-east-1** (CloudFront
requires certificates there; keeping everything in one region keeps the
mental model simple).

| Template | Stack name(s) | Deployed by |
|---|---|---|
| `bootstrap.yaml` | `juanjo-be-bootstrap` | manually, once |
| `dns-cert.yaml` | `juanjo-be-dns-cert` | manually, once |
| `site.yaml` | `juanjo-be-site-staging`, `juanjo-be-site-prod` | manually once, then CI on releases |

Resources that intentionally live **outside** IaC (see ADR-0006):
the domain registration and the hosted zone it created.

## One-time setup

```sh
# 0. The domain was registered with:
#    aws route53domains register-domain --cli-input-json file://register-domain.json
#    (auto-renew on, privacy protection on; registration creates the hosted zone)

ZONE_ID=$(aws route53 list-hosted-zones-by-name --dns-name juanjo.be \
  --query 'HostedZones[0].Id' --output text | cut -d/ -f3)

# 1. CI identity + budget
aws cloudformation deploy --region us-east-1 \
  --stack-name juanjo-be-bootstrap \
  --template-file bootstrap.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --tags project=juanjo-be

# 2. Certificate (waits for DNS validation, a few minutes)
aws cloudformation deploy --region us-east-1 \
  --stack-name juanjo-be-dns-cert \
  --template-file dns-cert.yaml \
  --parameter-overrides HostedZoneId=$ZONE_ID \
  --tags project=juanjo-be

CERT_ARN=$(aws cloudformation describe-stacks --region us-east-1 \
  --stack-name juanjo-be-dns-cert \
  --query 'Stacks[0].Outputs[?OutputKey==`CertificateArn`].OutputValue' --output text)

# 3. Site environments
for ENV in staging prod; do
  [ "$ENV" = prod ] && DOMAIN=juanjo.be WWW=true || DOMAIN=staging.juanjo.be WWW=false
  aws cloudformation deploy --region us-east-1 \
    --stack-name juanjo-be-site-$ENV \
    --template-file site.yaml \
    --parameter-overrides \
      Environment=$ENV SiteDomain=$DOMAIN IncludeWww=$WWW \
      HostedZoneId=$ZONE_ID CertificateArn=$CERT_ARN \
      RouterFunctionCode="$(cat functions/router.js)" \
    --tags project=juanjo-be
done
```

## FinOps

- Every stack is deployed with `--tags project=juanjo-be`; CloudFormation
  propagates the tag to every resource that supports tagging.
- Activate `project` as a cost-allocation tag once (Billing → Cost
  allocation tags) so the $5/month tag-filtered budget in `bootstrap.yaml`
  sees the spend. Activation takes up to 24h to backfill.

## Notes

- `RouterFunctionCode` injects `functions/router.js` as a parameter so the
  CloudFront function has a single, unit-tested source of truth
  (`site/src/lib/edge-router.test.ts`).
- The GitHub Actions roles: staging is assumable from `main` and same-repo
  pull requests; prod only from version tags.
