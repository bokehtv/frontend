"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { contentApi } from "@/lib/api";

export default function SearchPage() {
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: async () => {
      if (!searchQuery) return { data: [], meta: null };
      const response = await contentApi.search(searchQuery);
      return response;
    },
    enabled: !!searchQuery,
    retry: 1,
  });

  const handleSearchCommit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setSearchQuery(inputValue);
  };

  const results = data?.data || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-24">
      {/* Search Header */}
      <div className="mb-16 text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-black mb-6">Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Catalog</span></h1>
        
        <form onSubmit={handleSearchCommit} className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-25 group-focus-within:opacity-75 transition-opacity duration-300" />
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for movies, TV shows..."
            className="w-full relative bg-black border border-white/20 text-white rounded-full px-6 py-4 outline-none text-lg transition-colors focus:border-white/50 shadow-xl"
          />
          <button 
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-white text-black rounded-full font-bold text-sm hover:scale-105 transition-transform"
          >
            Search
          </button>
        </form>
      </div>

      {/* Grid Results */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={i} className="aspect-[2/3] rounded-xl overflow-hidden bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-20 text-red-400 glass-card">
          {(error as Error).message || "An error occurred while searching. Please try again."}
        </div>
      ) : results.length === 0 && searchQuery ? (
        <div className="text-center py-20 text-gray-500 border border-dashed border-white/10 rounded-2xl">
          No results found for &quot;{searchQuery}&quot;. Try another term.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {results.map((item: { tmdb_id: string | number, type: string, title: string, poster_url?: string, release_date?: string }, i: number) => (
            <div 
              key={item.tmdb_id} 
              className="group relative aspect-[2/3] rounded-xl overflow-hidden glass hover:border-white/20 transition-all cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {item.poster_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={item.poster_url} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" 
                />
              ) : (
                <div className="w-full h-full bg-white/5 flex items-center justify-center text-gray-500 italic text-xs p-4 text-center">
                  No Poster Available
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-1">
                  {item.type === 'movie' ? 'Movie' : 'TV Series'}
                </span>
                <h3 className="font-bold text-white mb-1 tracking-wide leading-tight line-clamp-2">
                  {item.title}
                </h3>
                {item.release_date && (
                   <p className="text-xs text-gray-400">{item.release_date.split('-')[0]}</p>
                )}
                
                {/* Watchlist Quick Action (Placeholder for follow-up session) */}
                <button 
                  className="mt-3 w-full py-2 bg-white/10 hover:bg-white text-white hover:text-black rounded-lg text-xs font-bold transition-all backdrop-blur-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add watchlist save logic here in next task
                  }}
                >
                  + Add to Watchlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
