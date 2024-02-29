const express = require('express');

const app = express();
const port = 3000;

function errorHandler(err, req, res, next) {
    console.error(err); 
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'; 
    res.status(statusCode).json({ error: message, statusCode });
}

app.use('/error-sample', (req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});