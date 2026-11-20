import type { Metadata } from "next";
import BudgetCalculator from "./BudgetCalculator";

export const metadata: Metadata = {
  title: "Renovation Budget Calculator",
  description: "Organize materials, labor and other project costs into a planning budget with tax and contingency.",
};

export default function Page() {
  return <BudgetCalculator />;
}
