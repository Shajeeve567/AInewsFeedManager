import { Queue } from 'bullmq';
import Redis from 'ioredis';

let redisConfig = { host: "127.0.0.1", port: 6379, maxRetriesPerRequest: null };
if (process.env.REDIS_URL) {
    const url = new URL(process.env.REDIS_URL);
    redisConfig = {
        host: url.hostname,
        port: parseInt(url.port) || (url.protocol === 'rediss:' ? 6380 : 6379),
        username: url.username || undefined,
        password: url.password || undefined,
        tls: (url.protocol === 'rediss:' || url.hostname.includes('upstash')) ? {} : undefined,
        maxRetriesPerRequest: null
    };
}
export const connection = new Redis(redisConfig);

export const rssFeedQueue = new Queue('rss-feed-queue', { connection });

