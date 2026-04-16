"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import AnimatedCard from "@/components/shared/AnimatedCard";
import AnimatedHeading from "@/components/shared/AnimatedHeading";
import LeadForm from "@/components/forms/LeadForm";
import SolarApplicationForm from "@/components/forms/SolarApplicationForm";
import type { Sector } from "@/lib/sectors";

interface Props {
  sector: Sector;
}

export default function SectorDetailContent({ sector }: Props) {
  const { t } = useTranslation();

  if (!sector.active) {
    return (
      <main className="section container">
        <section>
          <p className="eyebrow">{t("Coming Soon")}</p>
          <h1>{t("sector.inactive.title", { sector: t(sector.title) })}</h1>
          <p>{t("sector.inactive.description")}</p>
        </section>
        <Link href="/sectors" className="button">
          {t("Back to Sectors")}
        </Link>
      </main>
    );
  }

  if (sector.slug === "solar") {
    return (
      <main className="section solar-sector-page">
        <div className="container">
          <section className="solar-hero-panel">
            <div className="solar-hero-content">
              <p className="solar-hero-kicker">{t("Active Sector")}</p>
              <h1>{t("Solar Installation, Built as a Digital Service Layer")}</h1>
              <p>{t("sector.solar.hero.description")}</p>

              <div className="solar-hero-metrics">
                <article>
                  <strong>100%</strong>
                  <span>{t("sector.solar.metric.workflow")}</span>
                </article>
                <article>
                  <strong>{t("sector.solar.metric.gps")}</strong>
                  <span>{t("sector.solar.metric.coordinates")}</span>
                </article>
                <article>
                  <strong>{t("sector.solar.metric.phased")}</strong>
                  <span>{t("sector.solar.metric.commissioning")}</span>
                </article>
              </div>

              <div className="cta-row">
                <a href="#solar-application" className="button">
                  {t("Start Application")}
                </a>
                <Link href="/contact" className="button button-outline">
                  {t("Speak to Team")}
                </Link>
              </div>
            </div>

            <div className="solar-hero-side">
              <div className="solar-side-card">
                <p>{t("Digital Flow")}</p>
                <h3>{t("sector.solar.flow.title")}</h3>
                <ul>
                  <li>{t("sector.solar.flow.item1")}</li>
                  <li>{t("sector.solar.flow.item2")}</li>
                  <li>{t("sector.solar.flow.item3")}</li>
                  <li>{t("sector.solar.flow.item4")}</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="solar-process-band section-soft">
            <AnimatedHeading
              eyebrow={t("Execution Stack")}
              title={t("Systematic process for solar deployment")}
              description={t("sector.solar.pipelineDescription")}
              align="center"
            />

            <div className="solar-process-grid">
              {[
                {
                  title: t("Application Intake"),
                  text: t("sector.solar.process.intake"),
                },
                {
                  title: t("Geo Verification"),
                  text: t("sector.solar.process.geo"),
                },
                {
                  title: t("Technical Qualification"),
                  text: t("sector.solar.process.qualification"),
                },
                {
                  title: t("Execution Planning"),
                  text: t("sector.solar.process.planning"),
                },
              ].map((item, index) => (
                <AnimatedCard key={item.title} delay={0.08 * index}>
                  <article className="solar-process-item">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                </AnimatedCard>
              ))}
            </div>
          </section>

          <section id="solar-application" className="solar-application-wrap">
            <AnimatedHeading
              eyebrow={t("Customer Application")}
              title={t("Submit your solar installation details")}
              description={t("sector.solar.applicationDescription")}
            />
            <SolarApplicationForm />
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="section container">
      <section>
        <p className="eyebrow">{t("Active Sector")}</p>
        <h1>{t("sector.common.title")}</h1>
        <p>{t("sector.common.description")}</p>
      </section>

      <div className="solar-grid">
        <article className="content-card">
          <h3>{t("sector.common.overviewTitle")}</h3>
          <p>{t("sector.common.overviewText")}</p>
          <h3>{t("sector.common.residentialTitle")}</h3>
          <p>{t("sector.common.residentialText")}</p>
          <h3>{t("sector.common.commercialTitle")}</h3>
          <p>{t("sector.common.commercialText")}</p>
        </article>

        <article className="content-card">
          <h3>{t("sector.common.processTitle")}</h3>
          <ol className="process-list">
            <li>{t("sector.common.process.step1")}</li>
            <li>{t("sector.common.process.step2")}</li>
            <li>{t("sector.common.process.step3")}</li>
            <li>{t("sector.common.process.step4")}</li>
            <li>{t("sector.common.process.step5")}</li>
          </ol>

          <h3>{t("sector.common.benefitsTitle")}</h3>
          <ul className="benefits-list">
            <li>{t("sector.common.benefit.1")}</li>
            <li>{t("sector.common.benefit.2")}</li>
            <li>{t("sector.common.benefit.3")}</li>
            <li>{t("sector.common.benefit.4")}</li>
          </ul>

          <div className="cta-row">
            <Link href="/contact" className="button">
              {t("sector.common.cta.consult")}
            </Link>
            <a href="#solar-lead" className="button button-outline">
              {t("sector.common.cta.quote")}
            </a>
          </div>
        </article>
      </div>

      <section id="solar-lead" className="section-soft">
        <LeadForm variant="quote" title={t("sector.common.cta.requestQuote")} />
      </section>
    </main>
  );
}
