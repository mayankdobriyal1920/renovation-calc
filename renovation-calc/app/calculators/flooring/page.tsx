import type { Metadata } from "next";
import FlooringCalculator from "./FlooringCalculator";

export const metadata: Metadata = {
  title: "Flooring Calculator",
  description:
    "Estimate flooring area and number of product boxes needed, including waste allowance and cost.",
  alternates: { canonical: "/calculators/flooring" },
  openGraph: { url: "https://homecalchub.online/calculators/flooring" },
};

export default function Page() {
  return <FlooringCalculator />;
}
