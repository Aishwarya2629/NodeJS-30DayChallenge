const express = require('express');

const app = express();
const port = 3000;

class InvalidPositiveIntegerError extends Error {
    constructor(message) {
      super(message);
      this.name = 'InvalidPositiveIntegerError';
    }
  }
  
  function errorHandler(err, req, res, next) {
    if (err instanceof InvalidPositiveIntegerError) {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
  
  function positiveIntegerHandler(req, res, next) {
    try {
      const number = parseInt(req.query.number);
      if (Number.isNaN(number) || number <= 0) {
        throw new InvalidPositiveIntegerError('Parameter must be a positive integer');
      }
      res.json({ message: 'Success! Number is a positive integer.' });
    } catch (err) {
      next(err);
    }
  }
  
  app.use(errorHandler);
  
  app.get('/positive', positiveIntegerHandler);
  
  const PORT = process.env.PORT || 3000;
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  