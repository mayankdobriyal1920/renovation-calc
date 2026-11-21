import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "About",
  description: "About Home Calculator Hub home renovation calculators.",
  alternates: { canonical: "/about" },
  openGraph: { url: "https://homecalchub.online/about" },
};

export default function Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <article className="mt-6 glass-card rounded-3xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-white">About Home Calculator Hub</h1>
        <p className="mt-4 text-white/70">
          Home Calculator Hub is a small, focused set of home-improvement calculators that help homeowners,
          DIY users and contractors estimate project quantities and plan material purchases.
        </p>
        <p className="mt-3 text-white/70">
          Every calculator runs in your browser. No account is required, and your measurements stay
          on your device. Each result shows the calculation breakdown and the assumptions behind it.
        </p>
        <p className="mt-3 text-white/70">
          We do not claim our estimates are exact. Real projects vary with site conditions, product
          specifications and local requirements. Always verify before purchasing materials or
          beginning work.
        </p>
      </article>
    </div>
  );
}
