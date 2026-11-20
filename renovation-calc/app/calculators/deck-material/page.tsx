import type { Metadata } from "next";
import DeckCalculator from "./DeckCalculator";

export const metadata: Metadata = {
  title: "Deck Material Calculator",
  description: "Estimate decking boards and joists for a rectangular deck.",
};

export default function Page() {
  return <DeckCalculator />;
}
