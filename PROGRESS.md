# Bourna Consultants Engineers — Website Progress

> Handoff file for the next agent. Update this whenever work moves forward.
> See also **`REVIEW.md`** — critique + implementation status.

## Goal

Marketing site for **Bourna Consultants Engineers** (Chennai structural consultancy, S.P.S. Inbarajan).

## Stack

- Vite 5 + React + TypeScript in `web/`
- Content: `web/src/data/content.ts`
- Styles: `web/src/index.css`

## How to run

```bash
cd web
npm install
npm run dev
npm run build
```

## Confirmed content

| Field | Value |
|-------|-------|
| Principal | S.P.S. Inbarajan, M.E. (Structural Engg.) |
| Phone | 044-24854603 |
| Email | bournace@gmail.com |
| Address | 50, Kirupasankari St, West Mambalam, Chennai 600 033 |
| Stats | **38+** years (from 1988), **13,000+** projects |
| Office hours | Mon–Sat 10–6 IST (**confirm with dad**) |
| WhatsApp | empty in `firm.whatsapp` — add `91XXXXXXXXXX` to enable |
| Domain placeholder | `https://bournace.in` in meta/JSON-LD (change when live) |

## Current status

| Area | Status |
|------|--------|
| Core site | Done |
| Review fixes (SEO, a11y, images, copy, creative) | Mostly done — see REVIEW.md table |
| Real logo vector | Blocked |
| WhatsApp | Needs mobile number |
| Drawing↔building slider | Needs CAD drawings |
| Domain / hosting | Not started |

## Session log

| Date | What happened |
|------|----------------|
| 2026-09-09 | Initial build + gallery + Passargad + count-up |
| 2026-09-09 | REVIEW.md critique written |
| 2026-09-09 | Implemented review priorities: SEO/OG/JSON-LD, image optimize, hero photos, timeline, filters, lightbox, signature callout, curated clients, PDF download, a11y, scroll progress. |
