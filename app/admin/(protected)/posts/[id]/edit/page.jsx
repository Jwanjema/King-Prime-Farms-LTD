import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { adminDb } from "@/lib/firebase-admin";
import { updatePost } from "@/lib/admin/posts-actions";
import PostForm from "@/components/admin/PostForm";

export default async function EditPost({ params }) {
  await requireAdmin();
  const doc = await adminDb.collection("posts").doc(params.id).get();
  if (!doc.exists) notFound();
  const post = { id: doc.id, ...doc.data() };

  return (
    <div style={{ padding: "40px 0", maxWidth: 640 }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Edit post</h1>
      <PostForm post={post} action={updatePost.bind(null, post.id)} />
    </div>
  );
}
