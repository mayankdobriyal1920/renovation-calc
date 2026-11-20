import { describe, it, expect } from "vitest";
import { sanitizeCsvCell, toCsv } from "../../lib/formatting";

describe("csv helpers", () => {
  it("sanitizes formula injection", () => {
    expect(sanitizeCsvCell("=1+1")).toBe("'=1+1");
    expect(sanitizeCsvCell("+cmd")).toBe("'+cmd");
    expect(sanitizeCsvCell("-1")).toBe("'-1");
    expect(sanitizeCsvCell("@SUM")).toBe("'@SUM");
    expect(sanitizeCsvCell("safe")).toBe("safe");
  });
  it("builds csv", () => {
    const out = toCsv([["a", "b"], ["=x", 5]]);
    expect(out).toContain("'=x");
  });
});
