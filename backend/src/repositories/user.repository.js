import prisma from "../database/prisma.js"

export async function findById(id) {
    return prisma.user.findUnique({ where: { id } })
}

export async function findByEmail(email) {
    return prisma.user.findUnique({ where: { email } })
}

export async function updatePreferences(id, preferences) {
    return prisma.user.update({
        where: { id },
        data: { preferences }
    })
}

export async function createNewUser(data) {
    return prisma.user.create({ data })
}