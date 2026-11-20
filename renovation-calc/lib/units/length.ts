export type LengthUnit = "ft" | "in" | "m" | "cm";

export function toFeet(value: number, unit: LengthUnit): number {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error("Dimension must be a positive number.");
  }
  switch (unit) {
    case "ft":
      return value;
    case "in":
      return value / 12;
    case "m":
      return value * 3.280839895;
    case "cm":
      return value / 30.48;
  }
}

export function squareFeetToSquareYards(sqFt: number): number {
  return sqFt / 9;
}

export function squareFeetToSquareMeters(sqFt: number): number {
  return sqFt * 0.09290304;
}
