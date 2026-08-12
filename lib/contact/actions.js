"use server";

import { sendSmtpMail } from "@/lib/email/smtp";

const LABELS = {
  contact: "General enquiry",
  wholesale: "Wholesale enquiry",
  system: "Livestock system demo request",
  training: "Feedlot training enquiry",
  support: "Feedlot support enquiry",
};

export async function sendContactEmail(payload) {
  const type = payload?.type || "contact";
  const label = LABELS[type] || LABELS.contact;
  const name = payload?.name?.trim();
  const phone = payload?.phone?.trim();
  const email = payload?.email?.trim();
  const company = payload?.company?.trim();
  const message = payload?.message?.trim();

  if (!name || !phone || !message) {
    return { ok: false, message: "Please fill in your name, phone and message." };
  }

  const body = [
    `${label} from the Kings Prime Farms website`,
    "",
    `Name: ${name}`,
    company ? `Company: ${company}` : null,
    `Phone: ${phone}`,
    email ? `Email: ${email}` : null,
    "",
    "Message:",
    message,
  ].filter(Boolean).join("\n");

  try {
    await sendSmtpMail({
      replyTo: email || undefined,
      subject: `[Kings Prime Farms] ${label} - ${name}`,
      text: body,
    });
    return { ok: true, message: "Your enquiry has been sent. We'll get back to you shortly." };
  } catch (err) {
    console.error("Contact email failed:", err.message);
    return { ok: false, message: "We could not send the email right now. Please use WhatsApp or try again." };
  }
}
