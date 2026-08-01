import { extractKeywords } from "../../../utils/keyword-extractor.js"

const RECENCY_WEIGHT = 0.3
const RELEVANCE_WEIGHT = 0.7
const RECENCY_DAYS = 15

export function scoreArticle(article, preferencesMap) {
  const keywordsFromTitle = extractKeywords(article.title)
  const keywordsFromContent = extractKeywords(article.content)
  const keywords = [...new Set([...keywordsFromTitle, ...keywordsFromContent])]
  
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
