import type { Metadata } from "next";
import Link from "next/link";
import HeroCarousel from "@/components/home/HeroCarousel";
import SolarInsightsPanel from "@/components/home/SolarInsightsPanel";
import SectionHeading from "@/components/shared/SectionHeading";
import SectorCard from "@/components/shared/SectorCard";
import { company } from "@/lib/constants";
import { sectors } from "@/lib/sectors";

export const metadata: Metadata = {
  title: "Mysarah Modern Tech | Corporate Multi-Sector Startup",
  description:
    "Mysarah Modern Tech Private Limited is a multi-sector startup based in Assam, India. Explore solar installation services and upcoming sectors.",
};

export default function Home() {
  const featured = sectors.slice(0, 4);
  const blueprintCards = [
    {
      id: "01",
      title: "Consult & Assess",
      image: "/images/home.png",
      backTitle: "Discovery and Feasibility",
      backText:
        "We capture technical baseline, energy patterns, and business goals to build a viable project scope with realistic ROI expectations.",
    },
    {
      id: "02",
      title: "Engineer & Plan",
      image: "/images/hero-grid.svg",
      backTitle: "Design and Execution Planning",
      backText:
        "Our team finalizes system sizing, engineering documents, project timeline, and resource plan with clear milestones and accountability.",
    },
    {
      id: "03",
      title: "Deploy & Optimize",
      image: "/images/hero-ev.svg",
      backTitle: "Delivery to Lifecycle Support",
      backText:
        "From installation and commissioning to post-go-live performance reviews, we ensure long-term efficiency and expansion readiness.",
    },
  ];

  return (
    <main>
      <HeroCarousel />

      <section className="section media-story-section">
        <div className="media-story-image-shell">
          <div className="container media-story-content">
            <p className="eyebrow">Who We Are</p>
            <h2>A premium operational model built for scale</h2>
            <p>
              {company.name} blends disciplined governance with fast execution to build long-term value across sectors
              from {company.city}, India.
            </p>
            <div className="media-story-metrics">
              <article>
                <strong>01</strong>
                <span>Active sector operating</span>
              </article>
              <article>
                <strong>04</strong>
                <span>Planned sector roadmap</span>
              </article>
              <article>
                <strong>24x7</strong>
                <span>Client communication support</span>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section tech-future-section">
        <div className="container tech-future-grid">
          <article className="tech-future-lead">
            <p className="eyebrow">Future Narrative</p>
            <h2>
              Why <span className="hero-keyword">technology</span> leads the future of infrastructure
            </h2>
            <p>
              We believe the next decade belongs to businesses that combine physical execution with digital intelligence.
              From planning and deployment to monitoring and optimization, technology converts projects into scalable,
              measurable systems.
            </p>
          </article>

          <article className="tech-future-points">
            <div>
              <h3>Smarter Decisions</h3>
              <p>Data-backed planning improves technical accuracy, speed, and lifecycle outcomes.</p>
            </div>
            <div>
              <h3>Operational Visibility</h3>
              <p>Real-time monitoring and transparent status tracking strengthen trust and execution control.</p>
            </div>
            <div>
              <h3>Scalable Expansion</h3>
              <p>Reusable digital systems make it easier to launch new sectors without rebuilding from zero.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section section-soft strategy-media-section">
        <div className="container strategy-shell">
          <SectionHeading
            eyebrow="Operating Blueprint"
            title="How we execute from lead to lifecycle support"
            description="Every project follows a consistent enterprise-style framework with transparent milestones."
          />
        </div>
        <div className="media-flip-bleed">
          <div className="media-flip-grid">
            {blueprintCards.map((card) => (
              <article key={card.id} className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-face flip-card-front" style={{ backgroundImage: `url(${card.image})` }}>
                    <div className="flip-overlay" />
                    <div className="flip-front-content">
                      <span>{card.id}</span>
                      <h3>{card.title}</h3>
                    </div>
                  </div>
                  <div className="flip-card-face flip-card-back">
                    <span>{card.id}</span>
                    <h3>{card.backTitle}</h3>
                    <p>{card.backText}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            eyebrow="Sectors"
            title="Multi-sector corporate roadmap"
            description="Solar is active. Additional verticals are structured for phased launches with shared governance and digital foundations."
            align="center"
          />
          <div className="sector-grid">
            {featured.map((sector) => (
              <SectorCard key={sector.slug} sector={sector} />
            ))}
          </div>
          <div className="center-wrap">
            <Link href="/sectors" className="button">
              View All Sectors
            </Link>
          </div>
        </div>
      </section>

      <section className="section solar-transition-section">
        <div className="cta-panel">
          <div>
            <h2>Build your solar transition with boardroom-level clarity</h2>
            <p>
              From assessment to commissioning, we deliver a structured program for residential and commercial assets.
            </p>
          </div>
          <div className="cta-row">
            <Link href="/sectors/solar" className="button">
              Explore Solar
            </Link>
            <Link href="/contact" className="button button-outline">
              Contact Team
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-soft insights-section">
        <div className="insights-shell">
          <SectionHeading
            eyebrow="Execution Intelligence"
            title="Live installation data from admin workflow"
            description="Each completed installation from the admin panel updates this dashboard with location-wise footprint and progress analytics."
          />
          <SolarInsightsPanel />
        </div>
      </section>
    </main>
  );
}
