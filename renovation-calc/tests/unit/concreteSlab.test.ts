import { describe, it, expect } from "vitest";
import { calculateConcreteSlab } from "../../calculators/concreteSlab";

describe("calculateConcreteSlab", () => {
  it("calculates a 10x10x4in slab with 0% waste", () => {
    const r = calculateConcreteSlab({ lengthFt: 10, widthFt: 10, thicknessIn: 4, wastePercent: 0 });
    expect(r.volumeCubicFeet).toBeCloseTo(33.3333333, 6);
    expect(r.volumeCubicYards).toBeCloseTo(1.2345679, 6);
    expect(r.planningVolumeCubicYards).toBeCloseTo(1.2345679, 6);
  });
  it("applies waste allowance", () => {
    const r = calculateConcreteSlab({ lengthFt: 10, widthFt: 10, thicknessIn: 4, wastePercent: 10 });
    expect(r.planningVolumeCubicYards).toBeCloseTo(1.3580247, 6);
  });
  it("throws on invalid inputs", () => {
    expect(() => calculateConcreteSlab({ lengthFt: 0, widthFt: 10, thicknessIn: 4, wastePercent: 0 })).toThrow();
    expect(() => calculateConcreteSlab({ lengthFt: 10, widthFt: 10, thicknessIn: 4, wastePercent: 150 })).toThrow();
    expect(() => calculateConcreteSlab({ lengthFt: NaN, widthFt: 10, thicknessIn: 4, wastePercent: 0 })).toThrow();
  });
  it("handles decimal dimensions", () => {
    const r = calculateConcreteSlab({ lengthFt: 10.5, widthFt: 9.25, thicknessIn: 4.5, wastePercent: 5 });
    expect(r.volumeCubicFeet).toBeCloseTo(10.5 * 9.25 * (4.5 / 12), 6);
  });
  it("handles large values", () => {
    const r = calculateConcreteSlab({ lengthFt: 1000, widthFt: 1000, thicknessIn: 12, wastePercent: 0 });
    expect(r.volumeCubicFeet).toBe(1000000);
  });
  it("waste boundaries 0 and 100", () => {
    const r0 = calculateConcreteSlab({ lengthFt: 10, widthFt: 10, thicknessIn: 4, wastePercent: 0 });
    const r100 = calculateConcreteSlab({ lengthFt: 10, widthFt: 10, thicknessIn: 4, wastePercent: 100 });
    expect(r100.planningVolumeCubicYards).toBeCloseTo(r0.volumeCubicYards * 2, 6);
  });
  it("computes cost with user price", () => {
    const r = calculateConcreteSlab({ lengthFt: 10, widthFt: 10, thicknessIn: 4, wastePercent: 0, pricePerCubicYard: 150 });
    expect(r.estimatedCost).toBeCloseTo(1.2345679 * 150, 4);
  });
  it("rejects negative waste", () => {
    expect(() => calculateConcreteSlab({ lengthFt: 10, widthFt: 10, thicknessIn: 4, wastePercent: -1 })).toThrow();
  });
});
