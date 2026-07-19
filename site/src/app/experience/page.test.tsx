import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Experience, { metadata } from "./page";
import { certifications, education, jobs } from "@/lib/experience";

describe("Experience", () => {
  it("renders every job with its stack, roles, and bullets", () => {
    render(<Experience />);
    for (const job of jobs) {
      expect(screen.getByRole("heading", { name: job.company })).toBeInTheDocument();
      for (const tool of job.stack) {
        expect(screen.getAllByText(tool).length).toBeGreaterThan(0);
      }
      for (const role of job.roles) {
        for (const bullet of role.bullets) {
          expect(screen.getByText(bullet.label)).toBeInTheDocument();
        }
      }
    }
  });

  it("renders education and certifications", () => {
    render(<Experience />);
    expect(screen.getByText(new RegExp(education.school))).toBeInTheDocument();
    for (const cert of certifications) {
      expect(screen.getByText(cert)).toBeInTheDocument();
    }
  });

  it("has a page title", () => {
    expect(metadata.title).toBe("Experience");
  });
});
