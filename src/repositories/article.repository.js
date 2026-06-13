import prisma from "../database/prisma.js"

export async function saveManyArticles(feed, sourceId) {
    const articles = feed.items.map(item => ({
        title:  item.title,
        link:   item.link || item.guid,
        content: item.content || item.contentSnippet || null,
        publishedAt: item.isoDate ? new Date(item.isoDate) : (item.pubDate ? new Date(item.pubDate) : null),
        sourceId
    }));

    return prisma.article.createMany({
        data: articles,
        skipDuplicates: true
    });
}

export async function findMany({ sourceId, page = 1, limit = 20 }) {
    const skip = (page - 1) * limit
    const where = sourceId ? { sourceId: Number(sourceId) } : {}

    return prisma.article.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: "desc" },
        include: { source: { select: { name: true } } }
    })
}

export async function count({ sourceId } = {}) {
    const where = sourceId ? { sourceId: Number(sourceId) } : {}
    return prisma.article.count({ where })
}

export async function findById(id) {
    return prisma.article.findUnique({
        where: { id },
        include: { source: { select: { name: true } } }
    })
}