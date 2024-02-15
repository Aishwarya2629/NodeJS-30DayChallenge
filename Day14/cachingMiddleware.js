const cache = require('memory-cache');

const expressIdentifier = 'your_express_identifier';

function cachingMiddleware(req, res, next) {
    const key = expressIdentifier + req.originalUrl || req.url;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        res.send(cachedResponse);
        return;
    }

    res.sendResponse = res.send;
    res.send = (body) => {
        cache.put(key, body, 60 * 1000); 
        res.sendResponse(body);
    };
    next();
}

module.exports = cachingMiddleware;