import { getPersonalizedFeed } from "../services/feed-service.js"

export const getFeed = async (req, res) => {
    const { userId } = req.query
    if (!userId) return res.status(400).json({ error: "userId query param is required" })

    const page = Math.max(1, parseInt(req.query.page) || 1)
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20))

    const result = await getPersonalizedFeed(userId, { page, limit })
    res.status(200).json(result)
}
