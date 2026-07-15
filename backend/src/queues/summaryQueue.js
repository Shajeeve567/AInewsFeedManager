import { Queue } from 'bullmq';

export const connection = {
    host: process.env.REDIS_URL || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379
};

export const summaryQueue = new Queue('article-summary-queue', { connection });
