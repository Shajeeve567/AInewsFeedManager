import cron from "node-cron"
import { fetchAllSources } from "../services/fetcher.js"

const EVERY_15_MIN = "*/15 * * * *"

export function startSourceScheduler() {
    console.log("[Scheduler] Running initial fetch...")
    fetchAllSources();

    console.log("[Scheduler] Scheduling RSS fetch every 15 minutes...")
    cron.schedule(EVERY_15_MIN, () => {
        fetchAllSources();
    })
}