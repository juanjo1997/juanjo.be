import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>404</h1>
      <p>No such page.</p>
      <p>
        <Link href="/">Back home</Link>
      </p>
    </>
  );
}
