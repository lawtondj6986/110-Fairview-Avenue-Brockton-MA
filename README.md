# Innovative Commercial Strategies — Website

Professional website for ICS: AI-powered commercial real estate advisory + AI services for South Shore MA businesses.

Built with [Astro](https://astro.build) + Tailwind CSS. Static output — extremely fast, SEO-optimized, ~$0/month to host.

## Quick start

```bash
npm install     # first time only
npm run dev     # local preview at http://localhost:4321
npm run build   # production build into dist/
```

## Deploying (Vercel — recommended)

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → New Project → import the repo. Vercel auto-detects Astro; no settings needed.
3. Add your custom domain in Vercel's project settings.

Every push to the main branch redeploys the site automatically.

## ✅ Launch checklist (do these before going live)

Search the repo for `TODO` — every placeholder is marked. In particular, in `src/config.ts`:

- [ ] `url` — the real production domain (also in `astro.config.mjs`)
- [ ] `email` / `phone` — business contact details
- [ ] `license` — real MA license number
- [ ] `formEndpoint` — create a free form at [formspark.io](https://formspark.io) or [formspree.io](https://formspree.io) and paste the endpoint (submissions arrive by email; pipe into HubSpot via Make/Zapier later)
- [ ] `bookingUrl` — create a free [cal.com](https://cal.com) event type and paste the link
- [ ] `social.linkedin` — real LinkedIn URL

Also:

- [ ] Add a headshot at `public/images/daniel-lawton.jpg` and swap it into `src/pages/about.astro`
- [ ] Replace the two **sample listings** with real ones (see below), or set `draft: true` in their frontmatter to hide them
- [ ] Replace illustrative case-study numbers with verified actuals and set `illustrative: false`

## How to update the site (no coding needed)

All content lives in Markdown files under `src/content/`. Edit or add a file, push, and the site rebuilds.

### Add a property listing
1. Copy `src/content/listings/_TEMPLATE.md.txt` → rename to `123-main-st-brockton.md`
2. Fill in the fields at the top (price, sqft, highlights…) and write the description below
3. Drop photos in `public/images/` and set `image: '/images/your-photo.jpg'`
4. When it sells: change `status: available` → `status: sold`

### Add a case study
Copy `src/content/case-studies/_TEMPLATE.md.txt` → rename → fill in. The `stats` numbers show on the cards — lead with the most impressive ones.

### Add an insight / blog post
Create a new `.md` file in `src/content/insights/` with the same frontmatter as the existing posts (`title`, `description`, `category`, `date`).

### Change business info (phone, email, towns, license)
Edit `src/config.ts` — one file updates the header, footer, contact page, and SEO structured data everywhere.

### Change page copy
Pages live in `src/pages/` — the text is right in the files and safe to edit. The homepage is `src/pages/index.astro`.

## Site structure

| Page | File |
|---|---|
| Home (incl. QuoteBrain demo) | `src/pages/index.astro` |
| Commercial Real Estate | `src/pages/commercial-real-estate.astro` |
| AI Systems (JobSite / Lead Engine / Market Lock) | `src/pages/ai-services.astro` |
| Pricing (published ranges) | `src/pages/pricing.astro` |
| Guarantees | `src/pages/guarantees.astro` |
| Scoreboard (monthly aggregate metrics) | `src/pages/scoreboard.astro` |
| Case Studies | `src/pages/case-studies/` + `src/content/case-studies/` |
| Listings | `src/pages/listings/` + `src/content/listings/` |
| Insights (blog) | `src/pages/insights/` + `src/content/insights/` |
| About | `src/pages/about.astro` |
| Contact | `src/pages/contact.astro` |
| Workshops | `src/pages/workshops.astro` |

### Monthly ritual: update the Scoreboard
Edit the `stats` array in `src/pages/scoreboard.astro` with verified aggregate numbers, bump `asOf`, and set
`illustrative` to `false` once real 90-day client data replaces the launch placeholders. The QuoteBrain calculator's
pricing logic lives in `src/components/QuoteBrain.astro` — adjust rates there as market pricing moves.

Design tokens (colors, fonts) are defined in `src/styles/global.css`. Reusable pieces (header, footer, cards, lead form) are in `src/components/`.

## SEO notes

- Every page ships JSON-LD structured data (`RealEstateAgent`, `Service`, `FAQPage`, `Article`, `RealEstateListing`) — this is the AEO foundation
- Sitemap is generated automatically at `/sitemap-index.xml`; submit it in Google Search Console after launch
- Set up a Google Business Profile for ICS and keep name/address/phone identical to `src/config.ts`
