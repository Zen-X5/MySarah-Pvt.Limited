import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LeadForm from "@/components/forms/LeadForm";
import SectionHeading from "@/components/shared/SectionHeading";
import { getSectorBySlug, sectors } from "@/lib/sectors";

interface SectorPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export function generateStaticParams() {
  return sectors.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({ params }: SectorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);

  if (!sector) {
    return { title: "Sector Not Found" };
  }

  return {
    title: `${sector.title} | Mysarah Modern Tech`,
    description: sector.description,
  };
}

export default async function SectorDetailPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);

  if (!sector) {
    notFound();
  }

  if (!sector.active) {
    return (
      <main className="section container">
        <SectionHeading
          eyebrow="Coming Soon"
          title={`${sector.title} is launching soon`}
          description="This sector is in strategic planning and execution setup."
        />
        <Link href="/sectors" className="button">
          Back to Sectors
        </Link>
      </main>
    );
  }

  return (
    <main className="section container">
      <SectionHeading
        eyebrow="Active Sector"
        title="Solar Installation Services"
        description="Complete solar solutions for residential and commercial clients across Assam."
      />

      <div className="solar-grid">
        <article className="content-card">
          <h3>Overview</h3>
          <p>
            We provide end-to-end solar project services including site audit, design, installation, commissioning, and
            support.
          </p>
          <h3>Residential Services</h3>
          <p>Rooftop solar systems optimized for home energy savings and long-term reliability.</p>
          <h3>Commercial Services</h3>
          <p>High-capacity systems for offices, campuses, warehouses, and industrial facilities.</p>
        </article>

        <article className="content-card">
          <h3>Installation Process</h3>
          <ol className="process-list">
            <li>Site inspection and consumption analysis</li>
            <li>System design and proposal</li>
            <li>Material planning and execution schedule</li>
            <li>Installation and quality testing</li>
            <li>Commissioning and post-installation support</li>
          </ol>

          <h3>Benefits</h3>
          <ul className="benefits-list">
            <li>Lower electricity bills</li>
            <li>Reduced carbon footprint</li>
            <li>Reliable long-term asset value</li>
            <li>Scalable energy capacity</li>
          </ul>

          <div className="cta-row">
            <Link href="/contact" className="button">
              Book Consultation
            </Link>
            <a href="#solar-lead" className="button button-outline">
              Get Instant Quote
            </a>
          </div>
        </article>
      </div>

      <section id="solar-lead" className="section-soft">
        <LeadForm variant="quote" title="Request Solar Quote" />
      </section>
    </main>
  );
}
