"use server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { getCategoryProducts } from "@/lib/campdavid/catalog";
import { signup } from "@/lib/campdavid/auth";
import { createOrder, findOrderByNumber, initiateMpesa } from "@/lib/campdavid/orders";
import { sealCheckoutSession, unsealCheckoutSession, CHECKOUT_COOKIE, checkoutCookieOptions } from "@/lib/checkout/session";

// Cart lines only carry productId + quantity by the time they reach here —
// price/amount is always re-derived from a fresh backend fetch below, never
// taken from the client, since create-new-order trusts whatever total/amount
// it's given and doesn't recompute it server-side (a known backend gap).
async function priceCartItems(cartItems) {
  const catalog = await getCategoryProducts("all");
  const byId = new Map(catalog.map((p) => [String(p.id), p]));

  const priced = [];
  const missing = [];
  for (const line of cartItems) {
    const product = byId.get(String(line.productId));
    if (!product) {
      missing.push(line.productId);
      continue;
    }
    const unitPrice = product.hasOffer && product.offerPrice ? Number(product.offerPrice) : Number(product.selling_price);
    priced.push({
      product_id: product.id,
      quantity: line.quantity,
      amount: unitPrice,
      weight: line.quantity,
      tagname: "none",
      packageId: "none",
      tagId: "none",
      lineTotal: unitPrice * line.quantity,
    });
  }
  return { priced, missing };
}

export async function submitOrder(cartItems, formFields) {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return { ok: false, message: "Your cart is empty." };
  }

  const { priced, missing } = await priceCartItems(cartItems);
  if (missing.length > 0) {
    return { ok: false, message: "Some items in your cart are no longer available. Please review your cart and try again." };
  }

  const total = priced.reduce((sum, i) => sum + i.lineTotal, 0);
  const isPickup = formFields.selectedDeliveryOption === "1";
  const deliveryFee = isPickup ? "0" : "100";

  // Every checkout attempt gets a brand-new account with a random password
  // the customer never sees or needs — there's no guest-checkout path on
  // this backend. If the phone already has an account we can't recover its
  // password (no OTP flow in v1), so we surface that as a clear dead end
  // with working alternatives instead of failing silently.
  const password = randomUUID();
  const nameParts = (formFields.name || "").trim().split(/\s+/);
  const first_name = nameParts[0] || "Customer";
  const last_name = nameParts.slice(1).join(" ") || "Web";

  const signupResult = await signup({ phone: formFields.phone, password, first_name, last_name });

  if (signupResult.data?.success !== "1") {
    const message = signupResult.data?.message || "";
    if (/already exist/i.test(message)) {
      return {
        ok: false,
        code: "PHONE_EXISTS",
        message:
          "This phone number already has a CampDavid account. Please finish this order in the CampDavid app, or contact us and we'll place it for you.",
      };
    }
    return { ok: false, message: message || "Something went wrong creating your order. Please try again." };
  }

  const token = signupResult.data.token;

  const orderPayload = {
    selectedDeliveryOption: formFields.selectedDeliveryOption,
    friend_phone: formFields.friend_phone || "none",
    friend_name: formFields.friend_name || "none",
    delivery_fee: deliveryFee,
    pickup: isPickup ? formFields.pickup : "none",
    pickup_time: formFields.pickup_time || "none",
    // notes is NOT NULL on the backend — same class of issue as
    // delivery_location/latitude below, an empty string isn't safe here.
    desc: formFields.desc || "none",
    // delivery_location is NOT NULL in the backend schema even for pickup
    // orders, so a plain empty string isn't safe to send in that case.
    delivery_location: formFields.delivery_location || (isPickup ? "Pickup order" : ""),
    landmark: formFields.landmark || (isPickup ? "none" : ""),
    phone: formFields.phone,
    name: formFields.name,
    payment_method: "Mpesa",
    // NOT NULL columns on the backend — default to "0" when we have no
    // real geolocation (e.g. pickup orders, or a customer who declined
    // location access), rather than sending an empty string.
    latitude: formFields.latitude || "0",
    longitude: formFields.longitude || "0",
    total: String(total),
    items: priced.map(({ lineTotal, ...item }) => item),
  };

  const orderResult = await createOrder(token, orderPayload);

  if (orderResult.data?.success !== "1") {
    return { ok: false, message: orderResult.data?.error || orderResult.data?.message || "Failed to create your order. Please try again." };
  }

  const orderNumber = orderResult.data.order_number;
  const order = await findOrderByNumber(token, orderNumber);
  if (!order) {
    return { ok: false, message: "Your order was created but we couldn't confirm it. Please contact us with your order details." };
  }

  const sealed = await sealCheckoutSession({ token, orderId: order.id, orderNumber });
  cookies().set(CHECKOUT_COOKIE, sealed, checkoutCookieOptions);

  return { ok: true, orderNumber };
}

export async function startPayment(orderNumber, mpesaPhone) {
  const session = await unsealCheckoutSession(cookies().get(CHECKOUT_COOKIE)?.value);
  if (!session || session.orderNumber !== orderNumber) {
    return { ok: false, message: "Your checkout session has expired. Please contact us with your order number." };
  }
  const result = await initiateMpesa({ order_id: session.orderId, phone: mpesaPhone });
  return { ok: result.data?.success === "1", message: result.data?.message };
}
