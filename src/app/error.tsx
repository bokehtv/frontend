"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for observability
    console.error("Frontend Global Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-6 text-center animate-fade-in-up">
      <div className="glass-card p-12 rounded-3xl border border-red-500/20 max-w-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-black mb-4 text-white">Oops! Something went wrong</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          The application encountered an unexpected error. This might be due to a temporary server outage or network issue.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-white/5 text-white border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all"
          >
            Refresh Page
          </button>
        </div>

        {error.digest && (
          <p className="mt-8 text-[10px] text-gray-600 font-mono uppercase tracking-widest">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
