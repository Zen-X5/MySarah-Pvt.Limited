"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

const links = [
  { href: "/", labelKey: "Home" },
  { href: "/sectors", labelKey: "Sectors" },
  { href: "/about", labelKey: "About" },
  { href: "/contact", labelKey: "Contact" },
];

export default function Navbar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 8);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className={isScrolled ? "site-header is-scrolled" : "site-header"}>
      <div className="container nav-wrap">
        <Link href="/" className="brand-mark">
          <Image
            src="/logo.png"
            alt={t("Mysarah Modern Tech logo")}
            width={84}
            height={84}
            sizes="(max-width: 780px) 52px, 64px"
            className="brand-logo"
            priority
          />
          <div>
            <strong>{t("MySarah Modern Tech")}</strong>
            <small>{t("Private Limited")}</small>
          </div>
        </Link>

        <button
          type="button"
          className={menuOpen ? "mobile-menu-toggle is-open" : "mobile-menu-toggle"}
          aria-label={menuOpen ? t("Close menu") : t("Open menu")}
          aria-expanded={menuOpen}
          aria-controls="site-primary-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav
          id="site-primary-menu"
          className={menuOpen ? "site-nav is-open" : "site-nav"}
          aria-label={t("Primary navigation")}
        >
          <ul className="nav-list">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch
                  onClick={() => setMenuOpen(false)}
                  className={isActive(link.href) ? "nav-link active" : "nav-link"}
                >
                  {t(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-mobile-language">
            <LanguageSwitcher />
          </div>
        </nav>

        <div className="nav-desktop-language">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
