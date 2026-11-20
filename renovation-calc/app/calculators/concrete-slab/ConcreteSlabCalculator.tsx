"use client";

import { useState, useEffect } from "react";
import CalculatorCard, { ResultPanel, BreakdownTable } from "@/components/calculator/CalculatorCard";
import AdSlot from "@/components/ads/AdSlot";
import { track } from "@/lib/analytics";
import InputGroup, { GlassInput } from "@/components/calculator/InputGroup";
import AssumptionNotice from "@/components/calculator/AssumptionNotice";
import CalculatorPageTemplate from "@/components/calculator/CalculatorPageTemplate";
import { calculateConcreteSlab } from "../../../calculators/concreteSlab";

export default function ConcreteSlabCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [thickness, setThickness] = useState("");
  const [waste, setWaste] = useState("10");
  const [price, setPrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof calculateConcreteSlab> | null>(null);

  useEffect(() => {
    track("calculator_view", { calculator_id: "concrete-slab" });
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const r = calculateConcreteSlab({
        lengthFt: Number(length),
        widthFt: Number(width),
        thicknessIn: Number(thickness),
        wastePercent: Number(waste),
        pricePerCubicYard: price ? Number(price) : undefined,
      });
      setResult(r);
      track("calculation_complete", { calculator_id: "concrete-slab" });
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Calculation failed.");
      track("calculation_error", { calculator_id: "concrete-slab", error_type: "validation" });
    }
  }

  function onReset() {
    setLength("");
    setWidth("");
    setThickness("");
    setWaste("10");
    setPrice("");
    setError(null);
    setResult(null);
  }

  return (
    <CalculatorPageTemplate
      title="Concrete Slab Calculator"
      description="Estimate concrete volume for a rectangular slab."
      assumptions={
        <ul className="list-disc space-y-1 pl-5">
          <li>Rectangular slab only. Irregular shapes must be split into rectangles and summed.</li>
          <li>Thickness is uniform across the slab.</li>
          <li>The calculator does not recommend a structural thickness or reinforcement.</li>
          <li>Delivery minimums, short-load fees, reinforcement, sub-base and site conditions are excluded.</li>
          <li>Cost uses user-entered pricing, not market data.</li>
        </ul>
      }
      howTo={[
        "Measure the length and width of the slab in feet.",
        "Enter the thickness in inches.",
        "Adjust the waste allowance if needed (default 10%).",
        "Optionally enter a price per cubic yard to estimate material cost.",
        "Review the geometric vs. planning quantity breakdown.",
      ]}
      example={
        <div>
          <p>A 10 ft × 10 ft slab, 4 in thick, with 10% waste:</p>
          <div className="mt-3 rounded-xl bg-white/5 p-4 font-mono text-sm text-white/80">
            Volume = 10 × 10 × (4/12) = 33.33 ft³ = 1.23 yd³
            <br />
            Planning = 1.23 × 1.10 = 1.36 yd³
          </div>
        </div>
      }
      related={[
        { href: "/calculators/square-footage/", label: "Square Footage Calculator" },
        { href: "/calculators/flooring/", label: "Flooring Calculator" },
        { href: "/calculators/renovation-budget/", label: "Renovation Budget Calculator" },
      ]}
      faqs={[
        {
          q: "How much concrete do I need for a 10x10 slab 4 inches thick?",
          a: "About 1.23 cubic yards geometrically, or ~1.36 cubic yards with a 10% waste allowance.",
        },
        {
          q: "Does this include delivery fees?",
          a: "No. Delivery minimums and short-load fees vary by supplier and are excluded.",
        },
        {
          q: "Can I change the waste percentage?",
          a: "Yes — the waste allowance is fully editable. Any default is a planning assumption, not a rule.",
        },
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <CalculatorCard>
          <h1 className="text-3xl font-bold text-white">Concrete Slab Calculator</h1>
          <p className="mt-2 text-white/70">
            Estimate concrete volume for a rectangular slab. Enter dimensions in feet and thickness in
            inches.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            <InputGroup label="Length" unit="feet">
              <GlassInput
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                placeholder="e.g. 10"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </InputGroup>

            <InputGroup label="Width" unit="feet">
              <GlassInput
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                placeholder="e.g. 10"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </InputGroup>

            <InputGroup label="Thickness" unit="inches" hint="Common residential slabs are 4 in.">
              <GlassInput
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                placeholder="e.g. 4"
                value={thickness}
                onChange={(e) => setThickness(e.target.value)}
              />
            </InputGroup>

            <InputGroup label="Waste allowance" unit="%" hint="Editable planning allowance.">
              <GlassInput
                type="number"
                inputMode="decimal"
                min="0"
                max="100"
                step="any"
                value={waste}
                onChange={(e) => setWaste(e.target.value)}
              />
            </InputGroup>

            <InputGroup label="Price per cubic yard" unit="USD (optional)" hint="User-entered only.">
              <GlassInput
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                placeholder="e.g. 150"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </InputGroup>

            {error && (
              <div className="rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
              >
                Calculate
              </button>
              <button
                type="button"
                onClick={onReset}
                className="glass rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Reset
              </button>
            </div>
          </form>
        </CalculatorCard>

        <div className="space-y-4">
          {result ? (
            <ResultPanel>
              <h2 className="text-xl font-semibold text-white/80">Estimated concrete required</h2>
              <div className="mt-2 text-4xl font-bold text-white">
                {result.planningVolumeCubicYards.toFixed(2)}
                <span className="ml-2 text-lg font-medium text-white/70">cubic yards</span>
              </div>
              <BreakdownTable
                rows={[
                  { label: "Geometric volume", value: `${result.volumeCubicFeet.toFixed(2)} ft³` },
                  { label: "Geometric volume", value: `${result.volumeCubicYards.toFixed(4)} yd³` },
                  { label: "Waste allowance", value: `${waste}%` },
                  { label: "Planning quantity", value: `${result.planningVolumeCubicYards.toFixed(4)} yd³` },
                  ...(result.estimatedCost !== undefined
                    ? [{ label: "Estimated cost (user price)", value: `$${result.estimatedCost.toFixed(2)}` }]
                    : []),
                ]}
              />
              <AssumptionNotice>
                Planning estimate for a rectangular slab. Excludes delivery fees, reinforcement, base
                preparation and contractor labor. Cost uses user-entered pricing.
              </AssumptionNotice>
            </ResultPanel>
          ) : (
            <ResultPanel>
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center text-white/60">
                <span className="text-5xl">🧱</span>
                <p className="mt-3 text-sm">Enter dimensions and click Calculate to see your result.</p>
              </div>
            </ResultPanel>
          )}
          {result && (
            <AdSlot className="mt-4" testId="ad-after-result" />
          )}
        </div>
      </div>
    </CalculatorPageTemplate>
  );
}
