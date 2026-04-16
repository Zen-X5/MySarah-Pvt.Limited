"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

interface Props {
  cityName: string;
}

export default function SolarCityContent({ cityName }: Props) {
  const { t } = useTranslation();

  return (
    <main className="section">
      <div className="container">
        <section className="content-card" aria-labelledby="solar-city-heading">
          <p className="eyebrow">{t("solar.city.eyebrow")}</p>
          <h1 id="solar-city-heading">{t("solar.city.title", { city: cityName })}</h1>
          <p>{t("solar.city.description", { city: cityName })}</p>

          <h2>{t("solar.city.requestTitle")}</h2>
          <ul className="benefits-list">
            <li>{t("solar.city.request.residential")}</li>
            <li>{t("solar.city.request.commercial")}</li>
            <li>{t("solar.city.request.technical")}</li>
            <li>{t("solar.city.request.guidance")}</li>
          </ul>

          <h2>{t("solar.city.startTitle")}</h2>
          <p>{t("solar.city.startDescription")}</p>

          <div className="cta-row">
            <Link href="/contact" className="button">
              {t("solar.city.cta.consultation", { city: cityName })}
            </Link>
            <Link href="/solar-price-india" className="button button-outline">
              {t("solar.city.cta.priceGuide")}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
