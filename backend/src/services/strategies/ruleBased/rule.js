import prisma from "../../database/prisma.js"
import { scoreArticle, buildPreferencesMap } from "./scorer.js"


export async function scoreArticleByRule(userId){
    const preferences = await prisma.userPreference.findMany({
        where: { userId },
        select: { keyword: true, score: true }
    })

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

    return scored
}