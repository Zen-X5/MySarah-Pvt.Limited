import type { Metadata } from "next";
import SolarSubsidyIndiaContent from "@/app/solar-subsidy-india/SolarSubsidyIndiaContent";

export const metadata: Metadata = {
  title: "Solar Subsidy India 2026 | Rooftop Solar Scheme Guide",
  description:
    "Understand rooftop solar subsidy in India, PM solar yojana process, MNRE guidelines, and how to apply for home solar subsidy in 2026.",
  keywords: [
    "solar subsidy India 2026",
    "rooftop solar subsidy India",
    "PM solar yojana details",
    "MNRE solar subsidy India",
    "how to apply solar subsidy India",
    "government solar scheme for home",
    "solar subsidy eligibility India",
  ],
  alternates: {
    canonical: "/solar-subsidy-india",
  },
};

const faq = [
  {
    q: "Who can apply for rooftop solar subsidy in India?",
    a: "Eligibility depends on current government guidelines, property type, and approved installation channels.",
  },
  {
    q: "How do I apply for solar subsidy in India?",
    a: "The process usually includes registration, document submission, installation through approved channels, and verification.",
  },
  {
    q: "Does subsidy reduce total solar installation cost?",
    a: "Yes, subsidy can reduce the effective upfront amount, but exact savings vary by system size and eligibility.",
  },
  {
    q: "Can commercial users claim rooftop solar subsidy?",
    a: "Subsidy rules vary by category. Residential schemes are usually separate from large commercial policy frameworks.",
  },
];

export default function SolarSubsidyIndiaPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <main className="section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SolarSubsidyIndiaContent />
    </main>
  );
}
