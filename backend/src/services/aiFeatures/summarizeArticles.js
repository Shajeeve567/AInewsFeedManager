import { generateText } from "ai";
import { getModelConnection, putModelOnCooldown } from "./modelConfig.js";


export async function summarize(articleContent) {
    if (!articleContent || articleContent.trim().length < 50) {
        return null; 
    }

    let retries = 3; // Maximum fallback attempts

    while (retries > 0) {
        let connection;
        
        try {
            // Get the best available model. Will throw if all are exhausted.
            connection = getModelConnection();
            
            const { text } = await generateText({
                model: connection.model,
                prompt: `You are an expert technical editor. Summarize the following news article in exactly 2-3 concise, informative sentences. Do not include introductory phrases like "Here is a summary".\n\nArticle Content:\n${articleContent}`,
                maxTokens: 150,
                temperature: 0.3,
            });

            return text.trim();

        } catch (error) {
            console.warn(`[AI Summarizer] Error with model ${connection?.modelId}: ${error.message}`);
            
            // If we hit a rate limit (429) or out of credits (402), put model on cooldown for 2 minutes
            if (error.statusCode === 429 || error.statusCode === 402 || error.message.includes("rate limit") || error.message.includes("quota")) {
                console.log(`[AI Summarizer] Putting ${connection.modelId} on cooldown for 120s due to rate limits.`);
                putModelOnCooldown(connection.modelId, 120);
                retries--;
                continue; // Try again with the next available model
            }

            // If it's a critical error (like no available models left), bubble it up to BullMQ
            if (error.message.includes("RATE_LIMIT_EXCEEDED")) {
                throw error; 
            }

            // For any other unexpected errors, fail this job so BullMQ can retry it later
            throw error; 
        }
    }

    throw new Error("RATE_LIMIT_EXCEEDED: Failed to summarize after exhausting fallbacks.");
}