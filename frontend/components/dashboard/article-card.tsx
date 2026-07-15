"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Bookmark, BookmarkSimple, Clock, ArrowSquareOut, Sparkle, X, CircleNotch } from "@phosphor-icons/react";
import { cn, timeAgo, readingTime, truncate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getArticleById, summarizeArticle, type Article } from "@/lib/api";

interface ArticleCardProps {
  article: Article;
  saved: boolean;
  onSave: (id: number) => void;
  onClick: () => void;
}

export function ArticleCard({ article, saved, onSave, onClick }: ArticleCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [liveSummary, setLiveSummary] = useState(article.summary);
  const [mounted, setMounted] = useState(false);
  const isSummarized = !!liveSummary;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isModalOpen && !liveSummary) {
      interval = setInterval(async () => {
        try {
          const res = await getArticleById(article.id);
          if (res.data.summary) {
            setLiveSummary(res.data.summary);
            clearInterval(interval);
          }
        } catch (error) {
          console.error("Failed to poll article summary", error);
        }
      }, 3000); // poll every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isModalOpen, liveSummary, article.id]);

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
            {isSummarized && (
              <span className="shrink-0 flex items-center gap-1 rounded-[var(--radius-badge)] bg-fedin-green/20 px-2 py-0.5 text-[11px] font-medium text-fedin-green-hover">
                <Sparkle weight="fill" size={10} />
                AI Summarized
              </span>
            )}
          </div>
          <a href={article.link} target="_blank" rel="noopener noreferrer" onClick={onClick}>
            <h3 className="mt-0.5 text-sm font-semibold leading-snug transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
              {truncate(article.title, 120)}
            </h3>
          </a>
          <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {truncate(article.content, 150)}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="inline-flex items-center gap-1">
                <Clock size={12} />
                {readingTime(article.content)}
              </span>
              <span>{timeAgo(article.publishedAt)}</span>
            </div>
            
            <button
              onClick={async (e) => {
                e.stopPropagation();
                setIsModalOpen(true);
                if (!isSummarized) {
                  try {
                    await summarizeArticle(article.id);
                  } catch (error) {
                    console.error("Failed to queue summarization", error);
                  }
                }
              }}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all shadow-sm",
                isSummarized 
                  ? "bg-fedin-green text-white hover:bg-fedin-green-hover"
                  : "bg-white text-fedin-green hover:bg-fedin-green/10 border border-fedin-green/20"
              )}
            >
              <Sparkle weight={isSummarized ? "fill" : "regular"} size={14} />
              Summarize
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <button
            onClick={(e) => { e.stopPropagation(); onSave(article.id); }}
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
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="rounded-[var(--radius-button)] p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Open article"
          >
            <ArrowSquareOut size={16} />
          </a>
        </div>
      </div>

      {/* Summary Modal (Rendered via Portal to escape CSS transforms) */}
      {mounted && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg overflow-hidden rounded-3xl glass-widget bg-fedin-bg/95 p-6 shadow-2xl border border-white/60"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-fedin-dark">
                    <Sparkle weight="fill" className="text-fedin-green" size={20} />
                    AI Summary
                  </h3>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
                    className="rounded-full p-1.5 text-zinc-500 hover:bg-black/5 transition-colors"
                  >
                    <X size={18} weight="bold" />
                  </button>
                </div>

                <div className="min-h-[100px] flex flex-col justify-center">
                  {liveSummary ? (
                    <p className="text-zinc-800 leading-relaxed text-base">
                      {liveSummary}
                    </p>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 py-6 text-fedin-green">
                      <CircleNotch size={32} className="animate-spin" />
                      <p className="text-sm font-medium text-fedin-dark/70">
                        Reading the article and generating summary...
                      </p>
                      <p className="text-xs text-fedin-dark/50">
                        This usually takes 10-15 seconds. You can close this and check back later.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
}
