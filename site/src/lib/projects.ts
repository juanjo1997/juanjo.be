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
      "Algorithmic trading engine for Kalshi 15-minute BTC binary markets with backtest, paper, and live modes and YAML-defined strategies. O(1)-per-tick incremental indicator engine (EMA, VWAP, RSI, ATR, Hurst, and friends) and a Streamlit dashboard for run analysis. The active strategy was validated with bootstrap confidence intervals before going live.",
  },
  {
    name: "kalshi-poly-arb",
    stack: "Rust",
    description:
      "Cross-exchange arbitrage bot for Kalshi and Polymarket 15-minute crypto markets. Streams normalized top-of-book from both venues, scores fee-aware complementary opportunities, and executes Polymarket-first with a persistent-hedge state machine per coin — partial-fill-aware retries, circuit breakers, and full telemetry to SQLite.",
  },
  {
    name: "openclaw",
    stack: "CloudFormation · Shell",
    description:
      "One-command AWS deployment for a personal automation VM: a CloudFormation stack wiring EC2, Secrets Manager, and Tailscale so the instance joins a private tailnet and provisions itself on first boot.",
  },
  {
    name: "db-cost-allocator",
    stack: "Python",
    description:
      "FinOps utility that allocates the cost of a shared database server across its tenant databases — turning one opaque line item into per-team accountability.",
    url: "https://github.com/juanjo1997/db-cost-allocator",
  },
  {
    name: "juanjo.be",
    stack: "TypeScript · CloudFormation",
    description:
      "This site. Next.js static export on private S3 behind CloudFront, raw CloudFormation, GitHub Actions with OIDC, PR preview environments, and a 100% test-coverage gate. Every decision is recorded as an ADR in the repo.",
    url: "https://github.com/juanjo1997/juanjo.be",
  },
];
