import Link from "next/link";
import Image from "next/image";
import { posts } from "@/data/site";
import { notFound } from "next/navigation";

const postImages = {
  "benefits-of-dry-aged-beef": "/images/blog-dry-aging.jpg",
  "inside-our-feedlot": "/images/blog-feedlot.jpg",
  "cooking-the-perfect-steak": "/images/blog-cooking.jpg",
};

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  return { title: post ? post.title : "Article" };
}

export default function Post({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <>
      <div className="page-hero tex-pine">
        <div className="wrap">
          <div className="eyebrow tag">{post.category} · {post.date}</div>
          <h1 style={{ maxWidth: 760 }}>{post.title}</h1>
        </div>
      </div>

      <section style={{ paddingBottom: 0 }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", marginBottom: 8 }}>
            <Image src={postImages[post.slug]} alt={post.title} fill sizes="(max-width: 760px) 100vw, 760px" style={{ objectFit: "cover" }} priority />
          </div>
        </div>
      </section>

      <section>
        <div className="wrap" style={{ maxWidth: 760 }}>
          {post.body.split("\n\n").map((para, i) => (
            <p key={i} style={{ color: "#4A4A40", marginBottom: 20, fontSize: 17, lineHeight: 1.75 }}>
              {para}
            </p>
          ))}
          <div style={{ marginTop: 40, display: "flex", gap: 12 }}>
            <Link href="/blog" className="btn btn-outline-dark btn-sm">← All articles</Link>
            <Link href="/products" className="btn btn-beef btn-sm">Shop the cuts</Link>
          </div>
        </div>
      </section>
    </>
  );
}
