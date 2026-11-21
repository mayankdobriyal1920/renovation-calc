import type { Metadata } from "next";
import ConcreteSlabCalculator from "./ConcreteSlabCalculator";

export const metadata: Metadata = {
  title: "Concrete Slab Calculator",
  description:
    "Estimate concrete volume for a rectangular slab. Get geometric and waste-adjusted cubic yards with an optional cost estimate.",
  alternates: { canonical: "/calculators/concrete-slab" },
  openGraph: { url: "https://homecalchub.online/calculators/concrete-slab" },
};

export default function Page() {
  return <ConcreteSlabCalculator />;
}
