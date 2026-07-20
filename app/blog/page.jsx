import Link from "next/link";
import SectionHead from "@/components/SectionHead";
import { posts } from "@/data/site";

export const metadata = { title: "Blog" };

export default function Blog() {
  return (
    <>
      <div className="page-hero tex-pine">
        <div className="wrap">
          <div className="eyebrow tag">News & knowledge</div>
          <h1>The King Prime blog</h1>
          <p className="lead">Dry-aging, feedlot management, cooking tips and farm updates.</p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <SectionHead eyebrow="Latest" title="Recent articles" />
          <div className="grid-3">
            {posts.map((p, i) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}>
                <article className="post-card">
                  <div className={`post-thumb ${i % 2 ? "tex-pine2" : "tex-pine"}`} />
                  <div className="post-body">
                    <div className="post-meta tag">{p.category} · {p.date}</div>
                    <h3>{p.title}</h3>
                    <p>{p.excerpt}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
