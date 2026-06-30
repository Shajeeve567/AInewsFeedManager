import prisma from "./database/prisma.js"


async function main() {
    const sources = await prisma.source.findMany();
    console.log(sources)
}

main()