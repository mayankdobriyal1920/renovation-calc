import Link from "next/link";

const COLS = [
  {
    title: "Calculators",
    links: [
      { href: "/calculators/square-footage", label: "Square Footage" },
      { href: "/calculators/concrete-slab", label: "Concrete Slab" },
      { href: "/calculators/flooring", label: "Flooring" },
      { href: "/calculators/paint", label: "Paint" },
      { href: "/calculators/fence-material", label: "Fence Material" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/guides", label: "Guides" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/disclaimer", label: "Disclaimer" },
      { href: "/cookie-policy", label: "Cookie Policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16">
      <div className="glass mx-auto max-w-6xl rounded-t-3xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Home Calculator Hub logo" className="h-9 w-auto rounded-xl shadow-lg" />
              <span className="text-lg font-semibold text-white">Home Calculator Hub</span>
            </div>
            <p className="mt-3 text-sm text-white/70">
              Straightforward home-improvement calculators that help you estimate project quantities
              and plan material purchases.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white/90">{c.title}</h3>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-white/70 transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-white/60">
          <p>
            Calculators provide planning estimates based on the information you enter and the
            assumptions shown. They are not structural engineering advice, construction plans, or
            permit guidance. Verify measurements and product requirements before purchasing
            materials or beginning work.
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Home Calculator Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
