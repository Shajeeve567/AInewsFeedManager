
const cache = new Map();
export function get(key) { return cache.get(key);}
export function set(key, value, ttlMs = 300000) { 
    cache.set(key, value);
    setTimeout(() => cache.delete(key), ttlMs); 
}

