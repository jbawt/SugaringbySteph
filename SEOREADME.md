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

Deploy via Netlify Git integration or `netlify deploy --prod --dir=dist`. Contact form uses Netlify Forms (`public/__forms.html` + AJAX POST). Enable form email notifications in the Netlify UI after deploy.

Shared business details live in `src/data/contact.js` (phone, email, location, hours).

---

## SEO & AI search optimization

This site is a **client-rendered SPA**. That works for users, but search engines and AI systems need extra help: crawlable URLs, structured facts, clear answers, and strong local signals. Below is a task list split for **Developer** and **Client**, based on a review of the current codebase.

### Current state (as of review)

| Area | Status |
|------|--------|
| Global title + meta description | Present in `index.html` + per-route via `Seo` |
| Open Graph basics | Complete (`og:image` → `/opengraph.jpg`) |
| Per-page titles/descriptions | Done (`src/components/Seo.jsx` + `src/data/seo.js`) |
| Canonical URLs | Done (absolute `https://sugaringbysteph.ca/...`) |
| `robots.txt` / `sitemap.xml` | Present in `public/` |
| Structured data (JSON-LD) | Done (`BeautySalon`, `FAQPage`, service offers) |
| Twitter / social cards | Missing |
| Google Business Profile | Not set up yet (client) |
| Prerender / SSR for bots | Not configured |
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
- [x] **Service offers** on `/services` + catalog on the business entity (`src/data/services.js`).
- [ ] **Post-deploy (manual):** Validate with [Google Rich Results Test](https://search.google.com/test/rich-results) and [Schema Markup Validator](https://validator.schema.org/).

**Validate after deploy**

1. Rich Results Test → `https://sugaringbysteph.ca/` (expect Local Business / related).
2. Rich Results Test → `https://sugaringbysteph.ca/faq` (expect FAQ).
3. Rich Results Test → `https://sugaringbysteph.ca/services` (offers/services).
4. Optional: view page source / DevTools → search `application/ld+json`.

#### 3. SPA / bot rendering (high for organic + AI)

Client-only React means some bots see a thin shell. Improve crawl reliability:

- [ ] Add **prerendering** for marketing routes (e.g. [Netlify Prerender](https://docs.netlify.com/site-deploys/post-processing/prerendering/), or a Vite prerender plugin for `/`, `/services`, `/about`, `/faq`, `/contact`).
- [ ] Or migrate critical pages to a hybrid/SSG setup later if traffic justifies it.
- [ ] Ensure important copy (H1s, prices, location, FAQ answers) exists in the initial HTML after prerender — not only after JS hydration.

#### 4. On-page content & semantics (medium)

- [ ] Give every page a single clear **H1** that includes primary intent + location where natural (e.g. “Sugaring Services in Sylvan Lake”).
- [ ] Expand Services copy slightly with searchable phrases clients actually type:
  - “Brazilian sugaring Sylvan Lake”
  - “natural hair removal near Red Deer / Sylvan Lake”
  - “sugaring vs waxing”
- [ ] Keep pricing visible and crawlable (already good on `/services`).
- [ ] Fix decorative image `alt` text: service icons currently use empty `alt=""` — fine if decorative; ensure any meaningful images (logo, Steph photo) keep descriptive alts.
- [ ] Add an optimized OG/share image and compress large assets (logo PNG is large — consider WebP + reasonable dimensions).
- [ ] Internal linking: ensure FAQ ↔ Services ↔ Contact links use descriptive anchor text (“Request a Brazilian appointment” vs “click here”).

#### 5. Performance & Core Web Vitals (medium)

- [ ] Compress/convert hero and logo assets; lazy-load below-fold images.
- [ ] Preload critical fonts or self-host with `font-display: swap` (already using Google Fonts — consider subsetting).
- [ ] Measure with Lighthouse / PageSpeed Insights on mobile; fix LCP/CLS issues.
- [ ] Keep the sticky mobile action bar from covering focusable content (padding already applied — re-test after design changes).

#### 6. AI search / answer-engine optimization (high)

AI overviews and chat tools prefer **clear, factual, citeable** pages.

- [ ] Add `public/llms.txt` (emerging convention) summarizing the business for AI crawlers, for example:
  ```
  # Sugaring by Steph
  > Natural sugaring hair removal in Sylvan Lake, Alberta.

  ## Contact
  - Phone: 587-377-1195
  - Email: hello@sugaringbysteph.ca
  - Location: Woodland Crescent, Sylvan Lake
  - Hours: Mon–Fri 9am–5pm; weekend hours may vary
  - Booking: https://sugaringbysteph.ca/contact

  ## Services
  - Brazilian, Bikini, Vagacial, body & face sugaring — see /services for prices

  ## Key pages
  - https://sugaringbysteph.ca/
  - https://sugaringbysteph.ca/services
  - https://sugaringbysteph.ca/faq
  - https://sugaringbysteph.ca/about
  - https://sugaringbysteph.ca/contact
  ```
- [ ] Keep FAQ answers **self-contained** (one question → one complete answer). Avoid burying facts only in images.
- [ ] Add a short “About this business” block that states who/what/where/how to book in plain prose (good for AI snippets).
- [ ] Prefer factual consistency everywhere: same phone, hours, location spelling as Google Business and social profiles.
- [ ] Optional: `public/ai.txt` or clear robots rules if you later want to allow/disallow specific AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, etc.) — decide intentionally; default allow is usually better for discovery.
- [ ] Ensure testimonials remain attributable (name + quote) — already true; when Google reviews exist, link to the profile.

#### 7. Analytics & monitoring (medium)

- [ ] Install privacy-appropriate analytics (e.g. GA4 or Plausible) + Search Console.
- [ ] Track Contact form submissions / `tel:` clicks as conversions.
- [ ] Set up uptime / form notification alerts (Netlify form emails).

#### 8. Nice-to-have later

- [ ] Blog or “Guides” section (“How to prepare for Brazilian sugaring”) for long-tail queries.
- [ ] Location landing copy if she expands service area (e.g. Red Deer clients).
- [ ] Review schema (`AggregateRating`) **only after** real Google review counts exist — never invent ratings.
- [ ] hreflang only if you add French or multi-region pages.

---

### Client tasks

These items matter as much as code for local SEO and AI visibility. They cannot be finished from the repo alone.

#### 1. Google Business Profile (critical)

- [ ] Create and verify **Google Business Profile** for Sugaring by Steph.
- [ ] Categories: primary e.g. *Waxing Service* / *Hair Removal Service* / *Beauty Salon* (pick the closest accurate category; mention sugaring in the description).
- [ ] NAP consistency — use the **same** name, address/area, phone, and website URL as the site:
  - Name: Sugaring by Steph
  - Area: Woodland Crescent, Sylvan Lake
  - Phone: 587-377-1195
  - Website: https://sugaringbysteph.ca
  - Hours: Mon–Fri 9:00–17:00; note weekends may vary
- [ ] Add photos: logo, Steph, treatment space (when available), before/after only if clients consent.
- [ ] Enable messaging if desired; keep booking CTA pointing to the website contact page until a booking system exists.
- [ ] Regularly post updates / offers (GBP posts help local pack visibility).

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
public/           # favicon, __forms.html (+ robots/sitemap/llms when added)
src/
  components/     # Navbar, Hero, Footer, forms UI, etc.
  data/contact.js # Phone, email, location, hours
  pages/          # Home, Services, About, FAQ, Contact
netlify.toml      # Build + SPA redirects
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
