"use client";

import { useEffect, useState, useCallback } from "react";
import { getFeed, interactWithArticle } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { FeedGrid } from "./feed-grid";
import { Sidebar } from "./sidebar";
import type { Article } from "@/lib/api";

interface TrendingTopic {
  word: string;
  count: number;
  maxCount: number;
}

function computeTrending(articles: Article[]): TrendingTopic[] {
  const wordCounts = new Map<string, number>();
  const stopwords = new Set([
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "from", "is", "it", "as", "be", "are", "was",
    "were", "been", "being", "have", "has", "had", "do", "does", "did",
    "will", "would", "can", "could", "should", "may", "might", "shall",
    "not", "no", "nor", "so", "if", "than", "that", "this", "these",
    "those", "i", "me", "my", "we", "our", "you", "your", "he", "she",
    "his", "her", "its", "they", "them", "their", "what", "which", "who",
    "how", "when", "where", "why", "about", "into", "over", "after",
    "before", "between", "under", "up", "down", "out", "off", "just",
    "also", "very", "too", "more", "most", "new", "like", "get", "make",
  ]);

  for (const article of articles) {
    const words = article.title.toLowerCase().split(/[^a-z0-9]+/);
    const seen = new Set<string>();
    for (const word of words) {
      if (word.length < 3 || stopwords.has(word) || seen.has(word)) continue;
      seen.add(word);
      wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    }
  }

  const sorted = [...wordCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const maxCount = sorted.length > 0 ? sorted[0][1] : 1;

  return sorted.map(([word, count]) => ({ word, count, maxCount }));
}

export function FeedClient() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFeed = useCallback(async (pageNum: number) => {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      const res = await getFeed(user.id, pageNum);
      if (pageNum === 1) {
        setArticles(res.data);
      } else {
        setArticles((prev) => [...prev, ...res.data]);
      }
      setHasMore(pageNum < res.meta.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load feed");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFeed(1);
  }, [fetchFeed]);

  const handleSaveArticle = async (articleId: number) => {
    if (!user) return;
    const wasSaved = savedIds.has(articleId);
    if (wasSaved) {
      setSavedIds((prev) => { const next = new Set(prev); next.delete(articleId); return next; });
    } else {
      setSavedIds((prev) => { const next = new Set(prev); next.add(articleId); return next; });
    }
    try {
      await interactWithArticle(articleId, "SAVE", user.id);
    } catch {
      setSavedIds((prev) => { const next = new Set(prev); wasSaved ? next.add(articleId) : next.delete(articleId); return next; });
    }
  };

  const handleClickArticle = (articleId: number) => {
    if (!user) return;
    interactWithArticle(articleId, "CLICK", user.id).catch(() => {});
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchFeed(nextPage);
    }
  };

  const trendingTopics = computeTrending(articles);

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <p className="text-lg font-medium text-red-500">{error}</p>
        <button
          onClick={() => fetchFeed(1)}
          className="mt-4 rounded-[var(--radius-button)] bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          {loading && articles.length === 0 ? (
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-[var(--radius-card)] border border-zinc-200 p-4 dark:border-zinc-800">
                  <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="mt-2 h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="mt-1 h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="mt-3 h-3 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <FeedGrid articles={articles} savedIds={savedIds} onSaveArticle={handleSaveArticle} onClickArticle={handleClickArticle} />
              {hasMore && (
                <div className="mt-6 text-center">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="rounded-[var(--radius-button)] border border-zinc-300 px-6 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  >
                    {loading ? "Loading..." : "Load more"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <div className="hidden lg:block">
          <Sidebar trendingTopics={trendingTopics} />
        </div>
      </div>
    </div>
  );
}
