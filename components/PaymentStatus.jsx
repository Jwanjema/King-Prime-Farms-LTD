"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { startPayment } from "@/lib/checkout/actions";
import { site } from "@/data/site";

const POLL_INTERVAL_MS = 4000;
const POLL_TIMEOUT_MS = 90000;

export default function PaymentStatus({ orderNumber, mpesaPhone }) {
  const [phase, setPhase] = useState("initiating"); // initiating | waiting | confirmed | timeout | failed
  const [message, setMessage] = useState(null);
  const pollTimer = useRef(null);
  const timeoutTimer = useRef(null);

  function stopPolling() {
    if (pollTimer.current) clearInterval(pollTimer.current);
    if (timeoutTimer.current) clearTimeout(timeoutTimer.current);
  }

  function beginPolling() {
    pollTimer.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/${orderNumber}/status`);
        if (res.status === 401) {
          stopPolling();
          setPhase("timeout");
          return;
        }
        const data = await res.json();
        if (data.isPaid) {
          stopPolling();
          setPhase("confirmed");
        }
      } catch {
        // Transient network error — the next tick will retry; only a hard
        // timeout should give up on the user.
      }
    }, POLL_INTERVAL_MS);

    timeoutTimer.current = setTimeout(() => {
      stopPolling();
      setPhase((current) => (current === "confirmed" ? current : "timeout"));
    }, POLL_TIMEOUT_MS);
  }

  async function trigger() {
    setPhase("initiating");
    setMessage(null);
    const result = await startPayment(orderNumber, mpesaPhone);
    if (!result.ok) {
      setPhase("failed");
      setMessage(result.message);
      return;
    }
    setPhase("waiting");
    beginPolling();
  }

  useEffect(() => {
    trigger();
    return stopPolling;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "confirmed") {
    return (
      <div>
        <h2>Payment confirmed</h2>
        <p>Your order #{orderNumber} is paid and on its way to being prepared. We'll be in touch with delivery/pickup details.</p>
        <Link href="/products" className="btn btn-beef" style={{ marginTop: 18 }}>Continue shopping</Link>
      </div>
    );
  }

  if (phase === "timeout") {
    return (
      <div>
        <h2>Still waiting on confirmation</h2>
        <p>
          We haven't received M-Pesa confirmation yet for order #{orderNumber}. If you completed the payment on your
          phone, contact us at {site.phone} or {" "}
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a> with your
          order number and we'll confirm it manually. Otherwise you can try again below.
        </p>
        <button type="button" onClick={trigger} className="btn btn-gold" style={{ marginTop: 12 }}>Retry payment</button>
      </div>
    );
  }

  if (phase === "failed") {
    return (
      <div>
        <h2>Couldn't start the M-Pesa payment</h2>
        <p>{message || "Something went wrong sending the payment prompt."}</p>
        <button type="button" onClick={trigger} className="btn btn-gold" style={{ marginTop: 12 }}>Try again</button>
      </div>
    );
  }

  return (
    <div>
      <h2>{phase === "initiating" ? "Sending payment request…" : "Check your phone"}</h2>
      <p>
        {phase === "waiting"
          ? "Enter your M-Pesa PIN when the prompt appears. This may take a minute to confirm."
          : "Preparing your M-Pesa prompt…"}
      </p>
      <p style={{ color: "#8b8a7c", fontSize: 13 }}>Order #{orderNumber}</p>
    </div>
  );
}
