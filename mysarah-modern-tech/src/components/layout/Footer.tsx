"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
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

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h4>{company.name}</h4>
          <p>{company.address}</p>
          <p>{company.email}</p>
          <div className="footer-socials" aria-label="Company social profiles">
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
        </div>
        <div>
          <h4>{t("Explore")}</h4>
          <ul>
            <li>
              <Link href="/">{t("Home")}</Link>
            </li>
            <li>
              <Link href="/sectors">{t("Sectors")}</Link>
            </li>
            <li>
              <Link href="/contact">{t("Contact")}</Link>
            </li>
            <li>
              <Link href="/privacy">{t("footer.privacyNotice")}</Link>
            </li>
            <li>
              <Link href="/terms">{t("footer.termsOfService")}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>{t("Mission")}</h4>
          <p>
            {t("Building a multi-sector technology platform from Assam with a strong foundation in clean energy and scalable service delivery.")}
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
