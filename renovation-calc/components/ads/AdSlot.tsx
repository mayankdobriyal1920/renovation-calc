"use client";

import { useEffect, useState, useRef } from "react";

/**
 * Reserved ad slot to prevent Cumulative Layout Shift (CLS).
 *
 * Renders a Google AdSense ad unit when configured. The container always
 * occupies a fixed minimum height so the page doesn't jump when the ad
 * loads or collapses. Ads are rendered client-side only to avoid blocking
 * the initial server render.
 */

interface AdSlotProps {
  /** Fixed height in pixels to reserve (default 250px for a medium rectangle). */
  height?: number;
  /** AdSense ad slot ID. Falls back to the env-configured default. */
  slotId?: string;
  /** Test id for E2E assertions. */
  testId?: string;
  /** Additional tailwind classes. */
  className?: string;
}

const ADSENSE_CLIENT = "ca-pub-3366036914417048";

export default function AdSlot({ height = 250, slotId, testId, className }: AdSlotProps) {
  const [loaded, setLoaded] = useState(false);
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  const resolvedSlot = slotId || process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!resolvedSlot || !adRef.current || pushed.current) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not yet loaded or blocked — fail silently.
    }
  }, [resolvedSlot, loaded]);

  // Before approval (no slot ID), show a reserved placeholder container.
  if (!resolvedSlot) {
    return (
      <div
        data-testid={testId}
        aria-label="Advertisement"
        className={`flex items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/5 text-white/30 text-sm ${className ?? ""}`}
        style={{ minHeight: height, height }}
      >
        {loaded ? <span>Advertisement</span> : <span className="animate-pulse">Loading…</span>}
      </div>
    );
  }

  return (
    <div
      data-testid={testId}
      aria-label="Advertisement"
      className={`flex items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/5 text-white/30 text-sm ${className ?? ""}`}
      style={{ minHeight: height }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={resolvedSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}