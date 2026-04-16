"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function SolarSubsidyIndiaContent() {
  const { t } = useTranslation();
  const faq = [1, 2, 3, 4].map((index) => ({
    q: t(`solar.subsidy.faq.${index}.q`),
    a: t(`solar.subsidy.faq.${index}.a`),
  }));

  return (
    <main className="section">
      <div className="container">
        <section className="content-card" aria-labelledby="solar-subsidy-india-heading">
          <p className="eyebrow">{t("solar.subsidy.eyebrow")}</p>
          <h1 id="solar-subsidy-india-heading">{t("solar.subsidy.title")}</h1>
          <p>{t("solar.subsidy.description")}</p>

          <h2>{t("solar.subsidy.journeyTitle")}</h2>
          <ol className="process-list">
            <li>{t("solar.subsidy.step.eligibility")}</li>
            <li>{t("solar.subsidy.step.documents")}</li>
            <li>{t("solar.subsidy.step.apply")}</li>
            <li>{t("solar.subsidy.step.install")}</li>
            <li>{t("solar.subsidy.step.track")}</li>
          </ol>

          <h2>{t("solar.subsidy.notesTitle")}</h2>
          <ul className="benefits-list">
            <li>{t("solar.subsidy.note.guidelines")}</li>
            <li>{t("solar.subsidy.note.value")}</li>
            <li>{t("solar.subsidy.note.documentation")}</li>
          </ul>

          <h2>{t("solar.subsidy.faqTitle")}</h2>
          <div className="admin-document-checklist-grid">
            {faq.map((item) => (
              <article className="admin-document-checklist-item" key={item.q}>
                <strong>{item.q}</strong>
                <span>{item.a}</span>
              </article>
            ))}
          </div>

          <div className="cta-row">
            <Link href="/contact" className="button">
              {t("solar.subsidy.cta.support")}
            </Link>
            <Link href="/solar-installation-india" className="button button-outline">
              {t("solar.subsidy.cta.installation")}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
