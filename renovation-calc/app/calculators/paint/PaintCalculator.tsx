"use client";

import { useState, useEffect } from "react";
import CalculatorCard, { ResultPanel, BreakdownTable } from "@/components/calculator/CalculatorCard";
import AdSlot from "@/components/ads/AdSlot";
import { track } from "@/lib/analytics";
import InputGroup, { GlassInput, GlassSelect } from "@/components/calculator/InputGroup";
import CalculatorPageTemplate from "@/components/calculator/CalculatorPageTemplate";
import { calculatePaint } from "../../../calculators/paint";
import type { PaintWallInput, PaintCeilingInput } from "../../../calculators/paint";
import type { LengthUnit } from "@/lib/units/length";

interface WallRow {
  id: number;
  length: string;
  lengthUnit: LengthUnit;
  height: string;
  heightUnit: LengthUnit;
}
let nextId = 1;
function newRow(): WallRow {
  return { id: nextId++, length: "", lengthUnit: "ft", height: "", heightUnit: "ft" };
}

export default function PaintCalculator() {
  const [walls, setWalls] = useState<WallRow[]>([newRow()]);
  const [hasCeiling, setHasCeiling] = useState(false);
  const [ceilingL, setCeilingL] = useState("");
  const [ceilingLUnit, setCeilingLUnit] = useState<LengthUnit>("ft");
  const [ceilingW, setCeilingW] = useState("");
  const [ceilingWUnit, setCeilingWUnit] = useState<LengthUnit>("ft");
  const [excluded, setExcluded] = useState("0");
  const [coats, setCoats] = useState("2");
  const [coverage, setCoverage] = useState("350");
  const [hasPrimer, setHasPrimer] = useState(false);
  const [primerCoats, setPrimerCoats] = useState("1");
  const [primerCoverage, setPrimerCoverage] = useState("300");
  const [price, setPrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof calculatePaint> | null>(null);

  useEffect(() => {
    track("calculator_view", { calculator_id: "paint" });
  }, []);

  function updateWall(id: number, patch: Partial<WallRow>) {
    setWalls((ws) => ws.map((w) => (w.id === id ? { ...w, ...patch } : w)));
  }
  function removeWall(id: number) {
    setWalls((ws) => (ws.length > 1 ? ws.filter((w) => w.id !== id) : ws));
  }
  function addWall() {
    setWalls((ws) => [...ws, newRow()]);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const wallInputs: PaintWallInput[] = walls.map((w) => ({
        length: Number(w.length),
        lengthUnit: w.lengthUnit,
        height: Number(w.height),
        heightUnit: w.heightUnit,
      }));
      const ceiling: PaintCeilingInput | undefined = hasCeiling
        ? {
            length: Number(ceilingL),
            lengthUnit: ceilingLUnit,
            width: Number(ceilingW),
            widthUnit: ceilingWUnit,
          }
        : undefined;
      const r = calculatePaint({
        walls: wallInputs,
        ceiling,
        excludedAreaSqFt: Number(excluded),
        coats: Number(coats),
        coveragePerGallonSqFt: Number(coverage),
        primerCoats: hasPrimer ? Number(primerCoats) : 0,
        primerCoveragePerGallonSqFt: hasPrimer ? Number(primerCoverage) : undefined,
        pricePerGallon: price ? Number(price) : undefined,
      });
      setResult(r);
      track("calculation_complete", { calculator_id: "paint" });
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Calculation failed.");
      track("calculation_error", { calculator_id: "paint", error_type: "validation" });
    }
  }

  function onReset() {
    setWalls([newRow()]);
    setHasCeiling(false);
    setCeilingL("");
    setCeilingW("");
    setExcluded("0");
    setCoats("2");
    setCoverage("350");
    setHasPrimer(false);
    setPrimerCoats("1");
    setPrimerCoverage("300");
    setPrice("");
    setError(null);
    setResult(null);
  }

  return (
    <CalculatorPageTemplate
      title="Paint Calculator"
      description="Estimate paint quantity for walls and optional ceilings."
      assumptions={
        <ul className="list-disc space-y-1 pl-5">
          <li>Gross area = sum of wall areas (+ ceiling if included).</li>
          <li>Net paintable area subtracts excluded openings.</li>
          <li>Required area multiplies net area by number of coats.</li>
          <li>Primer is calculated separately.</li>
          <li>Coverage varies by product, surface and application method.</li>
        </ul>
      }
      howTo={[
        "Add walls (length × height) or use a room's four walls.",
        "Optionally include a ceiling.",
        "Enter excluded area for doors/windows.",
        "Set number of coats and coverage per gallon.",
        "Optionally add primer coats.",
      ]}
      example={
        <div>
          <p>One 10 ft × 8 ft wall, 2 coats, 350 sq ft/gal:</p>
          <div className="mt-3 rounded-xl bg-white/5 p-4 font-mono text-sm text-white/80">
            Gross = 80 ft² · Required = 160 ft² · Gallons = 160/350 = 0.46 → buy 1
          </div>
        </div>
      }
      related={[
        { href: "/calculators/square-footage", label: "Square Footage Calculator" },
        { href: "/calculators/flooring", label: "Flooring Calculator" },
        { href: "/calculators/renovation-budget", label: "Renovation Budget Calculator" },
      ]}
      faqs={[
        {
          q: "How much paint do I need for a 10x12 room?",
          a: "Depends on wall height, openings, coats and coverage. Use the calculator with your measurements.",
        },
        {
          q: "Is primer included?",
          a: "Primer is calculated separately when you enable it, using its own coverage and coats.",
        },
      ]}
      commonMistakes={[
        "Using one coverage figure for all surfaces — texture, porosity, and color change affect coverage.",
        "Forgetting to multiply by number of coats — required area is net area × coats.",
        "Buying exactly the calculated gallons — round up to whole gallons for touch-ups.",
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <CalculatorCard>
          <h1 className="text-3xl font-bold text-white">Paint Calculator</h1>
          <p className="mt-2 text-white/70">Estimate paint quantity for walls and optional ceilings.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            {walls.map((w, idx) => (
              <div key={w.id} className="glass rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/80">Wall {idx + 1}</span>
                  {walls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeWall(w.id)}
                      className="text-white/50 hover:text-red-300"
                      aria-label="Remove wall"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InputGroup label="Length">
                    <GlassInput
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="any"
                      placeholder="10"
                      value={w.length}
                      onChange={(e) => updateWall(w.id, { length: e.target.value })}
                    />
                  </InputGroup>
                  <InputGroup label="Unit">
                    <GlassSelect
                      value={w.lengthUnit}
                      onChange={(e) => updateWall(w.id, { lengthUnit: e.target.value as LengthUnit })}
                    >
                      <option value="ft">ft</option>
                      <option value="in">in</option>
                      <option value="m">m</option>
                      <option value="cm">cm</option>
                    </GlassSelect>
                  </InputGroup>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InputGroup label="Height">
                    <GlassInput
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="any"
                      placeholder="8"
                      value={w.height}
                      onChange={(e) => updateWall(w.id, { height: e.target.value })}
                    />
                  </InputGroup>
                  <InputGroup label="Unit">
                    <GlassSelect
                      value={w.heightUnit}
                      onChange={(e) => updateWall(w.id, { heightUnit: e.target.value as LengthUnit })}
                    >
                      <option value="ft">ft</option>
                      <option value="in">in</option>
                      <option value="m">m</option>
                      <option value="cm">cm</option>
                    </GlassSelect>
                  </InputGroup>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addWall}
              className="w-full rounded-xl border border-dashed border-white/30 py-2.5 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              + Add wall
            </button>

            <label className="flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={hasCeiling}
                onChange={(e) => setHasCeiling(e.target.checked)}
                className="h-4 w-4 rounded border-white/30 bg-white/10"
              />
              Include ceiling
            </label>
            {hasCeiling && (
              <div className="glass rounded-xl p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <InputGroup label="Ceiling length">
                    <GlassInput
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="any"
                      placeholder="10"
                      value={ceilingL}
                      onChange={(e) => setCeilingL(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup label="Unit">
                    <GlassSelect value={ceilingLUnit} onChange={(e) => setCeilingLUnit(e.target.value as LengthUnit)}>
                      <option value="ft">ft</option>
                      <option value="in">in</option>
                      <option value="m">m</option>
                      <option value="cm">cm</option>
                    </GlassSelect>
                  </InputGroup>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InputGroup label="Ceiling width">
                    <GlassInput
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="any"
                      placeholder="10"
                      value={ceilingW}
                      onChange={(e) => setCeilingW(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup label="Unit">
                    <GlassSelect value={ceilingWUnit} onChange={(e) => setCeilingWUnit(e.target.value as LengthUnit)}>
                      <option value="ft">ft</option>
                      <option value="in">in</option>
                      <option value="m">m</option>
                      <option value="cm">cm</option>
                    </GlassSelect>
                  </InputGroup>
                </div>
              </div>
            )}

            <InputGroup label="Excluded area (openings)" unit="sq ft" hint="Doors, windows, etc.">
              <GlassInput
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={excluded}
                onChange={(e) => setExcluded(e.target.value)}
              />
            </InputGroup>

            <InputGroup label="Number of coats">
              <GlassInput
                type="number"
                inputMode="numeric"
                min="1"
                max="10"
                step="1"
                value={coats}
                onChange={(e) => setCoats(e.target.value)}
              />
            </InputGroup>

            <InputGroup label="Coverage per gallon" unit="sq ft" hint="From product label.">
              <GlassInput
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={coverage}
                onChange={(e) => setCoverage(e.target.value)}
              />
            </InputGroup>

            <label className="flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={hasPrimer}
                onChange={(e) => setHasPrimer(e.target.checked)}
                className="h-4 w-4 rounded border-white/30 bg-white/10"
              />
              Include primer
            </label>
            {hasPrimer && (
              <div className="glass rounded-xl p-4 space-y-3">
                <InputGroup label="Primer coats">
                  <GlassInput
                    type="number"
                    inputMode="numeric"
                    min="1"
                    max="10"
                    step="1"
                    value={primerCoats}
                    onChange={(e) => setPrimerCoats(e.target.value)}
                  />
                </InputGroup>
                <InputGroup label="Primer coverage per gallon" unit="sq ft">
                  <GlassInput
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    value={primerCoverage}
                    onChange={(e) => setPrimerCoverage(e.target.value)}
                  />
                </InputGroup>
              </div>
            )}

            <InputGroup label="Price per gallon" unit="USD (optional)">
              <GlassInput
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                placeholder="40"
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
              <h2 className="text-xl font-semibold text-white/80">Paint required</h2>
              <div className="mt-2 text-4xl font-bold text-white">
                {result.paintGallonsToPurchase}
                <span className="ml-2 text-lg font-medium text-white/70">gallons</span>
              </div>
              <BreakdownTable
                rows={[
                  { label: "Gross area", value: `${result.grossAreaSqFt.toFixed(2)} ft²` },
                  { label: "Excluded area", value: `${result.excludedAreaSqFt.toFixed(2)} ft²` },
                  { label: "Net paintable area", value: `${result.netPaintableAreaSqFt.toFixed(2)} ft²` },
                  { label: "Required (with coats)", value: `${result.requiredPaintAreaSqFt.toFixed(2)} ft²` },
                  { label: "Gallons (exact)", value: `${result.paintGallonsRequired.toFixed(3)}` },
                  { label: "Gallons to buy", value: `${result.paintGallonsToPurchase}` },
                  ...(result.primerGallonsToPurchase !== undefined
                    ? [
                        { label: "Primer gallons (exact)", value: `${result.primerGallonsRequired?.toFixed(3)}` },
                        { label: "Primer gallons to buy", value: `${result.primerGallonsToPurchase}` },
                      ]
                    : []),
                  ...(result.estimatedCost !== undefined
                    ? [{ label: "Estimated cost (user price)", value: `$${result.estimatedCost.toFixed(2)}` }]
                    : []),
                ]}
              />
            </ResultPanel>
          ) : (
            <ResultPanel>
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center text-white/60">
                <span className="text-5xl">🎨</span>
                <p className="mt-3 text-sm">Add a wall and click Calculate.</p>
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
