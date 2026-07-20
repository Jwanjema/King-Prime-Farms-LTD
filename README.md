# King Prime Farms Ltd — Website

Production-ready Next.js 14 (App Router) site for King Prime Farms: premium beef,
feedlot operations, dry-aged meat. Green / black / gold brand theme with a beef-red
accent, fully responsive, working order cart with WhatsApp checkout.

## Brand artwork (illustrations)

- **`components/CutArt.jsx`** — engraved butcher-style SVG illustrations for all
  8 products (ribeye, sirloin, T-bone, fillet, brisket, mince, sausages, half
  carcass) in brand colors. Pure server-rendered SVG, zero JS. They fill the
  product cards now and become secondary art (hover states, order emails, PDF
  catalogue, packaging stickers) once real photography lands.
- **`components/CowChart.jsx`** — interactive butcher's cut chart: hover/tap a
  primal region (chuck, rib, loin, rump, flank, brisket) to highlight it and see
  its cuts. Keyboard accessible. Lives on the shop page.

**On photography:** these illustrations give the site its meat identity today,
but they complement — not replace — real photos. Food buyers trust photographs
of the actual product. Budget a half-day shoot: hero feedlot wide shot, each cut
on a dark board, the aging room, butchery in action, team, and delivery vehicle.

## Interactive layer

- **3D hero** (`components/Hero3D.jsx`) — a Three.js scene: ~10,000-particle
  procedural terrain rolling in brand colors (pine → gold by elevation) with
  floating gold dust and mouse parallax. Loaded client-side only via
  `next/dynamic`, capped pixel ratio, pauses when the tab is hidden, renders a
  static frame under `prefers-reduced-motion`. Swap or extend the scene freely —
  it's ~150 lines of plain Three.js, no wrapper libs.
- **Tilt cards** (`components/Tilt.jsx`) — perspective tilt-toward-cursor with a
  moving gold glare, used on product cards. Wrap anything in `<Tilt>`.
- **Animated counters** (`components/Counter.jsx`) — hero stats count up on view.
- **Marquee** — gold ticker strip under the hero; pauses on hover, disabled under
  reduced motion.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve production build
```

## Before launch — fill these in

1. **`data/site.js`** — real phone number, WhatsApp number (digits only, e.g. `254712345678`),
   email, socials, and real product prices.
2. **Photography** — every dark-green textured block is a photo slot. Replace the
   `tex-pine` / `tex-pine2` / `tex-beef` divs with `next/image` components once client
   photos are ready. Labels on each slot say what belongs there.
3. **Google Maps** — swap the map placeholder in `app/contact/page.jsx` for an iframe embed.
4. **Domain** — kingprimefarms.co.ke recommended.

## Structure

```
app/                 pages (App Router)
  page.jsx           Home
  about|services|products|feedlot|gallery|careers|contact/
  blog/  blog/[slug]/
components/          Nav, Footer, CartDrawer, ProductCard, Reveal, SectionHead
lib/
  cart-context.jsx   cart state + WhatsApp checkout message builder
  firebase.js        Firestore wiring guide (commented, ready to enable)
data/site.js         all editable content (products, posts, jobs, services)
app/globals.css      the whole design system
```

## How ordering works (Phase 1)

Customers add cuts to the cart (qty = kg), open the drawer, and hit
**Checkout on WhatsApp** — this opens WhatsApp with a pre-filled order message
including line items and estimated total. You confirm weight, delivery and payment
in the chat. No payment gateway needed to launch.

Phase 2 upgrades (see proposal): log orders to Firestore via `lib/firebase.js`'s
`submitOrder`, then add M-Pesa Daraja / Paystack checkout with Cloud Functions.

## Firebase (Phase 1.5 — content management)

`lib/firebase.js` contains the full wiring guide and suggested Firestore collections
(products, posts, jobs, orders, enquiries). Until enabled, all content lives in
`data/site.js` — which is fine for launch and easily editable.

If the client's livestock-management system is already on Firebase, create this
site's web app inside the *same* project to unlock the live-stats traceability
widget later.

## Deploy

- **Vercel** (easiest for Next.js): `vercel` — free tier fine for launch.
- **Firebase Hosting**: `firebase init hosting` with web frameworks support
  (`firebase experiments:enable webframeworks`), then `firebase deploy`.

## Accessibility & performance notes

- Scroll-reveal animations respect `prefers-reduced-motion`.
- Semantic landmarks, labelled form fields, aria labels on icon buttons.
- No client JS on static pages except cart/nav; first load ~88–98 kB.
