# Home Renovation Calculator Hub — Production Readiness Task Tracker

**Project:** RenovationCalc (placeholder name)  
**Spec:** `home-renovation-calculator-hub-production-spec.md`  
**Created:** 20 November 2026  
**Status legend:** `[ ]` not started · `[x]` done · `[~]` in progress  
**Priority:** P0 (must have for launch) · P1 (should have) · P2 (nice to have)

> Tick an item only when implemented **and** tested per spec §17 and §23.

---

## Phase 1 — Foundation

- [x] [P0] Create Next.js + TypeScript project with App Router.
- [x] [P0] Configure Tailwind CSS design tokens (colors, radius, fonts).
- [x] [P0] Set up shared root layout and global styles.
- [x] [P0] Implement unit conversion helpers (`lib/units/length.ts`).
- [x] [P0] Implement validation helpers (`lib/validation/`) — number parsing, positive/non-negative/range/percent/dimension validators, multi-field validation, Zod schemas.
- [x] [P0] Implement formatting helpers (`lib/formatting/`) — number, currency, percent, ceil, with-unit.
- [x] [P0] Build reusable calculator page template (breadcrumbs, H1, form, result, breakdown, assumptions, how-to, example, related, FAQ) — `CalculatorPageTemplate`.
- [x] [P0] Add metadata, sitemap and robots handling (per-page unique titles/descriptions) — root template, sitemap.ts, robots.ts, per-page metadata exports.
- [x] [P1] Configure secure response headers.
- [x] [P1] Set up error monitoring (without capturing input values) — app/error.tsx boundary.
- [ ] [P2] Add privacy-friendly analytics wiring.

---

## Phase 2 — Calculation layer (pure functions)

- [x] [P0] Square Footage — pure function + unit tests.
- [x] [P0] Concrete Slab — pure function + unit tests. *(function + tests done)*
- [x] [P0] Flooring — pure function + unit tests.
- [x] [P0] Paint — pure function + unit tests.
- [x] [P0] Fence Material — pure function + unit tests.
- [x] [P1] Deck Material — pure function + unit tests.
- [x] [P1] Roof Area & Pitch — pure function + unit tests.
- [x] [P1] Renovation Budget — pure function + unit tests.

Each function must: be pure/deterministic, typed inputs, reject invalid values, return unrounded numbers, no DOM deps, unit tests (normal/boundary/invalid), documented formula.

---

## Phase 3 — Calculator UIs

- [x] [P0] Square Footage calculator page (multi-rectangle add/subtract, units, perimeter).
- [x] [P0] Concrete Slab calculator page (form, result, breakdown, assumptions).
- [x] [P0] Flooring calculator page (multi-room, box coverage, waste).
- [x] [P0] Paint calculator page (walls/ceiling, coats, openings, coverage, primer).
- [x] [P0] Fence Material calculator page (posts, rails, pickets, spacing).
- [x] [P1] Deck Material calculator page.
- [x] [P1] Roof Area & Pitch calculator page.
- [x] [P1] Renovation Budget calculator page (line items, CSV export, browser storage).

Per calculator UI requirements: labels (not placeholder-only), units shown, keyboard nav, inline validation, preserve valid input on error, Reset + Print, no signup.

---

## Phase 4 — Content & SEO

- [x] [P0] Unique title + meta description per indexable page.
- [x] [P0] One clear H1 per page.
- [x] [P0] Canonical URLs.
- [x] [P0] XML sitemap valid.
- [x] [P0] robots.txt valid.
- [x] [P0] Breadcrumbs with parent links.
- [x] [P0] Related calculators (2–4 genuine) on each calculator page.
- [x] [P0] Assumptions & limitations section on each calculator.
- [x] [P0] How-to-use instructions.
- [x] [P0] Worked example with units.
- [x] [P0] FAQ based on genuine user questions.
- [ ] [P1] Guides: how to measure a room, concrete volume, paint coverage, fence line, deck boards, roof pitch, renovation budget.
- [ ] [P1] Category pages summarizing tools.
- [x] [P1] Structured data (WebApplication, BreadcrumbList, Organization) where accurate — BreadcrumbList JSON-LD added.
- [x] [P2] Open Graph metadata.

---

## Phase 5 — Accessibility & UX

- [x] [P0] Semantic headings and landmarks.
- [x] [P0] Visible keyboard focus.
- [x] [P0] Associated labels and error messages.
- [x] [P0] Sufficient contrast.
- [x] [P0] No color-only communication.
- [x] [P0] Screen-reader announcements for updated results.
- [x] [P0] Respect reduced-motion.
- [ ] [P0] Accessible tables/diagrams.
- [x] [P0] Core tasks possible without a mouse.
- [x] [P0] Mobile-first single-column form, large touch targets.
- [x] [P0] Results immediately below form on mobile.
- [ ] [P0] No horizontal scrolling at common mobile widths.
- [x] [P0] Ads must not overlap controls/results.

---

## Phase 6 — Legal, privacy & trust

- [x] [P0] Privacy Policy page (adapted to actual implementation).
- [x] [P0] Terms of Use page.
- [x] [P0] Disclaimer page with calculator disclaimer wording.
- [x] [P0] Contact page.
- [x] [P0] Cookie/consent info where applicable.
- [x] [P0] Calculator disclaimer visible on every calculator.
- [ ] [P1] Privacy/consent review for jurisdictions & ad services.

---

## Phase 7 — Performance

- [ ] [P0] Fast initial render on mobile.
- [x] [P0] Calculator usable without waiting for ad scripts.
- [x] [P0] Minimal client JS.
- [ ] [P0] Optimized images.
- [x] [P0] Font loading without blocking.
- [x] [P0] No large animation libraries.
- [ ] [P0] Reserved ad space to reduce CLS.
- [x] [P0] Static generation for stable pages.
- [ ] [P1] Monitor Core Web Vitals (LCP, INP, CLS).

---

## Phase 8 — Security & reliability

- [x] [P0] Client-side input validation.
- [x] [P0] No `eval` / dynamic execution of user input.
- [x] [P0] Escape user-provided text.
- [ ] [P0] HTTPS.
- [x] [P0] No secrets in client env vars.
- [x] [P0] Dependency scanning + lockfiles.
- [x] [P0] CSV export: protect against formula injection (=, +, -, @).
- [ ] [P1] Keep dependencies updated.
- [ ] [P1] Avoid unnecessary third-party scripts.

---

## Phase 9 — Testing

- [x] [P0] Unit tests for every pure calculation function (normal, min, decimals, mixed units, large, zero/negative, invalid, waste boundaries, rounding).
- [x] [P0] Reference test cases: concrete slab, flooring, roof pitch.
- [ ] [P0] E2E tests (Playwright): page load, valid inputs, invalid errors, results update, unit switching, reset, print, nav, no horizontal overflow, keyboard-only.
- [ ] [P0] Manual cross-check of result values.
- [ ] [P0] Mobile viewport testing.
- [ ] [P0] Accessibility basics check.

---

## Phase 10 — Analytics & measurement

- [x] [P1] Implement analytics events: calculator_view, calculation_complete, calculation_error, result_copy, result_print, calculator_reset, related_tool_click — lib/analytics.
- [x] [P1] Do not send personal/sensitive input values to analytics.
- [ ] [P1] Search Console verification + sitemap submission.
- [ ] [P2] GA4 subject to consent/privacy requirements.

---

## Phase 11 — Monetization (AdSense)

- [ ] [P2] Apply for AdSense only after useful original content + working nav + all calculators + legal pages + policy compliance.
- [ ] [P2] Ad slot after result/breakdown.
- [ ] [P2] In-content slot within substantial guides.
- [ ] [P2] No ads adjacent to buttons causing accidental clicks.
- [ ] [P2] No ads covering inputs/results.
- [ ] [P2] No excessive ads above calculator.
- [ ] [P2] Track Page RPM, impressions, sessions by country, landing pages, completion rate, returning users, revenue/session.

---

## Phase 12 — Deployment

- [ ] [P0] Production env vars configured.
- [ ] [P0] Domain + DNS configured.
- [ ] [P0] HTTPS active.
- [x] [P0] Production build passes.
- [ ] [P0] All calculators tested.
- [x] [P0] 404 page configured.
- [x] [P0] Metadata + canonical URLs checked.
- [x] [P0] Sitemap + robots.txt checked.
- [x] [P0] Privacy + disclaimer pages published.
- [ ] [P0] Contact method tested.
- [ ] [P0] Analytics configured.
- [ ] [P0] No placeholder/test content on public pages.
- [ ] [P1] Preview deployments for PRs.
- [ ] [P1] Production + staging environments.

---

## Phase 13 — Post-launch

- [ ] [P1] Verify domain in Search Console.
- [ ] [P1] Submit sitemap.
- [ ] [P1] Check indexing & canonical selection.
- [ ] [P1] Test pages on mobile + desktop.
- [ ] [P1] Verify analytics events.
- [ ] [P1] Check browser console + server logs.
- [ ] [P1] Monitor uptime + broken links.
- [ ] [P1] Review Search Console queries weekly.
- [ ] [P1] Review calculator feedback + errors.

---

## Launch acceptance criteria (spec §23)

- [x] [P0] Homepage clearly explains the website.
- [x] [P0] At least five complete calculators live.
- [x] [P0] Each calculator has its own stable URL.
- [x] [P0] Every formula has documented units and assumptions.
- [x] [P0] Every calculation function has automated tests.
- [ ] [P0] Results manually checked against independent arithmetic.
- [x] [P0] Invalid inputs produce clear errors.
- [ ] [P0] Mobile layouts work without horizontal scrolling.
- [x] [P0] Keyboard navigation works for core tasks.
- [x] [P0] Print output is readable.
- [x] [P0] Related links work.
- [x] [P0] Unique titles and descriptions present.
- [x] [P0] Sitemap and robots.txt valid.
- [ ] [P0] Canonical URLs correct.
- [x] [P0] Privacy, terms, disclaimer reflect actual implementation.
- [x] [P0] No fake testimonials, reviews or prices.
- [ ] [P0] No placeholder content remains.
- [ ] [P0] Production analytics tested.
- [ ] [P0] Search Console configured.
- [x] [P0] Ad placements do not obstruct calculator controls.
- [x] [P0] Formula and construction disclaimers visible.

---

## Notes

- Launch set (P0): Square Footage, Concrete Slab, Flooring, Paint, Fence Material.
- Then add Deck Material and Roof Area & Pitch (P1).
- Renovation Budget last (P1) — prices must be user-entered.
- Do not publish a calculator until release gates (spec §17.4) pass.
