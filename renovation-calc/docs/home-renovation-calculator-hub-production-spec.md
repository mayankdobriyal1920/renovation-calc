# Home Renovation Calculator Hub

## Production-oriented Product Requirements & Technical Specification

**Document version:** 1.0\
**Prepared:** 20 November 2026\
**Primary market:** United States\
**Business model:** Free web tools supported primarily by display
advertising\
**Product type:** SEO-led, browser-first calculator website\
**Working name:** RenovationCalc (placeholder; check trademark, domain
and social availability before use)

> **Scope note:** This is a build specification, not a guarantee of
> search rankings, revenue, engineering accuracy for every property, or
> compliance with local building codes. Calculators are planning
> estimators. They must clearly state assumptions and must not replace
> manufacturer instructions, contractor advice, structural engineering,
> permits or local code requirements. Validate formulas with a qualified
> construction professional before launch.

------------------------------------------------------------------------

# 1. Executive summary

Build a fast, mobile-first website offering practical home-improvement
calculators for homeowners, DIY users and contractors in the United
States.

The site should solve specific tasks rather than act as a generic
calculator directory. Each calculator gets: - A dedicated, indexable
landing page. - A simple input form with clear units. - An immediate
result and a visible calculation breakdown. - Assumptions, waste
allowances and limitations. - Helpful related calculators. - Useful
explanatory content that is not just duplicated template text.

## Initial product categories

1.  Roofing
2.  Concrete
3.  Flooring
4.  Painting
5.  Decking
6.  Fencing
7.  General renovation budgeting

## Launch recommendation

Do not launch all calculators at once. Build and test a coherent first
release of 8 calculators:

  -----------------------------------------------------------------------
  Priority                Calculator              Why it belongs in v1
  ----------------------- ----------------------- -----------------------
  P0                      Square Footage          Reusable foundation for
                          Calculator              many other tools

  P0                      Concrete Slab           Clear inputs and
                          Calculator              transparent volume
                                                  formula

  P0                      Flooring Calculator     High practical value;
                                                  straightforward
                                                  calculation

  P0                      Paint Calculator        Common project with
                                                  useful coats/coverage
                                                  logic

  P0                      Fence Material          Supports material
                          Calculator              counts and cost
                                                  estimates

  P1                      Deck Material           More assumptions; good
                          Calculator              expansion opportunity

  P1                      Roof Area & Pitch       Requires careful roof
                          Calculator              geometry explanations

  P1                      Renovation Budget       Useful organizer, but
                          Calculator              prices must be
                                                  user-entered
  -----------------------------------------------------------------------

A production launch should include at least five complete tools, not 20
thin pages.

------------------------------------------------------------------------

# 2. Product goals and non-goals

## 2.1 Goals

-   Attract US organic search traffic through specific, useful
    calculator pages.
-   Provide accurate, explainable arithmetic for clearly defined
    scenarios.
-   Make the core calculation usable without registration.
-   Work well on mobile devices.
-   Keep calculations client-side wherever practical.
-   Create a scalable foundation for additional calculators.
-   Monetize with display ads without obstructing the tool.
-   Build topical relevance through related tools and genuinely useful
    guides.

## 2.2 Non-goals for v1

-   Structural engineering or load-bearing design.
-   Roof framing plans or code-compliant construction drawings.
-   Automated contractor quotes.
-   Guaranteed local material prices.
-   Permit, zoning or building-code determinations.
-   User accounts, saved projects or cloud sync.
-   Marketplace, lead-generation or contractor booking features.
-   AI-generated construction advice.
-   Uploading floor plans or photos for automated measurement.

These can be evaluated later, but should not delay the first useful
release.

## 2.3 Success metrics

Measure the product rather than relying on pageviews alone.

  -----------------------------------------------------------------------
  Metric                              Initial measurement
  ----------------------------------- -----------------------------------
  Calculator engagement               Percentage of page sessions that
                                      complete a calculation

  Result interaction                  Copy, print or reset actions

  Organic acquisition                 Search clicks and impressions by
                                      landing page

  Search quality                      Queries, CTR and average position
                                      in Search Console

  Performance                         Core Web Vitals and real-user
                                      mobile performance

  Monetization                        Ad impressions, page RPM and
                                      revenue per session

  User experience                     Form errors, abandonment and
                                      feedback

  Reliability                         JavaScript errors and failed
                                      calculations
  -----------------------------------------------------------------------

Do not set an arbitrary revenue forecast until actual traffic,
geography, ad fill and RPM are known.

------------------------------------------------------------------------

# 3. Audience and positioning

## Primary audiences

### Homeowners and DIY users

Need to estimate quantities before purchasing materials. They value
simple instructions, clear units and a result they can understand.

### Small contractors and tradespeople

May use calculators for quick estimates. They value speed, predictable
formulas and the ability to print or share a result.

### Home improvement researchers

May be comparing project scope and approximate material requirements.
They need context and caveats, not false precision.

## Positioning statement

"Straightforward home-improvement calculators that help you estimate
project quantities and plan material purchases."

Avoid claims such as "guaranteed accurate," "professional engineering
calculator" or "exact project cost."

## Differentiation

Compete on: - Clear explanations of every input. - US customary units by
default, with metric support. - Transparent assumptions and editable
waste percentages. - Calculation breakdowns rather than unexplained
totals. - No account required. - Fast, uncluttered mobile experience. -
Useful connections between related tools.

Do not claim that these features are unique. Competitors may already
offer them.

------------------------------------------------------------------------

# 4. Information architecture

## Primary navigation

-   Calculators
-   Roofing
-   Concrete
-   Flooring
-   Painting
-   Decking
-   Fencing
-   Guides
-   About

Keep the main navigation compact on mobile. Put less-used links in the
footer.

## Proposed URL structure

Use stable, descriptive, lowercase URLs:

``` text
/
 /calculators/
 /calculators/square-footage/
 /calculators/concrete-slab/
 /calculators/flooring/
 /calculators/paint/
 /calculators/fence-material/
 /calculators/deck-material/
 /calculators/roof-area-pitch/
 /calculators/renovation-budget/

 /guides/
 /guides/how-to-measure-a-room/
 /guides/how-to-calculate-concrete-volume/
 /guides/how-much-flooring-waste-to-add/
 /guides/how-to-estimate-paint-coverage/
 /guides/how-to-measure-a-fence/
 /about/
 /contact/
 /privacy-policy/
 /terms/
 /disclaimer/
 /cookie-policy/
```

Do not create multiple URLs for the same calculation just to target tiny
keyword variations. Use one canonical page per distinct intent.

## Internal linking rules

-   Every calculator links to two to four genuinely related tools.
-   Guides link to the relevant calculator near the point where it is
    useful.
-   Category pages summarize the tools in that category and explain when
    to use each.
-   Breadcrumbs link to parent categories.
-   Avoid sitewide blocks containing dozens of repetitive keyword links.

------------------------------------------------------------------------

# 5. Calculator specifications and formulas

## Global calculation conventions

1.  Use full precision internally. Round only for display.
2.  Show units beside every input and output.
3.  Never silently mix feet, inches, yards, millimeters or meters.
4.  Validate that dimensions are positive and within a sensible range.
5.  Clearly distinguish material quantity from estimated cost.
6.  Label user-entered prices as user-provided, not market prices.
7.  Make waste allowance editable. Any default is a planning assumption,
    not a universal rule.
8.  Explain what is included and excluded.
9.  Provide a reset action and a calculation breakdown.
10. Do not show a result for invalid or incomplete inputs.

## 5.1 Square Footage Calculator

**URL:** `/calculators/square-footage/`\
**Purpose:** Calculate floor, wall or other rectangular area.

### Inputs

-   Shape: rectangle or multiple rectangles.
-   Length.
-   Width.
-   Unit: feet, inches, meters or centimeters.
-   Optional additional areas to add or subtract.

### Formula

For a rectangle:

``` text
Area = Length × Width
```

For multiple rectangles:

``` text
Total Area = Sum of included rectangle areas - Sum of excluded areas
```

Convert all dimensions to one base unit before calculating.

### Outputs

-   Area in square feet.
-   Area in square yards.
-   Area in square meters.
-   Optional perimeter for a single rectangle.

### UX requirements

-   Allow users to add multiple room sections.
-   Label subtraction clearly, for example an opening or excluded area.
-   Explain that irregular shapes should be split into simpler shapes.

### Edge cases

-   Zero or negative dimensions.
-   Mixed units.
-   Very large values.
-   Subtracted area greater than included area.

------------------------------------------------------------------------

## 5.2 Concrete Slab Calculator

**URL:** `/calculators/concrete-slab/`\
**Purpose:** Estimate concrete volume for a rectangular slab.

### Inputs

-   Length.
-   Width.
-   Thickness.
-   Units for each dimension.
-   Optional waste allowance percentage.
-   Optional user-entered concrete price per cubic yard.

### Formula

Convert dimensions to feet:

``` text
Thickness in feet = Thickness in inches / 12
Volume in cubic feet = Length(ft) × Width(ft) × Thickness(ft)
Volume in cubic yards = Volume(ft³) / 27
Planning quantity = Volume(yd³) × (1 + Waste% / 100)
Estimated material cost = Planning quantity × User price per yd³
```

### Outputs

-   Geometric volume in cubic feet.
-   Geometric volume in cubic yards.
-   Planning volume including selected waste allowance.
-   Optional user-entered material cost.

### UX requirements

-   Show the geometric volume separately from the waste-adjusted
    quantity.
-   Explain that delivery minimums, short-load fees, reinforcement,
    sub-base and site conditions are not included.
-   Allow a user to edit the waste percentage.
-   Do not automatically recommend a structural slab thickness.

### Important safety note

The calculator must not tell users what thickness or reinforcement their
slab needs. Those depend on use, soil, loads, climate and local
requirements.

------------------------------------------------------------------------

## 5.3 Flooring Calculator

**URL:** `/calculators/flooring/`\
**Purpose:** Estimate flooring area and number of product boxes.

### Inputs

-   Room length and width, or multiple room rectangles.
-   Unit.
-   Waste allowance percentage (editable; initial UI suggestion: 10%,
    clearly marked as a starting assumption).
-   Product coverage per box, entered by user.
-   Optional price per box.

### Formula

``` text
Net area = Sum of room areas
Purchase area = Net area × (1 + Waste% / 100)
Boxes required = Ceiling(Purchase area / Coverage per box)
Estimated product cost = Boxes required × Price per box
```

### Outputs

-   Net room area.
-   Purchase area including waste.
-   Number of full boxes.
-   Actual coverage purchased.
-   Optional estimated product cost.

### UX requirements

-   Support multiple rooms.
-   Ask the user to read the box coverage printed on the actual product.
-   Explain that pattern matching, diagonal layouts, room shape and
    installation conditions can change waste.

------------------------------------------------------------------------

## 5.4 Paint Calculator

**URL:** `/calculators/paint/`\
**Purpose:** Estimate paint quantity for walls and optional ceilings.

### Inputs

-   Number of walls or room length and width.
-   Wall height.
-   Number of coats.
-   Doors/windows or other excluded area (optional).
-   Coverage per gallon, supplied by the user or taken from a clearly
    labelled editable example.
-   Optional primer coverage and number of primer coats.
-   Optional price per gallon.

### Formula

For walls measured individually:

``` text
Gross wall area = Sum(wall length × wall height)
Net paint area = Gross wall area - excluded opening area
Required paint area = Net paint area × Number of coats
Gallons required = Required paint area / Coverage per gallon
Purchase gallons = Round up to available purchase unit
```

If the user includes a ceiling:

``` text
Ceiling area = Room length × Room width
```

Primer must be calculated separately from finish paint.

### Outputs

-   Gross wall area.
-   Excluded area.
-   Net paintable area.
-   Paint coverage required across coats.
-   Gallons required and rounded purchase quantity.
-   Optional estimated cost.

### UX requirements

-   Coverage must be configurable because paint products and surfaces
    differ.
-   Clearly explain that texture, porosity, color changes, application
    method and product instructions affect coverage.
-   Do not present one coverage figure as universally correct.

------------------------------------------------------------------------

## 5.5 Fence Material Calculator

**URL:** `/calculators/fence-material/`\
**Purpose:** Estimate basic fence component quantities for a straight
run.

### Inputs

-   Total fence length.
-   Desired maximum post spacing.
-   Fence height.
-   Rails per section.
-   Picket face width.
-   Picket gap.
-   Optional gate count and gate width (v1 may exclude gates from
    material counts).
-   Optional unit prices.

### Basic formulas

``` text
Number of spans = Ceiling(Fence length / Desired maximum post spacing)
Number of posts = Number of spans + 1
Actual span length = Fence length / Number of spans
Rail count = Number of spans × Rails per span
Picket pitch = Picket face width + Picket gap
Picket count = Ceiling(Fence length / Picket pitch)
```

The formula is a simplified straight-run estimate. Corners, ends, gates,
slopes, bracing, post dimensions and layout constraints can change
counts.

### Outputs

-   Number of spans.
-   Approximate post count.
-   Approximate rail count.
-   Approximate picket count.
-   Optional user-entered material cost.

### UX requirements

-   Make post spacing a maximum target, not a construction instruction.
-   Explain that terminal, corner and gate posts may require different
    specifications.
-   State whether gate openings are included or excluded.
-   Do not prescribe footing depth, post size or structural design.

------------------------------------------------------------------------

## 5.6 Deck Material Calculator

**URL:** `/calculators/deck-material/`\
**Purpose:** Estimate basic decking boards and joists for a rectangular
deck.

### Inputs

-   Deck length and width.
-   Board direction.
-   Board face width.
-   Board gap.
-   Board stock length (optional).
-   Joist spacing.
-   Waste allowance.
-   Optional user-entered prices.

### Simplified formulas

If boards run along the deck length:

``` text
Board pitch = Board face width + Board gap
Board rows = Ceiling(Deck width / Board pitch)
Total board linear footage = Board rows × Deck length
```

If joists run perpendicular to boards and are spaced along the deck
length:

``` text
Joist count = Ceiling(Deck length / Joist spacing) + 1
```

Waste-adjusted board quantity:

``` text
Planning board length = Total board linear footage × (1 + Waste% / 100)
```

### Outputs

-   Deck surface area.
-   Estimated board rows.
-   Total linear footage.
-   Approximate joist count.
-   Optional material cost.

### Limitations

This is not a deck framing design tool. It does not calculate beam
spans, footing sizes, ledger attachment, lateral bracing, guardrails,
stairs, cantilevers or structural load capacity. These require
project-specific design and local code checks.

------------------------------------------------------------------------

## 5.7 Roof Area and Pitch Calculator

**URL:** `/calculators/roof-area-pitch/`\
**Purpose:** Calculate roof slope factor and estimate roof surface area
from a known horizontal plan area.

### Inputs

-   Horizontal roof footprint area, or length and width for a simple
    rectangular footprint.
-   Roof pitch as rise per 12 inches of horizontal run.
-   Optional overhang dimensions, if the user can measure them.
-   Optional waste allowance.
-   Optional user-entered roofing material coverage and price.

### Formula

For pitch expressed as rise per 12 inches of run:

``` text
Slope factor = √(1 + (Pitch / 12)²)
Sloped roof area = Horizontal plan area × Slope factor
Planning material area = Sloped roof area × (1 + Waste% / 100)
```

For a roof with multiple planes, calculate each plane and add the areas.

### Outputs

-   Pitch ratio.
-   Slope factor.
-   Estimated sloped surface area.
-   Waste-adjusted planning area.
-   Optional material quantity based on user-entered coverage.

### Limitations

A simple rectangular footprint is not enough to accurately calculate
every roof. Hips, valleys, dormers, multiple levels, complex overhangs
and unusual geometry need separate plane measurements. The tool must not
produce a structural roof design or claim to replace an on-site
measurement.

------------------------------------------------------------------------

## 5.8 Renovation Budget Calculator

**URL:** `/calculators/renovation-budget/`\
**Purpose:** Organize user-entered project costs into a planning budget.

### Inputs

-   Project name.
-   Categories: materials, labor, delivery, equipment rental,
    permits/fees and other.
-   Line-item description.
-   Quantity.
-   Unit cost.
-   Optional contingency percentage.
-   Optional tax percentage, entered by user.

### Formula

``` text
Line item total = Quantity × Unit cost
Subtotal = Sum(line item totals)
Tax = Taxable subtotal × User-entered tax rate
Contingency = Subtotal × User-entered contingency percentage
Estimated total = Subtotal + Tax + Contingency
```

### Outputs

-   Category subtotals.
-   Overall subtotal.
-   Tax amount if entered.
-   Contingency amount.
-   Estimated project total.

### UX requirements

-   Clearly label every price as user-entered.
-   Do not use unverified national averages as current local quotes.
-   Allow adding, editing and removing line items.
-   Allow printing or exporting a simple CSV locally.
-   Keep project data in browser storage only if persistence is added,
    and explain that it is stored on that device.

------------------------------------------------------------------------

# 6. Shared user experience requirements

## 6.1 Calculator page layout

Recommended order:

1.  Breadcrumbs.
2.  H1 with the calculator's plain-language name.
3.  One-sentence explanation.
4.  Calculator form.
5.  Primary result.
6.  Calculation breakdown.
7.  Assumptions and limitations.
8.  How to use the calculator.
9.  Worked example.
10. Related calculators.
11. FAQ based on genuine user questions.
12. Sources or methodology notes where relevant.

The calculator should appear near the top of the page. Do not force
users to scroll through a long SEO article before reaching the tool.

## 6.2 Form behavior

-   Use labels, not placeholder-only inputs.
-   Show units in the field or immediately beside it.
-   Support keyboard navigation.
-   Recalculate on submit or with a short, controlled interaction. Avoid
    surprising users with focus changes.
-   Show inline validation near the relevant field.
-   Preserve valid input when another field has an error.
-   Provide clear Reset and Print actions.
-   Do not require sign-up.

## 6.3 Result presentation

Each result should include: - Main answer with unit. - Net quantity and
waste-adjusted quantity where applicable. - Formula or calculation
breakdown. - Assumptions. - A clear statement if cost is based on
user-entered pricing.

Example:

``` text
Estimated concrete required
2.47 cubic yards

Geometric volume: 2.25 yd³
Selected allowance: 10%
Planning quantity: 2.47 yd³

Estimate excludes delivery fees, reinforcement, base preparation
and contractor labor.
```

This is an illustrative display example, not a recommendation for a real
project.

## 6.4 Responsive behavior

-   Mobile-first single-column form.
-   Large, touch-friendly controls.
-   Results immediately below the form on mobile.
-   Two-column input/result layout only when it remains readable on
    tablet and desktop.
-   No horizontal scrolling at common mobile widths.
-   Ads must not overlap calculator controls or results.

## 6.5 Accessibility

Target WCAG 2.2 AA: - Semantic headings and landmarks. - Visible
keyboard focus. - Associated labels and error messages. - Sufficient
contrast. - No color-only communication. - Screen-reader announcements
for updated results where appropriate. - Respect reduced-motion
settings. - Accessible tables and diagrams. - Ensure controls work
without a mouse.

------------------------------------------------------------------------

# 7. Visual design system

## Brand direction

Use a practical, trustworthy home-improvement identity. Avoid looking
like a contractor lead-generation site or an aggressive ad farm.

## Suggested design tokens

  Element      Recommendation
  ------------ ----------------------------------
  Primary      Deep navy or slate
  Accent       Warm orange
  Background   Off-white / very light neutral
  Surface      White
  Text         Dark charcoal
  Success      Accessible green
  Error        Accessible red
  Border       Light neutral gray
  Font         Inter, system UI or similar
  Radius       10--14px
  Layout       Centered, readable content width

## Components

-   Header and mobile navigation.
-   Breadcrumb.
-   Calculator card.
-   Input group.
-   Unit selector.
-   Inline validation message.
-   Result panel.
-   Breakdown table.
-   Assumption notice.
-   Related calculator card.
-   FAQ accordion.
-   Footer.
-   Ad slot placeholder.

Do not use decorative graphics that slow down the page or make the
calculator harder to use.

------------------------------------------------------------------------

# 8. Recommended technical stack

## Frontend and rendering

**Recommended:** Next.js App Router + TypeScript.

Reasons: - Server-rendered page content for crawlability. - Static
generation for stable calculator pages. - Client-side interactive
calculator forms. - Straightforward metadata, sitemap and robots
handling. - Shared layouts and reusable components.

## UI

-   Tailwind CSS.
-   A small accessible component library or custom components.
-   React Hook Form only if form complexity warrants it.
-   Zod for input validation and typed schemas.

## Calculation layer

-   Pure TypeScript functions.
-   No API call required for ordinary calculations.
-   Centralized unit conversion helpers.
-   Formula versioning and unit tests.
-   Do not put formulas directly inside JSX components.

## Data storage

**No database required for v1.**

Use static configuration for: - Calculator metadata. - Units and
labels. - Default assumptions. - FAQ content. - Related calculator
references.

If saved projects are added later, begin with browser storage. Add a
backend only when accounts, cross-device sync or collaboration are
genuinely required.

## Hosting

-   Vercel for a straightforward Next.js deployment.
-   GitHub for source control.
-   A custom domain with HTTPS.
-   Preview deployment for pull requests.
-   Production and staging environments.

Other compatible hosting providers can be selected based on cost and
operational preference.

## Analytics and search

-   Google Search Console.
-   Google Analytics 4, subject to applicable consent and privacy
    requirements.
-   AdSense after the site has sufficient original value and meets
    current program policies.
-   Optional privacy-friendly product analytics.

Do not add analytics scripts before deciding how consent and privacy
notices will work for the intended audience.

------------------------------------------------------------------------

# 9. Suggested project structure

``` text
renovation-calc/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── calculators/
│   │   ├── page.tsx
│   │   ├── square-footage/page.tsx
│   │   ├── concrete-slab/page.tsx
│   │   ├── flooring/page.tsx
│   │   ├── paint/page.tsx
│   │   ├── fence-material/page.tsx
│   │   ├── deck-material/page.tsx
│   │   ├── roof-area-pitch/page.tsx
│   │   └── renovation-budget/page.tsx
│   ├── guides/
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── terms/page.tsx
│   ├── disclaimer/page.tsx
│   ├── cookie-policy/page.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/
│   ├── calculator/
│   ├── forms/
│   ├── results/
│   ├── content/
│   └── ads/
├── calculators/
│   ├── squareFootage.ts
│   ├── concreteSlab.ts
│   ├── flooring.ts
│   ├── paint.ts
│   ├── fence.ts
│   ├── deck.ts
│   ├── roof.ts
│   └── renovationBudget.ts
├── lib/
│   ├── units/
│   ├── validation/
│   ├── formatting/
│   ├── seo/
│   └── analytics/
├── content/
│   ├── calculators/
│   └── guides/
├── tests/
│   ├── unit/
│   └── e2e/
├── public/
│   ├── images/
│   └── icons/
├── package.json
└── README.md
```

------------------------------------------------------------------------

# 10. Core TypeScript design

## 10.1 Unit conversion helpers

Use one internal base unit per calculation. For area calculations,
convert dimensions to feet before calculating square feet.

Illustrative helper:

``` ts
export type LengthUnit = "ft" | "in" | "m" | "cm";

export function toFeet(value: number, unit: LengthUnit): number {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error("Dimension must be a positive number.");
  }

  switch (unit) {
    case "ft":
      return value;
    case "in":
      return value / 12;
    case "m":
      return value * 3.280839895;
    case "cm":
      return value / 30.48;
  }
}
```

Production implementation should use a consistent rounding and precision
policy. Do not round converted dimensions before the final display.

## 10.2 Example pure calculation function

``` ts
export interface ConcreteSlabInput {
  lengthFt: number;
  widthFt: number;
  thicknessIn: number;
  wastePercent: number;
}

export interface ConcreteSlabResult {
  volumeCubicFeet: number;
  volumeCubicYards: number;
  planningVolumeCubicYards: number;
}

export function calculateConcreteSlab(
  input: ConcreteSlabInput
): ConcreteSlabResult {
  const values = [
    input.lengthFt,
    input.widthFt,
    input.thicknessIn,
    input.wastePercent,
  ];

  if (!values.every(Number.isFinite)) {
    throw new Error("All inputs must be valid numbers.");
  }

  if (
    input.lengthFt <= 0 ||
    input.widthFt <= 0 ||
    input.thicknessIn <= 0 ||
    input.wastePercent < 0 ||
    input.wastePercent > 100
  ) {
    throw new Error("Check dimensions and waste percentage.");
  }

  const thicknessFt = input.thicknessIn / 12;
  const volumeCubicFeet =
    input.lengthFt * input.widthFt * thicknessFt;

  const volumeCubicYards = volumeCubicFeet / 27;
  const planningVolumeCubicYards =
    volumeCubicYards * (1 + input.wastePercent / 100);

  return {
    volumeCubicFeet,
    volumeCubicYards,
    planningVolumeCubicYards,
  };
}
```

This is a starter implementation for a rectangular slab, not a complete
construction estimator. Extend validation, tests and documentation
before release.

## 10.3 Calculation function requirements

Every calculation function must: - Be pure and deterministic. - Accept
typed inputs. - Reject invalid values. - Return unrounded numeric
values. - Avoid DOM and browser dependencies. - Have unit tests for
normal, boundary and invalid inputs. - Include a documented formula and
unit convention.

------------------------------------------------------------------------

# 11. SEO strategy

## 11.1 SEO principle

Do not assume a keyword is easy because a third-party difficulty score
is low. Search volume and difficulty figures are estimates and can
become stale.

Before building each calculator page: 1. Search the exact phrase in
Google US. 2. Review the first 10 organic results. 3. Identify the page
type ranking: tool, article, retailer, forum or video. 4. Test the
actual calculators. 5. Record missing functionality, confusing inputs,
mobile problems and content gaps. 6. Check related terms in a current
keyword tool. 7. Decide whether the intent is sufficiently distinct for
its own page.

## 11.2 Keyword map to validate

The following is an initial topic map, not a verified keyword-volume
report.

  -----------------------------------------------------------------------
  Page                    Primary phrase to       Supporting phrases
                          validate                
  ----------------------- ----------------------- -----------------------
  Square footage          square footage          area calculator, room
                          calculator              square footage

  Concrete slab           concrete slab           concrete volume
                          calculator              calculator, concrete
                                                  yard calculator

  Flooring                flooring calculator     flooring square
                                                  footage, flooring box
                                                  calculator

  Paint                   paint calculator        paint coverage
                                                  calculator, how much
                                                  paint do I need

  Fence                   fence calculator        fence material
                                                  calculator, fence post
                                                  calculator

  Deck                    deck calculator         deck material
                                                  calculator, decking
                                                  calculator

  Roofing                 roof pitch calculator   roof area calculator,
                                                  roof slope calculator

  Renovation budget       renovation cost         home renovation budget
                          calculator              calculator
  -----------------------------------------------------------------------

Do not publish search-volume claims on the site unless they are part of
a sourced research report. Keyword metrics belong in internal planning,
not user-facing calculator content.

## 11.3 Page content template

Each calculator page should contain original, specific information:

-   H1: Calculator name.
-   Short description of what it calculates.
-   Interactive calculator.
-   "How to use" instructions.
-   Formula explanation.
-   Worked example with units.
-   Assumptions and limitations.
-   Common mistakes.
-   Related calculators.
-   FAQs that answer real questions.

Avoid creating hundreds of near-identical pages by swapping the
calculator name in a template.

## 11.4 Technical SEO checklist

-   Unique title and meta description per indexable page.
-   One clear H1.
-   Canonical URL.
-   XML sitemap.
-   Robots.txt.
-   Descriptive internal links.
-   Descriptive image alt text.
-   Open Graph metadata.
-   Fast server-rendered page content.
-   No accidental `noindex` on production pages.
-   No duplicate query-parameter pages.
-   Correct 404 and redirect behavior.
-   Search Console verification.
-   Mobile usability checks.

## 11.5 Structured data

Use structured data only when it accurately describes visible page
content.

Potential types: - `WebApplication` for a genuine interactive web
calculator, if the properties are accurate. - `BreadcrumbList` for
visible breadcrumbs. - `Organization` for real organization details.

Do not add fake ratings, reviews, prices, author credentials or FAQ
markup merely to seek rich results. Structured data does not guarantee
enhanced search display.

## 11.6 Content plan

Publish useful guides only when they add real value:

  Guide                                         Supports
  --------------------------------------------- -----------------------------
  How to measure a room for flooring            Flooring and square footage
  How to calculate concrete volume              Concrete
  How to estimate paint coverage                Paint
  How to measure a fence line                   Fence
  How to estimate deck board quantities         Deck
  How roof pitch affects roof area              Roofing
  How to create a renovation materials budget   Budget

A guide must be reviewed for accuracy and should not invent code
requirements or product coverage values.

------------------------------------------------------------------------

# 12. Competitor research and validation process

Do not declare the niche "low competition" without a manual SERP review.

Create a spreadsheet with these columns:

``` text
Keyword
Country
Date checked
Estimated monthly searches
Keyword difficulty
Search intent
Ranking URL 1
Ranking URL 2
Ranking URL 3
Tool available?
Mobile experience
Signup required?
Ad clutter
Calculation explanation
Missing features
Opportunity score
Decision
```

## Competitor test checklist

For each top result: - Does the calculator work on mobile? - Are units
clear? - Does it support multiple rooms or shapes where needed? - Are
assumptions visible? - Does it show the formula? - Does it explain
exclusions? - Does it require registration? - Are ads intrusive? - Is
the result easy to copy or print? - Does the page load quickly? - Is the
content genuinely useful?

A competitor weakness is only an opportunity if users care about it and
you can deliver a better solution.

## Simple opportunity score

Score each dimension from 1 to 5:

  Dimension                       Weight
  ----------------------------- --------
  Search demand evidence             25%
  SERP weakness / opportunity        25%
  Build simplicity                   20%
  Related-tool expansion             15%
  Commercial relevance               15%

Calculate:

``` text
Opportunity score =
(Demand × 0.25) +
(SERP opportunity × 0.25) +
(Build simplicity × 0.20) +
(Expansion × 0.15) +
(Commercial relevance × 0.15)
```

This is an internal prioritization aid, not a scientific prediction of
ranking or revenue.

------------------------------------------------------------------------

# 13. AdSense and monetization plan

## 13.1 Monetization approach

Use display advertising as the initial revenue model, but do not design
the website around ad slots. The calculator must remain the primary
product.

Apply for AdSense only after: - The site has useful original content. -
Navigation works. - All published calculators work. - Privacy and legal
pages are in place. - The site complies with current AdSense program
policies. - The site has no copied, misleading or low-value pages.

Approval is not guaranteed.

## 13.2 Ad placement principles

Possible placements, subject to current AdSense policies and user
experience testing: - One responsive ad slot after the calculator result
or breakdown. - One in-content slot within a substantial guide. - One
additional slot lower on long-form content if it does not disrupt
reading.

Avoid: - Ads directly adjacent to buttons in a way that causes
accidental clicks. - Ads that look like calculator controls. - Ads
covering inputs or results. - Excessive ads above the calculator. -
Layout shifts caused by late-loading ad containers. - Encouraging users
to click ads.

Reserve space for ad containers to reduce layout shifts. Test the site
with ads disabled and enabled.

## 13.3 Revenue measurement

Track: - Page RPM. - Ad impressions. - Sessions by country. - Organic
landing pages. - Calculator completion rate. - Returning users. -
Revenue per session.

A basic planning formula:

``` text
Estimated revenue =
(Pageviews / 1,000) × Page RPM
```

Use actual Page RPM from the site's own AdSense reporting. Do not use
generic online RPM claims as a forecast.

## 13.4 Additional monetization later

Only after the free product has traction: - Affiliate links to relevant
materials, tools or supplies with clear disclosures. - Downloadable
project worksheets. - Printable estimates. - Contractor or supplier
partnerships, if legally and operationally appropriate.

Do not allow affiliate commissions to distort calculator results or
material recommendations.

------------------------------------------------------------------------

# 14. Privacy, legal and trust

This is a US-focused website. Have the privacy and consent setup
reviewed for the jurisdictions and advertising services actually used.

Required site pages: - Privacy Policy. - Terms of Use. - Disclaimer. -
Contact. - Cookie or consent information where applicable.

The privacy policy must accurately describe: - Analytics providers. -
Advertising providers and cookies. - Data collected automatically. - Any
form submissions. - Browser storage, if used. - Data retention and
contact process. - User rights and relevant choices.

Do not copy a generic privacy policy without adapting it to the actual
implementation. Do not claim that no data is collected if analytics or
ad scripts are active.

## Calculator disclaimer

Suggested starting wording, to be reviewed before publication:

> These calculators provide planning estimates based on the information
> you enter and the assumptions shown. Actual material quantities and
> project costs can vary due to site conditions, product specifications,
> installation methods, waste, local requirements and contractor
> practices. Verify measurements and product requirements before
> purchasing materials or beginning work. These tools are not structural
> engineering advice, construction plans, permit guidance or a
> substitute for qualified professional advice.

------------------------------------------------------------------------

# 15. Security and reliability

Although v1 is mostly client-side, implement basic security and
operational controls:

-   Validate all user inputs on the client.
-   Do not use `eval` or dynamically execute user input.
-   Escape any user-provided text rendered into the page.
-   Avoid unnecessary third-party scripts.
-   Keep dependencies updated.
-   Use HTTPS.
-   Configure secure response headers.
-   Avoid collecting personal data without a real need.
-   Do not store sensitive project information on a server in v1.
-   Add error monitoring without capturing unnecessary input values.
-   Keep secrets out of client-side environment variables.
-   Use dependency scanning and lockfiles.
-   Protect contact forms from spam if a backend is added.

If CSV export is implemented, protect against spreadsheet formula
injection by safely handling cells beginning with characters such as
`=`, `+`, `-` or `@`.

------------------------------------------------------------------------

# 16. Performance requirements

Targets: - Fast initial rendering on mobile. - Calculator usable without
waiting for ad scripts. - Minimal client-side JavaScript. - Optimized
images. - Font loading that avoids unnecessary blocking. - No large
animation libraries for simple forms. - Stable reserved ad space. -
Static generation for stable informational pages.

Monitor Core Web Vitals: - LCP. - INP. - CLS.

Treat these as ongoing quality measurements, not a one-time launch
checkbox.

------------------------------------------------------------------------

# 17. Testing strategy

## 17.1 Unit tests

Test every pure calculation function with: - A normal example. - Minimum
valid values. - Decimal dimensions. - Mixed units. - Large values. -
Zero and negative values. - Invalid numeric values. - Waste allowance
boundaries. - Rounding and purchase-unit behavior.

## 17.2 Reference test cases

Examples for automated tests:

### Concrete slab

Input: - Length: 10 ft - Width: 10 ft - Thickness: 4 in - Waste: 0%

Expected: - Volume: 33.333... cubic feet. - Volume: 1.234567... cubic
yards.

### Flooring

Input: - Room: 10 ft × 12 ft - Waste: 10% - Box coverage: 20 sq ft

Expected: - Net area: 120 sq ft. - Purchase area: 132 sq ft. - Boxes: 7.

### Roof pitch

Input: - Pitch: 6/12 - Horizontal plan area: 1,000 sq ft

Expected: - Slope factor: approximately 1.118034. - Sloped area:
approximately 1,118.03 sq ft.

These are arithmetic test fixtures, not construction recommendations.

## 17.3 End-to-end tests

Use Playwright or an equivalent browser testing framework to verify: -
Calculator page loads. - Inputs accept valid values. - Invalid values
show helpful errors. - Results update correctly. - Unit switching
preserves the intended physical dimensions. - Reset works. - Print
layout works. - Navigation and related links work. - Mobile viewport has
no horizontal overflow. - Keyboard-only interaction is possible.

## 17.4 Release gates

Do not publish a calculator until: - Formula reviewed. - Unit
conversions reviewed. - Unit tests pass. - Mobile test passes. -
Accessibility basics checked. - Assumptions and limitations visible. -
SEO metadata present. - No console errors. - Result values manually
cross-checked.

------------------------------------------------------------------------

# 18. Analytics event plan

Use privacy-conscious event names and avoid sending personal or
sensitive input values.

Suggested events:

  ------------------------------------------------------------------------
  Event                    Trigger                 Parameters
  ------------------------ ----------------------- -----------------------
  `calculator_view`        Calculator page opened  calculator_id

  `calculation_complete`   Valid calculation       calculator_id
                           completed               

  `calculation_error`      Validation or           calculator_id,
                           calculation error       error_type

  `result_copy`            Copy result clicked     calculator_id

  `result_print`           Print clicked           calculator_id

  `calculator_reset`       Reset clicked           calculator_id

  `related_tool_click`     Related calculator      source_id,
                           clicked                 destination_id
  ------------------------------------------------------------------------

Do not send exact room dimensions, home addresses, project descriptions
or other potentially personal data to analytics.

------------------------------------------------------------------------

# 19. Deployment checklist

## Before deployment

-   Production environment variables configured.
-   Domain and DNS configured.
-   HTTPS active.
-   Production build passes.
-   All calculators tested.
-   404 page configured.
-   Metadata and canonical URLs checked.
-   Sitemap and robots.txt checked.
-   Privacy and disclaimer pages published.
-   Contact method tested.
-   Analytics configured appropriately.
-   No test or placeholder content left on public pages.

## After deployment

-   Verify domain in Search Console.
-   Submit sitemap.
-   Check indexing and canonical selection.
-   Test pages on mobile and desktop.
-   Verify analytics events.
-   Check browser console and server logs.
-   Monitor uptime and broken links.
-   Review Search Console queries weekly.
-   Review calculator feedback and errors.

------------------------------------------------------------------------

# 20. Development roadmap

## Phase 1 --- Foundation

-   Create Next.js + TypeScript project.
-   Configure design tokens and shared layout.
-   Implement unit conversion helpers.
-   Implement validation and formatting.
-   Build calculator page template.
-   Add metadata, sitemap and robots handling.

## Phase 2 --- First calculators

Recommended order: 1. Square Footage. 2. Concrete Slab. 3. Flooring. 4.
Paint. 5. Fence Material.

Build each calculation as a pure function before connecting it to the
UI.

## Phase 3 --- Quality and launch

-   Add formula explanations and worked examples.
-   Add related calculator links.
-   Add disclaimer, privacy, terms and contact pages.
-   Complete unit and end-to-end tests.
-   Run mobile and accessibility checks.
-   Deploy production site.
-   Set up Search Console and analytics.

## Phase 4 --- Expansion

Add: - Deck Material. - Roof Area & Pitch. - Renovation Budget. -
Supporting guides. - Additional calculators only after search demand and
user feedback justify them.

## Suggested timeline

For one developer: - Foundation: 1--2 days. - First five calculators:
3--5 days, depending on UI polish and test coverage. - Content, QA and
launch: 2--4 days.

A genuinely production-ready site may take longer. Do not trade formula
verification, accessibility or content quality for an arbitrary launch
date.

------------------------------------------------------------------------

# 21. Future expansion backlog

Potential additions, subject to keyword and competitor validation:

## Roofing

-   Roof shingle estimator.
-   Roof square calculator.
-   Roof slope converter.
-   Gutter length estimator.

## Concrete

-   Concrete footing volume.
-   Concrete driveway.
-   Concrete steps.
-   Concrete block estimator.

## Flooring

-   Tile quantity calculator.
-   Grout estimator.
-   Hardwood flooring estimator.
-   Carpet area calculator.

## Painting

-   Exterior paint estimator.
-   Ceiling paint calculator.
-   Wallpaper calculator.

## Decking

-   Deck board spacing.
-   Deck stair planning helper (non-structural only).
-   Deck surface area.
-   Deck material cost planner.

## Fencing

-   Fence post spacing.
-   Fence picket calculator.
-   Fence panel calculator.
-   Fence cost planner.

Do not build a calculator just because it is easy. Validate a distinct
user need and search intent first.

------------------------------------------------------------------------

# 22. Risks and mitigations

  -----------------------------------------------------------------------
  Risk                    Impact                  Mitigation
  ----------------------- ----------------------- -----------------------
  Incorrect formula       High trust and safety   Independent formula
                          impact                  review and test
                                                  fixtures

  Ambiguous units         Incorrect results       Explicit units and
                                                  centralized conversion

  Overconfident estimates User may over-purchase  Explain assumptions and
                          or under-purchase       uncertainty

  Weak SEO demand         Low organic traffic     Validate SERPs and
                                                  keywords before
                                                  expanding

  Strong competitors      Slow ranking growth     Improve task completion
                                                  and content quality

  Low ad revenue          Weak business economics Measure actual RPM;
                                                  diversify later

  Ad clutter              Lower trust and         Limit placements and
                          engagement              test UX

  Stale material pricing  Misleading costs        Use user-entered prices
                                                  or clearly dated
                                                  sourced data

  Local code differences  Unsafe assumptions      Avoid code advice and
                                                  structural
                                                  recommendations

  Thin content at scale   Search quality risk     Publish fewer, more
                                                  useful pages
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 23. Launch acceptance criteria

The initial release is ready only when all of the following are true:

-   [ ] Homepage clearly explains the website.
-   [ ] At least five complete calculators are live.
-   [ ] Each calculator has its own stable URL.
-   [ ] Every formula has documented units and assumptions.
-   [ ] Every calculation function has automated tests.
-   [ ] Results are manually checked against independent arithmetic.
-   [ ] Invalid inputs produce clear errors.
-   [ ] Mobile layouts work without horizontal scrolling.
-   [ ] Keyboard navigation works for core tasks.
-   [ ] Print output is readable.
-   [ ] Related links work.
-   [ ] Unique titles and descriptions are present.
-   [ ] Sitemap and robots.txt are valid.
-   [ ] Canonical URLs are correct.
-   [ ] Privacy, terms and disclaimer pages reflect the actual
    implementation.
-   [ ] No fake testimonials, reviews or prices are present.
-   [ ] No placeholder content remains.
-   [ ] Production analytics are tested.
-   [ ] Search Console is configured.
-   [ ] Ad placements do not obstruct calculator controls.
-   [ ] Formula and construction disclaimers are visible.

------------------------------------------------------------------------

# 24. Final product recommendation

Build **Home Renovation Calculator Hub** as a focused, trustworthy
collection of quantity and planning calculators.

The strongest v1 is not a giant directory. It is a small set of
well-tested tools with consistent units, clear results and honest
assumptions.

Recommended launch set: 1. Square Footage Calculator. 2. Concrete Slab
Calculator. 3. Flooring Calculator. 4. Paint Calculator. 5. Fence
Material Calculator.

Then add Deck Material and Roof Area & Pitch after the core calculation
framework is stable.

**Business principle:** Organic traffic is not guaranteed by publishing
calculator pages. Validate the US search results, improve the actual
user experience, measure real usage, and expand only where demand is
demonstrated.

------------------------------------------------------------------------

# Appendix A --- Decisions to finalize before coding

These are implementation decisions that the project owner should
confirm:

  Decision                Recommended default
  ----------------------- -----------------------------------------------
  Product name            Temporary name until domain/trademark check
  Primary market          United States
  Default unit system     US customary
  Secondary unit system   Metric
  Framework               Next.js + TypeScript
  Styling                 Tailwind CSS
  Hosting                 Vercel or compatible platform
  Database                None for v1
  Authentication          None for v1
  Calculation execution   Browser-side
  Pricing data            User-entered
  Monetization            AdSense after policy and quality review
  Analytics               Search Console + privacy-configured analytics
  First launch tools      Five P0 calculators
  Project storage         None initially

# Appendix B --- Source and validation policy

This specification defines product scope and implementation logic. It
does not certify current keyword volumes, competitor difficulty,
material prices, product coverage, building codes or AdSense approval.

Before launch, independently validate: - Current US search demand and
search intent. - Current Google search results and competing tools. -
All formulas with a qualified reviewer. - Material coverage and
packaging against manufacturer information. - Local legal, privacy,
cookie and advertising obligations. - Current AdSense policies and
eligibility requirements.

Record the source, date checked and assumptions for any externally
sourced fact used in the live product.
