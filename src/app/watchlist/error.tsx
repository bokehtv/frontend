"use client";

import { useEffect } from "react";
import Link from 'next/link';

export default function WatchlistError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Watchlist Phase Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] px-6 text-center animate-fade-in-up">
      <div className="glass-card p-10 rounded-3xl border border-white/5 max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <h2 className="text-3xl font-black mb-4 text-white">Your Collection is <span className="text-red-400 italic">Locked</span></h2>
        
        <p className="text-gray-400 mb-8 leading-relaxed">
          We couldn&apos;t load your personal collection right now. It might be due to a server connection issue.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => reset()}
            className="w-full py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-md active:scale-95"
          >
            Reconnect to Library
          </button>
          <Link
            href="/search"
            className="w-full py-4 bg-white/5 text-gray-300 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all"
          >
            Explore the Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
