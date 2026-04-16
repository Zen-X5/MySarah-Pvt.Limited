"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { company } from "@/lib/constants";

export default function SolarPriceIndiaContent() {
  const { t } = useTranslation();

  const pricingBands = [
    { size: "1kW", typicalUse: t("solar.price.band.1kw") },
    { size: "2kW", typicalUse: t("solar.price.band.2kw") },
    { size: "3kW", typicalUse: t("solar.price.band.3kw") },
    { size: "5kW", typicalUse: t("solar.price.band.5kw") },
    { size: "10kW", typicalUse: t("solar.price.band.10kw") },
  ];

  return (
    <main className="section">
      <div className="container">
        <section className="content-card" aria-labelledby="solar-price-india-heading">
          <p className="eyebrow">{t("solar.price.eyebrow")}</p>
          <h1 id="solar-price-india-heading">{t("solar.price.title")}</h1>
          <p>{t("solar.price.description")}</p>

          <h2>{t("solar.price.popularSizesTitle")}</h2>
          <div className="admin-application-grid">
            {pricingBands.map((band) => (
              <div className="admin-application-field" key={band.size}>
                <strong>{t("solar.price.systemLabel", { size: band.size })}</strong>
                <span>{band.typicalUse}</span>
              </div>
            ))}
          </div>

          <h2>{t("solar.price.costImpactTitle")}</h2>
          <ul className="benefits-list">
            <li>{t("solar.price.costImpact.systemType")}</li>
            <li>{t("solar.price.costImpact.quality")}</li>
            <li>{t("solar.price.costImpact.roof")}</li>
            <li>{t("solar.price.costImpact.netMetering")}</li>
            <li>{t("solar.price.costImpact.battery")}</li>
          </ul>

          <h2>{t("solar.price.quoteTitle")}</h2>
          <p>{t("solar.price.quoteDescription", { company: company.shortName })}</p>

          <div className="cta-row">
            <Link href="/contact" className="button">
              {t("solar.price.cta.estimate")}
            </Link>
            <Link href="/solar-subsidy-india" className="button button-outline">
              {t("solar.price.cta.subsidy")}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
