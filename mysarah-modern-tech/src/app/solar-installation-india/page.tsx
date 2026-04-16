import type { Metadata } from "next";
import { company } from "@/lib/constants";
import SolarInstallationIndiaContent from "@/app/solar-installation-india/SolarInstallationIndiaContent";

export const metadata: Metadata = {
  title: "Solar Installation in India | Residential and Commercial Rooftop Solar",
  description:
    "Get end-to-end rooftop solar installation in India for homes, businesses, factories, and institutions. Site survey, EPC execution, and lifecycle support.",
  keywords: [
    "solar installation India",
    "rooftop solar installation India",
    "solar panel installation company",
    "solar company near me India",
    "commercial solar installation India",
    "residential solar installation India",
    "solar EPC company India",
  ],
  alternates: {
    canonical: "/solar-installation-india",
  },
};

export default function SolarInstallationIndiaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Solar Installation Services in India",
    provider: {
      "@type": "Organization",
      name: company.name,
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://mysarahtech.com",
      telephone: company.phone,
      areaServed: "India",
    },
    areaServed: "India",
    serviceType: "Rooftop solar installation",
  };

  return (
    <main className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SolarInstallationIndiaContent />
    </main>
  );
}
