"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { watchlistApi } from "@/lib/api";

type WatchlistStatus = "WANT" | "WATCHING" | "DONE";

interface WatchlistItem {
  id: string;
  status: string;
  content: {
    title: string;
    poster_url?: string;
  };
}

export default function WatchlistGrid() {
  const [filter, setFilter] = useState<WatchlistStatus | "ALL">("ALL");
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      const response = await watchlistApi.getWatchlist();
      return response.data || [];
    },
    retry: 1,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: WatchlistStatus }) =>
      watchlistApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
    onError: (err: Error) => {
      alert(err.message || "Failed to update status");
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => watchlistApi.removeFromWatchlist(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
    onError: (err: Error) => {
      alert(err.message || "Failed to remove item");
    },
  });

  const items = data || [];
  const filteredItems = filter === "ALL" ? items : items.filter((item: WatchlistItem) => item.status === filter);

  if (isLoading) return <div className="text-center py-20 animate-pulse text-gray-500">Loading your collection...</div>;

  if (error) {
    return (
      <div className="glass-card p-8 rounded-2xl text-center border border-red-500/30">
        <h2 className="text-xl text-red-400 font-bold mb-2">Access Denied</h2>
        <p className="text-gray-400">{(error as Error).message || "Please log in to view your watchlist."}</p>
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
            onClick={() => setFilter(cat as WatchlistStatus | "ALL")}
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
          {filteredItems.map((item: WatchlistItem) => (
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
                    onChange={(e) => updateMutation.mutate({ id: item.id, status: e.target.value as WatchlistStatus })}
                    disabled={updateMutation.isPending}
                    className="w-full bg-white/10 text-xs px-2 py-2 rounded-lg text-white border border-white/20 outline-none backdrop-blur-xl disabled:opacity-50 cursor-pointer"
                  >
                    <option value="WANT" className="bg-black">Want to Watch</option>
                    <option value="WATCHING" className="bg-black">Watching</option>
                    <option value="DONE" className="bg-black">Done</option>
                  </select>
                  <button 
                    onClick={() => removeMutation.mutate(item.id)} 
                    disabled={removeMutation.isPending}
                    className="w-full py-2 text-xs text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                  >
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
