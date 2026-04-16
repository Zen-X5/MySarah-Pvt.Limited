"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { company } from "@/lib/constants";

export default function PrivacyContent() {
  const { t } = useTranslation();

  return (
    <main className="privacy-page">
      <section className="privacy-hero-banner">
        <div className="privacy-hero-overlay" />
        <div className="container privacy-shell privacy-hero-inner">
          <p className="eyebrow">{t("privacy.eyebrow")}</p>
          <h1>{t("privacy.title")}</h1>
          <p>{t("privacy.subtitle")}</p>
        </div>
      </section>

      <section className="privacy-intro-block">
        <div className="container privacy-shell">
          <p className="privacy-intro">{t("privacy.intro")}</p>
        </div>
      </section>

      <section className="privacy-section-block privacy-collect-block" aria-labelledby="privacy-collect">
        <div className="container privacy-shell">
          <h2 id="privacy-collect">{t("privacy.collect.title")}</h2>
          <div className="privacy-collect-grid">
            <article className="privacy-data-card">
              <span className="privacy-icon">ID</span>
              <h3>{t("privacy.collect.identity.title")}</h3>
              <p>{t("privacy.collect.identity.body")}</p>
            </article>
            <article className="privacy-data-card">
              <span className="privacy-icon">BNK</span>
              <h3>{t("privacy.collect.financial.title")}</h3>
              <p>{t("privacy.collect.financial.body")}</p>
            </article>
            <article className="privacy-data-card">
              <span className="privacy-icon">UTL</span>
              <h3>{t("privacy.collect.utility.title")}</h3>
              <p>{t("privacy.collect.utility.body")}</p>
            </article>
            <article className="privacy-data-card">
              <span className="privacy-icon">GPS</span>
              <h3>{t("privacy.collect.location.title")}</h3>
              <p>{t("privacy.collect.location.body")}</p>
            </article>
            <article className="privacy-data-card">
              <span className="privacy-icon">CNT</span>
              <h3>{t("privacy.collect.contact.title")}</h3>
              <p>{t("privacy.collect.contact.body")}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="privacy-section-block privacy-purpose-block" aria-labelledby="privacy-purpose">
        <div className="container privacy-shell privacy-purpose-layout">
          <article className="privacy-purpose-copy">
            <h2 id="privacy-purpose">{t("privacy.purpose.title")}</h2>
            <p>{t("privacy.purpose.body")}</p>
            <ul>
              <li>{t("privacy.purpose.point1")}</li>
              <li>{t("privacy.purpose.point2")}</li>
              <li>{t("privacy.purpose.point3")}</li>
            </ul>
          </article>
          <article className="privacy-purpose-media">
            <Image
              src="/images/data%20collection.jpg"
              alt={t("privacy.purpose.imageAlt")}
              fill
              quality={92}
              sizes="(max-width: 900px) 100vw, 42vw"
              className="privacy-purpose-image"
            />
          </article>
        </div>
      </section>

      <section className="privacy-section-block privacy-security-block" aria-labelledby="privacy-security">
        <div className="container privacy-shell">
          <h2 id="privacy-security">{t("privacy.security.title")}</h2>
          <p className="privacy-security-lead">{t("privacy.security.lead")}</p>
          <div className="privacy-security-grid">
            <article className="privacy-security-card">
              <span className="privacy-icon privacy-icon-strong">LOCK</span>
              <h3>{t("privacy.security.storage.title")}</h3>
              <p>{t("privacy.security.storage.body")}</p>
            </article>
            <article className="privacy-security-card">
              <span className="privacy-icon privacy-icon-strong">SHLD</span>
              <h3>{t("privacy.security.access.title")}</h3>
              <p>{t("privacy.security.access.body")}</p>
            </article>
            <article className="privacy-security-card">
              <span className="privacy-icon privacy-icon-strong">SRV</span>
              <h3>{t("privacy.security.misuse.title")}</h3>
              <p>{t("privacy.security.misuse.body")}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="privacy-section-block privacy-sharing-block" aria-labelledby="privacy-sharing">
        <div className="container privacy-shell">
          <h2 id="privacy-sharing">{t("privacy.sharing.title")}</h2>
          <div className="privacy-sharing-grid">
            <article className="privacy-sharing-card">
              <h3>{t("privacy.sharing.notSold.title")}</h3>
              <p>{t("privacy.sharing.notSold.body")}</p>
            </article>
            <article className="privacy-sharing-card">
              <h3>{t("privacy.sharing.limited.title")}</h3>
              <p>{t("privacy.sharing.limited.body")}</p>
            </article>
            <article className="privacy-sharing-card">
              <h3>{t("privacy.sharing.compliance.title")}</h3>
              <p>{t("privacy.sharing.compliance.body")}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="privacy-section-block privacy-rights-block" aria-labelledby="privacy-rights">
        <div className="container privacy-shell">
          <h2 id="privacy-rights">{t("privacy.rights.title")}</h2>
          <div className="privacy-rights-grid">
            <article className="privacy-right-card">
              <h3>{t("privacy.rights.access.title")}</h3>
              <p>{t("privacy.rights.access.body")}</p>
            </article>
            <article className="privacy-right-card">
              <h3>{t("privacy.rights.correction.title")}</h3>
              <p>{t("privacy.rights.correction.body")}</p>
            </article>
            <article className="privacy-right-card">
              <h3>{t("privacy.rights.deletion.title")}</h3>
              <p>{t("privacy.rights.deletion.body")}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="privacy-section-block privacy-cta-block" aria-labelledby="privacy-contact">
        <div className="container privacy-shell privacy-cta-inner">
          <h2 id="privacy-contact">{t("privacy.cta.title")}</h2>
          <p>
            {t("privacy.cta.body")}
            <br />
            {t("Email")}: <a href={`mailto:${company.email}`}>{company.email}</a> | {t("Phone")}: <a href={`tel:${company.phone.replace(/\s+/g, "")}`}>{company.phone}</a>
          </p>
          <Link href="/contact" className="button privacy-cta-button">
            {t("Contact Us")}
          </Link>
          <p className="privacy-updated">{t("privacy.lastUpdated", { date: "April 16, 2026" })}</p>
        </div>
      </section>
    </main>
  );
}
