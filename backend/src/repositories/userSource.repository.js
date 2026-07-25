import prisma from "../database/prisma.js"

export async function findByUser(userId) {
  return prisma.userSource.findMany({
    where: { userId },
    include: { source: true },
    orderBy: { addedAt: "desc" }
  })
}

export async function addSourceToUser(userId, sourceId) {
  return prisma.userSource.upsert({
    where: { userId_sourceId: { userId, sourceId } },
    create: { userId, sourceId },
    update: {}
  })
}

export async function removeSourceFromUser(userId, sourceId) {
  return prisma.userSource.delete({
    where: { userId_sourceId: { userId, sourceId } }
  })
}

export async function findByUserAndSource(userId, sourceId) {
  return prisma.userSource.findUnique({
    where: { userId_sourceId: { userId, sourceId } }
  })
}

export async function findBySource(sourceId) {
  return prisma.userSource.findMany({
    where: { sourceId },
    include: { user: { select: { id: true, email: true, name: true } } }
  })
}

export async function countByUser(userId) {
  return prisma.userSource.count({ where: { userId } })
}
