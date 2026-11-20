import { describe, it, expect } from "vitest";
import { calculateRoof, slopeFactorForPitch } from "../../calculators/roof";

describe("slopeFactorForPitch", () => {
  it("6/12 pitch", () => {
    expect(slopeFactorForPitch(6)).toBeCloseTo(1.118034, 6);
  });
});

describe("calculateRoof", () => {
  it("matches reference: 6/12 pitch, 1000 sqft", () => {
    const r = calculateRoof({
      planes: [{ lengthFt: 100, widthFt: 10, pitchRisePer12: 6 }],
      wastePercent: 0,
    });
    expect(r.totalHorizontalAreaSqFt).toBe(1000);
    expect(r.totalSlopedAreaSqFt).toBeCloseTo(1118.03, 2);
    expect(r.overallSlopeFactor).toBeCloseTo(1.118034, 6);
  });
  it("sums multiple planes", () => {
    const r = calculateRoof({
      planes: [
        { lengthFt: 10, widthFt: 10, pitchRisePer12: 4 },
        { lengthFt: 10, widthFt: 10, pitchRisePer12: 8 },
      ],
      wastePercent: 10,
    });
    expect(r.planes.length).toBe(2);
    expect(r.totalHorizontalAreaSqFt).toBe(200);
  });
  it("computes units and cost", () => {
    const r = calculateRoof({
      planes: [{ lengthFt: 100, widthFt: 10, pitchRisePer12: 6 }],
      wastePercent: 10,
      coveragePerUnitSqFt: 100,
      pricePerUnit: 50,
    });
    expect(r.unitsRequired).toBe(Math.ceil((1118.034 * 1.1) / 100));
  });
  it("throws on invalid inputs", () => {
    expect(() =>
      calculateRoof({ planes: [], wastePercent: 0 }),
    ).toThrow();
  });
});
