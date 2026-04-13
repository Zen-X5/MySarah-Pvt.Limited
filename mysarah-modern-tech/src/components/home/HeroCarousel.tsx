"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";

interface Slide {
  title: string;
  richTitle: ReactNode;
  subtitle: string;
  image: string;
}

const slides: Slide[] = [
  {
    title: "Powering Assam with modern solar infrastructure",
    richTitle: (
      <>
        Powering <span className="hero-keyword">Assam</span> with modern solar infrastructure
      </>
    ),
    subtitle:
      "Mysarah Modern Tech Private Limited is building a future-ready multi-sector platform, starting with clean energy solutions.",
    image: "/images/home.png",
  },
  {
    title: "Corporate execution with startup speed",
    richTitle: (
      <>
        <span className="hero-keyword">Corporate</span> execution with startup speed
      </>
    ),
    subtitle:
      "Structured delivery, transparent process, and technology-first field operations for residential and commercial projects.",
    image: "/images/hero-grid.svg",
  },
  {
    title: "Designed to scale across sectors",
    richTitle: (
      <>
        Designed to scale across <span className="hero-keyword">sectors</span>
      </>
    ),
    subtitle:
      "A modular service architecture that expands from solar into smart infrastructure without redesigning the business core.",
    image: "/images/hero-ev.svg",
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg-orb hero-bg-orb-1" />
      <div className="hero-bg-orb hero-bg-orb-2" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Multi-Sector Corporate Platform</p>
          <div className="hero-copy-stack" aria-live="polite">
            {slides.map((slide, index) => (
              <article
                key={slide.title}
                className={index === active ? "hero-copy-panel active" : "hero-copy-panel"}
                aria-hidden={index !== active}
              >
                <h1>{slide.richTitle}</h1>
                <p>{slide.subtitle}</p>
              </article>
            ))}
          </div>
          <div className="hero-actions">
            <Link href="/sectors/solar" className="button">
              Explore Solar Services
            </Link>
            <Link href="/contact" className="button button-outline">
              Request a Quote
            </Link>
          </div>
          <div className="hero-kpi-row">
            <div>
              <strong>01</strong>
              <span>Active sector live</span>
            </div>
            <div>
              <strong>04</strong>
              <span>Total sector roadmap</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Unified digital architecture</span>
            </div>
          </div>
          <div className="hero-dots" aria-label="Hero slide indicators">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                className={index === active ? "hero-dot active" : "hero-dot"}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual-shell">
            <div className="hero-image-stack" aria-live="polite">
              {slides.map((slide, index) => (
                <Image
                  key={slide.image}
                  src={slide.image}
                  alt={slide.title}
                  width={620}
                  height={460}
                  className={index === active ? "hero-image-slide active" : "hero-image-slide"}
                  priority={index === 0}
                  loading={index === 0 ? undefined : "eager"}
                />
              ))}
            </div>
          </div>
          <div className="hero-visual-note">
            <p>Execution Framework</p>
            <h3>Corporate governance with startup agility</h3>
          </div>
        </div>
      </div>
      <div className="hero-ticker" aria-hidden="true">
        <div className="hero-ticker-track">
          <span>Solar Installations</span>
          <span>Commercial Projects</span>
          <span>Residential Rooftops</span>
          <span>Future Sectors</span>
          <span>Assam Operations</span>
          <span>Solar Installations</span>
          <span>Commercial Projects</span>
          <span>Residential Rooftops</span>
          <span>Future Sectors</span>
          <span>Assam Operations</span>
        </div>
      </div>
    </section>
  );
}
