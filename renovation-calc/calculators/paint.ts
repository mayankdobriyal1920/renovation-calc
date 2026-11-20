import { toFeet } from "../lib/units/length";
import type { LengthUnit } from "../lib/units/length";

export interface PaintWallInput {
  length: number;
  lengthUnit: LengthUnit;
  height: number;
  heightUnit: LengthUnit;
}

export interface PaintCeilingInput {
  length: number;
  lengthUnit: LengthUnit;
  width: number;
  widthUnit: LengthUnit;
}

export interface PaintInput {
  walls: PaintWallInput[];
  ceiling?: PaintCeilingInput;
  excludedAreaSqFt: number;
  coats: number;
  coveragePerGallonSqFt: number;
  primerCoats?: number;
  primerCoveragePerGallonSqFt?: number;
  pricePerGallon?: number;
}

export interface PaintResult {
  grossAreaSqFt: number;
  excludedAreaSqFt: number;
  netPaintableAreaSqFt: number;
  requiredPaintAreaSqFt: number;
  paintGallonsRequired: number;
  paintGallonsToPurchase: number;
  primerGallonsRequired?: number;
  primerGallonsToPurchase?: number;
  estimatedCost?: number;
}

export function calculatePaint(input: PaintInput): PaintResult {
  if (!input || !Array.isArray(input.walls) || input.walls.length === 0) {
    throw new Error("At least one wall is required.");
  }
  if (!Number.isFinite(input.coats) || input.coats < 1 || input.coats > 10) {
    throw new Error("Number of coats must be between 1 and 10.");
  }
  if (!Number.isFinite(input.coveragePerGallonSqFt) || input.coveragePerGallonSqFt <= 0) {
    throw new Error("Coverage per gallon must be greater than zero.");
  }
  if (!Number.isFinite(input.excludedAreaSqFt) || input.excludedAreaSqFt < 0) {
    throw new Error("Excluded area cannot be negative.");
  }

  let gross = 0;
  for (const w of input.walls) {
    if (!Number.isFinite(w.length) || !Number.isFinite(w.height) || w.length <= 0 || w.height <= 0) {
      throw new Error("Wall dimensions must be positive numbers.");
    }
    const lFt = toFeet(w.length, w.lengthUnit);
    const hFt = toFeet(w.height, w.heightUnit);
    gross += lFt * hFt;
  }

  if (input.ceiling) {
    const c = input.ceiling;
    if (!Number.isFinite(c.length) || !Number.isFinite(c.width) || c.length <= 0 || c.width <= 0) {
      throw new Error("Ceiling dimensions must be positive numbers.");
    }
    const lFt = toFeet(c.length, c.lengthUnit);
    const wFt = toFeet(c.width, c.widthUnit);
    gross += lFt * wFt;
  }

  if (input.excludedAreaSqFt > gross) {
    throw new Error("Excluded area cannot exceed gross paintable area.");
  }

  const net = gross - input.excludedAreaSqFt;
  const requiredPaintArea = net * input.coats;
  const paintGallonsRequired = requiredPaintArea / input.coveragePerGallonSqFt;
  const paintGallonsToPurchase = Math.ceil(paintGallonsRequired);

  let primerGallonsRequired: number | undefined;
  let primerGallonsToPurchase: number | undefined;
  if (input.primerCoats && input.primerCoats > 0) {
    if (!input.primerCoveragePerGallonSqFt || input.primerCoveragePerGallonSqFt <= 0) {
      throw new Error("Primer coverage per gallon must be greater than zero.");
    }
    const primerArea = net * input.primerCoats;
    primerGallonsRequired = primerArea / input.primerCoveragePerGallonSqFt;
    primerGallonsToPurchase = Math.ceil(primerGallonsRequired);
  }

  const estimatedCost =
    input.pricePerGallon !== undefined && Number.isFinite(input.pricePerGallon)
      ? paintGallonsToPurchase * input.pricePerGallon +
        (primerGallonsToPurchase ?? 0) * input.pricePerGallon
      : undefined;

  return {
    grossAreaSqFt: gross,
    excludedAreaSqFt: input.excludedAreaSqFt,
    netPaintableAreaSqFt: net,
    requiredPaintAreaSqFt: requiredPaintArea,
    paintGallonsRequired,
    paintGallonsToPurchase,
    primerGallonsRequired,
    primerGallonsToPurchase,
    estimatedCost,
  };
}
