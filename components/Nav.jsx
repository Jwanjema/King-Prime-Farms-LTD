"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Shop" },
  { href: "/feedlot", label: "Feedlot" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const path = usePathname();
  const { count, setOpen } = useCart();
  const { user, profile, signOutUser } = useAuth();
  const [menu, setMenu] = useState(false);

  return (
    <header className="site-header">
      <div className="nav">
        <Link href="/" className="brand" onClick={() => setMenu(false)}>
          <span className="brand-mark" aria-hidden>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.4">
              <path d="M4 10c0-3 2-5 4-5s3 2 3 2 1-2 3-2 4 2 4 5-3 4-3 7H7c0-3-3-4-3-7Z" />
              <path d="M9 10h6" />
            </svg>
          </span>
          <span className="brand-name">King Prime <em>Farms</em></span>
        </Link>

        <nav className="nav-links" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={path.startsWith(l.href) ? "active" : ""}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {profile?.role === "admin" && (
                <Link href="/admin" style={{ fontSize: 13, color: "var(--gold)" }}>Admin</Link>
              )}
              <Link href="/account" style={{ fontSize: 13, color: "var(--cream-dim)" }}>
                {profile?.name?.split(" ")[0] || "Account"}
              </Link>
              <button
                onClick={() => signOutUser()}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "var(--cream-dim)", padding: 0 }}
              >
                Sign out
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap" }}>
              <Link href="/sign-in" style={{ fontSize: 13, color: "var(--cream-dim)" }}>Sign in</Link>
              <Link href="/sign-up" style={{ fontSize: 13, color: "var(--gold)" }}>Sign up</Link>
            </div>
          )}
          <button className="cart-btn" onClick={() => setOpen(true)} aria-label="Open order cart">
            Order
            {count > 0 && <span className="cart-badge">{count}</span>}
          </button>
          <button className="menu-btn" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Toggle menu">
            Menu
          </button>
        </div>
      </div>
      <nav className={`mobile-menu ${menu ? "open" : ""}`} aria-label="Mobile">
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setMenu(false)}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
