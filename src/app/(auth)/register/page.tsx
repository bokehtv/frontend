import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-6 py-12">
      <div className="w-full max-w-md glass-card p-8 rounded-2xl animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black mb-2">Create Account</h1>
          <p className="text-gray-400 text-sm">Join BokehTV to start tracking your favorites.</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="username">
              Username
            </label>
            <input 
              id="username"
              type="text" 
              placeholder="johndoe"
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all text-white placeholder-gray-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="email">
              Email Address
            </label>
            <input 
              id="email"
              type="email" 
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all text-white placeholder-gray-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="password">
              Password
            </label>
            <input 
              id="password"
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all text-white placeholder-gray-600"
            />
          </div>

          <button 
            type="button"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:text-purple-400 font-medium transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
