import CheckoutForm from "@/components/CheckoutForm";
import { getOutlets } from "@/lib/campdavid/catalog";

export const metadata = { title: "Checkout" };
export const revalidate = 60;

export default async function CheckoutPage() {
  const outlets = await getOutlets();
  return (
    <section style={{ paddingTop: 60, paddingBottom: 80 }}>
      <div className="wrap">
        <h1 style={{ marginBottom: 28 }}>Checkout</h1>
        <CheckoutForm outlets={outlets} />
      </div>
    </section>
  );
}
