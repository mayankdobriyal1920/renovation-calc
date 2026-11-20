/**
 * Privacy-conscious analytics helpers.
 *
 * Events never include personal or sensitive input values (dimensions,
 * descriptions, addresses, etc.). Only opaque identifiers such as
 * calculator_id are sent.
 */

export type AnalyticsEvent = string;

export interface EventParams {
  calculator_id?: string;
  source_id?: string;
  destination_id?: string;
  error_type?: string;
  value?: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, opts?: { props?: Record<string, string> }) => void;
  }
}

function safeParams(params: EventParams): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) out[k] = String(v);
  }
  return out;
}

export function track(event: AnalyticsEvent, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  const p = safeParams(params);
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, p);
    }
    if (typeof window.plausible === "function") {
      window.plausible(event, { props: p });
    }
  } catch {
    // Analytics must never break the app.
  }
}
