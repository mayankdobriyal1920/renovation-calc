import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for Home Calculator Hub.",
  alternates: { canonical: "/terms" },
  openGraph: { url: "https://homecalchub.online/terms" },
};

export default function Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]} />
      <article className="mt-6 glass-card rounded-3xl p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-white">Terms of Use</h1>
        <p className="mt-3 text-white/70 text-sm">Last updated: 20 November 2026</p>

        <h2 className="mt-6 text-xl font-semibold text-white">Acceptance</h2>
        <p className="mt-2 text-white/70">
          By using Home Calculator Hub you agree to these terms. If you do not agree, do not use the site.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-white">Use of the service</h2>
        <p className="mt-2 text-white/70">
          Calculators are provided for planning and estimation only. You are responsible for
          verifying measurements, product specifications and local requirements before purchasing
          materials or beginning work.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-white">No warranty</h2>
        <p className="mt-2 text-white/70">
          The site is provided &quot;as is&quot; without warranties of any kind. We are not liable for
          losses arising from use of the calculators or reliance on their results.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-white">Intellectual property</h2>
        <p className="mt-2 text-white/70">
          Site content, design and code are owned by Home Calculator Hub unless otherwise noted. You may
          not copy or redistribute without permission.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-white">Changes</h2>
        <p className="mt-2 text-white/70">
          We may update these terms at any time. Continued use constitutes acceptance of changes.
        </p>
      </article>
    </div>
  );
}
