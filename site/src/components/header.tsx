import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link className="brand" href="/">
          <span className="tilde">~/</span>juanjo.be
        </Link>
        <nav className="site-nav" aria-label="Site">
          <Link href="/experience/">experience</Link>
          <Link href="/projects/">projects</Link>
          <Link href="/writing/">writing</Link>
        </nav>
      </div>
    </header>
  );
}
