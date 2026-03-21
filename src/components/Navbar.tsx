import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="text-2xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            BokehTV
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/search" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Search
            </Link>
            <Link href="/watchlist" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Watchlist
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link 
            href="/register" 
            className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
