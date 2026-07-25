import * as userSourceRepo from "../repositories/userSource.repository.js"
import * as sourceRepo from "../repositories/source.repository.js"
import { fetchSource } from "../services/fetcher.js"

export const getUserSources = async (req, res) => {
  const { userId } = req.params
  const sources = await userSourceRepo.findByUser(userId)
  res.status(200).json({ data: sources })
}

export const addExistingSource = async (req, res) => {
  const { userId } = req.params
  const { sourceId } = req.body

  if (!sourceId) {
    return res.status(400).json({ error: "sourceId is required" })
  }

  const source = await sourceRepo.findById(sourceId)
  if (!source) {
    return res.status(404).json({ error: "Source not found" })
  }

  const existing = await userSourceRepo.findByUserAndSource(userId, sourceId)
  if (existing) {
    return res.status(409).json({ error: "Source already added to user" })
  }

  const userSource = await userSourceRepo.addSourceToUser(userId, sourceId)
  res.status(201).json({ data: userSource })
}

export const createAndAssignSource = async (req, res) => {
  const { userId } = req.params
  const { name, url, type, config } = req.body

  if (!name || !url || !type) {
    return res.status(400).json({ error: "name, url, and type are required" })
  }
  if (type !== "RSS" && type !== "API") {
    return res.status(400).json({ error: "type must be RSS or API" })
  }

  let source = await sourceRepo.findByUrl(url);

  if (source) {
    const existing = await userSourceRepo.findByUserAndSource(userId, source.id)
    if (existing) {
      return res.status(409).json({ error: "You are already subscribed to this feed URL." })
    }
    
    await userSourceRepo.addSourceToUser(userId, source.id)
    return res.status(201).json({ data: { ...source, userSource: { userId } } })
  }

  source = await sourceRepo.create({ name, url, type, config: config || {} })
  await userSourceRepo.addSourceToUser(userId, source.id)

  fetchSource(source).catch(err =>
    console.error(`Initial fetch failed for source ${source.id}:`, err.message)
  )

  res.status(201).json({ data: { ...source, userSource: { userId } } })
}

export const removeUserSource = async (req, res) => {
  const { userId, sourceId } = req.params
  const id = Number(sourceId)

  const existing = await userSourceRepo.findByUserAndSource(userId, id)
  if (!existing) {
    return res.status(404).json({ error: "Source not assigned to this user" })
  }

  await userSourceRepo.removeSourceFromUser(userId, id)
  res.status(200).json({ message: "Source removed from user" })
}
