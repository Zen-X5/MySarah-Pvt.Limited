import type { Metadata } from "next";
import ContactPageContent from "@/app/contact/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Solar Installation Team | Mysarah Modern Tech India",
  description:
    "Contact Mysarah Modern Tech for rooftop solar quote, subsidy guidance, and residential or commercial solar installation support across India.",
  keywords: [
    "contact solar company India",
    "solar quote India",
    "rooftop solar consultation",
    "solar installation support",
    "commercial solar enquiry India",
  ],
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
