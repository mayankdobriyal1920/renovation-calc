import { describe, it, expect } from "vitest";
import { calculateFence } from "../../calculators/fence";

describe("calculateFence", () => {
  it("calculates a basic straight run", () => {
    const r = calculateFence({
      fenceLengthFt: 50,
      maxPostSpacingFt: 8,
      fenceHeightFt: 6,
      railsPerSection: 3,
      picketFaceWidthIn: 3.5,
      picketGapIn: 0.5,
    });
    expect(r.spans).toBe(7);
    expect(r.posts).toBe(8);
    expect(r.actualSpanLengthFt).toBeCloseTo(7.142857, 4);
    expect(r.rails).toBe(21);
    expect(r.picketPitchIn).toBe(4);
    expect(r.pickets).toBe(150);
  });
  it("throws on invalid inputs", () => {
    expect(() =>
      calculateFence({
        fenceLengthFt: 0,
        maxPostSpacingFt: 8,
        fenceHeightFt: 6,
        railsPerSection: 3,
        picketFaceWidthIn: 3.5,
        picketGapIn: 0.5,
      }),
    ).toThrow();
    expect(() =>
      calculateFence({
        fenceLengthFt: 50,
        maxPostSpacingFt: 8,
        fenceHeightFt: 6,
        railsPerSection: 0,
        picketFaceWidthIn: 3.5,
        picketGapIn: 0.5,
      }),
    ).toThrow();
  });
});
