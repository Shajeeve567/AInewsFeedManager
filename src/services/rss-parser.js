import prisma from "../database/prisma.js";
import Parser from "rss-parser";
import { saveManyArticles } from "../repositories/article.repository.js";
import { get, set } from "../utils/cache.js"

async function fetchSource(sourceId){
    try {
        const source = await prisma.source.findUnique({
            where: {
                id: sourceId,
            },
        });
            // 2. Return error if no record matches that sourceId
        if (!source) {
            throw new Error(`Record with sourceId ${sourceId} does not exist.`);
        }

        if(source.type == "RSS") {
            const parser = new Parser();
            
            try {
                const feed = await parser.parseURL(source.url)

                // injecting to in-memorydb
                
                // no redis yet

                // saving to db
                const result = await saveManyArticles(feed, source.id);

                return { success: true, count: result.count };

                
            } catch (error) {
                console.error('Error parsing the RSS feed:', error);
                throw error;
            }
        }

        else{
            console.error("ERROR: This is not a Valid rss feed.");
        }
        // if  its api

    } catch (error) {
        console.error(`fetchSource(${sourceId}) failed:`, error.message);
        throw error; // or return { error }
    }
}

