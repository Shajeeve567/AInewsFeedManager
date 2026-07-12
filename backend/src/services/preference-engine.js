import prisma from "../database/prisma.js"
import { extractKeywords } from "../utils/keyword-extractor.js"

const WEIGHTS = { LIKE: 4, SAVE: 3, READ: 2, CLICK: 1, SHARE: 1, DISMISS: -2 }
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
