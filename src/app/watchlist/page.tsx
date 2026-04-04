import type { Metadata } from "next";
import WatchlistGrid from "@/components/WatchlistGrid";

export const metadata: Metadata = {
  title: "My Watchlist",
  description: "Track and organize your personal collection of movies and TV shows.",
};

export default function WatchlistPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-24 animate-fade-in-up">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Watchlist</span>
        </h1>
        <p className="text-gray-400">Manage what you want to watch, what you are watching, and what you have finished.</p>
      </div>

      <WatchlistGrid />
    </div>
  );
}
