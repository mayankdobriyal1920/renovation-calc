import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Estimate Paint Coverage",
  description: "Tips for estimating paint coverage and quantity.",
};

export default function Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides/" }, { label: "How to Estimate Paint Coverage" }]} />
      <article className="mt-6 glass-card rounded-3xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-white">How to Estimate Paint Coverage</h1>
        <p className="mt-4 text-white/70">
          Paint coverage varies by product, surface porosity, color change and application method.
          The label on the can is a starting point, not a guarantee.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-white">Measure the area</h2>
        <p className="mt-2 text-white/70">
          Multiply wall length by height for each wall. Add ceiling area if painting it. Subtract
          openings (doors, windows) if you want net paintable area.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-white">Account for coats</h2>
        <p className="mt-2 text-white/70">
          Multiply net area by number of coats. A color change often needs a primer coat plus two
          finish coats.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-white">Divide by coverage</h2>
        <p className="mt-2 text-white/70">
          Coverage per gallon is printed on the product. Divide required area by coverage to get
          gallons. Round up to whole gallons.
        </p>
        <p className="mt-6 text-white/70">
          Use the{" "}
          <Link href="/calculators/paint/" className="text-orange-300 underline">
            Paint Calculator
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
