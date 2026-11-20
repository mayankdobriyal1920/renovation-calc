export default function AssumptionNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100">
      <div className="flex gap-2">
        <span aria-hidden>⚠️</span>
        <div>{children}</div>
      </div>
    </div>
  );
}

export function RelatedTools({ items }: { items: { href: string; label: string }[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-white">Related calculators</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((it) => (
          <a
            key={it.href}
            href={it.href}
            className="glass flex items-center justify-between rounded-xl px-4 py-3 text-sm text-white/90 transition hover:bg-white/15"
          >
            <span>{it.label}</span>
            <span aria-hidden className="text-white/50">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}
