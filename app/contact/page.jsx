"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { site } from "@/data/site";
import { sendContactEmail } from "@/lib/contact/actions";
import { submitEnquiry } from "@/lib/firebase";

const TABS = {
  contact: {
    label: "General enquiry",
    intro: "General enquiry",
    askCompany: false,
    messageLabel: "Message",
    messagePlaceholder: "How can we help?",
  },
  wholesale: {
    label: "Wholesale enquiry",
    intro: "Wholesale enquiry",
    askCompany: true,
    companyPlaceholder: "Hotel, butchery or restaurant name",
    messageLabel: "Volumes & cuts needed",
    messagePlaceholder: "e.g. 200kg of sirloin & ribeye weekly for our steakhouse…",
  },
  system: {
    label: "System demo",
    intro: "Livestock system demo request",
    askCompany: true,
    companyPlaceholder: "Feedlot or butchery name",
    messageLabel: "About your operation",
    messagePlaceholder: "e.g. Herd size, number of pens, and whether you run your own butchery…",
  },
  training: {
    label: "Feedlot training",
    intro: "Feedlot training enquiry",
    askCompany: true,
    companyPlaceholder: "Feedlot or farm name",
    messageLabel: "About your team",
    messagePlaceholder: "e.g. Herd size, number of staff to train, and whether you'd prefer on-site or hosted training…",
  },
  support: {
    label: "Feedlot support",
    intro: "Feedlot support enquiry",
    askCompany: true,
    companyPlaceholder: "Feedlot or farm name",
    messageLabel: "What you need help with",
    messagePlaceholder: "e.g. Slow weight gain in Pen 3, rising feed costs, a health issue…",
  },
};

export default function Contact() {
  return (
    <Suspense fallback={null}>
      <ContactForm />
    </Suspense>
  );
}

function ContactForm() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState("contact");
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", message: "" });
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState(null);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const cfg = TABS[tab];

  useEffect(() => {
    const type = searchParams.get("type");
    if (type && TABS[type]) setTab(type);
  }, [searchParams]);

  const submit = async (e) => {
    e.preventDefault();
    setPending(true);
    setNotice(null);

    const msg = [
      `${cfg.intro} — ${site.name} website`,
      `Name: ${form.name}`,
      form.company && `Company: ${form.company}`,
      `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      "",
      form.message,
    ].filter(Boolean).join("\n");

    // Record-keeping write for the admin inbox — must never block or break
    // the WhatsApp send, which is the primary channel for this audience.
    const enquiry = {
      type: tab,
      name: form.name,
      phone: form.phone,
      email: form.email || null,
      company: cfg.askCompany ? form.company || null : null,
      message: form.message,
      handled: false,
    };

    submitEnquiry(enquiry).catch((err) => console.error("Failed to record enquiry:", err));
    const emailResult = await sendContactEmail(enquiry);
    setPending(false);
    setNotice(emailResult);

    if (emailResult.ok) {
      setForm({ name: "", phone: "", email: "", company: "", message: "" });
      return;
    }

    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  return (
    <>
      <div className="page-hero" style={{ position: "relative", overflow: "hidden" }}>
        <Image src="/images/contact-hero.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: "cover", zIndex: 0 }} />
        <div className="page-hero-veil" />
        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="eyebrow tag">Get in touch</div>
          <h1>Contact us</h1>
          <p className="lead">Orders, wholesale programs, farm visits — we reply fast on WhatsApp.</p>
        </div>
      </div>

      <section>
        <div className="wrap grid-2-even" style={{ gap: 70 }}>
          <div>
            <h2 style={{ fontSize: 26, marginBottom: 22 }}>Reach us directly</h2>
            <div style={{ display: "grid", gap: 18 }}>
              <div>
                <div className="sec-eyebrow tag" style={{ marginBottom: 6 }}>Phone / WhatsApp</div>
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 17, fontWeight: 600 }}>
                  {site.phone}
                </a>
              </div>
              <div>
                <div className="sec-eyebrow tag" style={{ marginBottom: 6 }}>Email</div>
                <a href={`mailto:${site.email}`} style={{ fontSize: 16 }}>{site.email}</a>
              </div>
              <div>
                <div className="sec-eyebrow tag" style={{ marginBottom: 6 }}>Location</div>
                <p style={{ fontSize: 15, color: "#4A4A40" }}>{site.map.label}, {site.map.building}</p>
                <p style={{ fontSize: 15, color: "#4A4A40", marginBottom: 6 }}>{site.map.area} · Plus Code {site.map.plusCode}</p>
                <a href={site.map.googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 600 }}>
                  Get directions →
                </a>
              </div>
              <div>
                <div className="sec-eyebrow tag" style={{ marginBottom: 6 }}>Opening hours</div>
                <div style={{ fontSize: 14, color: "#4A4A40", display: "grid", gap: 4 }}>
                  {site.hours.map((h) => (
                    <div key={h.day} style={{ display: "flex", justifyContent: "space-between", maxWidth: 260 }}>
                      <span>{h.day}</span>
                      <span style={{ fontWeight: h.time === "Closed" ? 400 : 600 }}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ aspectRatio: "16/10", marginTop: 30, position: "relative", overflow: "hidden" }}>
              <iframe
                title={`${site.map.label} location`}
                src={`https://www.google.com/maps?q=${site.map.lat},${site.map.lng}&z=16&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", inset: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              {Object.entries(TABS).map(([key, t]) => (
                <button
                  key={key}
                  className={`btn btn-sm ${tab === key ? "btn-gold" : "btn-outline-dark"}`}
                  onClick={() => setTab(key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <form onSubmit={submit}>
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input id="name" required value={form.name} onChange={set("name")} placeholder="Jane Wanjiku" />
              </div>
              {cfg.askCompany && (
                <div className="field">
                  <label htmlFor="company">Business / company</label>
                  <input
                    id="company"
                    value={form.company}
                    onChange={set("company")}
                    placeholder={cfg.companyPlaceholder}
                  />
                </div>
              )}
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" required value={form.phone} onChange={set("phone")} placeholder="+254 7XX XXX XXX" />
              </div>
              <div className="field">
                <label htmlFor="email">Email (optional)</label>
                <input id="email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" />
              </div>
              <div className="field">
                <label htmlFor="message">{cfg.messageLabel}</label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={set("message")}
                  placeholder={cfg.messagePlaceholder}
                />
              </div>
              {notice && (
                <p style={{ color: notice.ok ? "var(--pine)" : "var(--beef)", marginBottom: 14 }}>
                  {notice.message}
                </p>
              )}
              <button type="submit" className="btn btn-gold" disabled={pending} style={{ width: "100%", justifyContent: "center" }}>
                {pending ? "Sending..." : "Send enquiry"}
              </button>
              <p style={{ fontSize: 11.5, color: "#8b8a7c", marginTop: 12 }}>
                Your enquiry is emailed to our team. If email is unavailable, WhatsApp opens with your message pre-filled.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
