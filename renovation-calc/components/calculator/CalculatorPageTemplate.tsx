import React from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import CalculatorCard from "@/components/calculator/CalculatorCard";
import AssumptionNotice, { RelatedTools } from "@/components/calculator/AssumptionNotice";

export interface FaqItem {
  q: string;
  a: string;
}

export interface RelatedItem {
  href: string;
  label: string;
}

export interface CalculatorPageTemplateProps {
  title: string;
  description: string;
  breadcrumbs?: { label: string; href?: string }[];
  children: React.ReactNode; // form + result area
  assumptions?: React.ReactNode;
  howTo?: string[];
  example?: React.ReactNode;
  related?: RelatedItem[];
  faqs?: FaqItem[];
  commonMistakes?: string[];
  sources?: string;
}

export default function CalculatorPageTemplate({
  title,
  description,
  breadcrumbs,
  children,
  assumptions,
  howTo,
  example,
  related,
  faqs,
  commonMistakes,
  sources,
}: CalculatorPageTemplateProps) {
  const crumbs = breadcrumbs ?? [
    { label: "Home", href: "/" },
    { label: "Calculators", href: "/calculators" },
    { label: title },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.href
        ? `https://homecalchub.online${c.href === "/" ? "/" : c.href.replace(/\/$/, "")}`
        : undefined,
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb items={crumbs} />

      <div className="mt-6">{children}</div>

      {assumptions && (
        <section className="mt-8 glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white">Assumptions &amp; limitations</h2>
          <div className="mt-3 text-sm text-white/70">{assumptions}</div>
        </section>
      )}

      {howTo && howTo.length > 0 && (
        <section className="mt-6 glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white">How to use</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-white/70">
            {howTo.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </section>
      )}

      {example && (
        <section className="mt-6 glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white">Worked example</h2>
          <div className="mt-3 text-sm text-white/70">{example}</div>
        </section>
      )}

      {related && related.length > 0 && <RelatedTools items={related} />}

      {faqs && faqs.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="glass rounded-xl p-4">
                <summary className="cursor-pointer font-medium text-white">{f.q}</summary>
                <p className="mt-2 text-sm text-white/70">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {commonMistakes && commonMistakes.length > 0 && (
        <section className="mt-10 glass rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white">Common mistakes</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
            {commonMistakes.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </section>
      )}

      {sources && (
        <section className="mt-6 text-xs text-white/50">
          <p>{sources}</p>
        </section>
      )}
    </div>
  );
}
