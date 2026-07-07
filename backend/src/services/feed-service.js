import prisma from "../database/prisma.js"
import { scoreArticle, buildPreferencesMap } from "./scorer.js"
import { findByUser } from "../repositories/user-preference.repository.js"

export async function getPersonalizedFeed(userId, { page = 1, limit = 20 } = {}) {
  const preferences = await findByUser(userId)

  const preferencesMap = buildPreferencesMap(preferences)
  const hasPreferences = Object.keys(preferencesMap).length > 0

  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000)
  const articles = await prisma.article.findMany({
    where: { publishedAt: { gte: thirtyDaysAgo } },
    include: { source: { select: { name: true } } },
    orderBy: { publishedAt: "desc" }
  })

  const scored = articles.map(a => ({
    ...a,
    relevanceScore: hasPreferences ? scoreArticle(a, preferencesMap) : 0
  }))

  if (hasPreferences) {
    scored.sort((a, b) => b.relevanceScore - a.relevanceScore)
  }

  const skip = (page - 1) * limit
  const paged = scored.slice(skip, skip + limit)

  return {
    data: paged,
    meta: {
      page,
      limit,
      total: scored.length,
      totalPages: Math.ceil(scored.length / limit),
      personalized: hasPreferences
    }
  }
}
