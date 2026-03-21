import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-[100px] animate-pulse-slow mix-blend-screen" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen" style={{ animationDelay: "2s" }} />
        </div>
        
        <div className="z-10 max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Track Every <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Frame
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Your personal hub to discover, track, and log the movies and TV shows you love. 
            Join the community and build your ultimate watchlist.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/register" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
              Start Tracking
            </Link>
            <Link 
              href="/search" 
              className="w-full sm:w-auto px-8 py-4 bg-black border border-white/20 text-white rounded-full font-bold hover:bg-white/5 transition-colors"
            >
              Explore Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Section Placeholder */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Trending Now
          </h2>
          <Link href="/search" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
            View all →
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="group relative aspect-[2/3] rounded-xl overflow-hidden glass hover:border-white/20 transition-all cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <h3 className="font-bold text-white mb-1 tracking-wide">Movie Title</h3>
                <p className="text-sm text-gray-300">2024 • Action</p>
              </div>
              <div className="w-full h-full bg-white/5 animate-pulse rounded-xl" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
