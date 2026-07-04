import * as sourceRepo from "../repositories/source.repository.js"
import { fetchSource } from "../services/fetcher.js"

export const getAllSources = async (req, res) => {
    const sources = await sourceRepo.findAll()
    res.status(200).json({ data: sources })
}

export const getSourceById = async (req, res) => {
    const id = Number(req.params.id)
    const source = await sourceRepo.findById(id)
    if (!source) return res.status(404).json({ error: "Source not found" })
    res.status(200).json({ data: source })
}

export const addNewSource = async (req, res) => {
    const { name, url, type, config } = req.body
    if (!name || !url || !type) {
        return res.status(400).json({ error: "name, url, and type are required" })
    }
    if (type !== "RSS" && type !== "API") {
        return res.status(400).json({ error: "type must be RSS or API" })
    }

    const source = await sourceRepo.create({ name, url, type, config: config || {} })
    fetchSource(source).catch(err =>
        console.error(`Initial fetch failed for source ${source.id}:`, err.message)
    )
    res.status(201).json({ data: source })
}

export const editSource = async (req, res) => {
    const id = Number(req.params.id)
    const { name, url, type, config } = req.body

    const existing = await sourceRepo.findById(id)
    if (!existing) return res.status(404).json({ error: "Source not found" })

    const source = await sourceRepo.update(id, { name, url, type, config })
    res.status(200).json({ data: source })
}

export const removeSource = async (req, res) => {
    const id = Number(req.params.id)

    const existing = await sourceRepo.findById(id)
    if (!existing) return res.status(404).json({ error: "Source not found" })

    await sourceRepo.remove(id)
    res.status(200).json({ message: "Source deleted" })
}