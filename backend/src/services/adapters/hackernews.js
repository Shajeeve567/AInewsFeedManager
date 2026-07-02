
const BASE = "https://hacker-news.firebaseio.com/v0/"
const TOP_N = 30
const CONCURRENCY = 5


export async function fetchApiNews(source) {
  const ids = await getTopStoryIds()
  const batch = ids.slice(0, TOP_N)
  
  const items = await fetchInBatches(batch, CONCURRENCY)
  console.log(`Fetched Successfully : ${source.name}`)
  return items
    .filter(item => item && item.type === "story" && item.title)
    .map(item => ({
      title: item.title,
      link: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
      content: null,
      publishedAt: new Date(item.time * 1000)
    }))
}


async function getTopStoryIds(){
    const res = await fetch(`${BASE}/topstories.json`)
    return res.json()
}    

async function getItem(id) {
  const res = await fetch(`${BASE}/item/${id}.json`)
  return res.json()
}

async function fetchInBatches(ids, batchSize) {
  const results = []
  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize)
    const items = await Promise.all(batch.map(getItem))
    results.push(...items)
  }
  return results
}