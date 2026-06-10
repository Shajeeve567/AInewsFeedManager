import prisma from "./database/prisma.js"
import Parser from "rss-parser"

async function fetchSource(sourceId){
    try {
        const source = await prisma.source.findUnique({
            where: {
                id: sourceId,
            },
        });
            // 2. Return error if no record matches that sourceId
        if (!record) {
        throw new Error(`Record with sourceId ${yourSourceIdValue} does not exist.`);
        }

        if(source.type == "RSS") {
            const parser = new Parser();
            
            try {
                const feed = await parser.parseURL(source.url)

                // injecting to in-memorydb
                // saving to db

                
            } catch (error) {
                console.error('Error parsing the RSS feed:', error);
            }
        }
    } catch (error) {
        
    }
}

