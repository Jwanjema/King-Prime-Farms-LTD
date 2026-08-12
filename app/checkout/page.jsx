import CheckoutForm from "@/components/CheckoutForm";
import { getAccountSession } from "@/lib/account/actions";
import { getOutlets } from "@/lib/campdavid/catalog";

export const metadata = { title: "Checkout" };
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const [outlets, session] = await Promise.all([getOutlets(), getAccountSession()]);
  return (
    <section style={{ paddingTop: 60, paddingBottom: 80 }}>
      <div className="wrap">
        <h1 style={{ marginBottom: 28 }}>Checkout</h1>
        <CheckoutForm outlets={outlets} customer={session?.user || null} />
      </div>
    </section>
  );
}
