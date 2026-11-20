import { toFeet } from "../lib/units/length";
import type { LengthUnit } from "../lib/units/length";

export interface FlooringRoomInput {
  length: number;
  lengthUnit: LengthUnit;
  width: number;
  widthUnit: LengthUnit;
}

export interface FlooringInput {
  rooms: FlooringRoomInput[];
  wastePercent: number;
  coveragePerBoxSqFt: number;
  pricePerBox?: number;
}

export interface FlooringResult {
  netAreaSqFt: number;
  purchaseAreaSqFt: number;
  boxesRequired: number;
  actualCoveragePurchasedSqFt: number;
  estimatedCost?: number;
}

export function calculateFlooring(input: FlooringInput): FlooringResult {
  if (!input || !Array.isArray(input.rooms) || input.rooms.length === 0) {
    throw new Error("At least one room is required.");
  }
  if (!Number.isFinite(input.wastePercent) || input.wastePercent < 0 || input.wastePercent > 100) {
    throw new Error("Waste percentage must be between 0 and 100.");
  }
  if (!Number.isFinite(input.coveragePerBoxSqFt) || input.coveragePerBoxSqFt <= 0) {
    throw new Error("Coverage per box must be greater than zero.");
  }

  let netArea = 0;
  for (const r of input.rooms) {
    if (!Number.isFinite(r.length) || !Number.isFinite(r.width) || r.length <= 0 || r.width <= 0) {
      throw new Error("Room dimensions must be positive numbers.");
    }
    const lFt = toFeet(r.length, r.lengthUnit);
    const wFt = toFeet(r.width, r.widthUnit);
    netArea += lFt * wFt;
  }

  const purchaseArea = netArea * (1 + input.wastePercent / 100);
  const boxesRequired = Math.ceil(purchaseArea / input.coveragePerBoxSqFt);
  const actualCoveragePurchased = boxesRequired * input.coveragePerBoxSqFt;

  const estimatedCost =
    input.pricePerBox !== undefined && Number.isFinite(input.pricePerBox)
      ? boxesRequired * input.pricePerBox
      : undefined;

  return {
    netAreaSqFt: netArea,
    purchaseAreaSqFt: purchaseArea,
    boxesRequired,
    actualCoveragePurchasedSqFt: actualCoveragePurchased,
    estimatedCost,
  };
}
