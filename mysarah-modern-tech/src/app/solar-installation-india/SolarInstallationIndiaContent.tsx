"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { company } from "@/lib/constants";

export default function SolarInstallationIndiaContent() {
  const { t } = useTranslation();

  const serviceAreas = [
    t("solar.installationIndia.serviceArea.residential"),
    t("solar.installationIndia.serviceArea.commercial"),
    t("solar.installationIndia.serviceArea.industrial"),
    t("solar.installationIndia.serviceArea.institutions"),
  ];

  const processSteps = [
    t("solar.installationIndia.process.survey"),
    t("solar.installationIndia.process.sizing"),
    t("solar.installationIndia.process.subsidy"),
    t("solar.installationIndia.process.installation"),
    t("solar.installationIndia.process.support"),
  ];

  return (
    <main className="section">
      <div className="container">
        <section className="content-card" aria-labelledby="solar-installation-india-heading">
          <p className="eyebrow">{t("solar.installationIndia.eyebrow")}</p>
          <h1 id="solar-installation-india-heading">{t("solar.installationIndia.title")}</h1>
          <p>{t("solar.installationIndia.description", { company: company.shortName })}</p>

          <h2>{t("solar.installationIndia.whoWeServe")}</h2>
          <ul className="benefits-list">
            {serviceAreas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2>{t("solar.installationIndia.workflowTitle")}</h2>
          <ol className="process-list">
            {processSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          <h2>{t("solar.installationIndia.whyChooseTitle")}</h2>
          <p>{t("solar.installationIndia.whyChooseDescription")}</p>

          <div className="cta-row">
            <Link href="/contact" className="button">
              {t("solar.installationIndia.cta.consultation")}
            </Link>
            <Link href="/solar-price-india" className="button button-outline">
              {t("solar.installationIndia.cta.priceGuide")}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
