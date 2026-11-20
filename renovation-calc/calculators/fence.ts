export interface FenceInput {
  fenceLengthFt: number;
  maxPostSpacingFt: number;
  fenceHeightFt: number;
  railsPerSection: number;
  picketFaceWidthIn: number;
  picketGapIn: number;
  pricePerPost?: number;
  pricePerRail?: number;
  pricePerPicket?: number;
}

export interface FenceResult {
  spans: number;
  posts: number;
  actualSpanLengthFt: number;
  rails: number;
  picketPitchIn: number;
  pickets: number;
  estimatedCost?: number;
}

export function calculateFence(input: FenceInput): FenceResult {
  if (!Number.isFinite(input.fenceLengthFt) || input.fenceLengthFt <= 0) {
    throw new Error("Fence length must be greater than zero.");
  }
  if (!Number.isFinite(input.maxPostSpacingFt) || input.maxPostSpacingFt <= 0) {
    throw new Error("Post spacing must be greater than zero.");
  }
  if (!Number.isFinite(input.fenceHeightFt) || input.fenceHeightFt <= 0) {
    throw new Error("Fence height must be greater than zero.");
  }
  if (!Number.isFinite(input.railsPerSection) || input.railsPerSection < 1 || !Number.isInteger(input.railsPerSection)) {
    throw new Error("Rails per section must be a positive whole number.");
  }
  if (!Number.isFinite(input.picketFaceWidthIn) || input.picketFaceWidthIn <= 0) {
    throw new Error("Picket face width must be greater than zero.");
  }
  if (!Number.isFinite(input.picketGapIn) || input.picketGapIn < 0) {
    throw new Error("Picket gap cannot be negative.");
  }

  const spans = Math.ceil(input.fenceLengthFt / input.maxPostSpacingFt);
  const posts = spans + 1;
  const actualSpanLengthFt = input.fenceLengthFt / spans;
  const rails = spans * input.railsPerSection;
  const picketPitchIn = input.picketFaceWidthIn + input.picketGapIn;
  const picketPitchFt = picketPitchIn / 12;
  const pickets = Math.ceil(input.fenceLengthFt / picketPitchFt);

  let estimatedCost: number | undefined;
  const hasPrices =
    input.pricePerPost !== undefined ||
    input.pricePerRail !== undefined ||
    input.pricePerPicket !== undefined;
  if (hasPrices) {
    estimatedCost = 0;
    if (input.pricePerPost !== undefined && Number.isFinite(input.pricePerPost)) {
      estimatedCost += posts * input.pricePerPost;
    }
    if (input.pricePerRail !== undefined && Number.isFinite(input.pricePerRail)) {
      estimatedCost += rails * input.pricePerRail;
    }
    if (input.pricePerPicket !== undefined && Number.isFinite(input.pricePerPicket)) {
      estimatedCost += pickets * input.pricePerPicket;
    }
  }

  return { spans, posts, actualSpanLengthFt, rails, picketPitchIn, pickets, estimatedCost };
}
