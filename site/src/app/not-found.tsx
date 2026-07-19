import Link from "next/link";

const art = String.raw`
 _  _    ___  _  _
| || |  / _ \| || |
| || |_| | | | || |_
|__   _| |_| |__   _|
   |_|  \___/   |_|
`;

export default function NotFound() {
  return (
    <>
      <pre className="ascii" aria-hidden="true">
        {art}
      </pre>
      <h1>Page not found</h1>
      <p>No such file or directory.</p>
      <p>
        <Link href="/">cd ~</Link>
      </p>
    </>
  );
}
