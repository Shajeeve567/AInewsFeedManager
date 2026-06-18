import * as articleRepo from "../repositories/article.repository.js"
import { updateScores } from "../services/preference-engine.js"

const VALID_TYPES = ["READ", "SAVE", "CLICK"]

export const getArticles = async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1)
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20))
    const sourceId = req.query.sourceId ? Number(req.query.sourceId) : null

    const [articles, total] = await Promise.all([
        articleRepo.findMany({ sourceId, page, limit }),
        articleRepo.count({ sourceId })
    ])

    res.status(200).json({
        data: articles,
        meta: { page, limit, total, totalPages: Math.ceil(total / limit) }
    })
}

export const getArticleById = async (req, res) => {
    const id = Number(req.params.id)
    const article = await articleRepo.findById(id)
    if (!article) return res.status(404).json({ error: "Article not found" })
    res.status(200).json({ data: article })
}

export const interactWithArticle = async (req, res) => {
    const articleId = Number(req.params.id)
    const { userId, type } = req.body

    if (!userId || !type) {
        return res.status(400).json({ error: "userId and type are required" })
    }
    if (!VALID_TYPES.includes(type)) {
        return res.status(400).json({ error: "type must be READ, SAVE, or CLICK" })
    }

    const article = await articleRepo.findById(articleId)
    if (!article) return res.status(404).json({ error: "Article not found" })

    await articleRepo.createInteraction(userId, articleId, type)
    await updateScores(userId, articleId, type)

    res.status(200).json({ message: "Interaction recorded" })
}
