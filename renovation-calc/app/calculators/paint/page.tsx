import type { Metadata } from "next";
import PaintCalculator from "./PaintCalculator";

export const metadata: Metadata = {
  title: "Paint Calculator",
  description:
    "Estimate gallons of paint and primer for walls and ceilings, including coats, openings and coverage.",
  alternates: { canonical: "/calculators/paint" },
  openGraph: { url: "https://homecalchub.online/calculators/paint" },
};

export default function Page() {
  return <PaintCalculator />;
}
