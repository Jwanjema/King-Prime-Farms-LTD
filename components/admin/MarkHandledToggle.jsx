"use client";
import { useTransition } from "react";
import { markHandled } from "@/lib/admin/enquiries-actions";

export default function MarkHandledToggle({ id, handled }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className={`btn btn-sm ${handled ? "btn-outline-dark" : "btn-gold"}`}
      disabled={pending}
      onClick={() => startTransition(() => markHandled(id, !handled))}
    >
      {pending ? "…" : handled ? "Mark unhandled" : "Mark handled"}
    </button>
  );
}
