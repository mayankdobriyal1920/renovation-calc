"use client";

import { useEffect, useState } from "react";

/**
 * Reserved ad slot to prevent Cumulative Layout Shift (CLS).
 *
 * The container always occupies a fixed minimum height so the page
 * doesn't jump when the ad loads or collapses. Ads are rendered
 * client-side only to avoid blocking the initial server render.
 */

interface AdSlotProps {
  /** Fixed height in pixels to reserve (default 250px for a medium rectangle). */
  height?: number;
  /** Test id for E2E assertions. */
  testId?: string;
  /** Additional tailwind classes. */
  className?: string;
}

export default function AdSlot({ height = 250, testId, className }: AdSlotProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Placeholder for ad network script (e.g. AdSense).
    // Kept client-only so the initial HTML contains no third-party script.
    setLoaded(true);
  }, []);

  return (
    <div
      data-testid={testId}
      aria-label="Advertisement"
      className={`flex items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/5 text-white/30 text-sm min-h-[${height}px] h-[${height}px] ${className ?? ""}`}
    >
      {loaded ? (
        <span>Advertisement</span>
      ) : (
        <span className="animate-pulse">Loading…</span>
      )}
    </div>
  );
}
