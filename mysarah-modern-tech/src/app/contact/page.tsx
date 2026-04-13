import type { Metadata } from "next";
import LeadForm from "@/components/forms/LeadForm";
import SectionHeading from "@/components/shared/SectionHeading";
import { company } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | Mysarah Modern Tech",
  description: "Contact Mysarah Modern Tech for solar quote, consultation, and project support in Assam.",
};

export default function ContactPage() {
  return (
    <main className="section container">
      <SectionHeading
        eyebrow="Contact"
        title="Let&apos;s plan your project"
        description="Share your requirement and our team will connect with a customized solution plan."
      />

      <div className="contact-grid">
        <LeadForm variant="contact" title="Contact Form" />
        <aside className="contact-aside">
          <h3>Reach Us</h3>
          <p>{company.name}</p>
          <p>{company.address}</p>
          <p>{company.phone}</p>
          <p>{company.email}</p>
          <div className="map-wrap">
            <iframe
              title="Mysarah Modern Tech Location"
              src="https://www.google.com/maps?q=Guwahati,Assam&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>
      </div>
    </main>
  );
}
