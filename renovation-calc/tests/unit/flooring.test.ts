import { describe, it, expect } from "vitest";
import { calculateFlooring } from "../../calculators/flooring";

describe("calculateFlooring", () => {
  it("matches reference: 10x12 room, 10% waste, 20 sqft/box", () => {
    const r = calculateFlooring({
      rooms: [{ length: 10, lengthUnit: "ft", width: 12, widthUnit: "ft" }],
      wastePercent: 10,
      coveragePerBoxSqFt: 20,
    });
    expect(r.netAreaSqFt).toBe(120);
    expect(r.purchaseAreaSqFt).toBe(132);
    expect(r.boxesRequired).toBe(7);
    expect(r.actualCoveragePurchasedSqFt).toBe(140);
  });
  it("sums multiple rooms", () => {
    const r = calculateFlooring({
      rooms: [
        { length: 10, lengthUnit: "ft", width: 10, widthUnit: "ft" },
        { length: 5, lengthUnit: "ft", width: 5, widthUnit: "ft" },
      ],
      wastePercent: 0,
      coveragePerBoxSqFt: 25,
    });
    expect(r.netAreaSqFt).toBe(125);
    expect(r.boxesRequired).toBe(5);
  });
  it("computes cost when price provided", () => {
    const r = calculateFlooring({
      rooms: [{ length: 10, lengthUnit: "ft", width: 12, widthUnit: "ft" }],
      wastePercent: 10,
      coveragePerBoxSqFt: 20,
      pricePerBox: 30,
    });
    expect(r.estimatedCost).toBe(210);
  });
  it("throws on invalid inputs", () => {
    expect(() =>
      calculateFlooring({ rooms: [], wastePercent: 10, coveragePerBoxSqFt: 20 }),
    ).toThrow();
    expect(() =>
      calculateFlooring({
        rooms: [{ length: 10, lengthUnit: "ft", width: 12, widthUnit: "ft" }],
        wastePercent: 10,
        coveragePerBoxSqFt: 0,
      }),
    ).toThrow();
  });
});
