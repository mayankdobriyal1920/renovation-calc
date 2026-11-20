import React from "react";

export default function CalculatorCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass-card rounded-2xl p-6 sm:p-8 ${className}`}>{children}</div>;
}

export function ResultPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`glass-strong rounded-2xl p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function BreakdownTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <dl className="mt-4 divide-y divide-white/10">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center justify-between py-2 text-sm">
          <dt className="text-white/70">{r.label}</dt>
          <dd className="font-medium text-white">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
