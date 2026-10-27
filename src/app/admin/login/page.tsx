"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
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

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both administrator email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Authentication failed. Please verify credentials.");
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
    <div className="min-h-screen pt-28 pb-16 bg-[#080808] flex flex-col justify-center items-center px-4 relative overflow-hidden text-white">
      {/* Background Decorative Glows */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#FF7900]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-[#FF9500]/08 rounded-full blur-[100px] pointer-events-none" />

      {/* Back to Home Link */}
      <div className="w-full max-w-md mb-4 flex justify-between items-center text-xs">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[#B8B8B8] hover:text-[#FF7900] font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Website</span>
        </Link>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#161616] border border-[#2A2A2A] text-[#FF7900] font-mono text-[11px] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF7900]" />
          Secure Gateway
        </span>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#161616] rounded-3xl border border-[#2A2A2A] shadow-2xl p-8 sm:p-10 relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="relative h-9 w-auto flex items-center justify-center">
              <Image
                src="/images/antimatrix-logo-clean.png"
                alt="AntiMatrix"
                width={160}
                height={36}
                className="h-8 w-auto object-contain mx-auto"
                priority
              />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Admin <span className="text-gradient-orange">Login</span>
          </h1>
          <p className="mt-1.5 text-xs text-[#B8B8B8]">
            Authorized portal for project consultations and student inquiries management.
          </p>
        </div>

        {/* Error Alert Message */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-xl bg-[#1D1D1D] border border-[#FF4500]/50 text-[#FF9500] text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#FF4500]" />
            <span className="leading-relaxed font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-white font-mono mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#B8B8B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                id="admin-email"
                autoComplete="email"
                placeholder="antimatrix2026@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#1D1D1D] border border-[#2A2A2A] text-sm text-white placeholder-[#B8B8B8] focus:outline-none focus:border-[#FF7900] focus:ring-1 focus:ring-[#FF7900] transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-white font-mono">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#B8B8B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#1D1D1D] border border-[#2A2A2A] text-sm text-white placeholder-[#B8B8B8] focus:outline-none focus:border-[#FF7900] focus:ring-1 focus:ring-[#FF7900] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B8B8B8] hover:text-[#FF7900] transition-colors cursor-pointer"
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
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#FF4500] hover:opacity-90 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-[#FF7900]/25"
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
        <div className="mt-8 pt-6 border-t border-[#2A2A2A] flex items-center justify-center gap-2 text-[11px] text-[#B8B8B8]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF7900]" />
          <span>Encrypted Session • HMAC Token Signed • Rate-Limited</span>
        </div>
      </div>
    </div>
  );
}
