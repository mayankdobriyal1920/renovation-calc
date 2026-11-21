import type { Metadata } from "next";
import SquareFootageCalculator from "./SquareFootageCalculator";

export const metadata: Metadata = {
  title: "Square Footage Calculator",
  description:
    "Calculate area for rooms and rectangular spaces in square feet, yards and meters. Supports multiple rectangles and excluded areas.",
  alternates: { canonical: "/calculators/square-footage" },
  openGraph: { url: "https://homecalchub.online/calculators/square-footage" },
};

export default function Page() {
  return <SquareFootageCalculator />;
}
