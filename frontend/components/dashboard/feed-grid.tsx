"use client";

import { motion } from "motion/react";
import { ArticleCard } from "./article-card";
import type { Article } from "@/lib/api";

interface FeedGridProps {
  articles: Article[];
  savedIds: Set<number>;
  onSaveArticle: (id: number) => void;
}

export function FeedGrid({ articles, savedIds, onSaveArticle }: FeedGridProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium text-fedin-dark/90">No articles yet</p>
        <p className="mt-1 text-sm text-fedin-dark/60">Check back later for fresh content.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        }
      }}
      className="space-y-4"
    >
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          saved={savedIds.has(article.id)}
          onSave={onSaveArticle}
        />
      ))}
    </motion.div>
  );
}
