"use client";
import { useState, useTransition } from "react";

export default function DeleteButton({ action, confirmLabel = "Delete this item?" }) {
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => setConfirming(true)}>
        Delete
      </button>
    );
  }

  return (
    <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
      <span style={{ fontSize: 12, color: "var(--beef)" }}>{confirmLabel}</span>
      <button
        type="button"
        className="btn btn-beef btn-sm"
        disabled={pending}
        onClick={() => startTransition(() => action())}
      >
        {pending ? "Deleting…" : "Confirm"}
      </button>
      <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => setConfirming(false)}>
        Cancel
      </button>
    </span>
  );
}
