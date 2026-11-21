"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Cookie consent banner.
 *
 * Blocks analytics/ad scripts until the user consents. Consent is stored
 * in localStorage so the banner doesn't reappear on every page load.
 */

export default function CookieConsent() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookie_consent");
      if (consent === "true" || consent === "false") {
        setShow(false);
      }
    } catch {
      // If localStorage is unavailable, show the banner once.
    }
  }, []);

  const acceptAll = () => {
    try {
      localStorage.setItem("cookie_consent", "true");
    } catch {
      // ignore
    }
    setShow(false);
    track("consent_given", { calculator_id: undefined } as never);
  };

  const decline = () => {
    try {
      localStorage.setItem("cookie_consent", "false");
    } catch {
      // ignore
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-[4%] md:right-[4%] z-50 glass rounded-2xl p-6 text-white shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-sm text-white/80 leading-relaxed">
          We use cookies to analyze traffic and optimize your experience.{" "}
          <a href="/cookie-policy" className="text-orange-300 underline">Learn more</a>.
        </div>
        <div className="flex gap-3 sm:gap-4">
          <button
            onClick={decline}
            className="glass rounded-xl px-5 py-2.5 text-sm text-white/80 transition hover:bg-white/15"
          >
            Decline
          </button>
          <button
            onClick={acceptAll}
            className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
