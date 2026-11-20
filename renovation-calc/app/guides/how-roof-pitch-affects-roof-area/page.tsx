import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Roof Pitch Affects Roof Area",
  description: "How roof pitch changes the surface area of a roof.",
};

export default function Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides/" }, { label: "How Roof Pitch Affects Roof Area" }]} />
      <article className="mt-6 glass-card rounded-3xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-white">How Roof Pitch Affects Roof Area</h1>
        <p className="mt-4 text-white/70">
          A pitched roof has more surface area than its horizontal footprint. The steeper the pitch,
          the larger the multiplier.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-white">Slope factor</h2>
        <div className="mt-2 rounded-xl bg-white/5 p-4 font-mono text-sm text-white/80">
          Slope factor = √(1 + (rise/12)²)
        </div>
        <p className="mt-2 text-white/70">
          For a 6/12 roof the factor is about 1.118, so a 1,000 sq ft footprint becomes ~1,118 sq ft
          of roof surface.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-white">Multiple planes</h2>
        <p className="mt-2 text-white/70">
          Complex roofs have multiple planes with different pitches. Calculate each plane separately
          and sum the areas.
        </p>
        <p className="mt-6 text-white/70">
          Use the{" "}
          <Link href="/calculators/roof-area-pitch/" className="text-orange-300 underline">
            Roof Area &amp; Pitch Calculator
          </Link>
          . Not a substitute for on-site measurement.
        </p>
      </article>
    </div>
  );
}
