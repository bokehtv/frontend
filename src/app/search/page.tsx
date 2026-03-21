import Link from "next/link";

export default function SearchPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-24">
      {/* Search Header */}
      <div className="mb-16 text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-black mb-6">Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Catalog</span></h1>
        
        <div className="max-w-2xl mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-25 group-focus-within:opacity-75 transition-opacity duration-300" />
          <input 
            type="text" 
            placeholder="Search for movies, TV shows, or people..."
            className="w-full relative bg-black border border-white/20 text-white rounded-full px-6 py-4 outline-none text-lg transition-colors focus:border-white/50 shadow-xl"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-white text-black rounded-full font-bold text-sm hover:scale-105 transition-transform">
            Search
          </button>
        </div>
      </div>

      {/* Categories / Filters Placeholder */}
      <div className="flex gap-4 justify-center mb-12 overflow-x-auto pb-4">
        {['All', 'Movies', 'TV Shows', 'Trending', 'Upcoming'].map((cat, i) => (
          <button 
            key={cat}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${i === 0 ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Results Placeholder */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div key={i} className="group relative aspect-[2/3] rounded-xl overflow-hidden glass hover:border-white/20 transition-all cursor-pointer animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <h3 className="font-bold text-white mb-1 tracking-wide">Search Result</h3>
              <p className="text-sm text-gray-300">Detailed info</p>
            </div>
            <div className="w-full h-full bg-white/5 animate-pulse rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
