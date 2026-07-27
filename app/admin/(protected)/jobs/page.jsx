import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { adminDb } from "@/lib/firebase-admin";
import { deleteJob } from "@/lib/admin/jobs-actions";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

async function getAllJobs() {
  const snap = await adminDb.collection("jobs").get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export default async function AdminJobs() {
  await requireAdmin();
  const jobs = await getAllJobs();

  return (
    <div style={{ padding: "40px 0" }}>
      <div className="admin-list-head">
        <h1 style={{ fontSize: 28 }}>Jobs</h1>
        <Link href="/admin/jobs/new" className="btn btn-gold btn-sm">New job</Link>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Location</th>
              <th>Open</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((j) => (
              <tr key={j.id}>
                <td>{j.title}</td>
                <td>{j.type}</td>
                <td>{j.loc}</td>
                <td>{j.open ? "Yes" : "No"}</td>
                <td className="admin-table-actions">
                  <Link href={`/admin/jobs/${j.id}/edit`} className="btn btn-outline-dark btn-sm">Edit</Link>
                  <DeleteButton action={deleteJob.bind(null, j.id)} confirmLabel={`Delete "${j.title}"?`} />
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr><td colSpan={5} style={{ color: "#8b8a7c", padding: "20px 0" }}>No jobs yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
