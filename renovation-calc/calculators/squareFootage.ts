import { toFeet, squareFeetToSquareYards, squareFeetToSquareMeters } from "../lib/units/length";
import type { LengthUnit } from "../lib/units/length";

export interface RectangleInput {
  length: number;
  lengthUnit: LengthUnit;
  width: number;
  widthUnit: LengthUnit;
  /** true = add this area, false = subtract (e.g. an opening). */
  included: boolean;
}

export interface SquareFootageInput {
  rectangles: RectangleInput[];
}

export interface SquareFootageResult {
  totalSquareFeet: number;
  totalSquareYards: number;
  totalSquareMeters: number;
  /** Perimeter in feet, provided when there is exactly one rectangle. */
  perimeterFeet?: number;
}

export function calculateSquareFootage(input: SquareFootageInput): SquareFootageResult {
  if (!input || !Array.isArray(input.rectangles) || input.rectangles.length === 0) {
    throw new Error("At least one rectangle is required.");
  }

  let total = 0;
  for (const r of input.rectangles) {
    if (!Number.isFinite(r.length) || !Number.isFinite(r.width)) {
      throw new Error("Dimensions must be valid numbers.");
    }
    if (r.length <= 0 || r.width <= 0) {
      throw new Error("Dimensions must be greater than zero.");
    }
    const lFt = toFeet(r.length, r.lengthUnit);
    const wFt = toFeet(r.width, r.widthUnit);
    const area = lFt * wFt;
    total += r.included ? area : -area;
  }

  if (total < 0) {
    throw new Error("Subtracted area cannot exceed included area.");
  }

  const result: SquareFootageResult = {
    totalSquareFeet: total,
    totalSquareYards: squareFeetToSquareYards(total),
    totalSquareMeters: squareFeetToSquareMeters(total),
  };

  if (input.rectangles.length === 1) {
    const r = input.rectangles[0];
    const lFt = toFeet(r.length, r.lengthUnit);
    const wFt = toFeet(r.width, r.widthUnit);
    result.perimeterFeet = 2 * (lFt + wFt);
  }

  return result;
}
