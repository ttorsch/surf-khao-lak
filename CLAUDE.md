# Agent Instructions

> This file is mirrored across `CLAUDE.md`, `AGENTS.md`, and `GEMINI.md` so the same instructions load in any AI environment.

---

## Clarify Before Building (always)

Before starting to build or plan anything in response to a prompt, ask the user clarifying questions first. Do not begin planning or implementation until the request is unambiguous enough that no follow-up adjustments should be needed afterward. This applies to every prompt, not just complex ones — when in doubt, ask rather than assume.

---

## Project Overview

**Surf Khao Lak** — A French-language landing page that converts Facebook / Instagram ad traffic into paid surf lesson bookings in Khao Lak, Thailand.

This is **not** a general-purpose website. It is a conversion funnel with four stages:

```
Meta ad (FB / IG)  →  Landing page  →  Class detail + conditions  →  Stripe payment
```

Every decision — copy, layout, image weight, number of clicks — should be judged against one question: *does this get more people from the ad to a completed payment?*

### Audience assumptions
- **Language: French only.** Every user-facing string is in French. No English fallback, no i18n library, no language switcher.
- **Mostly mobile.** Traffic arrives from the Instagram / Facebook in-app browser on a phone. Design mobile-first; desktop is the secondary case.
- **Cold traffic, low patience.** Visitors have never heard of the business. They saw one ad. Assume ~3 seconds of attention before a bounce.
- **Buying a holiday experience**, not booking a course of study. Tone is warm, sunny, and reassuring — not corporate.

### Web stack
- **Framework:** Next.js 16 (App Router) + TypeScript + React 19
- **Styling:** TailwindCSS v4 (utility-first; only reach for a `.module.css` file when a component genuinely needs it)
- **Animations:** Framer Motion (image slider, scroll reveals, card transitions)
- **Icons:** Lucide React
- **Payments:** Stripe Checkout (server-created Sessions)
- **Deploy:** Vercel, connected via GitHub integration
- **Local dev:** `npm run dev` on port `3000`

---

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage — the whole sales pitch in one scroll |
| `/cours/[slug]` | Class detail: full description, what's included, conditions, price, **Réserver** button |
| `/reservation/[slug]` | Booking form (name, email, date, number of people, level) → creates Stripe Checkout Session |
| `/reservation/succes` | Stripe success return URL — confirmation + what happens next |
| `/reservation/annulee` | Stripe cancel return URL — soft recovery, link back to the class |
| `/mentions-legales` | Legal notice |
| `/conditions` | Terms of sale, cancellation and refund policy |
| `/api/checkout` | POST — server-side creation of the Stripe Checkout Session |
| `/api/webhooks/stripe` | POST — Stripe webhook receiver (booking confirmation emails) |

**Route naming is French** (`/cours`, `/reservation`) because the URL is user-visible and appears in ad previews.

### Homepage scroll order
The homepage is a single vertical narrative. Sections in order:

1. **Hero** — one strong image or short video loop, headline, and a primary CTA above the fold. The CTA must be visible without scrolling on a 390×844 viewport.
2. **Image slider** — the "seduction" block. Khao Lak beaches, waves, people actually learning and smiling. This section sells the feeling, not the product.
3. **Nos cours** — class type cards. Each card shows name, short pitch, duration, price, and two actions: *En savoir plus* and *Réserver*. Both go to `/cours/[slug]`.
4. **Localisation** — where the school is, which beach, how to get there, embedded map.
5. **Contact** — WhatsApp, phone, email, Instagram. For people who want to talk to a human before paying. This is a real conversion path, not an afterthought — a large share of bookings will come through it.

Do not add sections beyond these without asking. Every extra section pushes the class cards further down the page.

---

## Stripe Integration Rules

**Never trust the client with a price.** The browser sends a class `slug` and quantity; the server looks up the real price and builds the Session. A price arriving in a request body is ignored.

- Class definitions (slug, name, price, currency, duration, description, conditions) live in **one source of truth** — a typed file such as `lib/classes.ts`. The homepage cards, the `/cours/[slug]` page, and the checkout route all read from it. Never duplicate a price into JSX.
- Create Sessions with `mode: 'payment'` in `/api/checkout`, then redirect to the returned URL.
- Attach booking details as Session **metadata**: class slug, requested date, participant count, level, and customer name. This is what turns a payment into a usable booking.
- Set `success_url` to `/reservation/succes` and `cancel_url` back to the class page.
- Set `customer_email` from the form so Stripe sends its receipt to the right place.
- `STRIPE_SECRET_KEY` is **server-only**. It must never appear in a client component, a `NEXT_PUBLIC_` variable, or a committed file.
- Verify the webhook signature on every request to `/api/webhooks/stripe`. Fulfilment logic (confirmation email, notifying the instructor) belongs in the webhook, not in the success page — a user closing the tab must not lose their booking.
- Currency: **THB**. The business operates in Thailand and pays out in Thai baht. If EUR pricing is ever needed, ask first — it changes payout, reconciliation, and refund handling.

---

## Content & Copy Rules

- All user-facing text is French. This includes button labels, form validation messages, error states, alt text, meta tags, and the 404 page.
- Use natural, idiomatic French. Do not machine-translate English marketing copy — it reads as spam to a French audience.
- Never invent facts: no fake review counts, no fake instructor credentials, no invented certifications, no made-up student numbers. If a real number isn't available, ask the user for it or leave the element out.
- Prices, durations, group sizes, and cancellation terms must come from `lib/classes.ts` or from the user. Never guess them.
- Every class page must clearly state its **conditions**: minimum age, swimming ability required, what to bring, what's provided, weather policy, and cancellation/refund terms. This is both a legal requirement and a conversion driver — unclear conditions cause abandoned checkouts.

---

## Design Principles

**1. Performance is a conversion feature.** Ad traffic bounces on slow loads. Use `next/image` everywhere, serve modern formats, set explicit dimensions to avoid layout shift, and lazy-load everything below the fold. The hero image is the LCP element — it gets `priority`.

**2. Mobile-first, always.** Build the 390px layout first, then widen. Tap targets minimum 44px. No hover-dependent interactions.

**3. The CTA is never far away.** A visitor should never have to scroll up to find a way to book. Use a sticky or repeated CTA on long pages.

**4. Reduce the click count.** Ad → class → payment is three steps. Do not add a fourth.

**5. Images do the selling.** This is a holiday product. Large, bright, real photography beats clever copy. Placeholder images are fine during development but must be flagged clearly so they never ship.

---

## Tracking & Privacy

The site runs Meta ads, so a Meta Pixel / Conversions API setup is expected for retargeting and conversion measurement.

- The audience is French, so **GDPR applies**. Analytics and advertising cookies require prior consent — the Pixel must not fire before the user accepts.
- A consent banner is required before any Pixel or analytics script loads.
- `/mentions-legales` and `/conditions` are legally required for a French-facing commercial site, not optional extras.
- Never log full customer personal data to the console or to committed files.
- I am not a lawyer, and the exact legal requirements should be confirmed with a professional familiar with French e-commerce law before launch.

---

## Operating Principles

**1. Check for existing work first**
Before creating a component, check `components/`. Before creating a route, check `app/`. Before adding a dependency, check whether the stack already covers it.

**2. One source of truth for data**
Class details, prices, and contact information are defined once and imported. If the same string appears in two files, that's a bug.

**3. Fix, then harden**
When something breaks: read the error and stack trace, fix it, re-run it, and confirm the fix. If a fix touches Stripe in live mode or anything that costs money, check with the user before running it.

**4. Never guess business facts**
Prices, schedules, instructor names, addresses, phone numbers, refund policies — ask. Wrong information here has real-world consequences for a real business taking real payments.

**5. Deployment**
Vercel via the connected GitHub repo. Environment variables are set in the Vercel dashboard, never committed.

---

## File Organization

```
app/                      Next.js App Router — pages and API routes
  api/checkout/           Stripe Checkout Session creation
  api/webhooks/stripe/    Stripe webhook receiver
  cours/[slug]/           Class detail pages
  reservation/            Booking form + success/cancel pages
components/               Reusable UI (Hero, Slider, ClassCard, ContactBlock, ...)
lib/                      classes.ts (source of truth), stripe.ts, utils
public/                   Static images, favicon, OG image
.env.local                Secrets — never committed
.tmp/                     Intermediate files — never committed, always regenerable
```

### Environment variables
```
STRIPE_SECRET_KEY            server-only
STRIPE_WEBHOOK_SECRET        server-only
NEXT_PUBLIC_SITE_URL         used for Stripe return URLs
NEXT_PUBLIC_META_PIXEL_ID    only loaded after consent
```

---

## Open Questions

These are assumptions made while writing this file. Confirm or correct them before building:

- **Business name** — "Surf Khao Lak" is a placeholder.
- **Class detail as a page, not a section.** The brief said the book button leads to "the same page which is description of classes and condition." This is built as a dedicated `/cours/[slug]` route so each class gets its own shareable URL and its own ad destination. If a same-page accordion or modal is preferred instead, say so — it changes the routing entirely.
- **Booking form before payment.** A short form collects date and participant count before Stripe, since a surf lesson needs a date. If bookings are arranged by WhatsApp after payment instead, the form can be dropped.
- **Class list.** Names, prices, durations, group sizes, and conditions are all still needed.
- **No database.** Bookings live in Stripe plus a confirmation email. If a booking dashboard or availability calendar is needed, that's a meaningfully larger project.
