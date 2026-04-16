# Post-Deployment SEO Checklist (Mysarah)

Use this checklist after every production deployment so your solar SEO pages get crawled, indexed, and ranked.

## 1. Final Production Setup

- Set your live domain (example: https://www.mysarahtech.com) and force one canonical host (www or non-www).
- Enable HTTPS only and redirect all HTTP traffic to HTTPS.
- Verify that production does not block bots in firewall/CDN settings.
- Confirm all city and solar pages return status code 200.

## 2. Robots and Sitemap

- Open https://YOUR_DOMAIN/robots.txt and confirm it is accessible.
- Open https://YOUR_DOMAIN/sitemap.xml and confirm it includes:
  - core pages
  - solar landing pages
  - city solar pages
- Ensure no important SEO page is disallowed in robots rules.

## 3. Search Console (Google)

- Add and verify your domain property in Google Search Console.
- Submit https://YOUR_DOMAIN/sitemap.xml.
- Use URL Inspection and request indexing for key pages:
  - homepage
  - /solar-installation-india
  - /solar-price-india
  - /solar-subsidy-india
  - top city pages (Delhi, Mumbai, Bangalore, Guwahati, etc.)
- Check Coverage report for crawl issues and fix warnings/errors.

## 4. Bing Webmaster Tools

- Add your domain in Bing Webmaster Tools.
- Submit the same sitemap.
- Run URL inspection for major money pages.

## 5. Metadata and Canonicals

- Validate every key page has:
  - unique title
  - unique meta description
  - self-canonical URL
- Confirm Open Graph and Twitter tags are present.
- Ensure no production page accidentally has noindex.

## 6. Structured Data Validation

- Test JSON-LD via Google Rich Results Test.
- Validate Organization, Service, and FAQ schema pages.
- Fix any schema errors before pushing additional content.

## 7. Performance and Core Web Vitals

- Run Lighthouse on homepage + major SEO pages.
- Target:
  - Performance: 80+
  - SEO: 90+
  - Best Practices: 90+
- Compress large media and lazy-load non-critical images.
- Re-test mobile performance separately.

## 8. Content Indexing Strategy (First 14 Days)

- Day 1: Request indexing for top 10 pages.
- Day 3-4: Publish 3-5 supporting pages/blogs (price, subsidy, city intent).
- Day 7: Request indexing for newly added pages.
- Day 10-14: Add internal links from homepage and sector pages to priority URLs.

## 9. Internal Linking Rules

- Link homepage to all primary solar pages.
- Link each city page to:
  - India parent page
  - subsidy page
  - pricing page
  - contact page
- Keep anchor text natural with target terms (example: solar installation in Delhi).

## 10. Local SEO (High Impact)

- Create/optimize Google Business Profile.
- Keep NAP consistent everywhere:
  - Name: Mysarah Modern Tech Private Limited
  - Address: Sivasagar, Assam, India
  - Phone and WhatsApp as on website
- Add service areas and upload real project photos.
- Start collecting real customer reviews with solar-related wording.

## 11. Tracking and Conversion Setup

- Configure GA4 and verify page view tracking.
- Track lead form submissions as conversions.
- Track click-to-call and WhatsApp clicks.
- Build a simple KPI sheet:
  - impressions
  - clicks
  - average position
  - leads per landing page

## 12. Weekly SEO Maintenance

- Check Search Console for:
  - indexing drops
  - crawl errors
  - page experience issues
- Refresh top pages with updated pricing/subsidy data monthly.
- Add more city pages continuously using proven structure.
- Remove/merge thin pages that do not gain impressions.

## 13. Quick Go-Live Smoke Test

Run this immediately after deployment:

- https://YOUR_DOMAIN/ loads
- https://YOUR_DOMAIN/sitemap.xml loads
- https://YOUR_DOMAIN/robots.txt loads
- /solar-installation-india loads
- /solar-price-india loads
- /solar-subsidy-india loads
- At least 5 city pages load correctly
- No page returns 404/500 among key SEO URLs

## 14. Recommended Next Expansion

- Scale city pages from 20 to 100+ cities.
- Add state-level pages (Assam, Maharashtra, Karnataka, etc.).
- Add commercial intent pages (factory, hotel, hospital, school).
- Add comparison pages (on-grid vs off-grid, solar vs inverter, ROI pages).

---

If you want, the next file I can create is a 30-day SEO execution calendar with daily actions and exact priorities.
