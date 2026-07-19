import type { Metadata } from "next";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Side projects of Juan Beltran.",
};

export default function Projects() {
  return (
    <>
      <h1>Projects</h1>
      <p className="lede">
        Things I build on my own time — mostly trading systems and infrastructure tooling.
      </p>
      <div className="project-grid">
        {projects.map((project) => (
          <section className="project" key={project.name}>
            <div className="project-head">
              <h3>
                {project.url ? <a href={project.url}>{project.name}</a> : project.name}
              </h3>
              <span className="tag">{project.stack}</span>
            </div>
            <p>{project.description}</p>
          </section>
        ))}
      </div>
    </>
  );
}
