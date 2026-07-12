import prisma from "../database/prisma.js"


/**
 * Saves or updates the embedding for a specific article.
 */
export async function upsertArticleEmbedding(articleId, embeddingArray) {
    return prisma.articleEmbeddings.upsert({
        where: { articleId: articleId },
        create: {
            articleId: articleId,
            embedding: embeddingArray
        },
        update: {
            embedding: embeddingArray
        }
    })
}




export async function getRecentArticlesWithEmbeddings(limit = 100) {
    return prisma.article.findMany({
        where: {
            embedding: { isNot: null } // Only get articles that have an embedding
        },
        include: {
            embedding: true // Include the embedding data in the result
        },
        orderBy: {
            publishedAt: 'desc'
        },
        take: limit
    })
}