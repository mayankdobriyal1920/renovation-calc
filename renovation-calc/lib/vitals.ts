/**
 * Core Web Vitals monitoring.
 *
 * Reports LCP, INP, and CLS to the privacy-conscious analytics layer.
 * Only metric names and values are sent — no page URLs, input values,
 * or personal data.
 */

import { onCLS, onINP, onLCP } from "web-vitals";
import { track, type EventParams } from "./analytics";

function report(metric: { name: string; value: number; id: string }) {
  const eventMap: Record<string, string> = {
    CLS: "web_vital_cls",
    INP: "web_vital_inp",
    LCP: "web_vital_lcp",
  };
  const event = eventMap[metric.name];
  if (!event) return;

  track(event as never, { value: Math.round(metric.value * 100) / 100 } as never);
}

export function initWebVitals(): void {
  if (typeof window === "undefined") return;
  onLCP(report);
  onINP(report);
  onCLS(report);
}
