import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Estimate Deck Board Quantities",
  description: "How to estimate decking boards and joists.",
  alternates: { canonical: "/guides/how-to-estimate-deck-board-quantities" },
  openGraph: { url: "https://homecalchub.online/guides/how-to-estimate-deck-board-quantities" },
};

export default function Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: "How to Estimate Deck Board Quantities" }]} />
      <article className="mt-6 glass-card rounded-3xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-white">How to Estimate Deck Board Quantities</h1>
        <p className="mt-4 text-white/70">
          Deck boards are sold by the linear foot (or by the board). The count depends on board
          width, gap and deck dimensions.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-white">Board pitch</h2>
        <p className="mt-2 text-white/70">
          Pitch = board face width + gap. Divide the deck width (perpendicular to boards) by pitch
          and round up to get the number of rows.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-white">Total linear footage</h2>
        <p className="mt-2 text-white/70">
          Rows × deck length (in the board direction) = total linear footage. Add waste (10%+).
        </p>
        <h2 className="mt-6 text-xl font-semibold text-white">Joists</h2>
        <p className="mt-2 text-white/70">
          Joists run perpendicular to boards. Count = (deck length / joist spacing) + 1, rounded up.
        </p>
        <p className="mt-6 text-white/70">
          Use the{" "}
          <Link href="/calculators/deck-material" className="text-orange-300 underline">
            Deck Material Calculator
          </Link>
          . This is not a structural design tool.
        </p>
      </article>
    </div>
  );
}
