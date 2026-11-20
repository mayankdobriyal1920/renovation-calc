import { describe, it, expect } from "vitest";
import { calculateSquareFootage } from "../../calculators/squareFootage";

describe("calculateSquareFootage", () => {
  it("calculates a single rectangle in feet", () => {
    const r = calculateSquareFootage({
      rectangles: [{ length: 10, lengthUnit: "ft", width: 12, widthUnit: "ft", included: true }],
    });
    expect(r.totalSquareFeet).toBe(120);
    expect(r.totalSquareYards).toBeCloseTo(13.3333, 4);
    expect(r.totalSquareMeters).toBeCloseTo(11.148, 2);
    expect(r.perimeterFeet).toBe(44);
  });
  it("converts mixed units", () => {
    const r = calculateSquareFootage({
      rectangles: [{ length: 10, lengthUnit: "ft", width: 12, widthUnit: "in", included: true }],
    });
    expect(r.totalSquareFeet).toBeCloseTo(10, 6);
  });
  it("subtracts excluded areas", () => {
    const r = calculateSquareFootage({
      rectangles: [
        { length: 10, lengthUnit: "ft", width: 10, widthUnit: "ft", included: true },
        { length: 2, lengthUnit: "ft", width: 2, widthUnit: "ft", included: false },
      ],
    });
    expect(r.totalSquareFeet).toBe(96);
  });
  it("throws when subtracted exceeds included", () => {
    expect(() =>
      calculateSquareFootage({
        rectangles: [
          { length: 2, lengthUnit: "ft", width: 2, widthUnit: "ft", included: true },
          { length: 10, lengthUnit: "ft", width: 10, widthUnit: "ft", included: false },
        ],
      }),
    ).toThrow();
  });
  it("throws on invalid dimensions", () => {
    expect(() =>
      calculateSquareFootage({
        rectangles: [{ length: 0, lengthUnit: "ft", width: 10, widthUnit: "ft", included: true }],
      }),
    ).toThrow();
    expect(() => calculateSquareFootage({ rectangles: [] })).toThrow();
  });
});
