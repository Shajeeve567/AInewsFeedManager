import Parser from "rss-parser";

export async function fetch(source) {
    const parser = new Parser();
    try {
        const feed = await parser.parseURL(source.url);
        console.log(`Fetched Successfully : ${source.name}`)
        return feed.items.map(item => ({
            title: item.title,
            link: item.link || item.guid,
            content: item.content.replace(/<[^>]*>/g, "").trim() || item.contentSnippet || null,
            publishedAt: item.isoDate ? new Date(item.isoDate) : (item.pubDate ? new Date(item.pubDate) : null)
        }));
    } catch (error) {
        console.error(`RSS fetch failed for source ${source.id}:`, error.message);
        throw error;
    }
}
