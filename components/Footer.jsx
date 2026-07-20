import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="brand-name" style={{ marginBottom: 14 }}>
              King Prime <em>Farms</em>
            </div>
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
            <Link href="/feedlot">Feedlot activities</Link>
            <Link href="/contact">Wholesale enquiry</Link>
            <Link href="/careers">Careers</Link>
          </div>
          <div>
            <h5>Visit</h5>
            <p style={{ marginBottom: 14 }}>{site.location} — map pin on the contact page.</p>
            <a href={site.socials.instagram}>Instagram · Facebook</a>
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
