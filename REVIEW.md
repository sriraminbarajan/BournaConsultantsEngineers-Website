# Design & Code Review — Bourna Consultants Engineers site

Reviewed: 2026-09-09 · Reviewer: follow-up agent · Scope: `web/` as built by the previous agent
**No site code was changed for this review.** Everything below is a recommendation.

---

## Verdict in one paragraph

The build is competent, honest, and easy to maintain: content is cleanly separated from markup, the palette is genuinely derived from the logo instead of a stock template, and the previous agent correctly refused to scrape stranger's photos off the internet when asked. But it is a **generic agency-template layout applied to a firm that has an extraordinary and specific story**. A structural consultant with 38 years of practice, 13,000 projects, and a signature on every drawing currently gets the same About/Services/Work/Clients/Contact scaffold that a dentist or a SaaS startup would get. The most valuable assets — the buildings, the drawings, the longevity, the personal certification — are either buried below the fold or not represented at all. There are also real technical debts around the logo, image weight, SEO, and accessibility that will hurt once this is on a real domain.

---

## What was done well (keep these)

- **`src/data/content.ts` as a single content file.** A non-developer can change a phone number or add a project without touching JSX. This was the right architectural call and should be preserved.
- **Palette derived from the actual logo** (`#1a3f32` forest green + charcoal) rather than a default template scheme.
- **Refusing to source project photos from the internet.** Correct call — copyright plus misrepresenting someone else's building as your father's work.
- **`PROGRESS.md` handoff discipline.** Genuinely useful; most agent-built projects have nothing like it.
- **Lean payload of JS.** ~50 KB gzipped, zero UI framework, no dependency bloat.
- **Reasonable base semantics.** `<dl>` for contact details, `aria-label`s on the carousel, responsive breakpoints on every grid.

---

## Issues, by severity

### High — will actually cost the business

**1. There is no SEO or structured data. This is the single biggest miss.**
`web/index.html` has a `<title>` and one `<meta name="description">` and nothing else. Missing: Open Graph / Twitter tags (so any WhatsApp or LinkedIn share renders as a naked grey link — and WhatsApp is how this industry shares things in Chennai), `og:image`, canonical URL, `robots.txt`, `sitemap.xml`, and most importantly **JSON-LD `ProfessionalService` / `LocalBusiness` schema** with the name, address, phone, geo, and founding date. For a local consultancy, structured data plus a Google Business Profile is the entire discovery channel. A beautiful site nobody can find is a brochure.

**2. No WhatsApp contact path.**
The contact section offers `tel:` and `mailto:` only. In this market, for builders and architects, WhatsApp is the default channel — and `mailto:` frequently does nothing at all on a desktop with no mail client configured. A `https://wa.me/91...` link would likely out-convert both existing CTAs combined.

**3. The logo on the site is not the real logo.**
`src/components/Wordmark.tsx` re-draws the wordmark as SVG `<text>` in the Syne webfont. It is a *lookalike*, not the brand mark: the letterforms are wrong, and if Google Fonts is slow or blocked the logo silently renders in a system fallback. This was a workaround after the original JPG's white background caused white boxes, but the workaround became permanent. The right fix is to get the original vector (AI/EPS/PDF) from whoever designed it, or properly trace the raster into a true SVG path — then the mark is resolution-independent, correct, and font-independent.

**4. ~3.6 MB of unoptimised project images, served eagerly.**
`visteria-entrance-arch.webp` is 561 KB, `millennium-tower.jpg` is 504 KB. No `loading="lazy"`, no `width`/`height` attributes, no `srcset` for smaller screens. Every visitor on a Chennai mobile connection downloads all eleven projects' first images immediately. Resize to ~1600 px max, compress, convert to WebP/AVIF, lazy-load everything below the fold.

### Medium — quality and credibility

**5. The client list is an unvetted data dump.**
95 names in a `·`-separated wall of text (`architectClients` + `builderClients`). Several are clearly damaged or incomplete extractions from the Pages file — `Mone`, `Umesh`, `Feel and Bari`, `Spacio Lokesh`, `Chariar Deghan`. Publishing a half-remembered version of a client's name is worse than not listing them. Also: nobody has confirmed these firms consent to being listed publicly. This needs a pass with your father, and probably needs to shrink.

**6. Accessibility gaps.**
- No `prefers-reduced-motion` handling anywhere, despite four simultaneous animations (hero drift, beam pulse, rise-in, count-up). This is the standard accessibility floor and it's currently unmet.
- `CountUp` mutates its text node ~60×/second; screen readers can announce the intermediate garbage. It should expose the final value via `aria-label` and hide the animating text.
- The carousel dots use `role="tablist"` / `role="tab"` (`ProjectCard.tsx`) without any tabpanels, which is semantically incorrect. Plain buttons would be more correct than the wrong ARIA role.
- Mobile menu has no Escape-to-close, no focus trap, no background scroll lock, and no close-on-outside-click. The hamburger also never animates into an X despite the CSS being set up for it.

**7. Fonts are render-blocking third-party requests.**
Two `<link>`s to Google Fonts in `index.html`. Self-hosting (e.g. `@fontsource`) removes a third-party round trip, removes the flash of fallback text on the logo, and is faster on Indian networks.

**8. Copy accuracy and tone.**
- "35+ years" undersells: independent practice from **1988** is 38 years, and the arithmetic is publicly checkable against the bio directly below it.
- "13,000+ projects" is presented bare. A very large number with zero context reads as puffery to a sceptical builder. Anchor it — total sq.ft designed, or projects *certified*, or a range of years.
- The tagline "Structural clarity for every scale of build." — "scale of build" isn't idiomatic English and it's saying very little.
- The contact panel says "we respond during office hours" but never states the office hours.

**9. Dead code and stray files.**
`.btn-solid`, `.btn-outline`, and `--radius` in `index.css` are defined and never used. `.placeholder-type` styling and the no-image branch in `ProjectCard.tsx` are now unreachable since every project has photos. `web/public/` still ships **the old profile photo** (`profile.jpg`) alongside the new one, plus three unused logo rasters (`bceLogo.jpg`, `bceLogo.png`, `bceLogo-light.png` — only one is referenced, as the favicon). `.venv/` from the PDF-extraction step is still sitting in the project root.

**10. `.stat strong span` / `.stat > span` specificity patch.**
When `CountUp` was added, its `<span>` inherited the small uppercase label styling and had to be un-styled with a counter-rule. That's a smell — the label should have its own class rather than being selected by element type.

### Low — polish

- `key={para.slice(0, 24)}` for bio paragraphs is a fragile React key.
- Three near-identical off-whites (`--paper`, `--paper-warm`, `--white`) whose differences are essentially invisible; two would do.
- The `type` field on every project (Residential / Cinema / Institutional / IT) is now **unused** — it only ever appeared in the dead placeholder branch. Free data being wasted (see idea D below).
- Office location is a Google Maps *link* rather than an embedded map.

---

## Where this could be substantially more creative

This is the part worth your attention. The current site is *fine*. These are the ideas that would make it distinctive.

### A. Put the buildings in the hero
The hero is currently a CSS gradient with a decorative grid and a light beam — an abstraction. This is a firm with photographs of **eleven completed buildings**, including a 15-storey tower and a ten-level multiplex. Burying them four sections down and leading with a gradient is the biggest wasted opportunity on the page. A slow full-bleed cross-fade of the three strongest buildings, tinted toward the brand green so the palette still holds, would say "38 years of this" before a single word is read.

### B. Lead with time, not with a services grid
The About/Services/Work/Clients order is template order. The actual story is **duration**. A vertical timeline down the page — 1988 first independent commission → 1992 firm founded → landmark projects by decade → today — turns "35+ years" from a claim into something the visitor scrolls through and *feels*. Structural engineering is a trust business, and longevity is the entire trust argument.

### C. The drawing-to-building reveal (the strongest idea here)
Your father's firm owns something no competitor's website has: **the structural drawings**. A draggable before/after slider that wipes between a structural drawing and the finished building photograph is instantly legible, is unmistakably the work of a structural consultant rather than an architect, and cannot be copied by anyone who doesn't have the drawings. He has seven CAD draughtsmen and 13,000 projects of source material. Even two or three of these would carry the whole site.

### D. Filter the work grid by typology
`type` is already in the data and currently unused. A row of filter chips — All / Residential / Cinema / Institutional / IT — is a few lines of state and lets a hotel developer immediately see hospitality work. Low effort, real utility.

### E. Make 13,000 comprehensible
An abstract number animating upward is a common trick and the mind slides off it. Ground it: total square footage designed, or "13,000 projects — every one certified by the same signature." Scale becomes meaningful only when it's converted into something a person can picture.

### F. The signature is the brand
From the profile PDF: *"I am certifying all the structural design drawings prepared by me for all my projects."* In a market where large firms delegate sealing to junior engineers, one man personally certifying every drawing across 38 years **is the differentiator** — and the site currently mentions it only in passing in a bio paragraph. A scanned signature, given real space, with a line like "Every drawing carries his signature" is a stronger headline than anything currently in the hero.

### G. Curate the clients instead of dumping them
Rather than 95 names in a text cloud: verify and feature the 12 strongest relationships prominently (DABC, Rajparis, Green Valleys, Akshaya, AGS, Chennai Silks), then collapse the rest behind "See all". Better still — **two or three short quotes from long-standing architects**. One sentence from an architect who has used him for twenty years outperforms a list of ninety-five names.

### H. Offer the profile as a PDF download
Builders and architects routinely want something to file or forward. The profile PDF already exists in this folder. A "Download profile (PDF)" button in the contact section is close to zero effort and high practical value.

### I. Open projects in a lightbox
The per-card arrows are small and the images are viewed at thumbnail scale. Clicking a project should open a full-size gallery with the project details — the photographs deserve more than a 4:3 card.

### J. Tie scroll motion to the brand mark
The logo's defining element is a thick green bar. A scroll-progress rule that fills in that same green, or section dividers that draw themselves as that bar, would make the motion feel like it belongs to *this* brand rather than being generic tasteful fade-ins.

---

## Suggested order of work

1. SEO fundamentals + JSON-LD + Open Graph, and a WhatsApp contact link — cheapest, highest business return
2. Compress and lazy-load the images
3. Verify the client list with your father; trim and correct it
4. Obtain the real logo vector and retire the SVG lookalike
5. `prefers-reduced-motion`, the `CountUp` screen-reader fix, and mobile-menu keyboard handling
6. Tighten the copy (years, tagline, framing of 13,000, office hours)
7. Delete dead CSS, the old profile photo, unused logo rasters, and `.venv/`
8. Then the creative work — hero photography, the timeline, and the drawing-to-building slider

---

## Questions still open for your father

- Does the original logo exist as a vector file (AI / EPS / PDF)?
- Confirm office hours (currently set to Mon–Sat, 10 AM – 6 PM IST)
- Preferred **WhatsApp mobile** number (landline cannot open `wa.me`)
- Can he supply 2–3 structural drawings paired with finished building photos?
- Would two or three architects give a one-line testimonial?
- Confirm featured client list is OK to publish

---

## Implementation status (2026-09-09 follow-up)

| Review item | Status |
|-------------|--------|
| 1. SEO / OG / JSON-LD / robots / sitemap | Done |
| 2. WhatsApp contact | Ready — set `firm.whatsapp` in `content.ts` (mobile + country code) to enable button |
| 3. Real logo vector | Blocked — still SVG Wordmark until AI/EPS provided |
| 4. Image compress + lazy-load | Done (~3.6MB → ~2MB webp; lazy below fold; hero compressed) |
| 5. Client list curated | Done — featured 12 + expandable full lists; garbled names removed |
| 6. Accessibility | Done — reduced-motion, CountUp aria, carousel roles fixed, Escape/backdrop menu, hamburger → X |
| 7. Self-host fonts | Deferred — still Google Fonts (preconnect kept); can do `@fontsource` later |
| 8. Copy (38 years, tagline, 13k framing, hours) | Done — hours provisional pending dad confirm |
| 9. Dead code / stray files | Done — cleaned CSS, old profile, unused logos, `.venv` |
| A. Buildings in hero | Done — 3-photo crossfade |
| B. Timeline / Practice | Done — `#practice` section |
| C. Drawing-to-building slider | Blocked — needs CAD drawings from dad |
| D. Typology filters | Done |
| E. 13,000 framed | Done — “Every drawing certified…” under projects stat |
| F. Signature callout | Done — in About |
| G. Curated clients | Done |
| H. Profile PDF download | Done — `/bourna-profile.pdf` |
| I. Lightbox | Done |
| J. Brand scroll bar | Done — green progress rule |

