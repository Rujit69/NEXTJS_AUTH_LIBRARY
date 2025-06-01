// /app/login/page.js

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toggleMode = () => {
    setError("");
    setIsSignUp((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1) If we're in Sign Up mode, call our signup route first:
    if (isSignUp) {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }
      // If signup succeeded (201), proceed to login below
    }

    // 2) Always attempt login via NextAuth's credentials provider
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/Home");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-1/4 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-40 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-200 rounded-full opacity-35 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-yellow-200 rounded-full opacity-40 animate-bounce" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 transition-all duration-300 hover:shadow-3xl">
          {/* Cute decorative header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full mb-4 shadow-lg">
              <div className="text-4xl">✨</div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {isSignUp ? "Join Us!" : "Welcome Back!"}
            </h2>
            <p className="text-gray-600 text-sm">
              {isSignUp ? "Create your magical account" : "Enter your enchanted realm"}
            </p>
          </div>

          {/* Toggle button */}
          <div className="text-center mb-6">
            <button 
              onClick={toggleMode}
              className="text-purple-600 hover:text-pink-600 font-medium transition-colors duration-200 text-sm underline decoration-dotted underline-offset-4 hover:decoration-solid"
            >
              {isSignUp
                ? "Already have an account? Sign In ✨"
                : "Don't have an account? Sign Up 🌸"}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="username" 
                className="block text-gray-700 font-medium mb-2 text-sm"
              >
                Username 🦄
              </label>
              <input
                id="username"
                type="text"
                required
                minLength={8}
                maxLength={20}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="8–20 chars, letters/numbers/._"
                className="w-full px-4 py-3 bg-white/50 backdrop-blur border border-white/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-800"
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-gray-700 font-medium mb-2 text-sm"
              >
                Password 🔐
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-4 py-3 bg-white/50 backdrop-blur border border-white/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-gray-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              {isSignUp ? "Create Account ✨" : "Sign In 🌟"}
            </button>
          </form>

          {/* Error message */}
          {error && (
            <div className="mt-6 p-3 bg-red-100/80 backdrop-blur border border-red-200 rounded-2xl">
              <p className="text-red-600 text-center text-sm font-medium">
                ⚠️ {error}
              </p>
            </div>
          )}

          {/* Decorative footer */}
          <div className="mt-8 text-center">
            <div className="flex justify-center space-x-2 text-2xl opacity-60">
              <span className="animate-pulse">🌸</span>
              <span className="animate-pulse" style={{animationDelay: '0.3s'}}>⭐</span>
              <span className="animate-pulse" style={{animationDelay: '0.6s'}}>🦋</span>
              <span className="animate-pulse" style={{animationDelay: '0.9s'}}>💫</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}