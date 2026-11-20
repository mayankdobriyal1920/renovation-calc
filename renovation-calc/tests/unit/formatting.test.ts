import { describe, it, expect } from "vitest";
import { formatNumber, formatCurrency, ceilToInteger, formatPercent } from "../../lib/formatting";

describe("formatting helpers", () => {
  it("formats numbers", () => {
    expect(formatNumber(1234.5, 2)).toBe("1,234.50");
  });
  it("formats currency", () => {
    expect(formatCurrency(12.5)).toBe("$12.50");
  });
  it("ceils", () => {
    expect(ceilToInteger(6.1)).toBe(7);
    expect(ceilToInteger(NaN)).toBe(0);
  });
  it("formats percent", () => {
    expect(formatPercent(12.345, 1)).toBe("12.3%");
  });
});
