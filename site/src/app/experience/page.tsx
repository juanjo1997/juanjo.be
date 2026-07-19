import type { Metadata } from "next";
import { jobs, education, certifications, skills } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Work history of Juan Beltran.",
};

export default function Experience() {
  return (
    <>
      <h1>Experience</h1>
      <div className="timeline">
        {jobs.map((job) => (
          <section className="entry" key={job.company}>
            <div className="entry-head">
              <h3>{job.company}</h3>
              <span className="entry-meta">{job.location}</span>
            </div>
            <div className="entry-stack">
              {job.stack.map((tool) => (
                <span className="tag" key={tool}>
                  {tool}
                </span>
              ))}
            </div>
            {job.roles.map((role) => (
              <div key={role.title}>
                <p className="entry-role">
                  {role.title} <span className="entry-meta">· {role.period}</span>
                </p>
                <ul>
                  {role.bullets.map((bullet) => (
                    <li key={bullet.label}>
                      <strong>{bullet.label}</strong> — {bullet.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </div>
      <h2>Education</h2>
      <p>
        {education.school} — {education.degree}. {education.minor}.
      </p>
      <h2>Certifications</h2>
      <ul>
        {certifications.map((cert) => (
          <li key={cert}>{cert}</li>
        ))}
      </ul>
      <h2>Tools I reach for</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </>
  );
}
