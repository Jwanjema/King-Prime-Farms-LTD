"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { adminSignOut } from "@/lib/firebase";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/jobs", label: "Jobs" },
  { href: "/admin/enquiries", label: "Enquiries" },
];

export default function AdminNav() {
  const path = usePathname();
  const router = useRouter();

  const logout = async () => {
    await adminSignOut().catch(() => {});
    await fetch("/api/session", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="site-header">
      <div className="nav">
        <Link href="/admin" className="brand-name" style={{ color: "var(--cream)" }}>
          Kings Prime <em>Admin</em>
        </Link>
        <div className="nav-actions">
          <button onClick={logout} className="btn btn-outline btn-sm">Log out</button>
        </div>
      </div>
      <nav className="admin-subnav" aria-label="Admin">
        {links.map((l) => {
          const active = l.exact ? path === l.href : path.startsWith(l.href);
          return (
            <Link key={l.href} href={l.href} className={active ? "active" : ""}>
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
