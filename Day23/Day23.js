
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Step 1: Define a Category schema
const categorySchema = new mongoose.Schema({
  name: String,
});

// Step 2: Update the Product schema to include a reference to Category
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

// Step 3: Create a ProductWithCategory model using the updated schema
const Category = mongoose.model('Category', categorySchema);
const ProductWithCategory = mongoose.model('ProductWithCategory', productSchema);

// Step 4: Implement the getProductsPopulatedWithCategory function
async function getProductsPopulatedWithCategory() {
  try {
    // Populate the category field of the ProductWithCategory model
    const products = await ProductWithCategory.find().populate('category');
    return products;
  } catch (error) {
    console.error('Error fetching products with populated category:', error);
    return [];
  }
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    // Create categories
    const category1 = new Category({ name: 'Category 1' });
    await category1.save();

    const category2 = new Category({ name: 'Category 2' });
    await category2.save();

    // Create up to five products with associated categories
    const productData = [
      { name: 'Product 1', price: 100, category: category1._id },
      { name: 'Product 2', price: 200, category: category2._id },
      { name: 'Product 3', price: 300, category: category1._id },
      { name: 'Product 4', price: 400, category: category2._id },
      { name: 'Product 5', price: 500, category: category1._id },
    ];

    for (let i = 0; i < productData.length; i++) {
      const product = new ProductWithCategory(productData[i]);
      await product.save();
    }

    // Call the function to retrieve products with populated category details
    const productsWithCategory = await getProductsPopulatedWithCategory();
    console.log(productsWithCategory);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
