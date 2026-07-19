import Link from "next/link";
import { site } from "@/lib/site";
import { certifications } from "@/lib/experience";

export default function Home() {
  return (
    <>
      <h1 className="cursor">{site.name}</h1>
      <p className="lede">{site.description}</p>
      <p>
        I&apos;m a senior software engineer at AuditBoard, where I run large-scale
        Kubernetes migrations by day and hunt down every wasted cloud dollar the rest of
        the time. Before that I did SRE and FinOps work at UJET and cloud governance at
        World Fuel Services.
      </p>
      <p>
        The through-line: infrastructure that is automated, observable, and honest about
        what it costs.
      </p>
      <dl className="facts">
        <div>
          <dt>currently</dt>
          <dd>Senior Software Engineer II, DevOps/FinOps @ AuditBoard</dd>
        </div>
        <div>
          <dt>location</dt>
          <dd>{site.location}</dd>
        </div>
        <div>
          <dt>certs</dt>
          <dd>{certifications.join(" · ")}</dd>
        </div>
        <div>
          <dt>contact</dt>
          <dd>
            <a href={`mailto:${site.email}`}>email</a> · <a href={site.github}>github</a>{" "}
            · <a href={site.linkedin}>linkedin</a>
          </dd>
        </div>
      </dl>
      <p>
        See my <Link href="/experience/">experience</Link>, what I{" "}
        <Link href="/projects/">build on the side</Link>, or{" "}
        <Link href="/writing/">things I&apos;ve written</Link> — including how this site
        itself is deployed.
      </p>
    </>
  );
}
