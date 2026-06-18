const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "as", "is", "it", "its", "was", "are",
  "be", "been", "being", "have", "has", "had", "do", "does", "did",
  "will", "would", "can", "could", "may", "might", "shall", "should",
  "not", "no", "nor", "so", "if", "than", "that", "this", "these",
  "those", "which", "what", "who", "whom", "when", "where", "why",
  "about", "into", "over", "after", "before", "between", "under",
  "again", "further", "once", "here", "there", "all", "each", "every",
  "both", "few", "more", "most", "other", "some", "such", "only",
  "own", "same", "too", "very", "just", "because", "how", "new",
  "get", "use", "make", "like", "time", "one", "two", "also", "now",
  "even", "still", "already", "yet", "via", "using", "based"
])

export function extractKeywords(text) {
  if (!text) return []

  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .split(/\s+/)
    .filter(w => w.length >= 3 && !STOP_WORDS.has(w))

  return [...new Set(words)]
}
