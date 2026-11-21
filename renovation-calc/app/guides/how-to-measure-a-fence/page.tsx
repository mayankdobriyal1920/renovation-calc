import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Measure a Fence Line",
  description: "How to measure a fence run for material estimates.",
  alternates: { canonical: "/guides/how-to-measure-a-fence" },
  openGraph: { url: "https://homecalchub.online/guides/how-to-measure-a-fence" },
};

export default function Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: "How to Measure a Fence" }]} />
      <article className="mt-6 glass-card rounded-3xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-white">How to Measure a Fence Line</h1>
        <p className="mt-4 text-white/70">
          Measuring a fence line is straightforward, but corners, gates and slopes all affect
          material counts.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-white">Measure total length</h2>
        <p className="mt-2 text-white/70">
          Measure along the fence line in feet. Include all straight runs. Measure corners
          separately if the angle changes post spacing.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-white">Plan post spacing</h2>
        <p className="mt-2 text-white/70">
          Choose a maximum post spacing (e.g. 8 ft). Divide total length by spacing and round up
          to get the number of spans; posts = spans + 1.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-white">Account for gates</h2>
        <p className="mt-2 text-white/70">
          Gate openings need terminal posts and may use different post sizes. Exclude gate width
          from picket counts.
        </p>
        <p className="mt-6 text-white/70">
          Use the{" "}
          <Link href="/calculators/fence-material" className="text-orange-300 underline">
            Fence Material Calculator
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
