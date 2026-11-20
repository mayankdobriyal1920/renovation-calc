import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Calculators",
  description: "Browse all home renovation calculators: square footage, concrete, flooring, paint, fencing and more.",
  alternates: { canonical: "/calculators/" },
};

const GROUPS: { title: string; items: { href: string; label: string; icon: string; live: boolean }[] }[] = [
  {
    title: "General",
    items: [
      { href: "/calculators/square-footage/", label: "Square Footage Calculator", icon: "📐", live: true },
      { href: "/calculators/renovation-budget/", label: "Renovation Budget Calculator", icon: "💰", live: true },
    ],
  },
  {
    title: "Concrete",
    items: [{ href: "/calculators/concrete-slab/", label: "Concrete Slab Calculator", icon: "🧱", live: true }],
  },
  {
    title: "Flooring",
    items: [{ href: "/calculators/flooring/", label: "Flooring Calculator", icon: "🪵", live: true }],
  },
  {
    title: "Painting",
    items: [{ href: "/calculators/paint/", label: "Paint Calculator", icon: "🎨", live: true }],
  },
  {
    title: "Fencing",
    items: [{ href: "/calculators/fence-material/", label: "Fence Material Calculator", icon: "🪜", live: true }],
  },
  {
    title: "Decking",
    items: [{ href: "/calculators/deck-material/", label: "Deck Material Calculator", icon: "🏡", live: true }],
  },
  {
    title: "Roofing",
    items: [{ href: "/calculators/roof-area-pitch/", label: "Roof Area & Pitch Calculator", icon: "🏠", live: true }],
  },
];

export default function CalculatorsIndex() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Calculators" }]} />
      <h1 className="mt-6 text-3xl font-bold text-white">Calculators</h1>
      <p className="mt-2 max-w-2xl text-white/70">
        Practical quantity and planning calculators for home-improvement projects, grouped by trade.
      </p>

      <div className="mt-10 space-y-10">
        {GROUPS.map((g) => (
          <section key={g.title}>
            <h2 className="text-xl font-semibold text-white tracking-tight">{g.title}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {g.items.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="glass-card group rounded-2xl p-5 sm:p-6 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 shrink-0">
                      <span className="text-xl">{c.icon}</span>
                    </div>
                    <span className="font-medium text-white group-hover:text-orange-300">
                      {c.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
