import type { Metadata } from "next";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "About Us | Mysarah Modern Tech",
  description:
    "Learn about Mysarah Modern Tech Private Limited, a multi-sector startup from Assam building modern infrastructure services.",
};

export default function AboutPage() {
  return (
    <main className="section container">
      <SectionHeading
        eyebrow="About Us"
        title="A startup with corporate discipline"
        description="Mysarah Modern Tech Private Limited is headquartered in Assam, India, and is building a multi-sector business platform that starts with energy and scales into future infrastructure domains."
      />

      <div className="about-grid">
        <article className="content-card">
          <h3>Vision</h3>
          <p>
            Build one of Northeast India&apos;s most trusted multi-sector technology companies by combining smart execution,
            transparent delivery, and scalable systems.
          </p>
        </article>
        <article className="content-card">
          <h3>Current Focus</h3>
          <p>
            We are actively delivering solar installation services across residential and commercial categories, while
            building the organizational backbone for new sectors.
          </p>
        </article>
        <article className="content-card">
          <h3>Operating Model</h3>
          <p>
            Our platform uses a modular service structure. This keeps customer experience consistent while enabling rapid
            launch of new verticals.
          </p>
        </article>
      </div>
    </main>
  );
}
