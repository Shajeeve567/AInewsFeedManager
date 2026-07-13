"use client";

import Link from "next/link";
import { Sun, Moon } from "@phosphor-icons/react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function Nav() {
  const { theme, toggle } = useTheme();

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="6" fill="#059669" />
            <rect x="6" y="6" width="6" height="6" rx="1" fill="white" />
            <circle cx="19" cy="19" r="5" fill="white" />
          </svg>
          <span className="text-lg font-semibold tracking-tight">FedIn</span>
        </Link>

        <div className="hidden items-center gap-6 sm:flex">
          <Link href="#features" className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            How it works
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="rounded-[var(--radius-button)] p-2 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link href="/login" className="hidden sm:block">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/login">
            <Button variant="primary" size="sm">Get started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
