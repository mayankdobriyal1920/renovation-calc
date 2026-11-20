"use client";

import { useEffect } from "react";
import { initWebVitals } from "@/lib/vitals";

/**
 * Initializes Core Web Vitals monitoring once on the client.
 * Rendered inside the root layout so it mounts on every page.
 */
export default function AnalyticsInit() {
  useEffect(() => {
    initWebVitals();
  }, []);

  return null;
}
