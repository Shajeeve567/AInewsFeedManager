"use client";

import { Sparkle, Brain, ShieldCheck, ClockCounterClockwise, Stack } from "@phosphor-icons/react";

const features = [
  {
    icon: Sparkle,
    title: "AI Summaries",
    description: "Every article is distilled into a concise, two-sentence summary so you can scan your feed in seconds.",
  },
  {
    icon: Brain,
    title: "Smart Ranking",
    description: "Our ranking engine learns what you care about and surfaces the most relevant stories first.",
  },
  {
    icon: ShieldCheck,
    title: "Source Credibility",
    description: "We automatically assess source reliability and flag low-quality or clickbait content.",
  },
  {
    icon: ClockCounterClockwise,
    title: "Personalized Feed",
    description: "Your feed adapts over time based on your reading habits, saves, and topic preferences.",
  },
  {
    icon: Stack,
    title: "Topic Clusters",
    description: "Related articles are grouped into clusters so you can explore a topic in depth without jumping between tabs.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-zinc-200 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Built for how engineers read
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-zinc-600 dark:text-zinc-400">
          Stop wading through endless feeds. FedIn surfaces the stories that matter to you.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.slice(0, 2).map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.slice(2).map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-zinc-200 bg-white p-6 transition-colors hover:border-emerald-200 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-800">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
        <Icon size={20} />
      </div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}
