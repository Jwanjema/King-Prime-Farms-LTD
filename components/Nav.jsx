"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart/CartContext";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Shop" },
  { href: "/account", label: "My Orders" },
  { href: "/feedlot", label: "Feedlot" },
  { href: "/system", label: "System" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const { itemCount, openDrawer } = useCart();

  if (path.startsWith("/admin")) return null;

  return (
    <header className="site-header">
      <div className="nav">
        <Link href="/" className="brand" onClick={() => setMenu(false)}>
          <span className="brand-mark" aria-hidden>
            <Image src="/images/logo.png" alt="" width={1017} height={718} priority />
          </span>
          <span className="brand-name">Kings Prime <em>Farms</em></span>
        </Link>

        <nav className="nav-links" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={path.startsWith(l.href) ? "active" : ""}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <button type="button" onClick={openDrawer} className="cart-btn" aria-label="Open cart">
            Cart{itemCount > 0 ? ` (${itemCount})` : ""}
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
