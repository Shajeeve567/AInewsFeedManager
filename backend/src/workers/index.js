// Entry point for all background workers
import "dotenv/config";
import "./newsWorker.js";
import "./summaryWorker.js";

console.log("[Worker] All background workers initialized successfully.");