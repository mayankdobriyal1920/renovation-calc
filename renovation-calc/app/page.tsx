import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Straightforward home-improvement calculators for square footage, concrete, flooring, paint, fencing and more. Free, no sign-up.",
  alternates: { canonical: "/" },
};

const CALCULATORS = [
  {
    href: "/calculators/square-footage/",
    label: "Square Footage Calculator",
    desc: "Area of rooms, walls and irregular spaces in ft², yd² or m².",
    icon: "📐",
    status: "live",
  },
  {
    href: "/calculators/concrete-slab/",
    label: "Concrete Slab Calculator",
    desc: "Volume in cubic feet and cubic yards with editable waste allowance.",
    icon: "🧱",
    status: "live",
  },
  {
    href: "/calculators/flooring/",
    label: "Flooring Calculator",
    desc: "Net area, purchase area and number of boxes needed.",
    icon: "🪵",
    status: "live",
  },
  {
    href: "/calculators/paint/",
    label: "Paint Calculator",
    desc: "Gallons of paint and primer for walls and ceilings.",
    icon: "🎨",
    status: "live",
  },
  {
    href: "/calculators/fence-material/",
    label: "Fence Material Calculator",
    desc: "Posts, rails and pickets for a straight fence run.",
    icon: "🪜",
    status: "live",
  },
  {
    href: "/calculators/deck-material/",
    label: "Deck Material Calculator",
    desc: "Decking boards and joist counts for rectangular decks.",
    icon: "🏡",
    status: "live",
  },
  {
    href: "/calculators/roof-area-pitch/",
    label: "Roof Area & Pitch Calculator",
    desc: "Slope factor and sloped roof surface area.",
    icon: "🏠",
    status: "live",
  },
  {
    href: "/calculators/renovation-budget/",
    label: "Renovation Budget Calculator",
    desc: "Organize materials, labor and costs into a planning budget.",
    icon: "💰",
    status: "live",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl glass-strong px-6 py-12 sm:px-12 sm:py-16">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Free · No sign-up · US units by default
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Plan your renovation
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              {" "}with confidence
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            Straightforward home-improvement calculators that help you estimate project quantities
            and plan material purchases — with clear units, transparent formulas and honest
            assumptions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/calculators/concrete-slab/"
              className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Try the Concrete Slab Calculator
            </Link>
            <Link
              href="/calculators/"
              className="glass rounded-xl px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              Browse all calculators
            </Link>
          </div>
        </div>
      </section>

      {/* Stats / trust strip */}
      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          { k: "8", v: "Focused calculators" },
          { k: "0", v: "Sign-ups required" },
          { k: "100%", v: "Client-side math" },
        ].map((s) => (
          <div key={s.v} className="glass rounded-2xl px-5 py-4 text-center">
            <div className="text-2xl font-bold text-white">{s.k}</div>
            <div className="text-xs text-white/60">{s.v}</div>
          </div>
        ))}
      </section>

      {/* Calculator grid */}
      <section className="mt-12">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-white">Calculators</h2>
          <Link href="/calculators/" className="text-sm text-orange-300 hover:text-orange-200">
            View all →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CALCULATORS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="glass-card group rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl">{c.icon}</span>
                {c.status === "live" ? (
                  <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-xs font-medium text-emerald-300">
                    Live
                  </span>
                ) : (
                  <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-xs font-medium text-emerald-300">
                    Now
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white group-hover:text-orange-300">
                {c.label}
              </h3>
              <p className="mt-1 text-sm text-white/70">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why section */}
      <section className="mt-16 glass rounded-3xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold text-white">Why Home Calculator Hub</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: "Transparent formulas",
              d: "Every result shows the calculation breakdown so you can verify the math.",
            },
            {
              t: "Editable assumptions",
              d: "Waste allowances and coverage values are yours to set — never locked in.",
            },
            {
              t: "US units by default",
              d: "Feet, inches and yards out of the box, with metric support available.",
            },
            {
              t: "No account needed",
              d: "Use every calculator instantly. Your data stays in your browser.",
            },
            {
              t: "Mobile-first",
              d: "Large touch targets and results right where you need them.",
            },
            {
              t: "Honest caveats",
              d: "We explain what's excluded so you don't over-trust an estimate.",
            },
          ].map((f) => (
            <div key={f.t}>
              <h3 className="font-semibold text-white">{f.t}</h3>
              <p className="mt-1 text-sm text-white/70">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mt-10 text-center text-xs text-white/50">
        Calculators provide planning estimates. Verify measurements and product requirements before
        purchasing materials or beginning work.
      </section>
    </>
  );
}
