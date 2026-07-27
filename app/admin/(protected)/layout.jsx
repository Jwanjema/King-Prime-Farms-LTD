import { requireAdmin } from "@/lib/admin/auth";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminProtectedLayout({ children }) {
  await requireAdmin();
  return (
    <>
      <AdminNav />
      <main className="wrap admin-main">{children}</main>
    </>
  );
}
