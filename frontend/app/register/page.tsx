"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EnvelopeSimple, Lock, GoogleLogo, GithubLogo } from "@phosphor-icons/react";
import { register } from "@/lib/api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await register(email, password);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center px-4 relative z-10">
      <div className="w-full max-w-sm glass-widget p-8 sm:p-10 rounded-[2.5rem]">
        <div className="text-center">
          <Link href="/" className="inline-flex gap-1 mb-4 justify-center">
            <div className="w-1.5 h-5 bg-fedin-dark rounded-full transform -rotate-12"></div>
            <div className="w-1.5 h-3 bg-fedin-dark rounded-full mt-2 transform -rotate-12"></div>
            <div className="w-1.5 h-4 bg-fedin-dark rounded-full mt-1 transform -rotate-12"></div>
          </Link>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-fedin-dark">Create an account</h1>
          <p className="mt-2 text-sm text-fedin-dark/70">Get started with FedIn</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <div className="rounded-xl border border-red-200/50 bg-red-50/50 backdrop-blur-sm px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-fedin-green/50 bg-white/50 backdrop-blur-sm px-4 py-3 text-sm text-fedin-green">
              Account created! Redirecting to login...
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-fedin-dark/70 ml-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/40 border border-white/60 focus:border-fedin-green focus:ring-1 focus:ring-fedin-green rounded-xl px-4 py-3 text-fedin-dark placeholder:text-fedin-dark/40 outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-fedin-dark/70 ml-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/40 border border-white/60 focus:border-fedin-green focus:ring-1 focus:ring-fedin-green rounded-xl px-4 py-3 text-fedin-dark placeholder:text-fedin-dark/40 outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-fedin-dark/70 ml-1">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-white/40 border border-white/60 focus:border-fedin-green focus:ring-1 focus:ring-fedin-green rounded-xl px-4 py-3 text-fedin-dark placeholder:text-fedin-dark/40 outline-none transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2 bg-fedin-green hover:bg-fedin-green-hover text-white font-medium py-3.5 rounded-xl transition-all duration-300 btn-shadow disabled:opacity-70 disabled:hover:bg-fedin-green mt-2" 
            disabled={loading || success}
          >
            <Lock size={18} weight="bold" />
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-8 flex items-center gap-3">
          <div className="flex-1 h-px bg-fedin-dark/10"></div>
          <span className="text-xs text-fedin-dark/40 font-medium uppercase tracking-wider">Or</span>
          <div className="flex-1 h-px bg-fedin-dark/10"></div>
        </div>

        <div className="mt-8 space-y-3">
          <button className="w-full flex items-center justify-center gap-2 bg-white/40 hover:bg-white/60 border border-white/60 text-fedin-dark font-medium py-3 rounded-xl transition-all duration-300" disabled>
            <GoogleLogo size={18} weight="bold" />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-white/40 hover:bg-white/60 border border-white/60 text-fedin-dark font-medium py-3 rounded-xl transition-all duration-300" disabled>
            <GithubLogo size={18} weight="bold" />
            Continue with GitHub
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-fedin-dark/70">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-fedin-green hover:text-fedin-green-hover transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
