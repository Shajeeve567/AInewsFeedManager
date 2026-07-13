const testimonials = [
  {
    quote: "FedIn completely replaced my morning routine of skimming 15 different sites. I get better signal in 5 minutes than I used to in an hour.",
    name: "Alex Chen",
    role: "Senior Engineer at Stripe",
    stars: 5,
  },
  {
    quote: "The topic clustering alone is worth it. Being able to dive deep on a subject without losing context has changed how I stay current.",
    name: "Priya Patel",
    role: "Engineering Manager at Vercel",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="border-t border-zinc-200 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Loved by engineers
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-[var(--radius-card)] border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <svg key={i} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-zinc-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
