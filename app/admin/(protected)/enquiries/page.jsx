import { requireAdmin } from "@/lib/admin/auth";
import { adminDb } from "@/lib/firebase-admin";
import MarkHandledToggle from "@/components/admin/MarkHandledToggle";

export const dynamic = "force-dynamic";

async function getAllEnquiries() {
  const snap = await adminDb.collection("enquiries").orderBy("createdAt", "desc").get();
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
    };
  });
}

export default async function AdminEnquiries() {
  await requireAdmin();
  const enquiries = await getAllEnquiries();

  return (
    <div style={{ padding: "40px 0" }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Enquiries</h1>
      <div className="admin-enquiry-list">
        {enquiries.map((e) => (
          <article key={e.id} className={`admin-enquiry-card ${e.handled ? "is-handled" : ""}`}>
            <div className="admin-enquiry-head">
              <div>
                <span className="tag" style={{ color: "var(--gold-deep)", fontSize: 11 }}>
                  {e.type === "wholesale" ? "Wholesale" : "General"} · {e.createdAt ? new Date(e.createdAt).toLocaleString() : "—"}
                </span>
                <h3 style={{ fontSize: 17, marginTop: 4 }}>{e.name}</h3>
              </div>
              <MarkHandledToggle id={e.id} handled={!!e.handled} />
            </div>
            <div className="admin-enquiry-contact">
              {e.phone && <span>{e.phone}</span>}
              {e.email && <span>{e.email}</span>}
              {e.company && <span>{e.company}</span>}
            </div>
            <p style={{ fontSize: 14, color: "#4A4A40", marginTop: 8, whiteSpace: "pre-wrap" }}>{e.message}</p>
          </article>
        ))}
        {enquiries.length === 0 && <p style={{ color: "#8b8a7c" }}>No enquiries yet.</p>}
      </div>
    </div>
  );
}
