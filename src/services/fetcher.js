import adapters from "./adapters/index.js"
import prisma from "../database/prisma.js";
import Parser from "rss-parser";
import { saveManyArticles } from "../repositories/article.repository.js";
import { findById } from "../repositories/source.repository.js"
import { get, set } from "../utils/cache.js"
import { rss } from "./adapters/index.js"



export async function fetchSource(source) {
  if (source.type === "RSS") return adapters.rss(source)
  if (source.type === "API") {
    const adapter = adapters[source.config.apiName]
    if (!adapter) throw new Error(`Unknown API adapter: ${source.config.apiName}`)
    return adapter(source)
  }
  throw new Error(`Unknown source type: ${source.type}`)
}


export async function fetchAllSources() {
    try {
        // get all stored sources
        const sources = await prisma.source.findMany({
            where: { type: "RSS" }
        });
        // use fetchsource function on all sources
        const results = await Promise.allSettled(
            sources.map(s => fetchSource(s))
        );
        // store then to articles
        const succeeded = results.filter(r => r.status === "fulfilled").length;
        const failed = results.filter(r => r.status === "rejected").length;

        console.log(`Fetched ${sources.length} sources: ${succeeded} ok, ${failed} failed`);
        return { total: sources.length, succeeded, failed };

    } catch (error) {
        console.error("Error: could not fetch all sources")
    }
}

