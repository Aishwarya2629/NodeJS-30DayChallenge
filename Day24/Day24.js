const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

function createProductNameIndex() {
  Product.collection.createIndex({ name: 1 }, (err, result) => {
    if (err) {
      console.error('Error creating index:', err);
    } else {
      console.log('Index created successfully:', result);
    }
  });
}

createProductNameIndex();

app.post('/products', (req, res) => {
  const { name, description, price } = req.body;
  const product = new Product({ name, description, price });

  product.save()
    .then(() => {
      res.status(201).json({ message: 'Product created successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.get('/products', (req, res) => {
  Product.find()
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  Product.findByIdAndUpdate(id, { name, description, price }, { new: true })
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  Product.findByIdAndDelete(id)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});