import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Create a Renovation Materials Budget",
  description: "How to organize a renovation budget.",
  alternates: { canonical: "/guides/how-to-create-a-renovation-materials-budget" },
  openGraph: { url: "https://homecalchub.online/guides/how-to-create-a-renovation-materials-budget" },
};

export default function Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: "How to Create a Renovation Materials Budget" }]} />
      <article className="mt-6 glass-card rounded-3xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-white">How to Create a Renovation Materials Budget</h1>
        <p className="mt-4 text-white/70">
          A good budget separates materials, labor, delivery, equipment, permits and a contingency.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-white">List line items</h2>
        <p className="mt-2 text-white/70">
          For each item, record description, category, quantity and unit cost. Multiply to get a
          line total.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-white">Add tax and contingency</h2>
        <p className="mt-2 text-white/70">
          Apply sales tax to taxable items. Add a contingency (commonly 10–20%) to cover surprises.
        </p>
        <h2 className="mt-6 text-xl font-semibold text-white">Track actuals</h2>
        <p className="mt-2 text-white/70">
          Export the budget to CSV and update with actual costs as the project progresses.
        </p>
        <p className="mt-6 text-white/70">
          Use the{" "}
          <Link href="/calculators/renovation-budget" className="text-orange-300 underline">
            Renovation Budget Calculator
          </Link>
          . All prices are user-entered.
        </p>
      </article>
    </div>
  );
}
