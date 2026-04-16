"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Sector } from "@/lib/sectors";

interface SectorCardProps {
  sector: Sector;
}

export default function SectorCard({ sector }: SectorCardProps) {
  const { t } = useTranslation();
  const [cardImage, setCardImage] = useState(sector.heroImage);
  const imageFitClass = sector.imageFit === "contain" ? "sector-media-image-contain" : "";

  return (
    <article className={`sector-card ${sector.active ? "sector-card-active" : "sector-card-inactive"}`}>
      <Image
        src={cardImage}
        alt={sector.title}
        fill
        quality={95}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`sector-media-image ${imageFitClass}`.trim()}
        style={{ objectFit: sector.imageFit ?? "cover", objectPosition: "center" }}
        onError={() => {
          if (cardImage !== "/images/hero-grid.svg") {
            setCardImage("/images/hero-grid.svg");
          }
        }}
      />
      <div className="sector-media-overlay" />
      <p className="sector-state">{sector.active ? t("Active") : t("Coming Soon")}</p>
      <div className="sector-content">
        <h3>{t(sector.title)}</h3>
        <p>{t(sector.description)}</p>
        {sector.active ? (
          <Link href={`/sectors/${sector.slug}`} className="button button-outline">
            {t("Explore Sector")}
          </Link>
        ) : null}
      </div>
    </article>
  );
}
