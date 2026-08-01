import prisma from "../database/prisma.js"

export async function findByUser(userId) {
  return prisma.userInteraction.findMany({
    where: { userId },
    orderBy: { timestamp: "desc" }
  })
}

export async function findInteractedArticleIds(userId) {
  const interactions = await prisma.userInteraction.findMany({
    where: { userId },
    select: { articleId: true },
    distinct: ["articleId"]
  })
  return interactions.map(i => i.articleId)
}

export async function getTrendingByType(since, until) {
  return prisma.userInteraction.groupBy({
    by: ["articleId", "type"],
    where: {
      timestamp: { gte: since, lte: until }
    },
    _count: { type: true }
  })
}

export async function getTopTrendingArticles(since, limit, excludeArticleIds) {
  return prisma.article.findMany({
    where: {
      publishedAt: { gte: since },
      ...(excludeArticleIds.length ? { id: { notIn: excludeArticleIds } } : {})
    },
    include: {
      source: { select: { name: true } },
      interactions: {
        where: { timestamp: { gte: since } },
        select: { type: true }
      }
    },
    orderBy: { publishedAt: "desc" },
    take: limit
  })
}

