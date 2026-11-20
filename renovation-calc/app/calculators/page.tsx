import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Calculators",
  description: "Browse all home renovation calculators: square footage, concrete, flooring, paint, fencing and more.",
  alternates: { canonical: "/calculators/" },
};

const LIST = [
  { href: "/calculators/square-footage/", label: "Square Footage Calculator", icon: "📐", live: false },
  { href: "/calculators/concrete-slab/", label: "Concrete Slab Calculator", icon: "🧱", live: true },
  { href: "/calculators/flooring/", label: "Flooring Calculator", icon: "🪵", live: false },
  { href: "/calculators/paint/", label: "Paint Calculator", icon: "🎨", live: false },
  { href: "/calculators/fence-material/", label: "Fence Material Calculator", icon: "🪜", live: false },
  { href: "/calculators/deck-material/", label: "Deck Material Calculator", icon: "🏡", live: false },
  { href: "/calculators/roof-area-pitch/", label: "Roof Area & Pitch Calculator", icon: "🏠", live: false },
  { href: "/calculators/renovation-budget/", label: "Renovation Budget Calculator", icon: "💰", live: false },
];

export default function CalculatorsIndex() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Calculators" }]} />
      <h1 className="mt-6 text-3xl font-bold text-white">Calculators</h1>
      <p className="mt-2 text-white/70">
        Practical quantity and planning calculators for home-improvement projects.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LIST.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="glass-card group rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl">{c.icon}</span>
              {c.live ? (
                <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-xs font-medium text-emerald-300">
                  Live
                </span>
              ) : (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-medium text-white/50">
                  Soon
                </span>
              )}
            </div>
            <h2 className="mt-3 text-lg font-semibold text-white group-hover:text-orange-300">{c.label}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
