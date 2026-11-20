"use client";

import { useState } from "react";
import Link from "next/link";

const NAV = [
  { href: "/calculators/", label: "Calculators" },
  { href: "/guides/", label: "Guides" },
  { href: "/about/", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="glass-strong mx-auto mt-3 max-w-6xl rounded-2xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="RenovationCalc logo"
              className="h-9 w-auto rounded-xl shadow-lg"
            />
            <span className="text-lg font-semibold tracking-tight text-white">
              RenovationCalc
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/calculators/"
              className="ml-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
            >
              Start calculating
            </Link>
          </nav>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-white/80 hover:bg-white/10 md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <nav className="mt-3 flex flex-col gap-1 border-t border-white/10 pt-3 md:hidden">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/calculators/"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Start calculating
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
