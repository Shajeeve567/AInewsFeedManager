import { Worker } from "bullmq";
import { connection } from "../queues/summaryQueue.js";
import { summarize } from "../services/aiFeatures/summarizeArticles.js";
import prisma from "../database/prisma.js";

const summaryWorker = new Worker('article-summary-queue', async (job) => {
    const { articleId } = job.data;
    
    // Fetch the article content
    const article = await prisma.article.findUnique({
        where: { id: articleId },
        select: { id: true, content: true }
    });

    if (!article || !article.content) {
        console.log(`[Summary Worker] Skipping article ${articleId} - no content found.`);
        return { skipped: true };
    }

    console.log(`[Summary Worker] Summarizing article ${articleId}...`);
    
    // This will throw if rate limits are hit across all models, which BullMQ will catch to retry
    const summaryText = await summarize(article.content);

    if (summaryText) {
        // Save the generated summary back to the database
        await prisma.article.update({
            where: { id: articleId },
            data: { summary: summaryText }
        });
        console.log(`[Summary Worker] Successfully summarized article ${articleId}.`);
    } else {
        console.log(`[Summary Worker] Article ${articleId} content was too short to summarize.`);
    }

    return true;

}, { 
    connection,
    // Rate Limiting: e.g., max 5 jobs per minute (60,000ms) to respect free-tier API limits
    limiter: {
        max: 5,
        duration: 60000 
    }
});

// Event listeners for debugging
summaryWorker.on('completed', job => {
    console.log(`[Summary Worker] Job ${job.id} completed!`);
});

summaryWorker.on('failed', (job, err) => {
    console.error(`[Summary Worker] Job ${job.id} failed: ${err.message}`);
});
