const express = require('express');
const app = express();

/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function greetHandler(req, res) {
  const { name } = req.query;
  const greeting = name ? `Hello, ${name}!` : "Hello, Guest!";
  res.send(greeting);
}

// Register the greetHandler function to handle GET requests to /greet
app.get('/greet', greetHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});