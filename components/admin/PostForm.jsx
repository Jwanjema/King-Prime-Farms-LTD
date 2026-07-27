"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostForm({ post, action }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const submit = async (formData) => {
    setPending(true);
    setError("");
    try {
      await action(formData);
      router.push("/admin/posts");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form action={submit}>
      <div className="field">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" required defaultValue={post?.title} placeholder="Why dry-aged beef tastes better" />
      </div>
      <div className="field">
        <label htmlFor="slug">Slug (optional — derived from title if left blank)</label>
        <input id="slug" name="slug" defaultValue={post?.slug || ""} placeholder="why-dry-aged-beef-tastes-better" />
      </div>
      <div className="field">
        <label htmlFor="excerpt">Excerpt</label>
        <textarea id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt} placeholder="One or two sentences shown on the blog list page." />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="field">
          <label htmlFor="category">Category</label>
          <input id="category" name="category" defaultValue={post?.category} placeholder="Dry-aging, Feedlot, Cooking…" />
        </div>
        <div className="field">
          <label htmlFor="date">Date</label>
          <input id="date" name="date" type="date" defaultValue={post?.date || new Date().toISOString().slice(0, 10)} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="body">Body</label>
        <textarea id="body" name="body" rows={10} required defaultValue={post?.body} placeholder="Separate paragraphs with a blank line." />
      </div>
      <div className="field" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input id="published" name="published" type="checkbox" style={{ width: "auto" }} defaultChecked={post?.published ?? true} />
        <label htmlFor="published" style={{ marginBottom: 0 }}>Published (visible on the site)</label>
      </div>
      {error && <p style={{ color: "var(--beef)", fontSize: 13, marginBottom: 16 }}>{error}</p>}
      <button type="submit" className="btn btn-gold" disabled={pending}>
        {pending ? "Saving…" : post ? "Save changes" : "Create post"}
      </button>
    </form>
  );
}
