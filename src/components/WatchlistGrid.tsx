"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { watchlistApi } from "@/lib/api";

type WatchlistStatus = "WANT" | "WATCHING" | "DONE";

export default function WatchlistGrid() {
  const [filter, setFilter] = useState<WatchlistStatus | "ALL">("ALL");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const response = await watchlistApi.getWatchlist();
        setItems(response.data || []);
      } catch (err: any) {
        setError(err.message || "Please log in to view your watchlist.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: WatchlistStatus) => {
    try {
      await watchlistApi.updateStatus(id, newStatus);
      setItems((prev) => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await watchlistApi.removeFromWatchlist(id);
      setItems((prev) => prev.filter(item => item.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredItems = filter === "ALL" ? items : items.filter((item) => item.status === filter);

  if (loading) return <div className="text-center py-20 animate-pulse text-gray-500">Loading your collection...</div>;

  if (error) {
    return (
      <div className="glass-card p-8 rounded-2xl text-center border border-red-500/30">
        <h2 className="text-xl text-red-400 font-bold mb-2">Access Denied</h2>
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
        {["ALL", "WANT", "WATCHING", "DONE"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat as any)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500 border border-dashed border-white/10 rounded-2xl">
          Nothing here yet! Go explore the search catalog.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative aspect-[2/3] rounded-xl overflow-hidden glass transition-all hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
              {item.content.poster_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.content.poster_url} alt={item.content.title} className="absolute inset-0 w-full h-full object-cover" />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <h3 className="font-bold text-white mb-1 line-clamp-1">{item.content.title}</h3>
                <div className="flex flex-col gap-2 mt-4 space-y-2">
                  <select 
                    value={item.status} 
                    onChange={(e) => handleUpdateStatus(item.id, e.target.value as WatchlistStatus)}
                    className="w-full bg-white/10 text-xs px-2 py-2 rounded-lg text-white border border-white/20 outline-none backdrop-blur-xl"
                  >
                    <option value="WANT" className="bg-black">Want to Watch</option>
                    <option value="WATCHING" className="bg-black">Watching</option>
                    <option value="DONE" className="bg-black">Done</option>
                  </select>
                  <button onClick={() => handleRemove(item.id)} className="w-full py-2 text-xs text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
