import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import Footer from "@/components/layout/Footer";
import I18nProvider from "@/components/layout/I18nProvider";
import Navbar from "@/components/layout/Navbar";
import Analytics from "@/components/shared/Analytics";
import EmailButton from "@/components/shared/EmailButton";
import PermissionGate from "@/components/shared/PermissionGate";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import { seo } from "@/lib/constants";
import "./globals.css";
import "leaflet/dist/leaflet.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mysarahtech.com";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: siteUrl,
    type: "website",
    locale: "en_IN",
    siteName: "MySarah Modern Tech Pvt.Limited-MultiSector Company",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body>
        <I18nProvider>
          <Analytics />
          <PermissionGate />
          <Navbar />
          {children}
          <Footer />
          <EmailButton />
          <WhatsAppButton />
        </I18nProvider>
      </body>
    </html>
  );
}
