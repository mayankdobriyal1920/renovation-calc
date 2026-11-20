import { describe, it, expect } from "vitest";
import { calculateRenovationBudget } from "../../calculators/renovationBudget";

describe("calculateRenovationBudget", () => {
  it("computes totals", () => {
    const r = calculateRenovationBudget({
      items: [
        { description: "Lumber", category: "materials", quantity: 10, unitCost: 5, taxable: true },
        { description: "Labor", category: "labor", quantity: 20, unitCost: 50, taxable: false },
      ],
      taxRatePercent: 8,
      contingencyPercent: 10,
    });
    expect(r.lineTotals).toEqual([50, 1000]);
    expect(r.subtotal).toBe(1050);
    expect(r.taxableSubtotal).toBe(50);
    expect(r.tax).toBeCloseTo(4, 6);
    expect(r.contingency).toBe(105);
    expect(r.total).toBeCloseTo(1159, 6);
    expect(r.categorySubtotals.materials).toBe(50);
    expect(r.categorySubtotals.labor).toBe(1000);
  });
  it("throws on invalid", () => {
    expect(() =>
      calculateRenovationBudget({
        items: [],
        taxRatePercent: 200,
        contingencyPercent: 10,
      }),
    ).toThrow();
  });
});
