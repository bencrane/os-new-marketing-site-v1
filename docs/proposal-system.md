# Proposal System — Chica Chida

## Overview

A client-facing proposal and payment flow built as static Next.js pages within the oslo marketing site. The first implementation is a hardcoded one-off for Chica Chida, a tequila brand. The structure is designed to be adapted for future proposals with different clients, content, and pricing.

## Architecture

### Routes

| Route | File | Purpose |
|---|---|---|
| `/proposal/chica-chida` | `src/app/proposal/chica-chida/page.tsx` | Full proposal with signature pad |
| `/proposal/chica-chida/confirmed` | `src/app/proposal/chica-chida/confirmed/page.tsx` | Payment page (Stripe Elements + ACH) |

Both are `"use client"` components. They live under the root layout, which means the main marketing site nav (Outbound Solutions brand + vertical links) is visible at the top. This was a conscious "good enough for now" decision — a dedicated proposal layout that hides the nav could be added later.

### Tech stack (within oslo)

- Next.js 16.2.2 (App Router, Turbopack)
- Tailwind CSS v4 with shadcn/ui components
- Fonts: EB Garamond (headings via `font-heading`), JetBrains Mono (body via `font-mono`)
- Colors: pure black background, emerald-500 (#10b981) primary, zinc grays
- Stripe packages: `@stripe/stripe-js`, `@stripe/react-stripe-js`

### Origin

The proposal concept was ported from a different repo (`modern-full-portal`, Vite + React Router, inline CSS). That version had two option cards, inline styles, and a different design system. We rebuilt from scratch in Next.js using the oslo design system (Tailwind, EB Garamond, JetBrains Mono, emerald accents) rather than porting the old code directly. The content structure is completely different — driven by a JSON spec rather than the two-option-card format.

## Proposal page (`/proposal/chica-chida`)

### Content source

All content is hardcoded from `.context/attachments/chica_chida_proposal.json`. The JSON has:

- `meta`: title, client name, subtitle, preparedBy, date, confidential flag
- `sections`: 10 content sections (executive summary, opportunity, assessment, approach, market, offer, math, engagement, your role, pricing & terms)
- `appendix`: 3 FAQ categories (deliverability, email validation, copywriting & campaign design)

The data is defined as TypeScript constants at the top of the page file — not imported from a separate file. For a one-off this is fine. If we build a second proposal, extract the data layer.

### Content placeholders

The JSON contains `[X,000]` and `[X]` placeholders in several places (assessment paragraph, infrastructure setup workstream, campaign execution workstream). These need to be filled in with real numbers before sending to the client.

### Page structure

1. **Intro splash** — "Outbound Solutions x Chica Chida" displayed vertically (name / x / name), each line centered independently. The "x" is emerald green, lowercase, mono font. Holds for ~1.8s, fades out over 0.7s, then the proposal fades in. No staggered animation — everything appears together.

2. **Hero** — Confidential badge, title ("Outbound Partnership Proposal"), italic subtitle, "Prepared for Chica Chida | April 2026" meta line.

3. **Sections 01–10** — Each section uses a consistent `<Section>` helper component: numbered label (emerald mono), serif heading, muted body text. Special treatments:
   - **05 The Market**: target role chips (emerald-bordered badges) + bullet-pointed targeting notes
   - **07 The Math**: 6-metric projection grid in bordered cards + italic disclaimer
   - **08 The Engagement**: 3 phase cards (Build/Launch/Optimize) with accordion-expandable workstreams using the shadcn Accordion component
   - **09 Your Role**: callout card for the pause/capacity note
   - **10 Pricing & Terms**: pricing table with line items + $27,500 total row + renewal callout card

4. **Appendix** — 3 FAQ categories, each with accordion items

5. **Signature** — Full name input, email input, canvas-based signature pad (mouse + touch support). "Sign here" placeholder text when empty. Clear and Submit buttons. On submit, navigates to `/proposal/chica-chida/confirmed`. **No API call is made** — signature data, name, and email are discarded on navigation. Backend integration is deferred.

### Design decisions

- **Vertical splash layout** chosen because variable company name lengths break horizontal centering (the "x" drifts off-center when one name is longer than the other). Vertical stacking with independent line centering keeps the "x" dead-center regardless of name length.
- **No staggered entrance animation** — the sequential name-then-x-then-name reveal was considered too performative. Simple fade in/out.
- **Name order**: "Outbound Solutions" first, then client name. Maker-first convention (like Nike x Off-White).
- **Section body text** uses `text-[15px]` with `leading-relaxed` for comfortable reading at the narrower `max-w-3xl` container width.
- **Workstream details are in accordions** because the full text is dense. Titles are always visible; details expand on click.

## Payment page (`/proposal/chica-chida/confirmed`)

### Structure

1. **Agreement Signed** — small green check + text confirmation. Keeps momentum forward, not celebratory.
2. **Amount Due** — $27,500 in large mono text.
3. **Two equal-weight payment cards** side by side on desktop, stacked on mobile:
   - **Pay by Card** — embedded Stripe Elements (Payment Element)
   - **Pay by Bank Transfer** — ACH details with copy-to-clipboard buttons
4. **Contact line** — "Questions about payment? Reach out to Ben" with mailto link (currently `ben@outboundsolutions.com`, update if needed).

### Design decisions

- **Two options shown equally** — at $27,500, both card and ACH are legitimate B2B payment methods. No primary/secondary hierarchy. No tabs (hiding info adds friction).
- **No re-selling on this page** — they already signed. The page is about completing the transaction, not reopening the decision.
- **Graceful Stripe fallback** — if the backend endpoint isn't available, the card side shows "Card payment is temporarily unavailable. Please use bank transfer or try again later." ACH always works regardless.

### Stripe Elements integration

**Frontend flow:**

1. Page mounts → `POST {API_BASE}/api/public/proposals/{PROPOSAL_ID}/create-payment-intent`
2. Backend returns `{ clientSecret, publishableKey }`
3. Frontend calls `loadStripe(publishableKey)` and wraps the form in `<Elements>` with the `clientSecret`
4. Renders `<PaymentElement />` — Stripe's embedded card form
5. On submit, calls `stripe.confirmPayment()` with `redirect: "if_required"`
6. On success, shows in-place "Payment received" confirmation

**Config constants** (top of confirmed/page.tsx):
```
const API_BASE = "https://api.serviceengine.xyz";
const PROPOSAL_ID = "chica-chida";
```

**Stripe appearance** is configured to match the site's dark theme:
- Night theme
- Emerald primary (#10b981)
- Zinc backgrounds (#18181b) and borders (#27272a)
- JetBrains Mono font
- 4px border radius

**Frontend init flow (two sequential calls):**

1. `GET /api/public/proposals/{id}` — returns proposal data including `stripe_publishable_key`
2. `POST /api/public/proposals/{id}/payment-intent` — no auth, no body. Returns:
```json
{
  "client_secret": "pi_xxx_secret_xxx",
  "payment_intent_id": "pi_xxx",
  "amount": 2750000
}
```
(`amount` is in cents: 2750000 = $27,500)

The frontend uses `stripe_publishable_key` from step 1 to init Stripe, then `client_secret` from step 2 to mount Elements and confirm payment.

### ACH details (hardcoded)

| Field | Value |
|---|---|
| Account Name | Modern Full, LLC |
| Routing Number | 091311229 |
| Account Number | 202314840766 |
| Bank | Choice Financial Group |
| Address | 4501 23rd Avenue S, Fargo, ND 58104 |

## Backend dependency: service-engine-x

service-engine-x is a multitenant API at `api.serviceengine.xyz` that holds Stripe keys per tenant. Two endpoints are used:

```
GET  /api/public/proposals/{proposal_id}
  → returns proposal data + stripe_publishable_key

POST /api/public/proposals/{proposal_id}/payment-intent
  → no auth, no body
  → returns { client_secret, payment_intent_id, amount }
```

The backend derives everything from the proposal ID — looks up items, sums prices, gets the org's Stripe key, creates the PaymentIntent. No frontend input needed beyond the proposal ID.

**Status:** Backend endpoints exist. Frontend integration is wired up but not yet tested end-to-end (requires a real proposal ID in service-engine-x).

The original proposal system in modern-full-portal had a signing endpoint at `POST /api/public/proposals/e30c2203/sign` which accepted `{ signature, signer_name, signer_email, signed_html }`. We are not using that endpoint. Signing currently has no backend integration.

## Open items

1. **Content placeholders** — `[X,000]` and `[X]` in multiple sections need real numbers before client delivery.
2. **Stripe end-to-end test** — frontend is wired to the correct endpoints. Needs a real proposal ID in service-engine-x to test the full flow.
3. **Signature backend** — currently no API call on sign. Decide whether to POST the signature data somewhere (service-engine-x?) and what payload shape.
4. **Email on sign** — the signature section says "A copy of this signed agreement will be sent to the email provided." This doesn't happen yet.
5. **Proposal layout** — the marketing site nav is visible on proposal pages. Consider a `/proposal` layout that hides it for a cleaner client-facing presentation.
6. **Contact email** — `ben@outboundsolutions.com` on the payment page needs to be verified as the correct address.
7. **Turbopack config** — `next.config.ts` was updated with `turbopack: { root: __dirname }` to fix a workspace root resolution issue caused by multiple lockfiles. This is a build infrastructure fix, not proposal-specific.

## Adapting for future proposals

To create a new proposal (e.g., for "Acme Corp"):

1. Copy `src/app/proposal/chica-chida/` to `src/app/proposal/acme-corp/`
2. Update all hardcoded content: data constants, hero text, splash screen names, pricing, ACH details
3. Update `PROPOSAL_ID` in the confirmed page
4. Fill in any `[X]` placeholders
5. If the pattern repeats more than 2-3 times, extract a shared proposal template component with a data-driven approach
