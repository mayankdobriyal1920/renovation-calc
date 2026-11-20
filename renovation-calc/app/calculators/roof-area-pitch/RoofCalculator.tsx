"use client";

import { useState } from "react";
import CalculatorCard, { ResultPanel, BreakdownTable } from "@/components/calculator/CalculatorCard";
import InputGroup, { GlassInput } from "@/components/calculator/InputGroup";
import CalculatorPageTemplate from "@/components/calculator/CalculatorPageTemplate";
import { calculateRoof } from "../../../calculators/roof";

interface PlaneRow {
  id: number;
  length: string;
  width: string;
  pitch: string;
}
let nextId = 1;
function newRow(): PlaneRow {
  return { id: nextId++, length: "", width: "", pitch: "6" };
}

export default function RoofCalculator() {
  const [planes, setPlanes] = useState<PlaneRow[]>([newRow()]);
  const [waste, setWaste] = useState("10");
  const [coverage, setCoverage] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof calculateRoof> | null>(null);

  function update(id: number, patch: Partial<PlaneRow>) {
    setPlanes((ps) => ps.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }
  function remove(id: number) {
    setPlanes((ps) => (ps.length > 1 ? ps.filter((p) => p.id !== id) : ps));
  }
  function add() {
    setPlanes((ps) => [...ps, newRow()]);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const r = calculateRoof({
        planes: planes.map((p) => ({
          lengthFt: Number(p.length),
          widthFt: Number(p.width),
          pitchRisePer12: Number(p.pitch),
        })),
        wastePercent: Number(waste),
        coveragePerUnitSqFt: coverage ? Number(coverage) : undefined,
        pricePerUnit: price ? Number(price) : undefined,
      });
      setResult(r);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Calculation failed.");
    }
  }

  function onReset() {
    setPlanes([newRow()]);
    setWaste("10");
    setCoverage("");
    setPrice("");
    setError(null);
    setResult(null);
  }

  return (
    <CalculatorPageTemplate
      title="Roof Area & Pitch Calculator"
      description="Calculate roof slope factor and estimate roof surface area from a known horizontal plan area."
      assumptions={
        <ul className="list-disc space-y-1 pl-5">
          <li>Simple rectangular footprint per plane; complex roofs need separate plane measurements.</li>
          <li>Pitch expressed as rise per 12 inches of run.</li>
          <li>Overhangs must be measured and included by the user.</li>
          <li>Not a structural roof design and not a substitute for on-site measurement.</li>
        </ul>
      }
      howTo={[
        "Add one or more roof planes (length × width horizontal footprint).",
        "Enter the pitch as rise per 12 (e.g. 6 for 6/12).",
        "Adjust waste allowance.",
        "Optionally enter coverage per unit and price for a material estimate.",
      ]}
      example={
        <div>
          <p>Pitch 6/12, horizontal area 1,000 sq ft:</p>
          <div className="mt-3 rounded-xl bg-white/5 p-4 font-mono text-sm text-white/80">
            Slope factor = √(1 + (6/12)²) ≈ 1.118034 · Sloped area ≈ 1,118.03 ft²
          </div>
        </div>
      }
      related={[
        { href: "/calculators/square-footage/", label: "Square Footage Calculator" },
        { href: "/calculators/renovation-budget/", label: "Renovation Budget Calculator" },
      ]}
      faqs={[
        {
          q: "Is a rectangular footprint enough?",
          a: "No for complex roofs. Hips, valleys, dormers and multiple levels need separate plane measurements.",
        },
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <CalculatorCard>
          <h1 className="text-3xl font-bold text-white">Roof Area &amp; Pitch Calculator</h1>
          <p className="mt-2 text-white/70">Calculate roof slope factor and estimate roof surface area from a known horizontal plan area.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            {planes.map((p, idx) => (
              <div key={p.id} className="glass rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/80">Plane {idx + 1}</span>
                  {planes.length > 1 && (
                    <button type="button" onClick={() => remove(p.id)} className="text-white/50 hover:text-red-300" aria-label="Remove plane">✕</button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InputGroup label="Length" unit="ft">
                    <GlassInput type="number" inputMode="decimal" min="0" step="any" placeholder="40" value={p.length} onChange={(e) => update(p.id, { length: e.target.value })} />
                  </InputGroup>
                  <InputGroup label="Width" unit="ft">
                    <GlassInput type="number" inputMode="decimal" min="0" step="any" placeholder="25" value={p.width} onChange={(e) => update(p.id, { width: e.target.value })} />
                  </InputGroup>
                </div>
                <InputGroup label="Pitch" unit="rise per 12" hint="e.g. 6 for a 6/12 roof.">
                  <GlassInput type="number" inputMode="decimal" min="0" step="any" value={p.pitch} onChange={(e) => update(p.id, { pitch: e.target.value })} />
                </InputGroup>
              </div>
            ))}

            <button type="button" onClick={add} className="w-full rounded-xl border border-dashed border-white/30 py-2.5 text-sm text-white/70 transition hover:bg-white/5 hover:text-white">
              + Add roof plane
            </button>

            <InputGroup label="Waste allowance" unit="%">
              <GlassInput type="number" inputMode="decimal" min="0" max="100" step="any" value={waste} onChange={(e) => setWaste(e.target.value)} />
            </InputGroup>

            <details className="glass rounded-xl p-3">
              <summary className="cursor-pointer text-sm font-medium text-white/80">Material estimate (optional)</summary>
              <div className="mt-3 space-y-3">
                <InputGroup label="Coverage per unit" unit="sq ft">
                  <GlassInput type="number" inputMode="decimal" min="0" step="any" placeholder="100" value={coverage} onChange={(e) => setCoverage(e.target.value)} />
                </InputGroup>
                <InputGroup label="Price per unit" unit="USD">
                  <GlassInput type="number" inputMode="decimal" min="0" step="any" placeholder="50" value={price} onChange={(e) => setPrice(e.target.value)} />
                </InputGroup>
              </div>
            </details>

            {error && (
              <div className="rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">{error}</div>
            )}

            <div className="flex gap-3">
              <button type="submit" className="flex-1 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl">
                Calculate
              </button>
              <button type="button" onClick={onReset} className="glass rounded-xl px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                Reset
              </button>
            </div>
          </form>
        </CalculatorCard>

        <div className="space-y-4">
          {result ? (
            <ResultPanel>
              <h2 className="text-xl font-semibold text-white/80">Roof area</h2>
              <div className="mt-2 text-4xl font-bold text-white">
                {result.totalSlopedAreaSqFt.toFixed(2)}
                <span className="ml-2 text-lg font-medium text-white/70">sq ft</span>
              </div>
              <BreakdownTable
                rows={[
                  { label: "Horizontal area", value: `${result.totalHorizontalAreaSqFt.toFixed(2)} ft²` },
                  { label: "Slope factor (overall)", value: `${result.overallSlopeFactor.toFixed(6)}` },
                  { label: "Sloped area", value: `${result.totalSlopedAreaSqFt.toFixed(2)} ft²` },
                  { label: "Planning area (+waste)", value: `${result.planningAreaSqFt.toFixed(2)} ft²` },
                  ...(result.unitsRequired !== undefined
                    ? [{ label: "Units required", value: `${result.unitsRequired}` }]
                    : []),
                  ...(result.estimatedCost !== undefined
                    ? [{ label: "Estimated cost (user price)", value: `$${result.estimatedCost.toFixed(2)}` }]
                    : []),
                ]}
              />
              {result.planes.length > 1 && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-white/80">Per plane</h3>
                  <ul className="mt-2 space-y-1 text-sm text-white/70">
                    {result.planes.map((pl, i) => (
                      <li key={i}>
                        Plane {i + 1}: {pl.horizontalAreaSqFt.toFixed(2)} ft² × {pl.slopeFactor.toFixed(4)} = {pl.slopedAreaSqFt.toFixed(2)} ft²
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </ResultPanel>
          ) : (
            <ResultPanel>
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center text-white/60">
                <span className="text-5xl">🏠</span>
                <p className="mt-3 text-sm">Add a roof plane and click Calculate.</p>
              </div>
            </ResultPanel>
          )}
        </div>
      </div>
    </CalculatorPageTemplate>
  );
}
