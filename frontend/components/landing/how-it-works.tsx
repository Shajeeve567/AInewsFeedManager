const steps = [
  {
    number: "01",
    title: "Connect your sources",
    description: "Link your favorite RSS feeds, newsletters, and dev communities. FedIn pulls everything into one unified stream.",
  },
  {
    number: "02",
    title: "AI processes the signal",
    description: "Our engine summarizes, scores, and clusters every article. It learns your preferences with each interaction.",
  },
  {
    number: "03",
    title: "Read what matters",
    description: "Your personalized feed surfaces the most relevant stories first. No noise, no clutter, just signal.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-zinc-200 py-20 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Three steps to clarity
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-zinc-600 dark:text-zinc-400">
          From chaos to clarity in minutes.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
