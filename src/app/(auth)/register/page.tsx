"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api";
import { z } from "zod";

const RegisterSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(30),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const registerMutation = useMutation({
    mutationFn: () => authApi.register({ username, email, password }),
    onSuccess: () => {
      // Successfully registered, send them to login
      router.push("/login");
    },
    onError: (err: Error) => {
      setValidationError(err.message);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");
    
    const result = RegisterSchema.safeParse({ username, email, password });
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }

    registerMutation.mutate();
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-6 py-12">
      <div className="w-full max-w-md glass-card p-8 rounded-2xl animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black mb-2">Create Account</h1>
          <p className="text-gray-400 text-sm">Join BokehTV to start tracking your favorites.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {validationError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center py-2 rounded-lg backdrop-blur-md">
              {validationError}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="username">
              Username
            </label>
            <input 
              id="username"
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all text-white placeholder-gray-600"
            />
          </div>

          <button 
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {registerMutation.isPending ? "Creating..." : "Create Account"}
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
