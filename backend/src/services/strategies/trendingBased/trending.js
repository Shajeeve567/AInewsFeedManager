import { findInteractedArticleIds, getTopTrendingArticles } from "../../../repositories/userInteraction.repository.js"

const WEIGHTS = { LIKE: 4, SAVE: 3, READ: 2, CLICK: 1, SHARE: 1 }
const DECAY_DAYS = 7
const TRENDING_LIMIT = 50

export async function scoreArticleByTrend(userId) {
    const since = new Date(Date.now() - DECAY_DAYS * 24 * 60 * 60 * 1000)
    const interactedIds = await findInteractedArticleIds(userId)
    const articles = await getTopTrendingArticles(since, 100, interactedIds)

    const scored = articles.map(article => {
        let weightedTotal = 0
        for (const interaction of article.interactions) {
            weightedTotal += WEIGHTS[interaction.type] || 1
        }

        const daysOld = (Date.now() - new Date(article.publishedAt).getTime()) / (24 * 60 * 60 * 1000)
        const recencyDecay = Math.max(0, 1 - daysOld / DECAY_DAYS)

        return {
            ...article,
            trendingScore: weightedTotal * recencyDecay
        }
    })

    scored.sort((a, b) => b.trendingScore - a.trendingScore)
    return scored.slice(0, TRENDING_LIMIT)
}