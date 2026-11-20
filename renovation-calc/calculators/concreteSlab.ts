export interface ConcreteSlabInput {
  lengthFt: number;
  widthFt: number;
  thicknessIn: number;
  wastePercent: number;
  pricePerCubicYard?: number;
}

export interface ConcreteSlabResult {
  volumeCubicFeet: number;
  volumeCubicYards: number;
  planningVolumeCubicYards: number;
  estimatedCost?: number;
}

export function calculateConcreteSlab(input: ConcreteSlabInput): ConcreteSlabResult {
  const values = [input.lengthFt, input.widthFt, input.thicknessIn, input.wastePercent];
  if (!values.every(Number.isFinite)) {
    throw new Error("All inputs must be valid numbers.");
  }
  if (
    input.lengthFt <= 0 ||
    input.widthFt <= 0 ||
    input.thicknessIn <= 0 ||
    input.wastePercent < 0 ||
    input.wastePercent > 100
  ) {
    throw new Error("Check dimensions and waste percentage.");
  }

  const thicknessFt = input.thicknessIn / 12;
  const volumeCubicFeet = input.lengthFt * input.widthFt * thicknessFt;
  const volumeCubicYards = volumeCubicFeet / 27;
  const planningVolumeCubicYards = volumeCubicYards * (1 + input.wastePercent / 100);

  const estimatedCost =
    input.pricePerCubicYard !== undefined && Number.isFinite(input.pricePerCubicYard)
      ? planningVolumeCubicYards * input.pricePerCubicYard
      : undefined;

  return { volumeCubicFeet, volumeCubicYards, planningVolumeCubicYards, estimatedCost };
}
