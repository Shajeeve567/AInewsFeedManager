import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 text-center">
      <div className="flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-400">
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <rect width="28" height="28" rx="6" fill="#059669" />
          <rect x="6" y="6" width="6" height="6" rx="1" fill="white" />
          <circle cx="19" cy="19" r="5" fill="white" />
        </svg>
        Stratum
      </div>
      <h1 className="mt-6 text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">404</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-6 rounded-[var(--radius-button)] bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
      >
        Go home
      </Link>
    </div>
  );
}
