import prisma from "../database/prisma.js"

export async function findById(id) {
    return prisma.user.findUnique({ where: { id } })
}

export async function updatePreferences(id, preferences) {
    return prisma.user.update({
        where: { id },
        data: { preferences }
    })
}