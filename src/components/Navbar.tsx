"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, usersApi, getAuthToken } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [hasToken, setHasToken] = useState(false);

  // Sync the local token existence on mount and after render cycles 
  // without subscribing to the cache synchronously during other renders
  useEffect(() => {
    const checkToken = () => {
      const activeToken = !!getAuthToken();
      if (activeToken !== hasToken) setHasToken(activeToken);
    };

    checkToken();
    
    // Check every few seconds or on specific events to keep it in sync 
    // without using the noisy queryCache subscription
    const interval = setInterval(checkToken, 2000);
    return () => clearInterval(interval);
  }, [hasToken]);

  const { data: userResponse, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await usersApi.getMe();
      return res.data;
    },
    enabled: hasToken,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const handleLogout = () => {
    authApi.logout();
    setHasToken(false);
    queryClient.setQueryData(["user"], null);
    queryClient.invalidateQueries({ queryKey: ["user"] });
    router.push("/");
    router.refresh();
  };

  const isLoggedIn = isSuccess && !!userResponse;

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
            {isLoggedIn && (
              <Link href="/watchlist" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Watchlist
              </Link>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-400">
                Hi, <span className="text-white">{userResponse.username}</span>
              </span>
              <button 
                onClick={handleLogout}
                className="text-sm font-medium bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 transition-colors shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
