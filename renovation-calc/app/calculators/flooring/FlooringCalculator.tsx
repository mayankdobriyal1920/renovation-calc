"use client";

import { useState, useEffect } from "react";
import CalculatorCard, { ResultPanel, BreakdownTable } from "@/components/calculator/CalculatorCard";
import AdSlot from "@/components/ads/AdSlot";
import { track } from "@/lib/analytics";
import InputGroup, { GlassInput, GlassSelect } from "@/components/calculator/InputGroup";
import CalculatorPageTemplate from "@/components/calculator/CalculatorPageTemplate";
import { calculateFlooring } from "../../../calculators/flooring";
import type { FlooringRoomInput } from "../../../calculators/flooring";
import type { LengthUnit } from "@/lib/units/length";

interface Row {
  id: number;
  length: string;
  lengthUnit: LengthUnit;
  width: string;
  widthUnit: LengthUnit;
}

let nextId = 1;
function newRow(): Row {
  return { id: nextId++, length: "", lengthUnit: "ft", width: "", widthUnit: "ft" };
}

export default function FlooringCalculator() {
  const [rows, setRows] = useState<Row[]>([newRow()]);
  const [waste, setWaste] = useState("10");
  const [coverage, setCoverage] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof calculateFlooring> | null>(null);

  useEffect(() => {
    track("calculator_view", { calculator_id: "flooring" });
  }, []);

  function update(id: number, patch: Partial<Row>) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }
  function remove(id: number) {
    setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.id !== id) : rs));
  }
  function add() {
    setRows((rs) => [...rs, newRow()]);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const rooms: FlooringRoomInput[] = rows.map((r) => ({
        length: Number(r.length),
        lengthUnit: r.lengthUnit,
        width: Number(r.width),
        widthUnit: r.widthUnit,
      }));
      const r = calculateFlooring({
        rooms,
        wastePercent: Number(waste),
        coveragePerBoxSqFt: Number(coverage),
        pricePerBox: price ? Number(price) : undefined,
      });
      setResult(r);
      track("calculation_complete", { calculator_id: "flooring" });
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Calculation failed.");
      track("calculation_error", { calculator_id: "flooring", error_type: "validation" });
    }
  }

  function onReset() {
    setRows([newRow()]);
    setWaste("10");
    setCoverage("");
    setPrice("");
    setError(null);
    setResult(null);
  }

  return (
    <CalculatorPageTemplate
      title="Flooring Calculator"
      description="Estimate flooring area and number of product boxes."
      assumptions={
        <ul className="list-disc space-y-1 pl-5">
          <li>Net area is the sum of room areas.</li>
          <li>Purchase area adds the selected waste allowance.</li>
          <li>Box count rounds up to whole boxes.</li>
          <li>Pattern matching, diagonal layouts and room shape can change waste.</li>
          <li>Coverage per box must be read from the actual product.</li>
        </ul>
      }
      howTo={[
        "Add one or more rooms.",
        "Enter room dimensions and units.",
        "Set the waste allowance (default 10%).",
        "Enter the coverage per box from the product packaging.",
        "Optionally enter a price per box for a cost estimate.",
      ]}
      example={
        <div>
          <p>A 10 ft × 12 ft room, 10% waste, 20 sq ft/box:</p>
          <div className="mt-3 rounded-xl bg-white/5 p-4 font-mono text-sm text-white/80">
            Net = 120 ft² · Purchase = 132 ft² · Boxes = ceil(132/20) = 7
          </div>
        </div>
      }
      related={[
        { href: "/calculators/square-footage/", label: "Square Footage Calculator" },
        { href: "/calculators/paint/", label: "Paint Calculator" },
        { href: "/calculators/renovation-budget/", label: "Renovation Budget Calculator" },
      ]}
      faqs={[
        {
          q: "How much waste should I add?",
          a: "10% is a common starting point for straight layouts; more for diagonal or patterned installs.",
        },
        {
          q: "Do I use net or gross area?",
          a: "Net room area; openings are typically not subtracted for flooring since cuts still use material.",
        },
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <CalculatorCard>
          <h1 className="text-3xl font-bold text-white">Flooring Calculator</h1>
          <p className="mt-2 text-white/70">Estimate flooring area and number of product boxes.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            {rows.map((r, idx) => (
              <div key={r.id} className="glass rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/80">Room {idx + 1}</span>
                  {rows.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(r.id)}
                      className="text-white/50 hover:text-red-300"
                      aria-label="Remove room"
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
                      value={r.length}
                      onChange={(e) => update(r.id, { length: e.target.value })}
                    />
                  </InputGroup>
                  <InputGroup label="Unit">
                    <GlassSelect
                      value={r.lengthUnit}
                      onChange={(e) => update(r.id, { lengthUnit: e.target.value as LengthUnit })}
                    >
                      <option value="ft">ft</option>
                      <option value="in">in</option>
                      <option value="m">m</option>
                      <option value="cm">cm</option>
                    </GlassSelect>
                  </InputGroup>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <InputGroup label="Width">
                    <GlassInput
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="any"
                      placeholder="12"
                      value={r.width}
                      onChange={(e) => update(r.id, { width: e.target.value })}
                    />
                  </InputGroup>
                  <InputGroup label="Unit">
                    <GlassSelect
                      value={r.widthUnit}
                      onChange={(e) => update(r.id, { widthUnit: e.target.value as LengthUnit })}
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
              onClick={add}
              className="w-full rounded-xl border border-dashed border-white/30 py-2.5 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              + Add room
            </button>

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

            <InputGroup label="Coverage per box" unit="sq ft" hint="Read from the product packaging.">
              <GlassInput
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                placeholder="20"
                value={coverage}
                onChange={(e) => setCoverage(e.target.value)}
              />
            </InputGroup>

            <InputGroup label="Price per box" unit="USD (optional)">
              <GlassInput
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                placeholder="30"
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
              <h2 className="text-xl font-semibold text-white/80">Flooring required</h2>
              <div className="mt-2 text-4xl font-bold text-white">
                {result.boxesRequired}
                <span className="ml-2 text-lg font-medium text-white/70">boxes</span>
              </div>
              <BreakdownTable
                rows={[
                  { label: "Net area", value: `${result.netAreaSqFt.toFixed(2)} ft²` },
                  { label: "Purchase area (+waste)", value: `${result.purchaseAreaSqFt.toFixed(2)} ft²` },
                  { label: "Boxes required", value: `${result.boxesRequired}` },
                  { label: "Coverage purchased", value: `${result.actualCoveragePurchasedSqFt.toFixed(2)} ft²` },
                  ...(result.estimatedCost !== undefined
                    ? [{ label: "Estimated cost (user price)", value: `$${result.estimatedCost.toFixed(2)}` }]
                    : []),
                ]}
              />
            </ResultPanel>
          ) : (
            <ResultPanel>
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center text-white/60">
                <span className="text-5xl">🪵</span>
                <p className="mt-3 text-sm">Add a room and click Calculate.</p>
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
