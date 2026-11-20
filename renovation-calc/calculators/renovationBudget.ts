export type BudgetCategory =
  | "materials"
  | "labor"
  | "delivery"
  | "equipment"
  | "permits"
  | "other";

export interface BudgetLineItem {
  description: string;
  category: BudgetCategory;
  quantity: number;
  unitCost: number;
  taxable: boolean;
}

export interface BudgetInput {
  items: BudgetLineItem[];
  taxRatePercent: number;
  contingencyPercent: number;
}

export interface BudgetResult {
  lineTotals: number[];
  categorySubtotals: Record<BudgetCategory, number>;
  subtotal: number;
  taxableSubtotal: number;
  tax: number;
  contingency: number;
  total: number;
}

const CATEGORIES: BudgetCategory[] = [
  "materials",
  "labor",
  "delivery",
  "equipment",
  "permits",
  "other",
];

export function calculateRenovationBudget(input: BudgetInput): BudgetResult {
  if (!input || !Array.isArray(input.items)) {
    throw new Error("Items must be an array.");
  }
  if (!Number.isFinite(input.taxRatePercent) || input.taxRatePercent < 0 || input.taxRatePercent > 100) {
    throw new Error("Tax rate must be between 0 and 100.");
  }
  if (!Number.isFinite(input.contingencyPercent) || input.contingencyPercent < 0 || input.contingencyPercent > 100) {
    throw new Error("Contingency must be between 0 and 100.");
  }

  const categorySubtotals = Object.fromEntries(CATEGORIES.map((c) => [c, 0])) as Record<
    BudgetCategory,
    number
  >;

  const lineTotals: number[] = [];
  let subtotal = 0;
  let taxableSubtotal = 0;

  for (const item of input.items) {
    if (!Number.isFinite(item.quantity) || item.quantity < 0) {
      throw new Error("Quantity cannot be negative.");
    }
    if (!Number.isFinite(item.unitCost) || item.unitCost < 0) {
      throw new Error("Unit cost cannot be negative.");
    }
    const lineTotal = item.quantity * item.unitCost;
    lineTotals.push(lineTotal);
    subtotal += lineTotal;
    if (item.taxable) taxableSubtotal += lineTotal;
    if (CATEGORIES.includes(item.category)) {
      categorySubtotals[item.category] += lineTotal;
    } else {
      categorySubtotals.other += lineTotal;
    }
  }

  const tax = taxableSubtotal * (input.taxRatePercent / 100);
  const contingency = subtotal * (input.contingencyPercent / 100);
  const total = subtotal + tax + contingency;

  return { lineTotals, categorySubtotals, subtotal, taxableSubtotal, tax, contingency, total };
}
