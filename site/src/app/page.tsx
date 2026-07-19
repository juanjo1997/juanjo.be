import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { certifications } from "@/lib/experience";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/post-list";
import portrait from "../../public/portrait.jpg";

export default function Home() {
  return (
    <>
      <div className="hero">
        <div className="hero-text">
          <h1 className="cursor">{site.name}</h1>
          <p className="lede">{site.description}</p>
          <p>
            I&apos;m a senior software engineer at Optro, where I manage multiple
            large-scale Kubernetes fleets across AWS and Azure — and hunt down every
            wasted cloud dollar along the way. Before that I did SRE and FinOps work at
            UJET and cloud governance at World Fuel Services.
          </p>
          <p>
            The through-line: infrastructure that is automated, observable, resilient,
            highly available — and honest about what it costs.
          </p>
        </div>
        <Image
          className="portrait"
          src={portrait}
          alt="Juan Beltran"
          priority
          unoptimized
        />
      </div>
      <div className="terminal">
        <div className="terminal-title">juan@juanjo.be:~</div>
        <dl className="facts">
          <div>
            <dt>currently</dt>
            <dd>Senior Software Engineer II, DevOps/FinOps @ Optro</dd>
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
              <a href={`mailto:${site.email}`}>email</a> ·{" "}
              <a href={site.github}>github</a> · <a href={site.linkedin}>linkedin</a>
            </dd>
          </div>
        </dl>
      </div>
      <p>
        See my <Link href="/experience/">experience</Link>, what I{" "}
        <Link href="/projects/">build on the side</Link>, or{" "}
        <Link href="/writing/">things I&apos;ve written</Link> — including how this site
        itself is deployed.
      </p>
      <h2>Recent writing</h2>
      <PostList posts={getAllPosts().slice(0, 3)} />
    </>
  );
}
