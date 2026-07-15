import prisma from "../database/prisma.js"
import { summaryQueue } from "../queues/summaryQueue.js";

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

export async function saveManyNormalized(articles, sourceId) {
    const data = articles.map(a => ({ ...a, sourceId }));
    await prisma.article.createMany({ data, skipDuplicates: true });

    // Fetch the newly inserted articles by their unique links to get their IDs
    const links = data.map(a => a.link);
    const savedArticles = await prisma.article.findMany({
        where: { link: { in: links } },
        select: { id: true, summary: true }
    });

    // Enqueue jobs for any article that hasn't been summarized yet
    // for (const article of savedArticles) {
    //     if (!article.summary) {
    //         await summaryQueue.add('summarize-article', { articleId: article.id });
    //     }
    // }
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

export async function createInteraction(userId, articleId, type) {
    return prisma.userInteraction.upsert({
        where: { userId_articleId_type: { userId, articleId, type } },
        create: { userId, articleId, type },
        update: { timestamp: new Date() }
    })
}