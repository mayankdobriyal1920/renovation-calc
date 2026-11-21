import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Calculator disclaimer for Home Calculator Hub.",
  alternates: { canonical: "/disclaimer" },
  openGraph: { url: "https://homecalchub.online/disclaimer" },
};

export default function Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]} />
      <article className="mt-6 glass-card rounded-3xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-white">Disclaimer</h1>
        <p className="mt-3 text-white/70 text-sm">Last updated: 20 November 2026</p>

        <p className="mt-4 text-white/70">
          These calculators provide planning estimates based on the information you enter and the
          assumptions shown. Actual material quantities and project costs can vary due to site
          conditions, product specifications, installation methods, waste, local requirements and
          contractor practices.
        </p>
        <p className="mt-3 text-white/70">
          Verify measurements and product requirements before purchasing materials or beginning work.
          These tools are not structural engineering advice, construction plans, permit guidance or a
          substitute for qualified professional advice.
        </p>
        <p className="mt-3 text-white/70">
          Do not use these calculators to determine structural loads, code compliance, or any
          safety-critical dimension. Consult a qualified professional for such decisions.
        </p>
      </article>
    </div>
  );
}
