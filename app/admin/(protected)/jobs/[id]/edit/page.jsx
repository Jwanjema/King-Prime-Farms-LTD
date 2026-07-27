import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { adminDb } from "@/lib/firebase-admin";
import { updateJob } from "@/lib/admin/jobs-actions";
import JobForm from "@/components/admin/JobForm";

export default async function EditJob({ params }) {
  await requireAdmin();
  const doc = await adminDb.collection("jobs").doc(params.id).get();
  if (!doc.exists) notFound();
  const job = { id: doc.id, ...doc.data() };

  return (
    <div style={{ padding: "40px 0", maxWidth: 560 }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Edit job</h1>
      <JobForm job={job} action={updateJob.bind(null, job.id)} />
    </div>
  );
}
