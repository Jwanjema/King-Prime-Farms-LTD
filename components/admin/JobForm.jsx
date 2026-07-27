"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JobForm({ job, action }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const submit = async (formData) => {
    setPending(true);
    await action(formData);
    setPending(false);
    router.push("/admin/jobs");
  };

  return (
    <form action={submit}>
      <div className="field">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" required defaultValue={job?.title} placeholder="Feedlot supervisor" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="field">
          <label htmlFor="type">Type</label>
          <input id="type" name="type" defaultValue={job?.type || "Full-time"} placeholder="Full-time, Contract…" />
        </div>
        <div className="field">
          <label htmlFor="loc">Location</label>
          <input id="loc" name="loc" defaultValue={job?.loc} placeholder="On-farm, Nairobi routes…" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="body">Description</label>
        <textarea id="body" name="body" rows={4} required defaultValue={job?.body} />
      </div>
      <div className="field" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input id="open" name="open" type="checkbox" style={{ width: "auto" }} defaultChecked={job?.open ?? true} />
        <label htmlFor="open" style={{ marginBottom: 0 }}>Open (visible on the site)</label>
      </div>
      <button type="submit" className="btn btn-gold" disabled={pending}>
        {pending ? "Saving…" : job ? "Save changes" : "Create job"}
      </button>
    </form>
  );
}
