"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/sectors", label: "Sectors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export default function Navbar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand-mark">
          <Image
            src="/logo.png"
            alt="Mysarah Modern Tech logo"
            width={84}
            height={84}
            sizes="(max-width: 780px) 52px, 64px"
            className="brand-logo"
            priority
          />
          <div>
            <strong>Mysarah Modern Tech</strong>
            <small>Private Limited</small>
          </div>
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch
                  className={isActive(link.href) ? "nav-link active" : "nav-link"}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
