import { extractKeywords } from "./keyword-extractor.js"

const RECENCY_WEIGHT = 0.3
const RELEVANCE_WEIGHT = 0.7
const RECENCY_DAYS = 30

export function scoreArticle(article, preferencesMap) {
  const keywords = extractKeywords(article.title)
  let relevanceScore = 0
  for (const kw of keywords) {
    relevanceScore += preferencesMap[kw] || 0
  }

  const recency = article.publishedAt
    ? Math.max(0, 1 - (Date.now() - new Date(article.publishedAt).getTime())
        / (RECENCY_DAYS * 86400000))
    : 0

  return relevanceScore * RELEVANCE_WEIGHT + recency * RECENCY_WEIGHT
}

export function buildPreferencesMap(preferences) {
  const map = {}
  for (const p of preferences) {
    map[p.keyword] = p.score
  }
  return map
}
