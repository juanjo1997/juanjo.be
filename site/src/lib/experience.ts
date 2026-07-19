export type Bullet = {
  label: string;
  text: string;
};

export type Role = {
  title: string;
  period: string;
  bullets: Bullet[];
};

export type Job = {
  company: string;
  location: string;
  stack: string[];
  roles: Role[];
};

export const jobs: Job[] = [
  {
    company: "Optro",
    location: "Remote (Miami, FL)",
    stack: ["Kubernetes", "AWS", "Azure", "ArgoCD", "Helm", "GitHub Actions"],
    roles: [
      {
        title: "Senior Software Engineer II — DevOps/FinOps",
        period: "Aug 2024 – present",
        bullets: [
          {
            label: "Envoy Gateway migration",
            text: "zero-downtime, per-tenant cutover from NGINX Ingress across EKS and AKS fleets",
          },
          {
            label: "Rebrand infrastructure",
            text: "moved 6,000+ application instances to a new domain on a tight deadline",
          },
          {
            label: "ARM migration",
            text: "15% price/performance improvement on core workloads",
          },
          {
            label: "FinOps CI checks",
            text: "GitHub Actions gate that flags costly resource-request changes in Helm PRs",
          },
          {
            label: "Least-privilege hardening",
            text: "scoped service accounts across 20+ Kubernetes clusters",
          },
          {
            label: "Budget modeling",
            text: "bottoms-up AWS budget; APAC and FedRAMP expansion cost models",
          },
          {
            label: "Tagging strategy",
            text: "99% AWS / 95% Azure cost allocation",
          },
        ],
      },
      {
        title: "Senior Software Engineer I — DevOps/FinOps",
        period: "Jul 2023 – Aug 2024",
        bullets: [
          {
            label: "Self-hosted CI runners",
            text: "moved the test suite to Kubernetes runners, cutting cost and runtime",
          },
          {
            label: "Cluster migration",
            text: "4,000+ instances across 20+ EKS clusters onto new v2 clusters",
          },
          {
            label: "Account separation",
            text: "dedicated AWS accounts for QA, demo, support, and trial environments",
          },
          {
            label: "EDP renewal",
            text: "validated rates against projected spend for AWS contract negotiations",
          },
          {
            label: "Cost visibility",
            text: "weekly cloud-spend office hours; cost tooling rolled out org-wide",
          },
        ],
      },
    ],
  },
  {
    company: "UJET.CX",
    location: "Remote (Miami, FL)",
    stack: ["GCP", "AWS", "Terraform", "BigQuery", "Kubernetes"],
    roles: [
      {
        title: "Site Reliability Engineer — FinOps",
        period: "Mar 2022 – Jul 2023",
        bullets: [
          {
            label: "30% spend reduction",
            text: "savings plans, reservations, rightsizing, deprecating unused resources",
          },
          {
            label: "Binlog-to-BigQuery pipeline",
            text: "Datastream/Dataflow/Pub-Sub streaming, packaged as a Terraform module",
          },
          {
            label: "Multi-cloud spend dashboard",
            text: "BigQuery + Athena + Data Studio; org-wide tagging policy",
          },
          {
            label: "SRE work",
            text: "Terraform IaC, internal Kubernetes operator, on-call rotation",
          },
        ],
      },
    ],
  },
  {
    company: "World Fuel Services",
    location: "Miami, FL",
    stack: ["AWS", "FinOps"],
    roles: [
      {
        title: "IT Business Analyst — Cloud Platform Governance",
        period: "Feb 2021 – Mar 2022",
        bullets: [
          {
            label: "$35k+/month saved",
            text: "EBS modernization, unused-asset cleanup, RDS reservations",
          },
          {
            label: "Led 3 interns",
            text: "optimizations worth a further 10% of the org's AWS spend",
          },
          {
            label: "Reservation tracking",
            text: "commitment-usage views in the internal spend dashboard",
          },
        ],
      },
    ],
  },
];

export const education = {
  school: "University of Florida",
  degree: "B.S. Industrial & Systems Engineering, magna cum laude",
  minor: "Minor in Statistics",
} as const;

export const certifications = [
  "AWS Certified Solutions Architect – Associate",
  "Google Cloud Professional Cloud Architect",
  "FinOps Certified Practitioner",
] as const;

export const skills = [
  "Kubernetes (EKS/AKS)",
  "Terraform · CloudFormation",
  "ArgoCD · Helm",
  "GitHub Actions",
  "Python · Go",
  "AWS · GCP · Azure",
  "Grafana · Datadog · New Relic",
  "Cloud cost management & forecasting",
] as const;
