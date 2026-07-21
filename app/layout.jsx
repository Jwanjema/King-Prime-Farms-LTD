import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

export const metadata = {
  title: {
    default: `${site.legal} — Premium Beef & Feedlot, Kenya`,
    template: `%s — ${site.name}`,
  },
  description:
    "Premium beef producer, feedlot operator and dry-aged meat specialists in Kenya. From our feedlot to your table — retail cuts, wholesale supply and livestock finishing.",
  keywords: ["premium beef Kenya", "dry-aged beef Nairobi", "feedlot Kenya", "wholesale meat supplier", "Kings Prime Farms"],
  openGraph: {
    title: `${site.legal} — Premium Beef & Feedlot`,
    description: site.tagline,
    type: "website",
    locale: "en_KE",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,900;1,9..144,500&family=Work+Sans:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
