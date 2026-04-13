import Link from "next/link";
import { company } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h4>{company.name}</h4>
          <p>{company.address}</p>
          <p>{company.email}</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/sectors">Sectors</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Mission</h4>
          <p>
            Building a multi-sector technology platform from Assam with a strong foundation in clean energy and
            scalable service delivery.
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Mysarah Modern Tech Private Limited. All rights reserved.</p>
      </div>
    </footer>
  );
}
