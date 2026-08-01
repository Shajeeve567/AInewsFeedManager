import { Queue } from 'bullmq';
import Redis from 'ioredis';

export const connection = process.env.REDIS_URL 
    ? new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: null }) 
    : { host: "127.0.0.1", port: 6379, maxRetriesPerRequest: null };

export const rssFeedQueue = new Queue('rss-feed-queue', { connection });

