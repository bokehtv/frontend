import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-6 text-center animate-fade-in-up">
      <div className="glass-card p-12 rounded-3xl max-w-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden">
        {/* Decorative Glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/30 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-600/30 blur-3xl pointer-events-none rounded-full" />

        <h1 className="text-[120px] font-black leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 select-none">
          404
        </h1>
        
        <h2 className="text-3xl font-black mb-4 text-white">Lost in Space?</h2>
        <p className="text-gray-400 mb-8 leading-relaxed max-w-sm mx-auto">
          We couldn&apos;t find the title or page you were looking for. It might have been moved or doesn&apos;t exist.
        </p>

        <Link
          href="/"
          className="inline-block px-10 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)]"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
