# Sugaring by Steph

Website for **Sugaring by Steph** — natural, organic sugaring hair removal in Sylvan Lake, AB.

**Live site:** [https://sugaringbysteph.ca](https://sugaringbysteph.ca)  
**Stack:** React 18 · Vite · Tailwind · React Router · Netlify (hosting + Forms)

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

Deploy via Netlify Git integration or `netlify deploy --prod --dir=dist`. Contact form uses Netlify Forms (`public/__forms.html` + AJAX POST). Enable form email notifications in the Netlify UI after deploy. Analytics: set `VITE_GA_MEASUREMENT_ID` (see SEOREADME §7).

Shared business details live in `src/data/contact.js` (phone, email, location, hours).

---

## SEO & AI search optimization

This site is a **client-rendered SPA**. That works for users, but search engines and AI systems need extra help: crawlable URLs, structured facts, clear answers, and strong local signals. Below is a task list split for **Developer** and **Client**, based on a review of the current codebase.

### Current state (as of review)

| Area | Status |
|------|--------|
| Global title + meta description | Present in `index.html` + per-route via `Seo` |
| Open Graph basics | Complete (`og:image` → `/opengraph.jpg`, optimized 1200×630) |
| Per-page titles/descriptions | Done (`src/components/Seo.jsx` + `src/data/seo.js`) |
| Canonical URLs | Done (absolute `https://sugaringbysteph.ca/...`) |
| `robots.txt` / `sitemap.xml` | Present in `public/` |
| `llms.txt` (AI crawlers) | Present at `/llms.txt` |
| Structured data (JSON-LD) | Done (`BeautySalon`, `FAQPage`, service offers) |
| Twitter / social cards | Missing |
| Google Business Profile | Not set up yet (client) |
| Prerender / SSR for bots | Done (build-time Puppeteer → static HTML per route) |
| FAQ content (good for AI answers) | Strong on `/faq` |
| NAP (name, address, phone) on site | Partial (Woodland Crescent, Sylvan Lake + phone + email) |

---

### Developer tasks

Prioritize in roughly this order for the biggest SEO/AI impact.

#### 1. Technical crawl & indexability (high)

- [x] Add `public/robots.txt` allowing crawling and pointing to the sitemap (`Disallow: /__forms.html`).
- [x] Add `public/sitemap.xml` with `/`, `/services`, `/about`, `/faq`, `/contact`.
- [x] Add unique **per-route** `<title>` and meta description via `react-helmet-async` (`src/components/Seo.jsx`, `src/data/seo.js`).
- [x] Add a `<link rel="canonical">` per route (`https://sugaringbysteph.ca/...`).
- [x] Add Open Graph + Twitter Card tags per page, using `public/opengraph.jpg`.
- [x] Document Netlify SPA fallback: static files take precedence (`netlify.toml` comments + cache headers for robots/sitemap/OG).
- [x] **Post-deploy (manual):** Submit sitemap in [Google Search Console](https://search.google.com/search-console) and [Bing Webmaster Tools](https://www.bing.com/webmasters).
- [x] **Post-deploy (manual):** Verify domain ownership in Search Console; monitor Coverage / Experience issues.

**Post-deploy verification checklist**

1. Open `https://sugaringbysteph.ca/robots.txt` and `https://sugaringbysteph.ca/sitemap.xml` (must be XML/text, not the React app).
2. Open `https://sugaringbysteph.ca/opengraph.jpg` (image loads).
3. In Search Console → Sitemaps → submit `https://sugaringbysteph.ca/sitemap.xml`.
4. In Bing Webmaster Tools → Sitemaps → submit the same URL.
5. Spot-check a shared link with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or [opengraph.xyz](https://www.opengraph.xyz/).

#### 2. Structured data for Google + AI (high)

JSON-LD lives in `src/data/structuredData.js` and is injected via `src/components/JsonLd.jsx`.

- [x] **`BeautySalon`** (LocalBusiness) sitewide in `App.jsx`:
  - name, url, telephone, email
  - address: Woodland Crescent, Sylvan Lake, AB T4S 1L9, CA (no house number, no geo)
  - openingHoursSpecification Mon–Fri 09:00–17:00
  - image/logo → `/opengraph.jpg`
  - priceRange `$15-$65`, areaServed Sylvan Lake + Central Alberta
  - `hasOfferCatalog` + `sameAs` (Instagram, Facebook, SugarSMAC)
- [x] **`FAQPage`** on `/faq` from shared `src/data/faqs.js` (kept in sync with visible Q&A).
  - **Note:** Google generally does **not** show FAQ rich results for beauty/local businesses (eligibility is limited). Markup remains useful for AI and [Schema Markup Validator](https://validator.schema.org/).
- [x] **Service offers** on `/services` + catalog on the business entity (`src/data/services.js`).
  - **Note:** `OfferCatalog` is not a separate Google rich-result type. Offers nest under **Local businesses** in Rich Results Test (expand that row).
- [x] **Post-deploy (manual):** Rich Results Test shows Local Business + Organization (expected). Confirm FAQPage/OfferCatalog with Schema Markup Validator or View Page Source → `application/ld+json`.

**Validate after deploy**

1. Rich Results Test → any URL: expect **Local businesses** + **Organization** (sitewide `BeautySalon` / `WebSite`).
2. Expand **Local businesses** in the test UI to inspect nested offers / details.
3. [Schema Markup Validator](https://validator.schema.org/) → paste `/faq` HTML or URL: expect **FAQPage**.
4. Same validator on `/services`: expect **OfferCatalog** / offers.
5. In browser DevTools on `/faq` and `/services` → Elements → search `FAQPage` / `OfferCatalog`.

#### 3. SPA / bot rendering (high for organic + AI)

Client-only React means some bots see a thin shell. Improve crawl reliability:

- [x] **Build-time prerender** for `/`, `/services`, `/about`, `/faq`, `/contact` via `scripts/prerender.mjs` (Puppeteer + Vite preview).
  - Output: `dist/index.html`, `dist/services/index.html`, etc. (Netlify serves these before the SPA fallback).
  - Build command: `vite build && node scripts/prerender.mjs`
  - ScrollReveal forces visible content during prerender (`__PRERENDER__` / `navigator.webdriver` / reduced motion).
  - JSON-LD is rendered in the body so it survives prerender snapshots.
- [x] Hybrid/SSG migration deferred — prerender covers current marketing routes.
- [x] Important copy (H1s, prices, FAQ answers, location) is present in the prerendered HTML.

**Post-deploy checks**

1. `curl -s https://sugaringbysteph.ca/faq | head` should show FAQ HTML (not an empty `#root`).
2. View source on `/services` should include prices in the initial HTML.
3. Re-run Rich Results Test / Schema Validator (static HTML now includes content + JSON-LD).
4. Netlify build installs Chrome via `npx puppeteer browsers install chrome` before prerender (see `package.json` `build` script + `netlify.toml` Puppeteer env vars).

#### 4. On-page content & semantics (medium)

- [x] Clear **H1** per page with intent + location where natural (Home sr-only + Services/FAQ/About/Contact headings).
- [x] Services intro expanded with “Brazilian sugaring Sylvan Lake”, “near Red Deer”, and “sugaring vs waxing”.
- [x] Pricing remains visible and crawlable on `/services` (unchanged structure).
- [x] Decorative service icons: empty `alt` + `aria-hidden`; Steph photo alt updated with location.
- [x] Optimized `public/opengraph.jpg` to 1200×630 (~124 KB); logo resized to 512×512 (~245 KB).
- [x] Descriptive internal links: FAQ ↔ Services ↔ Contact; service cards use “Request {Service} appointment”.

#### 5. Performance & Core Web Vitals (medium)

- [x] Compress/convert assets to WebP: logo (~57 KB), service icons (~2 KB each), About photo (~39 KB); width/height + `decoding` on images; lazy-load footer/contact/icons; hero/nav logo `fetchPriority="high"`.
- [x] Slim Google Fonts to used weights (Cormorant 400/600/italic400, Lato 400/500/600) + `display=swap` + stylesheet preload.
- [x] Production build: sourcemaps off by default (`SOURCEMAP=true` to enable); React vendor chunk split.
- [x] Sticky mobile action bar: `has-mobile-action-bar` padding + `html { scroll-padding-bottom }` so anchors/focus stay clear of Call / Request Appointment.
- [x] Measure with Lighthouse / PageSpeed Insights on mobile after deploy (see follow-up below).

**§5 follow-up (PageSpeed mobile 86 → local lab ~99)**

- [x] Self-host latin WOFF2 fonts in `public/fonts/` + `@font-face` with `font-display: swap` (removed render-blocking `fonts.googleapis.com`).
- [x] Beasties critical CSS after prerender; defer React boot (`requestIdleCallback`) so prerendered HTML paints first.
- [x] Nav mark via CSS background (not an LCP `<img>`); compressed `/logo.webp`; page-enter no longer uses `opacity:0`.
- [x] Local Lighthouse mobile peaked at **99** (often 95–99). Re-check PageSpeed after deploy — Netlify cache headers should help the remaining “efficient cache” lab warning.

#### 6. AI search / answer-engine optimization (high)

AI overviews and chat tools prefer **clear, factual, citeable** pages.

- [x] Add `public/llms.txt` summarizing the business for AI crawlers (contact, hours, services, key URLs; Markdown links for Lighthouse agentic browsing).
- [x] Publish ARD catalog at `/.well-known/ai-catalog.json` (+ `ard.json`); discover via `<link rel="ai-catalog">` / `rel="ard"` (not `Agentmap` in robots.txt — that fails SEO robots validators).
- [x] Keep FAQ answers **self-contained** (booking/payment/areas answers include NAP + URLs where useful).
- [x] Add a short “About this business” block (`BusinessSummary` on Home + About) with who/what/where/how to book.
- [x] Prefer factual consistency everywhere: phone, hours, location pulled from `src/data/contact.js` on the site summary; FAQ/llms.txt match the same NAP.
- [x] AI crawler policy: default **allow** (no `ai.txt` / no GPTBot blocks in `robots.txt`) for discovery.
- [x] Testimonials remain attributable (name + quote in `ReviewCarousel`). Link to Google reviews later when a GBP review URL exists.

#### 7. Analytics & monitoring (medium)

- [x] **GA4** via `src/lib/analytics.js` + `src/components/Analytics.jsx` (idle-loaded gtag, SPA `page_view`).
- [x] **Conversions:** `generate_lead` / `contact_form_submit` on successful Contact POST; `phone_click` on any `tel:` link.
- [x] **Search Console** — covered in §1 (property + sitemap). Re-check Indexing periodically.
- [x] **You:** create GA4 property, add `VITE_GA_MEASUREMENT_ID` on Netlify, mark key events, enable form emails (steps below).

**Wire-up steps (one-time)**

1. **Google Analytics 4**
   - [analytics.google.com](https://analytics.google.com) → Admin → Create property → Web stream for `https://sugaringbysteph.ca`.
   - Copy Measurement ID (`G-XXXXXXXXXX`).
   - Netlify → Site configuration → Environment variables → add `VITE_GA_MEASUREMENT_ID` = that ID (Production + Deploy Previews if you want).
   - Redeploy (Vite inlines env at build time).
   - Locally: copy `.env.example` → `.env` and set the same ID.
2. **Mark conversions in GA4**
   - Admin → Events → mark `generate_lead` and `phone_click` as **Key events** (conversions).
3. **Search Console** (if not done)
   - Verify `sugaringbysteph.ca` → Sitemaps → submit `https://sugaringbysteph.ca/sitemap.xml`.
4. **Netlify form email alerts**
   - Site → Forms → confirm `contact` is listed after a deploy that includes `public/__forms.html`.
   - Project configuration → Notifications → **Form submission notifications** → Email → add Steph’s address (and yours if desired).
   - Optional: Slack / webhook from the same screen.
5. **Sanity check**
   - Open the live site with GA DebugView or Realtime; click Call and submit a test form (use a clear subject so you can delete the submission).
---

### Client tasks

These items matter as much as code for local SEO and AI visibility. They cannot be finished from the repo alone.

#### 1. Google Business Profile (critical)

- [x] Create and verify **Google Business Profile** for Sugaring by Steph.
- [x] Categories: primary e.g. *Waxing Service* / *Hair Removal Service* / *Beauty Salon* (pick the closest accurate category; mention sugaring in the description).
- [x] NAP consistency — use the **same** name, address/area, phone, and website URL as the site:
  - Name: Sugaring by Steph
  - Area: Woodland Crescent, Sylvan Lake
  - Phone: 587-377-1195
  - Website: https://sugaringbysteph.ca
  - Hours: Mon–Fri 9:00–17:00; note weekends may vary
- [x] Add photos: logo, Steph, treatment space (when available), before/after only if clients consent.
- [x] Enable messaging if desired; keep booking CTA pointing to the website contact page until a booking system exists.
- [x] Regularly post updates / offers (GBP posts help local pack visibility).

#### 2. Reviews & reputation

- [ ] After GBP is live, ask happy clients for **Google reviews** (highest local SEO impact).
- [ ] Reply to every review politely and promptly.
- [ ] Keep Instagram/Facebook (`@sugaringbysteph`) active with location tags and link in bio → website.
- [ ] Do not incentivize fake reviews; ask for honest feedback only.

#### 3. Citations & consistency

- [ ] List the business on relevant directories with identical NAP (Facebook, Instagram, Apple Business Connect if applicable, local chamber/directories).
- [ ] Use the same service names and price ranges as the website when posting.
- [ ] Avoid creating duplicate Google listings.

#### 4. Content the client can supply

- [ ] Exact public address format she is comfortable publishing (street vs area-only).
- [ ] Final weekend hours once known (update site + GBP together).
- [ ] Credential / training link when ready (About page placeholder exists conceptually).
- [ ] High-quality photos (studio, results, Steph) with permission to use.
- [ ] Approval of cancellation/payment copy if policies change (FAQ currently: cash or e-transfer only).

#### 5. Local / AI discoverability habits

- [ ] Mention **Sylvan Lake** and “sugaring” naturally in social captions.
- [ ] Share FAQ tips as short Reels/posts that link back to `/faq` or `/services`.
- [ ] When clients ask common questions via DM, point them to the FAQ URL (builds crawlable demand signals over time).
- [ ] Keep email signature and print materials pointing to `sugaringbysteph.ca`.

---

### Target queries to win

Optimize content and GBP toward questions people (and AI assistants) actually ask:

1. Sugaring near me / sugaring Sylvan Lake  
2. Brazilian sugaring cost / prices  
3. Sugaring vs waxing  
4. Is sugaring less painful?  
5. How long does sugaring last?  
6. How to prepare for sugaring / Brazilian  
7. Natural hair removal Sylvan Lake / central Alberta  

The FAQ and Services pages already support many of these — keep answers accurate and update prices in one place (`Services.jsx`).

---

### Definition of done (minimum viable SEO)

Treat this as the first milestone before heavy content work:

1. `robots.txt` + `sitemap.xml` live and submitted  
2. Per-page titles/descriptions + canonicals + `og:image`  
3. `LocalBusiness` + `FAQPage` JSON-LD validated  
4. Prerender (or equivalent) for main routes  
5. Google Business Profile verified with matching NAP + first reviews  
6. Search Console showing pages indexed without major errors  
7. `llms.txt` published with current contact + service facts  

---

## Project structure (abbreviated)

```
public/           # favicon, __forms.html, robots.txt, sitemap.xml, llms.txt, fonts, logos
src/
  components/     # Navbar, Hero, Footer, Analytics, BusinessSummary, etc.
  data/contact.js # Phone, email, location, hours
  lib/analytics.js # GA4 pageviews + conversion events
  pages/          # Home, Services, About, FAQ, Contact
netlify.toml      # Build + SPA redirects
.env.example      # VITE_GA_MEASUREMENT_ID
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |

## License

Private — all rights reserved.
