import { pipeline, env } from "@huggingface/transformers"

// Vercel serverless functions are read-only except for /tmp
env.cacheDir = '/tmp';
env.useBrowserCache = false;

export const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');


