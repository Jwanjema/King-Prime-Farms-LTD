import Link from "next/link";
import { adminDb } from "@/lib/firebase-admin";

async function getCounts() {
  const [products, posts, jobs, enquiries] = await Promise.all([
    adminDb.collection("products").count().get(),
    adminDb.collection("posts").count().get(),
    adminDb.collection("jobs").where("open", "==", true).count().get(),
    adminDb.collection("enquiries").where("handled", "==", false).count().get(),
  ]);
  return {
    products: products.data().count,
    posts: posts.data().count,
    openJobs: jobs.data().count,
    unhandled: enquiries.data().count,
  };
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  const cards = [
    { label: "Products", value: counts.products, href: "/admin/products" },
    { label: "Blog posts", value: counts.posts, href: "/admin/posts" },
    { label: "Open roles", value: counts.openJobs, href: "/admin/jobs" },
    { label: "Unhandled enquiries", value: counts.unhandled, href: "/admin/enquiries" },
  ];

  return (
    <div style={{ padding: "40px 0" }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Dashboard</h1>
      <div className="admin-stat-grid">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="admin-stat-card">
            <div className="admin-stat-num">{c.value}</div>
            <div className="admin-stat-lbl">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
