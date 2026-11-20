"use client";

import { useState } from "react";
import CalculatorCard, { ResultPanel, BreakdownTable } from "@/components/calculator/CalculatorCard";
import InputGroup, { GlassInput, GlassSelect } from "@/components/calculator/InputGroup";
import CalculatorPageTemplate from "@/components/calculator/CalculatorPageTemplate";
import { calculateSquareFootage } from "../../../calculators/squareFootage";
import type { RectangleInput } from "../../../calculators/squareFootage";
import type { LengthUnit } from "@/lib/units/length";

interface Row {
  id: number;
  length: string;
  lengthUnit: LengthUnit;
  width: string;
  widthUnit: LengthUnit;
  included: boolean;
}

let nextId = 1;
function newRow(): Row {
  return { id: nextId++, length: "", lengthUnit: "ft", width: "", widthUnit: "ft", included: true };
}

export default function SquareFootageCalculator() {
  const [rows, setRows] = useState<Row[]>([newRow()]);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof calculateSquareFootage> | null>(null);

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
      const rects: RectangleInput[] = rows.map((r) => ({
        length: Number(r.length),
        lengthUnit: r.lengthUnit,
        width: Number(r.width),
        widthUnit: r.widthUnit,
        included: r.included,
      }));
      const r = calculateSquareFootage({ rectangles: rects });
      setResult(r);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Calculation failed.");
    }
  }

  function onReset() {
    setRows([newRow()]);
    setError(null);
    setResult(null);
  }

  return (
    <CalculatorPageTemplate
      title="Square Footage Calculator"
      description="Calculate floor, wall or other rectangular area."
      assumptions={
        <ul className="list-disc space-y-1 pl-5">
          <li>Rectangles are converted to feet before summing.</li>
          <li>Irregular shapes should be split into simpler rectangles.</li>
          <li>Subtracted (excluded) area cannot exceed included area.</li>
          <li>Perimeter is shown only for a single rectangle.</li>
        </ul>
      }
      howTo={[
        "Add one or more rectangles (rooms or sections).",
        "Enter length and width with their units.",
        "Mark an area as 'subtract' for openings or excluded spaces.",
        "Click Calculate to see total area in ft², yd² and m².",
      ]}
      example={
        <div>
          <p>A 10 ft × 12 ft room: 10 × 12 = 120 ft² = 13.33 yd².</p>
        </div>
      }
      related={[
        { href: "/calculators/flooring/", label: "Flooring Calculator" },
        { href: "/calculators/paint/", label: "Paint Calculator" },
        { href: "/calculators/concrete-slab/", label: "Concrete Slab Calculator" },
      ]}
      faqs={[
        {
          q: "Can I mix units?",
          a: "Yes — each dimension has its own unit selector; everything is converted to feet internally.",
        },
        {
          q: "How do I measure an L-shaped room?",
          a: "Split it into two rectangles, add both as included areas.",
        },
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <CalculatorCard>
          <h1 className="text-3xl font-bold text-white">Square Footage Calculator</h1>
          <p className="mt-2 text-white/70">Calculate floor, wall or other rectangular area.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            {rows.map((r, idx) => (
              <div key={r.id} className="glass rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/80">Rectangle {idx + 1}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => update(r.id, { included: !r.included })}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                        r.included ? "bg-emerald-400/20 text-emerald-300" : "bg-red-400/20 text-red-300"
                      }`}
                    >
                      {r.included ? "Add" : "Subtract"}
                    </button>
                    {rows.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(r.id)}
                        className="text-white/50 hover:text-red-300"
                        aria-label="Remove rectangle"
                      >
                        ✕
                      </button>
                    )}
                  </div>
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
              + Add rectangle
            </button>

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
              <h2 className="text-xl font-semibold text-white/80">Total area</h2>
              <div className="mt-2 text-4xl font-bold text-white">
                {result.totalSquareFeet.toFixed(2)}
                <span className="ml-2 text-lg font-medium text-white/70">sq ft</span>
              </div>
              <BreakdownTable
                rows={[
                  { label: "Square feet", value: `${result.totalSquareFeet.toFixed(2)} ft²` },
                  { label: "Square yards", value: `${result.totalSquareYards.toFixed(2)} yd²` },
                  { label: "Square meters", value: `${result.totalSquareMeters.toFixed(2)} m²` },
                  ...(result.perimeterFeet !== undefined
                    ? [{ label: "Perimeter", value: `${result.perimeterFeet.toFixed(2)} ft` }]
                    : []),
                ]}
              />
            </ResultPanel>
          ) : (
            <ResultPanel>
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center text-white/60">
                <span className="text-5xl">📐</span>
                <p className="mt-3 text-sm">Add a rectangle and click Calculate.</p>
              </div>
            </ResultPanel>
          )}
        </div>
      </div>
    </CalculatorPageTemplate>
  );
}
