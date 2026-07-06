"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const mockArticles = [
  { title: "Rust 2.0 drops the borrow checker", source: "Hacker News", time: "2h ago", score: 94 },
  { title: "Inside the new React Server Component compiler", source: "Dev.to", time: "4h ago", score: 88 },
  { title: "Why edge computing is a dead end", source: "Ars Technica", time: "6h ago", score: 82 },
];

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Signal, <span className="text-emerald-600 dark:text-emerald-400">not noise.</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            An AI-powered newsfeed that aggregates, ranks, summarizes, and recommends
            the most relevant technology news for engineers. Focus on what matters.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/login">
              <Button size="lg">
                Start reading
                <ArrowRight size={18} weight="bold" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" size="lg">Learn more</Button>
            </Link>
          </div>
        </div>

        <div className="hidden space-y-3 lg:block">
          {mockArticles.map((article, i) => (
            <div
              key={i}
              className="rounded-[var(--radius-card)] border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-emerald-600 dark:text-emerald-400">{article.source}</p>
                  <p className="mt-0.5 truncate text-sm font-medium">{article.title}</p>
                </div>
                <span className="shrink-0 rounded-[var(--radius-badge)] bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {article.score}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-zinc-500">{article.time}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
