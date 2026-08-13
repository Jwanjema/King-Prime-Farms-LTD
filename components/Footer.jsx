"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site, RETAIL_PLAY_STORE_URL, SYSTEM_PLAY_STORE_URL } from "@/data/site";

export default function Footer() {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;

  return (
    <footer className="site-footer" id="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="brand-name" style={{ marginBottom: 4 }}>
              Kings Prime <em>Farms</em>
            </div>
            <div className="tag" style={{ color: "var(--gold)", fontSize: 11, marginBottom: 14 }}>{site.slogan}</div>
            <p style={{ maxWidth: 280 }}>{site.tagline}</p>
          </div>
          <div>
            <h5>Contact</h5>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div>
            <h5>Explore</h5>
            <Link href="/products">Shop meat</Link>
            <Link href="/account">My orders</Link>
            <Link href="/feedlot">Feedlot activities</Link>
            <Link href="/system">Livestock system</Link>
            <Link href="/contact">Wholesale enquiry</Link>
            <Link href="/careers">Careers</Link>
          </div>
          <div>
            <h5>Visit</h5>
            <p style={{ marginBottom: 6 }}>{site.location}</p>
            <a href={site.map.googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{ marginBottom: 14 }}>Get directions</a>
            <a href={site.socials.instagram}>Instagram · Facebook</a>
          </div>
        </div>

        <div className="foot-apps">
          <div className="foot-app">
            <div className="foot-app-copy">
              <span className="tag">Order meat</span>
              <p>Camp David — our retail ordering app</p>
            </div>
            <a href={RETAIL_PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
              <Image src="/images/google-play-badge.png" alt="Get the Camp David retail app on Google Play" width={135} height={40} style={{ height: 40, width: "auto" }} />
            </a>
          </div>
          <div className="foot-app">
            <div className="foot-app-copy">
              <span className="tag">Run a feedlot</span>
              <p>POSNEXT — our livestock management system</p>
            </div>
            <a href={SYSTEM_PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
              <Image src="/images/google-play-badge.png" alt="Get the POSNEXT livestock system app on Google Play" width={135} height={40} style={{ height: 40, width: "auto" }} />
            </a>
          </div>
        </div>
        <div className="foot-bottom">
          <div>© {new Date().getFullYear()} {site.legal}. All rights reserved.</div>
          <div>Premium beef · Feedlot · Dry-aging</div>
        </div>
      </div>
    </footer>
  );
}
