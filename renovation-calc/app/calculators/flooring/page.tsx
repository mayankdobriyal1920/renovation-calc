import type { Metadata } from "next";
import FlooringCalculator from "./FlooringCalculator";

export const metadata: Metadata = {
  title: "Flooring Calculator",
  description:
    "Estimate flooring area and number of product boxes needed, including waste allowance and cost.",
  alternates: { canonical: "/calculators/flooring/" },
};

export default function Page() {
  return <FlooringCalculator />;
}
