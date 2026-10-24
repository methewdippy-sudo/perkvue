import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PerkVue | Verified Wellness Deals & Daily Longevity Perks",
  description: "Discover tested daily promo codes, wellness perks, and verified supplement savings on PerkVue.",
  openGraph: {
    title: "PerkVue | Verified Wellness Deals & Daily Longevity Perks",
    description: "Discover tested daily promo codes, wellness perks, and verified supplement savings on PerkVue.",
    url: "https://perkvue.com",
    siteName: "PerkVue",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <Header />
        <main style={{ minHeight: "calc(100vh - 350px)" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
