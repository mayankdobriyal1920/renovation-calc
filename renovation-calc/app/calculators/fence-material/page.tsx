import type { Metadata } from "next";
import FenceCalculator from "./FenceCalculator";

export const metadata: Metadata = {
  title: "Fence Material Calculator",
  description:
    "Estimate posts, rails and pickets for a straight fence run, with optional cost estimate.",
  alternates: { canonical: "/calculators/fence-material/" },
};

export default function Page() {
  return <FenceCalculator />;
}
