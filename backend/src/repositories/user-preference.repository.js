import prisma from "../database/prisma.js"

export async function decayAll(userId, rate) {
    return prisma.userPreference.updateMany({
        where: { userId },
        data: { score: { multiply: rate } }
    })
}

export async function upsertKeyword(userId, keyword, weight) {
    return prisma.userPreference.upsert({
        where: { userId_keyword: { userId, keyword } },
        create: { userId, keyword, score: weight },
        update: {
            score: { increment: weight },
            lastTouched: new Date()
        }
    })
}

export async function findByUser(userId) {
    return prisma.userPreference.findMany({
        where: { userId },
        select: { keyword: true, score: true }
    })
}
