import { describe, it, expect } from "vitest";
import { calculatePaint } from "../../calculators/paint";

describe("calculatePaint", () => {
  it("calculates walls only", () => {
    const r = calculatePaint({
      walls: [{ length: 10, lengthUnit: "ft", height: 8, heightUnit: "ft" }],
      excludedAreaSqFt: 0,
      coats: 2,
      coveragePerGallonSqFt: 350,
    });
    expect(r.grossAreaSqFt).toBe(80);
    expect(r.netPaintableAreaSqFt).toBe(80);
    expect(r.requiredPaintAreaSqFt).toBe(160);
    expect(r.paintGallonsRequired).toBeCloseTo(0.4571, 4);
    expect(r.paintGallonsToPurchase).toBe(1);
  });
  it("subtracts openings and adds ceiling", () => {
    const r = calculatePaint({
      walls: [{ length: 10, lengthUnit: "ft", height: 8, heightUnit: "ft" }],
      ceiling: { length: 10, lengthUnit: "ft", width: 10, widthUnit: "ft" },
      excludedAreaSqFt: 20,
      coats: 1,
      coveragePerGallonSqFt: 400,
    });
    expect(r.grossAreaSqFt).toBe(180);
    expect(r.netPaintableAreaSqFt).toBe(160);
  });
  it("calculates primer separately", () => {
    const r = calculatePaint({
      walls: [{ length: 10, lengthUnit: "ft", height: 8, heightUnit: "ft" }],
      excludedAreaSqFt: 0,
      coats: 2,
      coveragePerGallonSqFt: 350,
      primerCoats: 1,
      primerCoveragePerGallonSqFt: 300,
    });
    expect(r.primerGallonsRequired).toBeCloseTo(0.2667, 4);
    expect(r.primerGallonsToPurchase).toBe(1);
  });
  it("throws on invalid inputs", () => {
    expect(() =>
      calculatePaint({
        walls: [],
        excludedAreaSqFt: 0,
        coats: 2,
        coveragePerGallonSqFt: 350,
      }),
    ).toThrow();
    expect(() =>
      calculatePaint({
        walls: [{ length: 10, lengthUnit: "ft", height: 8, heightUnit: "ft" }],
        excludedAreaSqFt: 1000,
        coats: 2,
        coveragePerGallonSqFt: 350,
      }),
    ).toThrow();
  });
});
