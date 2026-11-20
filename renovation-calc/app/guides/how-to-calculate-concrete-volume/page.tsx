import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Calculate Concrete Volume",
  description: "Step-by-step guide to calculating concrete volume for a slab, with formulas and examples.",
};

export default function Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides/" }, { label: "How to Calculate Concrete Volume" }]} />
      <article className="mt-6 glass-card rounded-3xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-white">How to Calculate Concrete Volume</h1>
        <p className="mt-4 text-white/70">
          Concrete is ordered by volume. For a rectangular slab, the volume is length × width ×
          thickness. The trick is keeping units consistent.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-white">Step 1: Measure the slab</h2>
        <p className="mt-2 text-white/70">
          Measure length and width in feet. Measure thickness in inches (common residential slabs
          are 4 inches).
        </p>

        <h2 className="mt-6 text-xl font-semibold text-white">Step 2: Convert thickness to feet</h2>
        <div className="mt-2 rounded-xl bg-white/5 p-4 font-mono text-sm text-white/80">
          Thickness (ft) = Thickness (in) / 12
        </div>

        <h2 className="mt-6 text-xl font-semibold text-white">Step 3: Calculate volume</h2>
        <div className="mt-2 rounded-xl bg-white/5 p-4 font-mono text-sm text-white/80">
          Volume (ft³) = Length (ft) × Width (ft) × Thickness (ft)
          <br />
          Volume (yd³) = Volume (ft³) / 27
        </div>

        <h2 className="mt-6 text-xl font-semibold text-white">Step 4: Add a waste allowance</h2>
        <p className="mt-2 text-white/70">
          Real pours waste concrete on edges, in the truck chute and during finishing. A 5–10%
          allowance is common. Multiply the geometric volume by (1 + waste%).
        </p>

        <h2 className="mt-6 text-xl font-semibold text-white">Worked example</h2>
        <p className="mt-2 text-white/70">A 10 ft × 10 ft slab, 4 in thick, 10% waste:</p>
        <div className="mt-2 rounded-xl bg-white/5 p-4 font-mono text-sm text-white/80">
          Volume = 10 × 10 × (4/12) = 33.33 ft³ = 1.23 yd³
          <br />
          Planning = 1.23 × 1.10 = 1.36 yd³
        </div>

        <h2 className="mt-6 text-xl font-semibold text-white">What this does not include</h2>
        <ul className="mt-2 list-disc pl-5 text-white/70 space-y-1">
          <li>Delivery minimums and short-load fees.</li>
          <li>Reinforcement (rebar, mesh).</li>
          <li>Sub-base and site preparation.</li>
          <li>Contractor labor.</li>
        </ul>

        <p className="mt-6 text-white/70">
          Use the{" "}
          <Link href="/calculators/concrete-slab/" className="text-orange-300 underline">
            Concrete Slab Calculator
          </Link>{" "}
          to run the numbers for your project.
        </p>
      </article>
    </div>
  );
}
