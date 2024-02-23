const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const { createProduct, getAllProducts, updateProduct, deleteProduct } = require('./schema/product');

const app = express();
const PORT = 3000;


app.use(express.json());

mongoose.connect(process.env.MONGO_URL || { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.post('/products', async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = req.body;
    const product = await updateProduct(productId, updatedProduct);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    await deleteProduct(productId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});