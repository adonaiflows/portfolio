import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const title = "Adonai Romero | Websites that bring local businesses bookings and sales";
const description =
  "Adonai Romero designs and builds fast, interactive websites for local businesses: spas, salons, studios and shops. 3D product showcases, online stores and booking flows.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Adonai Romero",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Adonai Romero, web designer for local businesses, with screens of recent client sites" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#15120e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
