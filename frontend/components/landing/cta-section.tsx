"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="border-t border-zinc-200 py-20 dark:border-zinc-800">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to cut through the noise?
        </h2>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Join the engineers who start their day with FedIn.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/login">
            <Button size="lg">
              Start reading for free
              <ArrowRight size={18} weight="bold" />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="outline" size="lg">See how it works</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
