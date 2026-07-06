"use client";

import { Bookmark, BookmarkSimple, Clock, ArrowSquareOut } from "@phosphor-icons/react";
import { cn, timeAgo, readingTime, truncate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/api";

interface ArticleCardProps {
  article: Article;
  saved: boolean;
  onSave: (id: number) => void;
}

export function ArticleCard({ article, saved, onSave }: ArticleCardProps) {
  return (
    <div className="group rounded-[var(--radius-card)] border border-zinc-200 bg-white p-4 transition-all duration-150 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {article.source.name}
            </span>
            {article.relevanceScore && article.relevanceScore > 0 && (
              <Badge variant="accent" className="shrink-0">{article.relevanceScore}</Badge>
            )}
            {article.relevanceScore && article.relevanceScore > 0 && (
              <span className="shrink-0 rounded-[var(--radius-badge)] bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-300" title="Matched your interests">
                Recommended
              </span>
            )}
          </div>
          <h3 className="mt-0.5 text-sm font-semibold leading-snug">
            {truncate(article.title, 120)}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {truncate(article.content, 150)}
          </p>
          <div className="mt-2 flex items-center gap-3 text-xs text-zinc-400">
            <span className="inline-flex items-center gap-1">
              <Clock size={12} />
              {readingTime(article.content)}
            </span>
            <span>{timeAgo(article.publishedAt)}</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <button
            onClick={() => onSave(article.id)}
            className={cn(
              "rounded-[var(--radius-button)] p-1.5 transition-colors",
              saved
                ? "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                : "text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
            aria-label={saved ? "Unsave article" : "Save article"}
          >
            {saved ? <BookmarkSimple size={16} weight="fill" /> : <Bookmark size={16} />}
          </button>
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[var(--radius-button)] p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Open article"
          >
            <ArrowSquareOut size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
