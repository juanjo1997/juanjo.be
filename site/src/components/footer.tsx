import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>
          <a href={site.repo}>source</a> · <a href="/feed.xml">rss</a>
        </span>
      </div>
    </footer>
  );
}
