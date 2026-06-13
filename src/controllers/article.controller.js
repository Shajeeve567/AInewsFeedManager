import * as articleRepo from "../repositories/article.repository.js"

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
