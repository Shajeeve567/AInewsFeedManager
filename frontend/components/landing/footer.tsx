import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-10 dark:border-zinc-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="6" fill="#059669" />
            <rect x="6" y="6" width="6" height="6" rx="1" fill="white" />
            <circle cx="19" cy="19" r="5" fill="white" />
          </svg>
          <span className="text-sm font-semibold">Stratum</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <Link href="#features" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">Features</Link>
          <Link href="#how-it-works" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">How it works</Link>
          <Link href="/login" className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100">Sign in</Link>
        </div>
        <p className="text-xs text-zinc-400">&copy; {new Date().getFullYear()} Stratum. All rights reserved.</p>
      </div>
    </footer>
  );
}
