import { requireAdmin } from "@/lib/admin/auth";
import { createJob } from "@/lib/admin/jobs-actions";
import JobForm from "@/components/admin/JobForm";

export default async function NewJob() {
  await requireAdmin();
  return (
    <div style={{ padding: "40px 0", maxWidth: 560 }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>New job</h1>
      <JobForm action={createJob} />
    </div>
  );
}
