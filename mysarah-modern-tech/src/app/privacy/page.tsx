import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Notice | Mysarah Modern Tech",
  description:
    "Privacy Notice for Mysarah Modern Tech Private Limited covering personal data collection, usage, protection, and user rights.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <section className="privacy-hero-banner">
        <div className="privacy-hero-overlay" />
        <div className="container privacy-shell privacy-hero-inner">
          <p className="eyebrow">Corporate Policy</p>
          <h1>Privacy Notice</h1>
          <p>Protecting your data with trust and responsibility</p>
        </div>
      </section>

      <section className="privacy-intro-block">
        <div className="container privacy-shell">
          <p className="privacy-intro">
            We handle personal and document data only for solar service processing. Our approach is simple: collect
            what is necessary, protect it with strong controls, and use it responsibly for customer service, project
            execution, and compliance.
          </p>
        </div>
      </section>

      <section className="privacy-section-block privacy-collect-block" aria-labelledby="privacy-collect">
        <div className="container privacy-shell">
          <h2 id="privacy-collect">Information We Collect</h2>
          <div className="privacy-collect-grid">
            <article className="privacy-data-card">
              <span className="privacy-icon">ID</span>
              <h3>Identity Documents</h3>
              <p>Aadhar Card and PAN Card for customer identity validation.</p>
            </article>
            <article className="privacy-data-card">
              <span className="privacy-icon">BNK</span>
              <h3>Financial Information</h3>
              <p>Bank Passbook details for payment, subsidy, and financial process support.</p>
            </article>
            <article className="privacy-data-card">
              <span className="privacy-icon">UTL</span>
              <h3>Utility Documents</h3>
              <p>Electricity Bill records for load analysis and service planning.</p>
            </article>
            <article className="privacy-data-card">
              <span className="privacy-icon">GPS</span>
              <h3>Location Data</h3>
              <p>GPS photos of the installation area for feasibility checks and planning.</p>
            </article>
            <article className="privacy-data-card">
              <span className="privacy-icon">CNT</span>
              <h3>Contact Information</h3>
              <p>Contact number and email ID for service updates and customer communication.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="privacy-section-block privacy-purpose-block" aria-labelledby="privacy-purpose">
        <div className="container privacy-shell privacy-purpose-layout">
          <article className="privacy-purpose-copy">
            <h2 id="privacy-purpose">Purpose of Data Collection</h2>
            <p>
              We collect data only to process solar services in a reliable, compliant, and transparent way. This helps
              our teams verify customer information, prepare accurate technical plans, and complete project execution
              and documentation without delay.
            </p>
            <ul>
              <li>Identity and eligibility checks for service processing</li>
              <li>Technical review and installation planning</li>
              <li>Regulatory, subsidy, and compliance documentation</li>
            </ul>
          </article>
          <article className="privacy-purpose-media">
            <Image
              src="/images/data%20collection.jpg"
              alt="Data collection for solar service processing"
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
          <h2 id="privacy-security">Data Security</h2>
          <p className="privacy-security-lead">Your records are protected with strict internal controls and secure handling standards.</p>
          <div className="privacy-security-grid">
            <article className="privacy-security-card">
              <span className="privacy-icon privacy-icon-strong">LOCK</span>
              <h3>Secure Storage</h3>
              <p>Data is stored in controlled systems with defined protection layers.</p>
            </article>
            <article className="privacy-security-card">
              <span className="privacy-icon privacy-icon-strong">SHLD</span>
              <h3>Limited Access</h3>
              <p>Only authorized personnel can access documents required for processing.</p>
            </article>
            <article className="privacy-security-card">
              <span className="privacy-icon privacy-icon-strong">SRV</span>
              <h3>Misuse Prevention</h3>
              <p>Operational controls reduce risk of unauthorized use, loss, or exposure.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="privacy-section-block privacy-sharing-block" aria-labelledby="privacy-sharing">
        <div className="container privacy-shell">
          <h2 id="privacy-sharing">Data Sharing</h2>
          <div className="privacy-sharing-grid">
            <article className="privacy-sharing-card">
              <h3>Not Sold to Third Parties</h3>
              <p>We do not sell personal data for commercial marketing or external advertising.</p>
            </article>
            <article className="privacy-sharing-card">
              <h3>Limited Sharing Only</h3>
              <p>Sharing is restricted to required entities for service execution and approvals.</p>
            </article>
            <article className="privacy-sharing-card">
              <h3>Service and Legal Compliance</h3>
              <p>Data is shared only when required for project processing or regulatory obligations.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="privacy-section-block privacy-rights-block" aria-labelledby="privacy-rights">
        <div className="container privacy-shell">
          <h2 id="privacy-rights">User Rights</h2>
          <div className="privacy-rights-grid">
            <article className="privacy-right-card">
              <h3>Access Data</h3>
              <p>You can request details of personal information submitted to us.</p>
            </article>
            <article className="privacy-right-card">
              <h3>Request Correction</h3>
              <p>You can ask us to correct inaccurate or incomplete records.</p>
            </article>
            <article className="privacy-right-card">
              <h3>Request Deletion</h3>
              <p>You can request deletion where legally permitted and operationally possible.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="privacy-section-block privacy-cta-block" aria-labelledby="privacy-contact">
        <div className="container privacy-shell privacy-cta-inner">
          <h2 id="privacy-contact">Have questions about your data?</h2>
          <p>
            Our team is available to support your privacy-related questions and service clarifications.
            <br />
            Email: <a href={`mailto:${company.email}`}>{company.email}</a> | Phone: <a href={`tel:${company.phone.replace(/\s+/g, "")}`}>{company.phone}</a>
          </p>
          <Link href="/contact" className="button privacy-cta-button">
            Contact Us
          </Link>
          <p className="privacy-updated">Last Updated: April 16, 2026</p>
        </div>
      </section>
    </main>
  );
}
