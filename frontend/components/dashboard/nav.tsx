"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sun, Moon, MagnifyingGlass, SignOut } from "@phosphor-icons/react";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/lib/auth-context";

export function DashboardNav() {
  const { theme, toggle } = useTheme();
  const { logout } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    logout();
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="6" fill="#059669" />
            <rect x="6" y="6" width="6" height="6" rx="1" fill="white" />
            <circle cx="19" cy="19" r="5" fill="white" />
          </svg>
          <span className="text-base font-semibold tracking-tight">Stratum</span>
        </Link>

        <div className="relative flex-1 max-w-md">
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search articles..."
            suppressHydrationWarning
            className="w-full rounded-[var(--radius-input)] border border-zinc-300 bg-white py-1.5 pl-9 pr-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="rounded-[var(--radius-button)] p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={handleSignOut}
            className="rounded-[var(--radius-button)] p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label="Sign out"
          >
            <SignOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}
