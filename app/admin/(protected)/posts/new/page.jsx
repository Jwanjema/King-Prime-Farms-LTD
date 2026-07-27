import { requireAdmin } from "@/lib/admin/auth";
import { createPost } from "@/lib/admin/posts-actions";
import PostForm from "@/components/admin/PostForm";

export default async function NewPost() {
  await requireAdmin();
  return (
    <div style={{ padding: "40px 0", maxWidth: 640 }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>New post</h1>
      <PostForm action={createPost} />
    </div>
  );
}
