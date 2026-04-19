"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import FeedbackComplianceForm from "@/components/forms/FeedbackComplianceForm";
import LeadForm from "@/components/forms/LeadForm";
import SectionHeading from "@/components/shared/SectionHeading";
import { company } from "@/lib/constants";

type SocialName = "instagram" | "facebook" | "linkedin";

function SocialIcon({ name }: { name: SocialName }) {
  if (name === "instagram") {
    return (
      <svg className="social-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8a3.7 3.7 0 0 0-3.7 3.7v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9Zm9.3 1.5a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z"
        />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg className="social-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M13.4 22v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.6 1.7-1.6h1.8V4.2c-.3 0-1.4-.2-2.6-.2-2.6 0-4.3 1.6-4.3 4.5v2.1H7.2v3.2H10V22h3.4Z"
        />
      </svg>
    );
  }

  return (
    <svg className="social-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M20.5 3A.5.5 0 0 1 21 3.5v17a.5.5 0 0 1-.5.5h-17a.5.5 0 0 1-.5-.5v-17A.5.5 0 0 1 3.5 3h17Zm-11 6.5H6.7V18h2.8V9.5ZM8.1 6A1.6 1.6 0 1 0 8 9.2 1.6 1.6 0 0 0 8.1 6Zm9.2 6.7c0-2.5-1.3-3.7-3.2-3.7-1.5 0-2.1.8-2.5 1.3v-1h-2.8V18h2.8v-4.8c0-1.3.4-2.6 2-2.6 1.6 0 1.6 1.5 1.6 2.7V18H18v-5.3Z"
      />
    </svg>
  );
}

export default function ContactPageContent() {
  const { t } = useTranslation();

  return (
    <main className="contact-page">
      <section className="contact-hero-wrap">
        <div className="container contact-hero-grid">
          <article className="contact-hero-copy">
            <p className="eyebrow">{t("Contact")}</p>
            <h1>{t("contact.hero.title")}</h1>
            <p>{t("contact.hero.description")}</p>
            <div className="contact-hero-metrics" aria-label={t("contact.hero.quickFacts") }>
              <article>
                <strong>&lt; 24h</strong>
                <span>{t("contact.hero.metric.response")}</span>
              </article>
              <article>
                <strong>{t("Assam")}</strong>
                <span>{t("contact.hero.metric.region")}</span>
              </article>
              <article>
                <strong>1:1</strong>
                <span>{t("contact.hero.metric.coordination")}</span>
              </article>
            </div>
          </article>

          <div className="contact-hero-media">
            <Image
              src="/images/query.png"
              alt={t("contact.hero.imageAlt")}
              fill
              quality={95}
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="contact-hero-image"
            />
            <div className="contact-hero-overlay" />
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHeading
          eyebrow={t("contact.query.eyebrow")}
          title={t("contact.query.title")}
          description={t("contact.query.description")}
        />

        <div className="contact-grid">
          <LeadForm variant="contact" title={t("Contact Form")} />

          <aside className="contact-aside contact-aside-pro">
            <h3>{t("Reach Us")}</h3>
            <p>{company.name}</p>
            <p>{company.address}</p>

            <div className="contact-detail-list">
              <p>
                {t("Phone")}
                <a href={`tel:${company.phone.replace(/\s+/g, "")}`}>{company.phone}</a>
              </p>
              <p>
                {t("Email")}
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </p>
            </div>

            <div className="contact-social-list" aria-label="Company social profiles">
              <a href={company.socialProfiles.instagram} target="_blank" rel="noreferrer">
                <SocialIcon name="instagram" />
                <span className="social-link-text">Instagram</span>
              </a>
              <a href={company.socialProfiles.facebook} target="_blank" rel="noreferrer">
                <SocialIcon name="facebook" />
                <span className="social-link-text">Facebook</span>
              </a>
              <a href={company.socialProfiles.linkedin} target="_blank" rel="noreferrer">
                <SocialIcon name="linkedin" />
                <span className="social-link-text">LinkedIn</span>
              </a>
            </div>

            <div className="map-wrap">
              <iframe
                title={t("Mysarah Modern Tech Location")}
                src="https://www.google.com/maps?q=Guwahati,Assam&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>

        <div className="contact-feedback-shell">
          <FeedbackComplianceForm />
        </div>
      </section>
    </main>
  );
}
