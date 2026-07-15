import { google } from "@ai-sdk/google"
import { createOpenAICompatible  } from "@ai-sdk/openai-compatible"
import { createOpenRouter  } from '@openrouter/ai-sdk-provider';


const nimProvider = createOpenAICompatible({
    name: 'nim',
    baseURL: 'https://integrate.api.nvidia.com/v1',
    headers: {
        Authorization: `Bearer ${process.env.NIM_API_KEY}`,
    },
})

const openrouterProvider = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});


// Only add models to the pool if their API keys are configured in .env
export const MODEL_POOL = [];

// if (process.env.OPENROUTER_API_KEY) {
//   MODEL_POOL.push({
//     id: 'openrouter-free',
//     displayName: 'OpenRouter Free Llama 3',
//     instance: openrouterProvider.chat ? openrouterProvider.chat('meta-llama/llama-3.1-8b-instruct:free') : openrouterProvider('meta-llama/llama-3.1-8b-instruct:free'),
//     maxTokensPerMin: 15000
//   });
// }

if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  MODEL_POOL.push({
    id: 'google-flash',
    displayName: 'Google Gemini 1.5 Flash',
    instance: google('gemini-3.5-flash'),
    maxTokensPerMin: 15000
  });
}

if (process.env.NIM_API_KEY) {
  MODEL_POOL.push({
    id: 'nvidia-llama',
    displayName: 'NVIDIA NIM Llama 3.1',
    instance: nimProvider.chatModel('minimaxai/minimax-m3'),
    maxTokensPerMin: 10000
  });
}


const providerCooldowns = new Map();
const userRequestTracking = new Map()

// PROTECT YOUR OWN KEYS FROM USER ABUSE
export function isUserRateLimited(userIp) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequestsPerMin = 5; // Allow maximum 5 requests per minute per visitor

  if (!userRequestTracking.has(userIp)) {
    userRequestTracking.set(userIp, []);
  }

  let timestamps = userRequestTracking.get(userIp);
  // Filter out timestamps older than 1 minute
  timestamps = timestamps.filter(time => now - time < windowMs);
  
  if (timestamps.length >= maxRequestsPerMin) {
    return true; // Stop them!
  }

  // Log current request timestamp
  timestamps.push(now);
  userRequestTracking.set(userIp, timestamps);
  return false; // Safe to pass
}


export function putModelOnCooldown(modelId, durationSeconds = 60) {
  providerCooldowns.set(modelId, Date.now() + (durationSeconds * 1000));
}


export function getAvailableModels() {
  const now = Date.now();
  return MODEL_POOL.filter(model => {
    // check if instance exists
    if (!model.instance) return false;

    if (providerCooldowns.has(model.id)) {
      if (now < providerCooldowns.get(model.id)) return false;
      providerCooldowns.delete(model.id);
    }
    return true;
  });
}

/**
 * Returns a connection to the best available AI model.
 * Throws an error if all models are exhausted (rate limited).
 */
export function getModelConnection() {
  const availableModels = getAvailableModels();

  if (availableModels.length === 0) {
    throw new Error("RATE_LIMIT_EXCEEDED: All configured AI models are currently on cooldown or unavailable.");
  }

  // Pick the first available model (fallback cascade order defined in MODEL_POOL)
  const selected = availableModels[0];

  return {
    model: selected.instance,
    modelId: selected.id
  };
}

