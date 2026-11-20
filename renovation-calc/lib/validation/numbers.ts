/**
 * Number validation helpers for calculator inputs.
 *
 * Calculators receive raw string values from form fields. These helpers
 * convert and validate them without throwing, returning either a valid
 * number or a human-readable error message.
 */

export type ValidationResult = { ok: true; value: number } | { ok: false; error: string };

/** Parse a raw string into a finite number. */
export function parseNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n)) return null;
  return n;
}

/** Validate that a raw string is a finite number. */
export function validateNumber(raw: string, label = "Value"): ValidationResult {
  const n = parseNumber(raw);
  if (n === null) {
    return { ok: false, error: `${label} must be a valid number.` };
  }
  return { ok: true, value: n };
}

/** Validate that a value is a positive number (> 0). */
export function validatePositive(raw: string, label = "Value"): ValidationResult {
  const base = validateNumber(raw, label);
  if (!base.ok) return base;
  if (base.value <= 0) {
    return { ok: false, error: `${label} must be greater than zero.` };
  }
  return base;
}

/** Validate that a value is a non-negative number (>= 0). */
export function validateNonNegative(raw: string, label = "Value"): ValidationResult {
  const base = validateNumber(raw, label);
  if (!base.ok) return base;
  if (base.value < 0) {
    return { ok: false, error: `${label} cannot be negative.` };
  }
  return base;
}

/** Validate that a value falls within [min, max]. */
export function validateRange(
  raw: string,
  min: number,
  max: number,
  label = "Value",
): ValidationResult {
  const base = validateNumber(raw, label);
  if (!base.ok) return base;
  if (base.value < min || base.value > max) {
    return { ok: false, error: `${label} must be between ${min} and ${max}.` };
  }
  return base;
}

/** Validate a percentage in the range 0..100. */
export function validatePercent(raw: string, label = "Percentage"): ValidationResult {
  return validateRange(raw, 0, 100, label);
}

/** Validate a dimension with a sensible upper bound (e.g. 10000). */
export function validateDimension(raw: string, label = "Dimension", max = 10000): ValidationResult {
  const base = validatePositive(raw, label);
  if (!base.ok) return base;
  if (base.value > max) {
    return { ok: false, error: `${label} is unrealistically large (max ${max}).` };
  }
  return base;
}

/**
 * Validate a set of named fields at once.
 * Returns an object mapping field name -> error message (only invalid fields).
 */
export function validateFields(
  fields: Record<string, { raw: string; validate: (raw: string) => ValidationResult }>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const [name, { raw, validate }] of Object.entries(fields)) {
    const res = validate(raw);
    if (!res.ok) errors[name] = res.error;
  }
  return errors;
}

/** True if an errors object has no entries. */
export function hasNoErrors(errors: Record<string, string>): boolean {
  return Object.keys(errors).length === 0;
}
