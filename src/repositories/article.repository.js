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
        skipDuplicates: true // Prevents crashing if an article was already processed
    });
}

export async function deleteArticles() {

}