import PaymentStatus from "@/components/PaymentStatus";

export const metadata = { title: "Complete your payment" };
export const dynamic = "force-dynamic";

export default function PayPage({ params, searchParams }) {
  return (
    <section style={{ paddingTop: 60, paddingBottom: 80 }}>
      <div className="wrap" style={{ maxWidth: 560 }}>
        <PaymentStatus orderNumber={params.orderNumber} mpesaPhone={searchParams.phone || ""} />
      </div>
    </section>
  );
}
