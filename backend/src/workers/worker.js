import { Worker } from "bullmq";
import { connection } from "../queues/rssQueue.js"
import { fetchSource } from "../services/fetcher.js"


const rssWorker = new Worker('rss-feed-queue', async (job) => {
    const { id, name, url, type } = job.data;
    
    await fetchSource(job.data);
    console.log(`[Worker] Picked up job for: ${name}`);
    return true;

}, { connection });

