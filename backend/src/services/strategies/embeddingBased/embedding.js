import { extractor } from "./config.js";
import prisma from "../../../database/prisma.js";
import { getRecentArticlesWithEmbeddings } from "../../../repositories/articleEmbedding.repository.js";
import { InteractionType } from "@prisma/client";


async function generateArticleEmbedding(text) {
    if (!text || typeof text !== 'string') return [];
    const model = await extractor(text, { pooling: 'mean', normalize: true });
    return Array.from(model.data); 
}

function cosineSimilarity(vecA, vecB) {
    if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function buildUserProfileVector(userId) {
    const interactions = await prisma.userInteraction.findMany({
        where: { 
            userId: userId,
            type: { 
                in: [
                    InteractionType.LIKE, 
                    InteractionType.SAVE, 
                    InteractionType.READ, 
                    InteractionType.CLICK, 
                    InteractionType.SHARE
                ] 
            }
        },
        include: {
            article: { include: { embedding: true } }
        },
        orderBy: { timestamp: 'desc' },
        take: 20 
    });

    
    // Extract just the Float[] arrays
    const vectors = interactions
        .filter(int => int.article && int.article.embedding)
        .map(int => int.article.embedding.embedding);
    if (vectors.length === 0) return null; // "Cold start" - they haven't read anything yet!
    // Average the vectors together
    const vectorLength = vectors[0].length;
    const averageVector = new Array(vectorLength).fill(0);
    for (const vec of vectors) {
        for (let i = 0; i < vectorLength; i++) {
            averageVector[i] += vec[i];
        }
    }
    for (let i = 0; i < vectorLength; i++) {
        averageVector[i] /= vectors.length;
    }
    return averageVector;
}


export async function scoreArticleByEmbedding(userId, limit = 20) {
    const userProfileVector = await buildUserProfileVector(userId);
    
    // If we have no profile vector, we can't recommend anything via embeddings yet.
    if (!userProfileVector) return [];
    // Fetch candidate articles from the repository you made
    const candidates = await getRecentArticlesWithEmbeddings(100);
    // Score each candidate against the user profile using Cosine Similarity
    const scoredCandidates = candidates.map(article => {
        const similarity = cosineSimilarity(userProfileVector, article.embedding.embedding);
        return {
            ...article,
            embeddingScore: similarity
        };
    });
    // Sort by highest similarity (closest to 1)
    scoredCandidates.sort((a, b) => b.embeddingScore - a.embeddingScore);
    // Return the top N best matches
    return scoredCandidates.slice(0, limit);
}

