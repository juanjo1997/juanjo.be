import { site } from "@/lib/site";

export function Footer() {
  // Injected by the CI build; local builds honestly say "dev".
  const sha = process.env.NEXT_PUBLIC_GIT_SHA;
  return (
    <footer className="site-footer">
      <div className="container">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>
          built from{" "}
          {sha ? <a href={`${site.repo}/commit/${sha}`}>{sha.slice(0, 7)}</a> : "dev"} ·{" "}
          <a href={site.repo}>source</a> · <a href="/feed.xml">rss</a>
        </span>
      </div>
    </footer>
  );
}
