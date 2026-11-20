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
  });
});
