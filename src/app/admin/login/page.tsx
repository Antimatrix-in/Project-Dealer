"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Check if session already exists
  useEffect(() => {
    async function checkExistingSession() {
      try {
        const res = await fetch("/api/admin/session");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            router.replace("/admin/dashboard");
          }
        }
      } catch (e) {
        // Not authenticated, stay on page
      }
    }
    checkExistingSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!username.trim() || !password) {
      setErrorMessage("Please enter both administrator username and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Invalid administrator credentials. Please check your username and password.");
        setLoading(false);
        return;
      }

      // Success: redirect to dashboard
      router.push(data.redirectUrl || "/admin/dashboard");
    } catch (err: any) {
      setErrorMessage("Network connection error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 bg-[#F5F1E7] flex flex-col justify-center items-center px-4 relative overflow-hidden text-[#202820]">
      {/* Background Subtle Sand/Green Accents */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#DCE8D9]/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-[#EEE9DC]/80 rounded-full blur-[100px] pointer-events-none" />

      {/* Back to Home Link */}
      <div className="w-full max-w-md mb-4 flex justify-between items-center text-xs">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[#667064] hover:text-[#315C3D] font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Website</span>
        </Link>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE8D9] border border-[#DDDCCF] text-[#315C3D] font-mono text-[11px] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#315C3D]" />
          Secure Gateway
        </span>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#FFFFFF] rounded-3xl border border-[#DDDCCF] shadow-xl p-8 sm:p-10 relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4 p-2.5 rounded-2xl bg-[#EEE9DC]/70 border border-[#DDDCCF]">
            <div className="relative h-8 w-auto flex items-center justify-center">
              <Image
                src="/images/antimatrix-logo-clean.png"
                alt="AntiMatrix"
                width={150}
                height={34}
                className="h-7 w-auto object-contain mx-auto"
                priority
              />
            </div>
          </div>
          <h1 className="text-2xl font-black text-[#202820] tracking-tight">
            Administrator <span className="text-[#315C3D]">Login</span>
          </h1>
          <p className="mt-1.5 text-xs text-[#667064]">
            Authorized portal for project consultations and student inquiries management.
          </p>
        </div>

        {/* Error Alert Message */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#315C3D]/40 text-[#202820] text-xs flex items-start gap-2.5 shadow-xs animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#315C3D]" />
            <span className="leading-relaxed font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#202820] font-mono mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                id="admin-username"
                name="username"
                autoComplete="username"
                placeholder="antimatrix2026"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-sm text-[#202820] placeholder-[#667064]/70 focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#202820] font-mono">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                id="admin-password"
                name="password"
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-sm text-[#202820] placeholder-[#667064]/70 focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#667064] hover:text-[#315C3D] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              id="admin-login-submit"
              className="w-full py-3.5 px-5 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 border border-[#315C3D]"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Security Badge */}
        <div className="mt-8 pt-6 border-t border-[#DDDCCF] flex items-center justify-center gap-2 text-[11px] text-[#667064]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#315C3D]" />
          <span>Encrypted Session • HMAC Token Signed • Rate-Limited</span>
        </div>
      </div>
    </div>
  );
}
