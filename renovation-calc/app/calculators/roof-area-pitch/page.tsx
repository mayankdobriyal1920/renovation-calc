import type { Metadata } from "next";
import RoofCalculator from "./RoofCalculator";

export const metadata: Metadata = {
  title: "Roof Area & Pitch Calculator",
  description: "Calculate roof slope factor and estimate sloped roof surface area from a horizontal plan area.",
  alternates: { canonical: "/calculators/roof-area-pitch" },
  openGraph: { url: "https://homecalchub.online/calculators/roof-area-pitch" },
};

export default function Page() {
  return <RoofCalculator />;
}
