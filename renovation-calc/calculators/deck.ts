export type BoardDirection = "along-length" | "along-width";

export interface DeckInput {
  deckLengthFt: number;
  deckWidthFt: number;
  boardDirection: BoardDirection;
  boardFaceWidthIn: number;
  boardGapIn: number;
  joistSpacingFt: number;
  wastePercent: number;
  pricePerBoardLinearFt?: number;
  pricePerJoist?: number;
}

export interface DeckResult {
  surfaceAreaSqFt: number;
  boardRows: number;
  totalBoardLinearFt: number;
  planningBoardLinearFt: number;
  joistCount: number;
  estimatedCost?: number;
}

export function calculateDeck(input: DeckInput): DeckResult {
  if (!Number.isFinite(input.deckLengthFt) || input.deckLengthFt <= 0) {
    throw new Error("Deck length must be greater than zero.");
  }
  if (!Number.isFinite(input.deckWidthFt) || input.deckWidthFt <= 0) {
    throw new Error("Deck width must be greater than zero.");
  }
  if (!Number.isFinite(input.boardFaceWidthIn) || input.boardFaceWidthIn <= 0) {
    throw new Error("Board face width must be greater than zero.");
  }
  if (!Number.isFinite(input.boardGapIn) || input.boardGapIn < 0) {
    throw new Error("Board gap cannot be negative.");
  }
  if (!Number.isFinite(input.joistSpacingFt) || input.joistSpacingFt <= 0) {
    throw new Error("Joist spacing must be greater than zero.");
  }
  if (!Number.isFinite(input.wastePercent) || input.wastePercent < 0 || input.wastePercent > 100) {
    throw new Error("Waste percentage must be between 0 and 100.");
  }

  const boardPitchFt = (input.boardFaceWidthIn + input.boardGapIn) / 12;

  let boardRows: number;
  let totalBoardLinearFt: number;
  let joistCount: number;

  if (input.boardDirection === "along-length") {
    boardRows = Math.ceil(input.deckWidthFt / boardPitchFt);
    totalBoardLinearFt = boardRows * input.deckLengthFt;
    joistCount = Math.ceil(input.deckLengthFt / input.joistSpacingFt) + 1;
  } else {
    boardRows = Math.ceil(input.deckLengthFt / boardPitchFt);
    totalBoardLinearFt = boardRows * input.deckWidthFt;
    joistCount = Math.ceil(input.deckWidthFt / input.joistSpacingFt) + 1;
  }

  const planningBoardLinearFt = totalBoardLinearFt * (1 + input.wastePercent / 100);

  let estimatedCost: number | undefined;
  if (
    (input.pricePerBoardLinearFt !== undefined && Number.isFinite(input.pricePerBoardLinearFt)) ||
    (input.pricePerJoist !== undefined && Number.isFinite(input.pricePerJoist))
  ) {
    estimatedCost = 0;
    if (input.pricePerBoardLinearFt !== undefined && Number.isFinite(input.pricePerBoardLinearFt)) {
      estimatedCost += planningBoardLinearFt * input.pricePerBoardLinearFt;
    }
    if (input.pricePerJoist !== undefined && Number.isFinite(input.pricePerJoist)) {
      estimatedCost += joistCount * input.pricePerJoist;
    }
  }

  return {
    surfaceAreaSqFt: input.deckLengthFt * input.deckWidthFt,
    boardRows,
    totalBoardLinearFt,
    planningBoardLinearFt,
    joistCount,
    estimatedCost,
  };
}
