import prisma from "../database/prisma.js"
import { scoreArticle, buildPreferencesMap } from "./scorer.js"
import { findByUser } from "../repositories/user-preference.repository.js"

export async function getPersonalizedFeed(userId, { page = 1, limit = 20 } = {}) {
  const preferences = await findByUser(userId)

  const [ruleCandidates, embeddingCandidates] = await Promise.all([
      scoreArticleByRule(userId),
      scoreArticleByEmbedding(userId, 50) // Ask for top 50 embedding candidates
  ]);

  const combinedMap = new Map();

  for (const article of ruleCandidates) {
    combinedMap.set(article.id, {
        ...article,
        finalScore: article.relevanceScore * 0.4 // Weight Rule-based at 40%
    });
  }

  for (const article of embeddingCandidates) {
      if (combinedMap.has(article.id)) {
          const existing = combinedMap.get(article.id);
          existing.finalScore += (article.embeddingScore * 0.6); // Boost score!
      } else {
          combinedMap.set(article.id, {
              ...article,
              finalScore: article.embeddingScore * 0.6 // Weight Embedding at 60%
          });
      }
  }

  const finalCandidates = Array.from(combinedMap.values());
  finalCandidates.sort((a, b) => b.finalScore - a.finalScore);
  const skip = (page - 1) * limit;
  const paged = finalCandidates.slice(skip, skip + limit);

  return {
    data: paged,
    meta: {
      page,
      limit,
      total: finalCandidates.length,
      totalPages: Math.ceil(finalCandidates.length / limit),
      personalized: finalCandidates.length > 0 
    }
  }
}
