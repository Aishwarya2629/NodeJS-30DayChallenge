const express = require('express');
const app = express();

const cache = {};

function cachingMiddleware(req, res, next) {
    const url = req.url;
    const cachedResponse = cache[url];

    if (cachedResponse) {
        const { data, expiration } = cachedResponse;

        if (expiration > Date.now()) {
            console.log(`Cache hit for ${url}`);
            return res.send(data);
        } else {
            console.log(`Cache expired for ${url}`);
            delete cache[url];
        }
    }

    next(); 
}

app.use(cachingMiddleware);

app.get('/data', (req, res) => {
    const responseData = "Hey, I have completed Day 14";
    cache[req.url] = { data: responseData, expiration: Date.now() + 60000 };
    res.send(responseData);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});