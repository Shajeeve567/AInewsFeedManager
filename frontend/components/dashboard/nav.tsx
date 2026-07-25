"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MagnifyingGlass, SignOut, Globe } from "@phosphor-icons/react";
import { useAuth } from "@/lib/auth-context";

export function DashboardNav() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="sticky top-4 z-50 w-full px-4 flex justify-center">
      <nav className="glass-nav rounded-full px-6 py-2 flex w-full max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex gap-1">
            <div className="w-1.5 h-5 bg-fedin-dark rounded-full transform -rotate-12"></div>
            <div className="w-1.5 h-3 bg-fedin-dark rounded-full mt-2 transform -rotate-12"></div>
            <div className="w-1.5 h-4 bg-fedin-dark rounded-full mt-1 transform -rotate-12"></div>
          </div>
          <span className="text-base font-bold tracking-tight text-fedin-dark">FedIn</span>
          <div className="ml-2 flex items-center gap-1.5 rounded-full bg-white/40 px-2 py-0.5 text-[10px] font-medium border border-white/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fedin-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-fedin-green"></span>
            </span>
            <span className="text-fedin-dark">Live</span>
          </div>
        </Link>

        <div className="relative flex-1 max-w-md hidden sm:block">
          <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-fedin-dark/50" />
          <input
            type="text"
            placeholder="Search articles..."
            suppressHydrationWarning
            className="w-full rounded-full border border-white/60 bg-white/40 py-2 pl-9 pr-3 text-sm text-fedin-dark placeholder:text-fedin-dark/50 focus:outline-none focus:ring-1 focus:ring-fedin-green focus:border-fedin-green transition-all"
          />
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Link 
            href="/dashboard/sources"
            className="rounded-full px-4 py-2.5 text-sm font-semibold text-fedin-dark/80 transition-colors hover:bg-white/60 hover:text-fedin-dark flex items-center gap-2"
            title="Manage Sources"
          >
            <Globe size={18} weight="bold" /> <span className="hidden sm:inline">Sources</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="rounded-full p-2.5 text-fedin-dark/70 transition-colors hover:bg-red-50 hover:text-red-500"
            aria-label="Sign out"
            title="Sign Out"
          >
            <SignOut size={18} weight="bold" />
          </button>
        </div>
      </nav>
    </div>
  );
}
