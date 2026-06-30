import cron from "node-cron"
import * as sourceRepo from "../repositories/source.repository.js"
import { rssFeedQueue } from "../queues/rssQueue.js"
import { fetchAllSources } from "../services/fetcher.js"

const EVERY_15_MIN = "*/15 * * * *"

export function startSourceScheduler() {
    console.log("[Scheduler] Running initial fetch...")
    fetchRSSforSchedule();

    console.log("[Scheduler] Scheduling RSS fetch every 15 minutes...")
    cron.schedule(EVERY_15_MIN, () => {
        fetchRSSforSchedule();
        console.log("Added to the queue...");
    })
}


export async function fetchRSSforSchedule() {
    // finding all sources
    try {
        const sources = await sourceRepo.findAll();

        for (const feed of sources) {
            await rssFeedQueue.add(
                `fetch-${feed.id}`,
                feed, 
                {
                    jobId: `feed-job-${feed.id}`,
                    removeOnComplete: true,
                    removeOnFail: true
                }
            );
        }
    } catch (error) {
        
    }
}