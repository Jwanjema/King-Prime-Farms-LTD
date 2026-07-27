import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { adminDb } from "@/lib/firebase-admin";
import { deletePost } from "@/lib/admin/posts-actions";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

async function getAllPosts() {
  const snap = await adminDb.collection("posts").orderBy("date", "desc").get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export default async function AdminPosts() {
  await requireAdmin();
  const posts = await getAllPosts();

  return (
    <div style={{ padding: "40px 0" }}>
      <div className="admin-list-head">
        <h1 style={{ fontSize: 28 }}>Blog posts</h1>
        <Link href="/admin/posts/new" className="btn btn-gold btn-sm">New post</Link>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Published</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>{p.date}</td>
                <td>{p.published ? "Yes" : "No"}</td>
                <td className="admin-table-actions">
                  <Link href={`/admin/posts/${p.id}/edit`} className="btn btn-outline-dark btn-sm">Edit</Link>
                  <DeleteButton action={deletePost.bind(null, p.id, p.slug)} confirmLabel={`Delete "${p.title}"?`} />
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td colSpan={5} style={{ color: "#8b8a7c", padding: "20px 0" }}>No posts yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
