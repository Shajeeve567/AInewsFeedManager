"use client";

import { ArticleCard } from "./article-card";
import type { Article } from "@/lib/api";

interface FeedGridProps {
  articles: Article[];
  savedIds: Set<number>;
  onSaveArticle: (id: number) => void;
  onClickArticle: (id: number) => void;
}

export function FeedGrid({ articles, savedIds, onSaveArticle, onClickArticle }: FeedGridProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400">No articles yet</p>
        <p className="mt-1 text-sm text-zinc-500">Check back later for fresh content.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          saved={savedIds.has(article.id)}
          onSave={onSaveArticle}
          onClick={() => onClickArticle(article.id)}
        />
      ))}
    </div>
  );
}
