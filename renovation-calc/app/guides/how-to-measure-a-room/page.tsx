import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Measure a Room for Flooring",
  description: "How to measure room dimensions for flooring estimates.",
  alternates: { canonical: "/guides/how-to-measure-a-room" },
  openGraph: { url: "https://homecalchub.online/guides/how-to-measure-a-room" },
};

export default function Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: "How to Measure a Room" }]} />
      <article className="mt-6 glass-card rounded-3xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-white">How to Measure a Room for Flooring</h1>
        <p className="mt-4 text-white/70">
          Accurate measurements are the foundation of a good flooring estimate. Measure twice, cut
          once.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-white">Measure length and width</h2>
        <p className="mt-2 text-white/70">
          Measure the room at its longest and widest points in feet. For irregular rooms, split the
          space into rectangles and measure each.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-white">Handle alcoves and closets</h2>
        <p className="mt-2 text-white/70">
          Measure each alcove or closet separately and add its area to the total. Do not subtract
          doorways — cuts still consume material.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-white">Add waste</h2>
        <p className="mt-2 text-white/70">
          Straight layouts: ~10% waste. Diagonal or patterned layouts: 15% or more. Always round up
          to whole boxes.
        </p>
        <p className="mt-6 text-white/70">
          Use the{" "}
          <Link href="/calculators/flooring" className="text-orange-300 underline">
            Flooring Calculator
          </Link>{" "}
          and{" "}
          <Link href="/calculators/square-footage" className="text-orange-300 underline">
            Square Footage Calculator
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
