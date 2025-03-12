const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos en milisegundos

function cacheInit(req, res, next) {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse && Date.now() - cachedResponse.timestamp < CACHE_DURATION) {
        return res.json(cachedResponse.data);
    }

    const originalJson = res.json;
    res.json = function(data) {
        cache.set(key, {
            data,
            timestamp: Date.now()
        });
        originalJson.call(this, data);
    };

    next();
}

module.exports = {
    cacheInit
}; 