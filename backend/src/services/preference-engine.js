import prisma from "../database/prisma.js"
import { extractKeywords } from "./keyword-extractor.js"
import { decayAll, upsertKeyword } from "../repositories/user-preference.repository.js"
import { findById } from "../repositories/article.repository.js"

const WEIGHTS = { LIKE: 4, SAVE: 3, READ: 2, CLICK: 1, SHARE: 1, DISMISS: -2 }
const DECAY_RATE = 0.95

export async function updateScores(userId, articleId, interactionType) {
  const article = await findById(userId)
  
  if (!article) return

  const keywords = extractKeywords(article.title)
  const weight = WEIGHTS[interactionType] || 1

  await decayAll(userId, DECAY_RATE)

  for (const keyword of keywords) {
    await upsertKeyword(userId, keyword, weight)
  }
}
