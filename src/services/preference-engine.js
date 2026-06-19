import prisma from "../database/prisma.js"
import { extractKeywords } from "./keyword-extractor.js"

const WEIGHTS = { SAVE: 3, READ: 2, CLICK: 1 }
const DECAY_RATE = 0.95

export async function updateScores(userId, articleId, interactionType) {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    select: { title: true }
  })
  if (!article) return

  const keywords = extractKeywords(article.title)
  const weight = WEIGHTS[interactionType] || 1

  await prisma.userPreference.updateMany({
    where: { userId },
    data: { score: { multiply: DECAY_RATE } }
  })

  for (const keyword of keywords) {
    await prisma.userPreference.upsert({
      where: { userId_keyword: { userId, keyword } },
      create: { userId, keyword, score: weight },
      update: {
        score: { increment: weight },
        lastTouched: new Date()
      }
    })
  }
}
