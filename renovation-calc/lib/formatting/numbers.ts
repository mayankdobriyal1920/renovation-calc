/**
 * Number formatting helpers for calculator display.
 * Round only for display; keep full precision internally.
 */

/** Format a number with a fixed number of decimals. */
export function formatNumber(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Format a number as US currency (no symbol by default prefix). */
export function formatCurrency(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Format with units, e.g. "1.23 yd³". */
export function formatWithUnit(value: number, unit: string, decimals = 2): string {
  return `${formatNumber(value, decimals)} ${unit}`;
}

/** Round up to the nearest integer (for box counts, picket counts, etc.). */
export function ceilToInteger(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.ceil(value);
}

/** Format a percentage. */
export function formatPercent(value: number, decimals = 1): string {
  if (!Number.isFinite(value)) return "—";
  return `${formatNumber(value, decimals)}%`;
}
