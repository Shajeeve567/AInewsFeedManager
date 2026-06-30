import Parser from "rss-parser";
import { saveManyArticles } from "../../repositories/article.repository.js";

export async function fetch(source) {
    const parser = new Parser();
    try {
        const feed = await parser.parseURL(source.url);
        const result = await saveManyArticles(feed, source.id);
        console.log(`Fetched Successfully : ${source.name}`)
        return { success: true, count: result.count };
    } catch (error) {
        console.error(`RSS fetch failed for source ${source.id}:`, error.message);
        throw error;
    }
}
