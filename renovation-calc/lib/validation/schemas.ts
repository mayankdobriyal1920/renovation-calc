import { z } from "zod";

/** Shared primitive schemas. */
export const positiveNumber = z.number().finite().positive();
export const nonNegativeNumber = z.number().finite().min(0);
export const percent0to100 = z.number().finite().min(0).max(100);
export const dimension = z.number().finite().positive().max(10000);

/** Concrete slab input schema. */
export const concreteSlabSchema = z.object({
  lengthFt: dimension,
  widthFt: dimension,
  thicknessIn: z.number().finite().positive().max(100),
  wastePercent: percent0to100,
  pricePerCubicYard: z.number().finite().positive().optional(),
});

/** Flooring input schema. */
export const flooringSchema = z.object({
  netAreaSqFt: z.number().finite().positive(),
  wastePercent: percent0to100,
  coveragePerBoxSqFt: z.number().finite().positive(),
  pricePerBox: z.number().finite().positive().optional(),
});

/** Paint input schema. */
export const paintSchema = z.object({
  grossWallAreaSqFt: z.number().finite().nonnegative(),
  excludedAreaSqFt: z.number().finite().nonnegative(),
  coats: z.number().int().positive().max(10),
  coveragePerGallonSqFt: z.number().finite().positive(),
  primerCoats: z.number().int().min(0).max(10).optional(),
  primerCoveragePerGallonSqFt: z.number().finite().positive().optional(),
  pricePerGallon: z.number().finite().positive().optional(),
});

/** Concrete slab input inferred type. */
export type ConcreteSlabSchema = z.infer<typeof concreteSlabSchema>;
