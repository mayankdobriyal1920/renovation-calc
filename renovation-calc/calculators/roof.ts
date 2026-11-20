export interface RoofPlaneInput {
  lengthFt: number;
  widthFt: number;
  pitchRisePer12: number;
}

export interface RoofInput {
  planes: RoofPlaneInput[];
  wastePercent: number;
  coveragePerUnitSqFt?: number;
  pricePerUnit?: number;
}

export interface RoofPlaneResult {
  horizontalAreaSqFt: number;
  slopeFactor: number;
  slopedAreaSqFt: number;
}

export interface RoofResult {
  totalHorizontalAreaSqFt: number;
  totalSlopedAreaSqFt: number;
  overallSlopeFactor: number;
  planningAreaSqFt: number;
  unitsRequired?: number;
  estimatedCost?: number;
  planes: RoofPlaneResult[];
}

export function slopeFactorForPitch(pitchRisePer12: number): number {
  if (!Number.isFinite(pitchRisePer12) || pitchRisePer12 < 0) {
    throw new Error("Pitch must be a non-negative number.");
  }
  return Math.sqrt(1 + Math.pow(pitchRisePer12 / 12, 2));
}

export function calculateRoof(input: RoofInput): RoofResult {
  if (!input || !Array.isArray(input.planes) || input.planes.length === 0) {
    throw new Error("At least one roof plane is required.");
  }
  if (!Number.isFinite(input.wastePercent) || input.wastePercent < 0 || input.wastePercent > 100) {
    throw new Error("Waste percentage must be between 0 and 100.");
  }

  const planes: RoofPlaneResult[] = [];
  let totalHorizontal = 0;
  let totalSloped = 0;

  for (const p of input.planes) {
    if (!Number.isFinite(p.lengthFt) || !Number.isFinite(p.widthFt) || p.lengthFt <= 0 || p.widthFt <= 0) {
      throw new Error("Plane dimensions must be positive numbers.");
    }
    const factor = slopeFactorForPitch(p.pitchRisePer12);
    const horizontal = p.lengthFt * p.widthFt;
    const sloped = horizontal * factor;
    planes.push({ horizontalAreaSqFt: horizontal, slopeFactor: factor, slopedAreaSqFt: sloped });
    totalHorizontal += horizontal;
    totalSloped += sloped;
  }

  const overallFactor = totalHorizontal > 0 ? totalSloped / totalHorizontal : 1;
  const planningArea = totalSloped * (1 + input.wastePercent / 100);

  let unitsRequired: number | undefined;
  if (input.coveragePerUnitSqFt !== undefined && Number.isFinite(input.coveragePerUnitSqFt) && input.coveragePerUnitSqFt > 0) {
    unitsRequired = Math.ceil(planningArea / input.coveragePerUnitSqFt);
  }

  const estimatedCost =
    unitsRequired !== undefined && input.pricePerUnit !== undefined && Number.isFinite(input.pricePerUnit)
      ? unitsRequired * input.pricePerUnit
      : undefined;

  return {
    totalHorizontalAreaSqFt: totalHorizontal,
    totalSlopedAreaSqFt: totalSloped,
    overallSlopeFactor: overallFactor,
    planningAreaSqFt: planningArea,
    unitsRequired,
    estimatedCost,
    planes,
  };
}
