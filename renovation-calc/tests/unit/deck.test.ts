import { describe, it, expect } from "vitest";
import { calculateDeck } from "../../calculators/deck";

describe("calculateDeck", () => {
  it("calculates boards along length", () => {
    const r = calculateDeck({
      deckLengthFt: 12,
      deckWidthFt: 10,
      boardDirection: "along-length",
      boardFaceWidthIn: 5.5,
      boardGapIn: 0.125,
      joistSpacingFt: 16 / 12,
      wastePercent: 10,
    });
    expect(r.surfaceAreaSqFt).toBe(120);
    expect(r.boardRows).toBe(Math.ceil(10 / ((5.5 + 0.125) / 12)));
    expect(r.joistCount).toBe(Math.ceil(12 / (16 / 12)) + 1);
  });
  it("throws on invalid inputs", () => {
    expect(() =>
      calculateDeck({
        deckLengthFt: 0,
        deckWidthFt: 10,
        boardDirection: "along-length",
        boardFaceWidthIn: 5.5,
        boardGapIn: 0.125,
        joistSpacingFt: 1.333,
        wastePercent: 10,
      }),
    ).toThrow();
  });
});
