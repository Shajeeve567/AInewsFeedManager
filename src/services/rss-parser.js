import prisma from "../database/prisma.js"
import Parser from "rss-parser"

async function fetchSource(sourceId){
    try {
        const source = await prisma.source.findUnique({
            where: {
                id: sourceId,
            },
        });
            // 2. Return error if no record matches that sourceId
        if (!source) {
            throw new Error(`Record with sourceId ${yourSourceIdValue} does not exist.`);
        }

        if(source.type == "RSS") {
            const parser = new Parser();
            
            try {
                const feed = await parser.parseURL(source.url)

                // injecting to in-memorydb

                // no redis yet
                const cache = new Map();
                export function get(key) { return cache.get(key);}
                export function set(key, value, ttlMs = 300000) { 
                    cache.set(key, value);
                    setTimeout(() => cache.delete(key), ttlMs); 
                }

                // saving to db

                const articles = feed.items.map(item => ({
                    title:  item.title,
                    link:   item.link || item.guid,
                    content: item.content || item.contentSnippet || null,
                    publishedAt: item.isoDate ? new Date(item.isoDate) : (item.pubDate ? new Date(item.pubDate) : null),
                    sourceId: source.id
                }));

                const result = await prisma.article.createMany({
                    data: articles,
                    skipDuplicates: true // Prevents crashing if an article was already processed
                });

                return { success: true, count: result.count };

                
            } catch (error) {
                console.error('Error parsing the RSS feed:', error);
            }
        }

        // if  its api

    } catch (error) {
        console.error(`fetchSource(${sourceId}) failed:`, error.message);
        throw error; // or return { error }
    }
}

