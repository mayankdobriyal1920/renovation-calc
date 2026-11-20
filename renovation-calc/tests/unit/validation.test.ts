import { describe, it, expect } from "vitest";
import {
  parseNumber,
  validatePositive,
  validatePercent,
  validateDimension,
  validateFields,
  hasNoErrors,
} from "../../lib/validation";

describe("validation helpers", () => {
  it("parses numbers", () => {
    expect(parseNumber("  3.5 ")).toBe(3.5);
    expect(parseNumber("")).toBeNull();
    expect(parseNumber("abc")).toBeNull();
    expect(parseNumber("NaN")).toBeNull();
  });
  it("validates positive", () => {
    expect(validatePositive("5").ok).toBe(true);
    expect(validatePositive("0").ok).toBe(false);
    expect(validatePositive("-1").ok).toBe(false);
    expect(validatePositive("x").ok).toBe(false);
  });
  it("validates percent", () => {
    expect(validatePercent("50").ok).toBe(true);
    expect(validatePercent("101").ok).toBe(false);
    expect(validatePercent("-1").ok).toBe(false);
  });
  it("validates dimension upper bound", () => {
    expect(validateDimension("5").ok).toBe(true);
    expect(validateDimension("20000").ok).toBe(false);
  });
  it("validates multiple fields", () => {
    const errors = validateFields({
      length: { raw: "10", validate: (r) => validatePositive(r, "Length") },
      width: { raw: "0", validate: (r) => validatePositive(r, "Width") },
    });
    expect(errors.length).toBeUndefined();
    expect(errors.width).toBeDefined();
    expect(hasNoErrors(errors)).toBe(false);
  });
});
