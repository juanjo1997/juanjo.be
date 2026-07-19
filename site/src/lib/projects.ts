export type Project = {
  name: string;
  stack: string;
  description: string;
  /** Link rendered only when the repo is public. */
  url?: string;
};

export const projects: Project[] = [
  {
    name: "trading-engine",
    stack: "Python",
    description:
      "Trading engine for Kalshi BTC binary markets: backtest, paper, and live modes, YAML-defined strategies, O(1) incremental indicators.",
  },
  {
    name: "kalshi-poly-arb",
    stack: "Rust",
    description:
      "Cross-exchange arbitrage bot for Kalshi × Polymarket with fee-aware scoring and a persistent-hedge state machine per coin.",
  },
  {
    name: "openclaw",
    stack: "CloudFormation · Shell",
    description:
      "One-command CloudFormation stack for a self-provisioning automation VM: EC2, Secrets Manager, and Tailscale.",
  },
  {
    name: "db-cost-allocator",
    stack: "Python",
    description:
      "FinOps utility that splits a shared database server's cost across its tenant databases for per-team accountability.",
    url: "https://github.com/juanjo1997/db-cost-allocator",
  },
  {
    name: "juanjo.be",
    stack: "TypeScript · CloudFormation",
    description:
      "This site: static Next.js on S3 + CloudFront, raw CloudFormation, OIDC deploys, PR previews, 100% coverage gate, ADRs.",
    url: "https://github.com/juanjo1997/juanjo.be",
  },
];
