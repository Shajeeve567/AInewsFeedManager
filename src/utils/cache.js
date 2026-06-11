
const cache = new Map();
function get(key) { return cache.get(key);}
function set(key, value, ttlMs = 300000) { 
    cache.set(key, value);
    setTimeout(() => cache.delete(key), ttlMs); 
}


export default get;
export default set;
