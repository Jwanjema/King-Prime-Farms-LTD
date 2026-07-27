"use client";
import { useState } from "react";
import Image from "next/image";
import { site } from "@/data/site";
import { submitEnquiry } from "@/lib/firebase";

export default function Contact() {
  const [tab, setTab] = useState("contact");
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const intro = tab === "wholesale" ? "Wholesale enquiry" : "General enquiry";
    const msg = [
      `${intro} — ${site.name} website`,
      `Name: ${form.name}`,
      form.company && `Company: ${form.company}`,
      `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      "",
      form.message,
    ].filter(Boolean).join("\n");

    // Record-keeping write for the admin inbox — must never block or break
    // the WhatsApp send, which is the primary channel for this audience.
    submitEnquiry({
      type: tab,
      name: form.name,
      phone: form.phone,
      email: form.email || null,
      company: tab === "wholesale" ? form.company || null : null,
      message: form.message,
      handled: false,
    }).catch((err) => console.error("Failed to record enquiry:", err));

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
                <p style={{ fontSize: 15, color: "#4A4A40" }}>{site.location}</p>
              </div>
            </div>
            <div style={{ aspectRatio: "16/10", marginTop: 30, position: "relative", overflow: "hidden" }}>
              <iframe
                title="Kings Prime Farms location — Nairobi, Kenya"
                src="https://www.google.com/maps?q=Nairobi,Kenya&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", inset: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              <button
                className={`btn btn-sm ${tab === "contact" ? "btn-gold" : "btn-outline-dark"}`}
                onClick={() => setTab("contact")}
              >
                General enquiry
              </button>
              <button
                className={`btn btn-sm ${tab === "wholesale" ? "btn-gold" : "btn-outline-dark"}`}
                onClick={() => setTab("wholesale")}
              >
                Wholesale enquiry
              </button>
            </div>
            <form onSubmit={submit}>
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input id="name" required value={form.name} onChange={set("name")} placeholder="Jane Wanjiku" />
              </div>
              {tab === "wholesale" && (
                <div className="field">
                  <label htmlFor="company">Business / company</label>
                  <input id="company" value={form.company} onChange={set("company")} placeholder="Hotel, butchery or restaurant name" />
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
                <label htmlFor="message">{tab === "wholesale" ? "Volumes & cuts needed" : "Message"}</label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={set("message")}
                  placeholder={tab === "wholesale" ? "e.g. 200kg of sirloin & ribeye weekly for our steakhouse…" : "How can we help?"}
                />
              </div>
              <button type="submit" className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                Send via WhatsApp
              </button>
              <p style={{ fontSize: 11.5, color: "#8b8a7c", marginTop: 12 }}>
                Submitting opens WhatsApp with your enquiry pre-filled — nothing is sent until you press send there.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
