"use client";

import { useState, useEffect } from "react";
import CalculatorCard, { ResultPanel, BreakdownTable } from "@/components/calculator/CalculatorCard";
import AdSlot from "@/components/ads/AdSlot";
import { track } from "@/lib/analytics";
import InputGroup, { GlassInput, GlassSelect } from "@/components/calculator/InputGroup";
import CalculatorPageTemplate from "@/components/calculator/CalculatorPageTemplate";
import { calculateRenovationBudget } from "../../../calculators/renovationBudget";
import type { BudgetLineItem, BudgetCategory } from "../../../calculators/renovationBudget";
import { toCsv, downloadCsv } from "@/lib/formatting";

const CATEGORIES: { value: BudgetCategory; label: string }[] = [
  { value: "materials", label: "Materials" },
  { value: "labor", label: "Labor" },
  { value: "delivery", label: "Delivery" },
  { value: "equipment", label: "Equipment rental" },
  { value: "permits", label: "Permits/fees" },
  { value: "other", label: "Other" },
];

interface Row {
  id: number;
  description: string;
  category: BudgetCategory;
  quantity: string;
  unitCost: string;
  taxable: boolean;
}

let nextId = 1;
function newRow(): Row {
  return { id: nextId++, description: "", category: "materials", quantity: "1", unitCost: "", taxable: true };
}

export default function BudgetCalculator() {
  const [projectName, setProjectName] = useState("");
  const [rows, setRows] = useState<Row[]>([newRow()]);
  const [taxRate, setTaxRate] = useState("0");
  const [contingency, setContingency] = useState("10");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReturnType<typeof calculateRenovationBudget> | null>(null);

  // Optional browser storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("renovation-budget-draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.projectName) setProjectName(parsed.projectName);
        if (Array.isArray(parsed.rows)) setRows(parsed.rows.map((r: Row) => ({ ...r, id: nextId++ })));
        if (parsed.taxRate) setTaxRate(parsed.taxRate);
        if (parsed.contingency) setContingency(parsed.contingency);
      }
    } catch {
      // ignore
    }
    track("calculator_view", { calculator_id: "renovation-budget" });
  }, []);

  function persist() {
    try {
      localStorage.setItem(
        "renovation-budget-draft",
        JSON.stringify({ projectName, rows, taxRate, contingency }),
      );
    } catch {
      // ignore
    }
  }

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
      const items: BudgetLineItem[] = rows.map((r) => ({
        description: r.description,
        category: r.category,
        quantity: Number(r.quantity),
        unitCost: Number(r.unitCost),
        taxable: r.taxable,
      }));
      const r = calculateRenovationBudget({
        items,
        taxRatePercent: Number(taxRate),
        contingencyPercent: Number(contingency),
      });
      setResult(r);
      persist();
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Calculation failed.");
    }
  }

  function onReset() {
    setRows([newRow()]);
    setProjectName("");
    setTaxRate("0");
    setContingency("10");
    setError(null);
    setResult(null);
    try {
      localStorage.removeItem("renovation-budget-draft");
    } catch {
      // ignore
    }
  }

  function onExport() {
    if (!result) return;
    const rowsCsv: (string | number)[][] = [
      ["Description", "Category", "Quantity", "Unit cost", "Line total", "Taxable"],
      ...rows.map((r, i) => [
        r.description || `Item ${i + 1}`,
        r.category,
        Number(r.quantity),
        Number(r.unitCost),
        result.lineTotals[i],
        r.taxable ? "Yes" : "No",
      ]),
      [],
      ["Subtotal", "", "", "", result.subtotal, ""],
      ["Tax", "", "", "", result.tax, ""],
      ["Contingency", "", "", "", result.contingency, ""],
      ["Total", "", "", "", result.total, ""],
    ];
    downloadCsv(`${projectName || "renovation-budget"}.csv`, toCsv(rowsCsv));
  }

  return (
    <CalculatorPageTemplate
      title="Renovation Budget Calculator"
      description="Organize user-entered project costs into a planning budget."
      assumptions={
        <ul className="list-disc space-y-1 pl-5">
          <li>All prices are user-entered; no market data is used.</li>
          <li>Tax applies only to line items marked taxable.</li>
          <li>Contingency applies to the subtotal.</li>
          <li>Drafts may be saved in your browser (localStorage) on this device only.</li>
        </ul>
      }
      howTo={[
        "Enter a project name (optional).",
        "Add line items with category, quantity and unit cost.",
        "Set tax rate and contingency percentage.",
        "Click Calculate to see subtotals and total.",
        "Export to CSV for your records.",
      ]}
      example={
        <div>
          <p>Two line items: $50 materials + $1,000 labor, 8% tax on materials, 10% contingency:</p>
          <div className="mt-3 rounded-xl bg-white/5 p-4 font-mono text-sm text-white/80">
            Subtotal = 1050 · Tax = 4 · Contingency = 105 · Total = 1159
          </div>
        </div>
      }
      related={[
        { href: "/calculators/concrete-slab/", label: "Concrete Slab Calculator" },
        { href: "/calculators/flooring/", label: "Flooring Calculator" },
        { href: "/calculators/paint/", label: "Paint Calculator" },
      ]}
      faqs={[
        {
          q: "Are prices from the site?",
          a: "No — every price is entered by you. The site does not provide market pricing.",
        },
        {
          q: "Is my data uploaded?",
          a: "No. Drafts are stored only in your browser on this device.",
        },
      ]}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <CalculatorCard>
          <h1 className="text-3xl font-bold text-white">Renovation Budget Calculator</h1>
          <p className="mt-2 text-white/70">Organize user-entered project costs into a planning budget.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            <InputGroup label="Project name (optional)">
              <GlassInput type="text" placeholder="Kitchen remodel" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            </InputGroup>

            {rows.map((r, idx) => (
              <div key={r.id} className="glass rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/80">Line item {idx + 1}</span>
                  {rows.length > 1 && (
                    <button type="button" onClick={() => remove(r.id)} className="text-white/50 hover:text-red-300" aria-label="Remove line item">✕</button>
                  )}
                </div>
                <InputGroup label="Description">
                  <GlassInput type="text" placeholder="Lumber" value={r.description} onChange={(e) => update(r.id, { description: e.target.value })} />
                </InputGroup>
                <InputGroup label="Category">
                  <GlassSelect value={r.category} onChange={(e) => update(r.id, { category: e.target.value as BudgetCategory })}>
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </GlassSelect>
                </InputGroup>
                <div className="grid grid-cols-2 gap-3">
                  <InputGroup label="Quantity">
                    <GlassInput type="number" inputMode="decimal" min="0" step="any" value={r.quantity} onChange={(e) => update(r.id, { quantity: e.target.value })} />
                  </InputGroup>
                  <InputGroup label="Unit cost" unit="USD">
                    <GlassInput type="number" inputMode="decimal" min="0" step="any" value={r.unitCost} onChange={(e) => update(r.id, { unitCost: e.target.value })} />
                  </InputGroup>
                </div>
                <label className="flex items-center gap-2 text-sm text-white/80">
                  <input type="checkbox" checked={r.taxable} onChange={(e) => update(r.id, { taxable: e.target.checked })} className="h-4 w-4 rounded border-white/30 bg-white/10" />
                  Taxable
                </label>
              </div>
            ))}

            <button type="button" onClick={add} className="w-full rounded-xl border border-dashed border-white/30 py-2.5 text-sm text-white/70 transition hover:bg-white/5 hover:text-white">
              + Add line item
            </button>

            <div className="grid grid-cols-2 gap-3">
              <InputGroup label="Tax rate" unit="%">
                <GlassInput type="number" inputMode="decimal" min="0" max="100" step="any" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
              </InputGroup>
              <InputGroup label="Contingency" unit="%">
                <GlassInput type="number" inputMode="decimal" min="0" max="100" step="any" value={contingency} onChange={(e) => setContingency(e.target.value)} />
              </InputGroup>
            </div>

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
              <h2 className="text-xl font-semibold text-white/80">Project budget</h2>
              <div className="mt-2 text-4xl font-bold text-white">
                ${result.total.toFixed(2)}
              </div>
              <BreakdownTable
                rows={[
                  ...CATEGORIES.map((c) => ({ label: c.label.replace("Equipment rental", "Equipment").replace("Permits/fees", "Permits"), value: `$${result.categorySubtotals[c.value].toFixed(2)}` })),
                  { label: "Subtotal", value: `$${result.subtotal.toFixed(2)}` },
                  { label: "Tax", value: `$${result.tax.toFixed(2)}` },
                  { label: "Contingency", value: `$${result.contingency.toFixed(2)}` },
                  { label: "Estimated total", value: `$${result.total.toFixed(2)}` },
                ]}
              />
              <button
                type="button"
                onClick={onExport}
                className="mt-4 w-full rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Export CSV
              </button>
            </ResultPanel>
          ) : (
            <ResultPanel>
              <div className="flex h-full min-h-[200px] flex-col items-center justify-center text-center text-white/60">
                <span className="text-5xl">💰</span>
                <p className="mt-3 text-sm">Add line items and click Calculate.</p>
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
