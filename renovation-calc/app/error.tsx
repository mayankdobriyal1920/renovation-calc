"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log without capturing input values.
    console.error("Application error:", error?.message);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <div className="glass-card rounded-3xl p-10">
        <div className="text-5xl">⚠️</div>
        <h1 className="mt-4 text-2xl font-bold text-white">Something went wrong</h1>
        <p className="mt-2 text-white/70">
          An unexpected error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
