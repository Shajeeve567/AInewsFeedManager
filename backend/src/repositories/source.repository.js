import prisma from "../database/prisma.js"

export async function findAll() {
  return prisma.source.findMany({ orderBy: { createdAt: "desc" } })
}

export async function findById(id) {
  return prisma.source.findUnique({ where: { id } })
}

export async function create(data) {
  return prisma.source.create({ data })
}

export async function findByUrl(url) {
  return prisma.source.findFirst({ where: { url } })
}

export async function update(id, data) {
  return prisma.source.update({ where: { id }, data })
}

export async function remove(id) {
  await prisma.article.deleteMany({ where: { sourceId: id } })
  return prisma.source.delete({ where: { id } })
}
