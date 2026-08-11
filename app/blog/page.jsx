import Link from "next/link";
import Image from "next/image";
import SectionHead from "@/components/SectionHead";
import { getPosts } from "@/lib/data/posts";

export const metadata = { title: "Blog" };
export const revalidate = 60;

const postImages = {
  "benefits-of-dry-aged-beef": "/images/blog-dry-aging.jpg",
  "inside-our-feedlot": "/images/blog-feedlot.jpg",
  "cooking-the-perfect-steak": "/images/blog-cooking.jpg",
  "premium-beef-production": "/images/gallery/multi-breed.jpg",
  "wholesale-supply": "/images/gallery/pen-2-dusk.jpg",
  "retail-meat-sales": "/images/blog-cooking.jpg",
  "livestock-finishing": "/images/gallery/resting-herd.jpg",
  "feedlot-training": "/images/gallery/feeding-k105.jpg",
  "feedlot-support": "/images/system/dashboard-menu.jpg",
};
const FALLBACK_IMAGE = "/images/blog-feedlot.jpg";

export default async function Blog() {
  const posts = await getPosts();
  return (
    <>
      <div className="page-hero" style={{ position: "relative", overflow: "hidden" }}>
        <Image src="/images/blog-hero.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: "cover", zIndex: 0 }} />
        <div className="page-hero-veil" />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow tag">News & knowledge</div>
          <h1>The Kings Prime blog</h1>
          <p className="lead">Dry-aging, feedlot management, cooking tips and farm updates.</p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <SectionHead eyebrow="Latest" title="Recent articles" />
          <div className="grid-3">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}>
                <article className="post-card">
                  <div className="post-thumb" style={{ position: "relative" }}>
                    <Image src={postImages[p.slug] || FALLBACK_IMAGE} alt={p.title} fill sizes="(max-width: 920px) 50vw, 33vw" style={{ objectFit: "cover" }} />
                  </div>
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
