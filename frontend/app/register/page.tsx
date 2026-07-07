"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EnvelopeSimple, Lock, GoogleLogo, GithubLogo } from "@phosphor-icons/react";
import { register } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

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
    <div className="flex min-h-[100dvh] items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <svg width="40" height="40" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <rect width="28" height="28" rx="6" fill="#059669" />
            <rect x="6" y="6" width="6" height="6" rx="1" fill="white" />
            <circle cx="19" cy="19" r="5" fill="white" />
          </svg>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">Create an account</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Get started with Stratum</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && (
            <div className="rounded-[var(--radius-input)] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-[var(--radius-input)] border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400">
              Account created! Redirecting to login...
            </div>
          )}

          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            id="confirm-password"
            label="Confirm password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-full" disabled={loading || success}>
            <Lock size={18} />
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="mt-6">
          <Separator />
        </div>

        <div className="mt-6 space-y-3">
          <Button variant="outline" className="w-full" disabled>
            <GoogleLogo size={18} />
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full" disabled>
            <GithubLogo size={18} />
            Continue with GitHub
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
