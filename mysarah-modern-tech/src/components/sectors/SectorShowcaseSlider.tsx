"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { company } from "@/lib/constants";

type SlideVariant = "brand" | "lines" | "burst" | "grid";

interface SlideItem {
  label: string;
  title: string;
  detail: string;
  variant: SlideVariant;
  image?: string;
}

const slides: SlideItem[] = [
  {
    label: "Brand Presence",
    title: company.name,
    detail: "Private Limited",
    variant: "brand",
    image: "/images/home.png",
  },
  {
    label: "Solar EPC",
    title: "Engineering the clean-energy transition",
    detail: "Residential rooftops, commercial campuses, and industrial deployments.",
    variant: "lines",
    image: "/images/hero-solar.svg",
  },
  {
    label: "EV Infrastructure",
    title: "Connected charging for the next mobility wave",
    detail: "Fast, reliable charging ecosystems for urban and highway growth.",
    variant: "burst",
    image: "/images/hero-ev.svg",
  },
  {
    label: "Smart Buildings",
    title: "Digital systems for resilient facilities",
    detail: "Automation, security, and energy intelligence in one view.",
    variant: "grid",
    image: "/images/hero-grid.svg",
  },
];

export default function SectorShowcaseSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((slide) => (slide + 1) % slides.length);
    }, 7200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="sectors-slider-shell" aria-label="Sector showcase slider">
      <div className="sectors-slider">
        <div className="sectors-track">
          {slides.map((slide, index) => (
            <article
              key={slide.label}
              className={`sectors-slide sectors-slide-${slide.variant} ${index === currentSlide ? "sectors-slide-active" : ""}`}
              aria-hidden={index !== currentSlide}
            >
              <div className="sectors-slide-media">
                <Image src={slide.image ?? "/images/home.png"} alt={slide.title} fill className="sectors-slide-image" priority={index === 0} />
                <div className="sectors-slide-overlay" />
                {slide.variant !== "brand" ? (
                  <div className="sectors-slide-geometry" aria-hidden="true">
                    <svg viewBox="0 0 1000 700" className="sectors-geometry-svg" preserveAspectRatio="none">
                      {slide.variant === "lines" ? (
                        <>
                          <circle cx="500" cy="350" r="265" className="geo-stroke geo-stroke-circle" pathLength={100} />
                          <path d="M70 95 L500 350 L930 95" className="geo-stroke geo-stroke-line" pathLength={100} />
                          <path d="M70 605 L500 350 L930 605" className="geo-stroke geo-stroke-line geo-stroke-line-alt" pathLength={100} />
                        </>
                      ) : null}
                      {slide.variant === "burst" ? (
                        <>
                          <circle cx="500" cy="350" r="248" className="geo-stroke geo-stroke-circle geo-stroke-circle-large" pathLength={100} />
                          <circle cx="500" cy="350" r="162" className="geo-stroke geo-stroke-circle geo-stroke-circle-small" pathLength={100} />
                          <path d="M500 92 V608" className="geo-stroke geo-stroke-burst geo-stroke-burst-vert" pathLength={100} />
                          <path d="M214 162 L500 350 L786 162" className="geo-stroke geo-stroke-burst geo-stroke-burst-up" pathLength={100} />
                          <path d="M214 538 L500 350 L786 538" className="geo-stroke geo-stroke-burst geo-stroke-burst-down" pathLength={100} />
                          <path d="M258 350 H742" className="geo-stroke geo-stroke-burst geo-stroke-burst-mid" pathLength={100} />
                        </>
                      ) : null}
                      {slide.variant === "grid" ? (
                        <>
                          <circle cx="500" cy="350" r="238" className="geo-stroke geo-stroke-circle geo-stroke-circle-grid" pathLength={100} />
                          <path d="M120 140 H880" className="geo-stroke geo-stroke-grid" pathLength={100} />
                          <path d="M120 240 H880" className="geo-stroke geo-stroke-grid" pathLength={100} />
                          <path d="M120 420 H880" className="geo-stroke geo-stroke-grid" pathLength={100} />
                          <path d="M120 540 H880" className="geo-stroke geo-stroke-grid" pathLength={100} />
                          <path d="M230 80 V620" className="geo-stroke geo-stroke-grid" pathLength={100} />
                          <path d="M390 80 V620" className="geo-stroke geo-stroke-grid" pathLength={100} />
                          <path d="M610 80 V620" className="geo-stroke geo-stroke-grid" pathLength={100} />
                          <path d="M770 80 V620" className="geo-stroke geo-stroke-grid" pathLength={100} />
                        </>
                      ) : null}
                    </svg>
                  </div>
                ) : null}
                <div className="sectors-slide-copy">
                  <p>{slide.label}</p>
                  <h3>{slide.title}</h3>
                  <span>{slide.detail}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="sectors-dots" aria-hidden="true">
          {slides.map((slide, index) => (
            <span key={slide.label} className={index === currentSlide ? "sectors-dot active" : "sectors-dot"} />
          ))}
        </div>
      </div>
    </div>
  );
}
