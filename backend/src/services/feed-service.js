import { scoreArticleByRule } from "./strategies/ruleBased/rule.js"
import { scoreArticleByEmbedding } from "./strategies/embeddingBased/embedding.js"
import { scoreArticleByTrend } from "./strategies/trendingBased/trending.js"

const WEIGHTS = { rule: 0.4, embedding: 0.4, trending: 0.2 }

export async function getPersonalizedFeed(userId, { page = 1, limit = 20 } = {}) {
  const strategies = await Promise.allSettled([
    scoreArticleByRule(userId),
    scoreArticleByEmbedding(userId, 50),
    scoreArticleByTrend(userId),
  ])

  const [ruleCandidates, embeddingCandidates, trendingCandidates] = strategies.map(
    (result) => (result.status === "fulfilled" ? result.value : [])
  )

  const combinedMap = new Map()

  for (const article of ruleCandidates) {
    combinedMap.set(article.id, {
      ...article,
      finalScore: (article.relevanceScore || 0) * WEIGHTS.rule
    })
  }

  for (const article of embeddingCandidates) {
    const score = (article.embeddingScore || 0) * WEIGHTS.embedding
    if (combinedMap.has(article.id)) {
      combinedMap.get(article.id).finalScore += score
    } else {
      combinedMap.set(article.id, { ...article, finalScore: score })
    }
  }

  for (const article of trendingCandidates) {
    const score = (article.trendingScore || 0) * WEIGHTS.trending
    if (combinedMap.has(article.id)) {
      combinedMap.get(article.id).finalScore += score
    } else {
      combinedMap.set(article.id, { ...article, finalScore: score })
    }
  }

  const finalCandidates = Array.from(combinedMap.values())
  finalCandidates.sort((a, b) => b.finalScore - a.finalScore)
  const skip = (page - 1) * limit
  const paged = finalCandidates.slice(skip, skip + limit)

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