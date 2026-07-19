import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <h1>{site.name}</h1>
      <p>{site.description}</p>
      <p>
        This site is under construction — the code is public at{" "}
        <a href={site.github}>{site.github}</a>.
      </p>
    </>
  );
}
