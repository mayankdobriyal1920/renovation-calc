"use client";

import { useState, useEffect } from "react";
import CalculatorCard, { ResultPanel, BreakdownTable } from "@/components/calculator/CalculatorCard";
import AdSlot from "@/components/ads/AdSlot";
import { track } from "@/lib/analytics";
import InputGroup, { GlassInput } from "@/components/calculator/InputGroup";
import CalculatorPageTemplate from "@/components/calculator/CalculatorPageTemplate";
import { calculateFence } from "../../../calculators/fence";

export default function FenceCalculator() {
  const [length, setLength] = useState("");
  const [spacing, setSpacing] = useState("8");
  const [height, setHeight] = useState("6");
  const [rails, setRails] = useState("3");
  const [picketWidth, setPicketWidth] = useState("3.5");
  const [picketGap, setPicketGap] = useState("0.5");
  const [pricePost, setPricePost] = useState("");
  const [priceRail, setPriceRail] = useState("");
  const [pricePicket, setPricePicket] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof calculateFence> | null>(null);

  useEffect(() => {
    track("calculator_view", { calculator_id: "fence-material" });
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const r = calculateFence({
        fenceLengthFt: Number(length),
        maxPostSpacingFt: Number(spacing),
        fenceHeightFt: Number(height),
        railsPerSection: Number(rails),
        picketFaceWidthIn: Number(picketWidth),
        picketGapIn: Number(picketGap),
        pricePerPost: pricePost ? Number(pricePost) : undefined,
        pricePerRail: priceRail ? Number(priceRail) : undefined,
        pricePerPicket: pricePicket ? Number(pricePicket) : undefined,
      });
      setResult(r);
      track("calculation_complete", { calculator_id: "fence-material" });
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Calculation failed.");
      track("calculation_error", { calculator_id: "fence-material", error_type: "validation" });
    }
  }

  function onReset() {
    setLength("");
    setSpacing("8");
    setHeight("6");
    setRails("3");
    setPicketWidth("3.5");
    setPicketGap("0.5");
    setPricePost("");
    setPriceRail("");
    setPricePicket("");
    setError(null);
    setResult(null);
  }

  return (
    <CalculatorPageTemplate
      title="Fence Material Calculator"
      description="Estimate basic fence component quantities for a straight run."
      assumptions={
        <ul className="list-disc space-y-1 pl-5">
          <li>Simplified straight-run estimate.</li>
          <li>Post spacing is a maximum target, not a construction instruction.</li>
          <li>Corners, ends, gates, slopes, bracing and layout constraints can change counts.</li>
          <li>Terminal, corner and gate posts may require different specifications.</li>
          <li>Gate openings are excluded from counts.</li>
          <li>Footings, post size and structural design are not prescribed.</li>
        </ul>
      }
      howTo={[
        "Enter total fence length in feet.",
        "Set desired maximum post spacing.",
        "Enter fence height, rails per section.",
        "Enter picket face width and gap in inches.",
        "Optionally enter unit prices for a cost estimate.",
      ]}
      example={
        <div>
          <p>A 50 ft fence, 8 ft max spacing, 3 rails, 3.5 in pickets with 0.5 in gap:</p>
          <div className="mt-3 rounded-xl bg-white/5 p-4 font-mono text-sm text-white/80">
            Spans = ceil(50/8) = 7 · Posts = 8 · Rails = 21 · Pickels = ceil(50/(4/12)) = 150
          </div>
        </div>
      }
      related={[
        { href: "/calculators/deck-material", label: "Deck Material Calculator" },
        { href: "/calculators/square-footage", label: "Square Footage Calculator" },
        { href: "/calculators/renovation-budget", label: "Renovation Budget Calculator" },
      ]}
      faqs={[
        {
          q: "Does this include gates?",
          a: "No — gate openings and gate posts are excluded from these counts.",
        },
        {
          q: "Is post spacing exact?",
          a: "It is a maximum target; actual spacing is distributed evenly across spans.",
        },
      ]}
      commonMistakes={[
        "Assuming one post spacing fits every fence — corners, gates, and slopes change counts.",
        "Forgetting terminal and corner posts — they may need different specs than line posts.",
        "Including gate openings in picket counts — gates need their own posts and hardware.",
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <CalculatorCard>
          <h1 className="text-3xl font-bold text-white">Fence Material Calculator</h1>
          <p className="mt-2 text-white/70">Estimate basic fence component quantities for a straight run.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            <InputGroup label="Fence length" unit="feet">
              <GlassInput type="number" inputMode="decimal" min="0" step="any" placeholder="50" value={length} onChange={(e) => setLength(e.target.value)} />
            </InputGroup>
            <InputGroup label="Max post spacing" unit="feet" hint="Target maximum, not a construction instruction.">
              <GlassInput type="number" inputMode="decimal" min="0" step="any" value={spacing} onChange={(e) => setSpacing(e.target.value)} />
            </InputGroup>
            <InputGroup label="Fence height" unit="feet">
              <GlassInput type="number" inputMode="decimal" min="0" step="any" value={height} onChange={(e) => setHeight(e.target.value)} />
            </InputGroup>
            <InputGroup label="Rails per section">
              <GlassInput type="number" inputMode="numeric" min="1" step="1" value={rails} onChange={(e) => setRails(e.target.value)} />
            </InputGroup>
            <InputGroup label="Picket face width" unit="inches">
              <GlassInput type="number" inputMode="decimal" min="0" step="any" value={picketWidth} onChange={(e) => setPicketWidth(e.target.value)} />
            </InputGroup>
            <InputGroup label="Picket gap" unit="inches">
              <GlassInput type="number" inputMode="decimal" min="0" step="any" value={picketGap} onChange={(e) => setPicketGap(e.target.value)} />
            </InputGroup>

            <details className="glass rounded-xl p-3">
              <summary className="cursor-pointer text-sm font-medium text-white/80">Unit prices (optional)</summary>
              <div className="mt-3 space-y-3">
                <InputGroup label="Price per post" unit="USD">
                  <GlassInput type="number" inputMode="decimal" min="0" step="any" value={pricePost} onChange={(e) => setPricePost(e.target.value)} />
                </InputGroup>
                <InputGroup label="Price per rail" unit="USD">
                  <GlassInput type="number" inputMode="decimal" min="0" step="any" value={priceRail} onChange={(e) => setPriceRail(e.target.value)} />
                </InputGroup>
                <InputGroup label="Price per picket" unit="USD">
                  <GlassInput type="number" inputMode="decimal" min="0" step="any" value={pricePicket} onChange={(e) => setPricePicket(e.target.value)} />
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
              <h2 className="text-xl font-semibold text-white/80">Fence materials</h2>
              <div className="mt-2 text-4xl font-bold text-white">
                {result.posts}
                <span className="ml-2 text-lg font-medium text-white/70">posts</span>
              </div>
              <BreakdownTable
                rows={[
                  { label: "Spans", value: `${result.spans}` },
                  { label: "Posts", value: `${result.posts}` },
                  { label: "Actual span length", value: `${result.actualSpanLengthFt.toFixed(2)} ft` },
                  { label: "Rails", value: `${result.rails}` },
                  { label: "Picket pitch", value: `${result.picketPitchIn} in` },
                  { label: "Pickets", value: `${result.pickets}` },
                  ...(result.estimatedCost !== undefined
                    ? [{ label: "Estimated cost (user prices)", value: `$${result.estimatedCost.toFixed(2)}` }]
                    : []),
                ]}
              />
            </ResultPanel>
          ) : (
            <ResultPanel>
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center text-white/60">
                <span className="text-5xl">🪜</span>
                <p className="mt-3 text-sm">Enter fence details and click Calculate.</p>
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
