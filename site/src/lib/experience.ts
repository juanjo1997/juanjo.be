export type Role = {
  title: string;
  period: string;
  bullets: string[];
};

export type Job = {
  company: string;
  location: string;
  roles: Role[];
};

export const jobs: Job[] = [
  {
    company: "AuditBoard",
    location: "Remote (Miami, FL)",
    roles: [
      {
        title: "Senior Software Engineer II — DevOps/FinOps",
        period: "Aug 2024 – present",
        bullets: [
          "Pioneered the migration from NGINX Ingress to Envoy Gateway across EKS and AKS fleets: zero-downtime per-tenant cutover with dedicated load balancers, cert-manager TLS, DNS-driven traffic shifting with instant rollback — spanning Helm, ArgoCD, and the tenant-provisioning platform.",
          "Led the infrastructure side of an organization-wide rebrand, moving 6,000+ application instances to a new domain on a tight deadline.",
          "Drove ARM migration of core application workloads for a 15% price/performance improvement.",
          "Built a FinOps CI/CD check in GitHub Actions that flags significant resource-request changes in Helm chart PRs — cost review as part of the SDLC, not an afterthought.",
          "Hardened 20+ Kubernetes clusters to least-privilege: replaced over-privileged default service accounts with scoped, dedicated accounts and removed legacy rolebindings.",
          "Built the bottoms-up hosting model for the AWS infrastructure budget and modeled costs for APAC and FedRAMP expansion with security and finance.",
          "Implemented a tagging strategy reaching 99% AWS / 95% Azure cost allocation.",
        ],
      },
      {
        title: "Senior Software Engineer I — DevOps/FinOps",
        period: "Jul 2023 – Aug 2024",
        bullets: [
          "Migrated the application test suite from GitHub-hosted to self-hosted Kubernetes runners (Actions Runner Controller), cutting both CI cost and job runtime.",
          "Migrated 4,000+ application instances across 20+ EKS clusters to new v2 Kubernetes clusters with better observability, pod capacity, and node allocation.",
          "Separated QA, demo, support, and trial environments into dedicated AWS accounts with an environment-owner model.",
          "Supported AWS Enterprise Discount Program renewal negotiations, validating rates against projected spend.",
          "Ran weekly cloud-spend office hours for engineering and finance; drove procurement and rollout of cloud cost management tooling.",
        ],
      },
    ],
  },
  {
    company: "UJET.CX",
    location: "Remote (Miami, FL)",
    roles: [
      {
        title: "Site Reliability Engineer — FinOps",
        period: "Mar 2022 – Jul 2023",
        bullets: [
          "Reduced overall cloud spend by 30% via AWS/GCP savings plans, database reservations, deprecating unused resources, and rightsizing Kubernetes, Redis, and Kafka workloads.",
          "Built a streaming pipeline from MySQL binlogs to BigQuery (Datastream, Dataflow, Cloud Storage, Pub/Sub), packaged as a reusable Terraform module.",
          "Developed a multi-cloud spend dashboard on BigQuery, Athena, and Data Studio; established the org's infrastructure tagging policy.",
          "Codified infrastructure in Terraform, contributed to an internal Kubernetes operator, and served in the on-call rotation.",
        ],
      },
    ],
  },
  {
    company: "World Fuel Services",
    location: "Miami, FL",
    roles: [
      {
        title: "IT Business Analyst — Cloud Platform Governance",
        period: "Feb 2021 – Mar 2022",
        bullets: [
          "Cut monthly AWS spend by $35k+ through EBS modernization, cleanup of unused assets, and RDS reservations.",
          "Managed 3 interns through FinOps optimizations worth a further 10% of AWS costs: rightsizing 227 EC2 instances, modernizing 1,061 EBS volumes, deleting 1,683 aged snapshots.",
          "Built reservation-usage tracking into the internal AWS spend dashboard to time new commitment purchases.",
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
