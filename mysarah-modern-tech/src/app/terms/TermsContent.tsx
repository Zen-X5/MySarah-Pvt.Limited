"use client";

import { useTranslation } from "react-i18next";
import { company } from "@/lib/constants";

export default function TermsContent() {
  const { t } = useTranslation();

  return (
    <main className="terms-page">
      <section className="terms-hero">
        <div className="terms-hero-overlay" />
        <div className="container terms-shell terms-hero-inner">
          <p className="eyebrow">{t("terms.eyebrow")}</p>
          <h1>{t("terms.title")}</h1>
          <p>{t("terms.subtitle")}</p>
        </div>
      </section>

      <section className="terms-intro">
        <div className="container terms-shell">
          <p>{t("terms.intro", { company: company.name })}</p>
        </div>
      </section>

      <section className="terms-content-wrap">
        <div className="container terms-shell terms-document" role="document">
          <section className="terms-section" aria-labelledby="terms-scope">
            <h2 id="terms-scope">{t("terms.scope.title")}</h2>
            <p>{t("terms.scope.body")}</p>
          </section>

          <section className="terms-section" aria-labelledby="terms-accuracy">
            <h2 id="terms-accuracy">{t("terms.accuracy.title")}</h2>
            <p>{t("terms.accuracy.body")}</p>
          </section>

          <section className="terms-section" aria-labelledby="terms-use">
            <h2 id="terms-use">{t("terms.use.title")}</h2>
            <p>{t("terms.use.body")}</p>
          </section>

          <section className="terms-section" aria-labelledby="terms-pricing">
            <h2 id="terms-pricing">{t("terms.pricing.title")}</h2>
            <p>{t("terms.pricing.body")}</p>
          </section>

          <section className="terms-section" aria-labelledby="terms-documents">
            <h2 id="terms-documents">{t("terms.documents.title")}</h2>
            <p>{t("terms.documents.body")}</p>
            <ul>
              <li>{t("terms.documents.point1")}</li>
              <li>{t("terms.documents.point2")}</li>
              <li>{t("terms.documents.point3")}</li>
            </ul>
          </section>

          <section className="terms-section" aria-labelledby="terms-liability">
            <h2 id="terms-liability">{t("terms.liability.title")}</h2>
            <p>{t("terms.liability.body")}</p>
          </section>

          <section className="terms-section" aria-labelledby="terms-updates">
            <h2 id="terms-updates">{t("terms.updates.title")}</h2>
            <p>{t("terms.updates.body")}</p>
          </section>

          <section className="terms-section" aria-labelledby="terms-contact">
            <h2 id="terms-contact">{t("terms.contact.title")}</h2>
            <p>
              {t("terms.contact.body")}
              <br />
              {company.name}
              <br />
              {t("Email")}: <a href={`mailto:${company.email}`}>{company.email}</a>
              <br />
              {t("Phone")}: <a href={`tel:${company.phone.replace(/\s+/g, "")}`}>{company.phone}</a>
              <br />
              {t("Address")}: {company.address}
            </p>
          </section>

          <section className="terms-section" aria-labelledby="terms-last-updated">
            <h2 id="terms-last-updated">{t("terms.lastUpdated.title")}</h2>
            <p>{t("terms.lastUpdated.value")}</p>
          </section>
        </div>
      </section>
    </main>
  );
}
