"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function Account() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.push("/sign-in?from=/account");
  }, [loading, user, router]);

  if (loading || !user) return null;

  return (
    <>
      <div className="page-hero tex-pine">
        <div className="wrap">
          <div className="eyebrow tag">Your account</div>
          <h1>Welcome{profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}</h1>
          <p className="lead">Order history and account details will appear here.</p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div style={{ display: "grid", gap: 6, fontSize: 14, marginBottom: 30 }}>
            <div><strong>Name:</strong> {profile?.name}</div>
            <div><strong>Email:</strong> {profile?.email}</div>
            {profile?.phone && <div><strong>Phone:</strong> {profile.phone}</div>}
          </div>
          <p style={{ fontSize: 14, color: "#8b8a7c" }}>
            Order tracking is coming soon — for now, orders placed via the cart are sent directly over WhatsApp.
          </p>
        </div>
      </section>
    </>
  );
}
