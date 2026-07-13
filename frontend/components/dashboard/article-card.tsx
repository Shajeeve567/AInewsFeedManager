"use client";

import { motion } from "motion/react";
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
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group rounded-3xl glass-widget-light p-5 transition-colors duration-300 hover:bg-white/70"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-xs font-medium text-emerald-700 dark:text-emerald-400">
              {article.source.name}
            </span>
            {article.relevanceScore && article.relevanceScore > 0 && (
              <Badge variant="accent" className="shrink-0">{article.relevanceScore.toFixed(2)}</Badge>
            )}
            {article.relevanceScore && article.relevanceScore > 0 && (
              <motion.span 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="shrink-0 rounded-[var(--radius-badge)] bg-emerald-500/20 px-2 py-0.5 text-[11px] font-medium text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300" title="Matched your interests">
                Recommended
              </motion.span>
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
    </motion.div>
  );
}
