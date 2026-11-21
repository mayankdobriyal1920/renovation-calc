"use client";

import { useState, useEffect } from "react";
import CalculatorCard, { ResultPanel, BreakdownTable } from "@/components/calculator/CalculatorCard";
import AdSlot from "@/components/ads/AdSlot";
import { track } from "@/lib/analytics";
import InputGroup, { GlassInput, GlassSelect } from "@/components/calculator/InputGroup";
import CalculatorPageTemplate from "@/components/calculator/CalculatorPageTemplate";
import { calculateDeck } from "../../../calculators/deck";
import type { BoardDirection } from "../../../calculators/deck";

export default function DeckCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [direction, setDirection] = useState<BoardDirection>("along-length");
  const [boardWidth, setBoardWidth] = useState("5.5");
  const [boardGap, setBoardGap] = useState("0.125");
  const [joistSpacing, setJoistSpacing] = useState("1.333");
  const [waste, setWaste] = useState("10");
  const [priceBoard, setPriceBoard] = useState("");
  const [priceJoist, setPriceJoist] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof calculateDeck> | null>(null);

  useEffect(() => {
    track("calculator_view", { calculator_id: "deck-material" });
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const r = calculateDeck({
        deckLengthFt: Number(length),
        deckWidthFt: Number(width),
        boardDirection: direction,
        boardFaceWidthIn: Number(boardWidth),
        boardGapIn: Number(boardGap),
        joistSpacingFt: Number(joistSpacing),
        wastePercent: Number(waste),
        pricePerBoardLinearFt: priceBoard ? Number(priceBoard) : undefined,
        pricePerJoist: priceJoist ? Number(priceJoist) : undefined,
      });
      setResult(r);
      track("calculation_complete", { calculator_id: "deck-material" });
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Calculation failed.");
      track("calculation_error", { calculator_id: "deck-material", error_type: "validation" });
    }
  }

  function onReset() {
    setLength("");
    setWidth("");
    setDirection("along-length");
    setBoardWidth("5.5");
    setBoardGap("0.125");
    setJoistSpacing("1.333");
    setWaste("10");
    setPriceBoard("");
    setPriceJoist("");
    setError(null);
    setResult(null);
  }

  return (
    <CalculatorPageTemplate
      title="Deck Material Calculator"
      description="Estimate basic decking boards and joists for a rectangular deck."
      assumptions={
        <ul className="list-disc space-y-1 pl-5">
          <li>Simplified estimate for a rectangular deck surface.</li>
          <li>Not a deck framing design tool.</li>
          <li>Does not calculate beam spans, footing sizes, ledger attachment, lateral bracing, guardrails, stairs, cantilevers or structural load capacity.</li>
          <li>Board stock length is not used to optimize cuts in v1.</li>
        </ul>
      }
      howTo={[
        "Enter deck length and width in feet.",
        "Choose board direction.",
        "Enter board face width and gap in inches.",
        "Set joist spacing in feet.",
        "Adjust waste allowance.",
      ]}
      example={
        <div>
          <p>A 12 ft × 10 ft deck, boards along length, 5.5 in boards with 0.125 in gap, 16 in joist spacing, 10% waste:</p>
          <div className="mt-3 rounded-xl bg-white/5 p-4 font-mono text-sm text-white/80">
            Rows = ceil(10 / 0.46875) = 22 · LF = 22 × 12 = 264 · Planning = 264 × 1.10
          </div>
        </div>
      }
      related={[
        { href: "/calculators/fence-material", label: "Fence Material Calculator" },
        { href: "/calculators/square-footage", label: "Square Footage Calculator" },
        { href: "/calculators/renovation-budget", label: "Renovation Budget Calculator" },
      ]}
      faqs={[
        {
          q: "Does this design my deck structure?",
          a: "No — it estimates board and joist counts only. Structural design requires project-specific engineering.",
        },
      ]}
      commonMistakes={[
        "Ignoring board gap — small gaps add up across many rows and change the board count.",
        "Forgetting joist direction — boards run perpendicular to joists, affecting linear footage.",
        "Skipping waste allowance — cuts and mistakes mean you need extra boards.",
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <CalculatorCard>
          <h1 className="text-3xl font-bold text-white">Deck Material Calculator</h1>
          <p className="mt-2 text-white/70">Estimate basic decking boards and joists for a rectangular deck.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            <InputGroup label="Deck length" unit="feet">
              <GlassInput type="number" inputMode="decimal" min="0" step="any" placeholder="12" value={length} onChange={(e) => setLength(e.target.value)} />
            </InputGroup>
            <InputGroup label="Deck width" unit="feet">
              <GlassInput type="number" inputMode="decimal" min="0" step="any" placeholder="10" value={width} onChange={(e) => setWidth(e.target.value)} />
            </InputGroup>
            <InputGroup label="Board direction">
              <GlassSelect value={direction} onChange={(e) => setDirection(e.target.value as BoardDirection)}>
                <option value="along-length">Boards run along length</option>
                <option value="along-width">Boards run along width</option>
              </GlassSelect>
            </InputGroup>
            <InputGroup label="Board face width" unit="inches">
              <GlassInput type="number" inputMode="decimal" min="0" step="any" value={boardWidth} onChange={(e) => setBoardWidth(e.target.value)} />
            </InputGroup>
            <InputGroup label="Board gap" unit="inches">
              <GlassInput type="number" inputMode="decimal" min="0" step="any" value={boardGap} onChange={(e) => setBoardGap(e.target.value)} />
            </InputGroup>
            <InputGroup label="Joist spacing" unit="feet" hint="e.g. 1.333 ft (16 in).">
              <GlassInput type="number" inputMode="decimal" min="0" step="any" value={joistSpacing} onChange={(e) => setJoistSpacing(e.target.value)} />
            </InputGroup>
            <InputGroup label="Waste allowance" unit="%">
              <GlassInput type="number" inputMode="decimal" min="0" max="100" step="any" value={waste} onChange={(e) => setWaste(e.target.value)} />
            </InputGroup>

            <details className="glass rounded-xl p-3">
              <summary className="cursor-pointer text-sm font-medium text-white/80">Unit prices (optional)</summary>
              <div className="mt-3 space-y-3">
                <InputGroup label="Price per board linear foot" unit="USD">
                  <GlassInput type="number" inputMode="decimal" min="0" step="any" value={priceBoard} onChange={(e) => setPriceBoard(e.target.value)} />
                </InputGroup>
                <InputGroup label="Price per joist" unit="USD">
                  <GlassInput type="number" inputMode="decimal" min="0" step="any" value={priceJoist} onChange={(e) => setPriceJoist(e.target.value)} />
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
              <h2 className="text-xl font-semibold text-white/80">Deck materials</h2>
              <div className="mt-2 text-4xl font-bold text-white">
                {result.boardRows}
                <span className="ml-2 text-lg font-medium text-white/70">board rows</span>
              </div>
              <BreakdownTable
                rows={[
                  { label: "Surface area", value: `${result.surfaceAreaSqFt.toFixed(2)} ft²` },
                  { label: "Board rows", value: `${result.boardRows}` },
                  { label: "Total board linear ft", value: `${result.totalBoardLinearFt.toFixed(2)} ft` },
                  { label: "Planning (with waste)", value: `${result.planningBoardLinearFt.toFixed(2)} ft` },
                  { label: "Joist count", value: `${result.joistCount}` },
                  ...(result.estimatedCost !== undefined
                    ? [{ label: "Estimated cost (user prices)", value: `$${result.estimatedCost.toFixed(2)}` }]
                    : []),
                ]}
              />
            </ResultPanel>
          ) : (
            <ResultPanel>
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center text-white/60">
                <span className="text-5xl">🏡</span>
                <p className="mt-3 text-sm">Enter deck details and click Calculate.</p>
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
