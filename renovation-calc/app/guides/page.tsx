import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guides",
  description: "Practical guides for measuring and estimating home renovation projects.",
};

const GUIDES = [
  { href: "/calculators/square-footage/", label: "How to measure a room for flooring", tool: "Square Footage" },
  { href: "/calculators/concrete-slab/", label: "How to calculate concrete volume", tool: "Concrete Slab" },
  { href: "/calculators/paint/", label: "How to estimate paint coverage", tool: "Paint" },
  { href: "/calculators/fence-material/", label: "How to measure a fence line", tool: "Fence Material" },
  { href: "/calculators/deck-material/", label: "How to estimate deck board quantities", tool: "Deck Material" },
  { href: "/calculators/roof-area-pitch/", label: "How roof pitch affects roof area", tool: "Roof Area & Pitch" },
  { href: "/calculators/renovation-budget/", label: "How to create a renovation materials budget", tool: "Renovation Budget" },
];

export default function Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Guides" }]} />
      <div className="mt-6 glass-card rounded-3xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-white">Guides</h1>
        <p className="mt-3 text-white/70">
          Practical guidance that supports each calculator. Full articles are in progress; the
          calculators below are available now.
        </p>
        <ul className="mt-6 space-y-3">
          {GUIDES.map((g) => (
            <li key={g.href}>
              <Link href={g.href} className="glass flex items-center justify-between rounded-xl px-4 py-3 text-white/90 transition hover:bg-white/15">
                <span>{g.label}</span>
                <span className="text-xs text-white/50">{g.tool} →</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
