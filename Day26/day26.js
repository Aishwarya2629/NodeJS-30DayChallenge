const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();


const client = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

async function createSampleData() {
  try {
    await client.connect();
    const database = client.db("Products");
    const productsCollection = database.collection("products");

    const products = [
      { name: "Product 1", price: 10, quantity: 5 },
      { name: "Product 2", price: 20, quantity: 8 },
      { name: "Product 3", price: 15, quantity: 3 },
      { name: "Product 4", price: 25, quantity: 6 },
      { name: "Product 5", price: 30, quantity: 10 }
    ];

    const result = await productsCollection.insertMany(products);
    console.log(`${result.insertedCount} documents inserted.`);
  } catch (error) {
    console.error("Error in createSampleData:", error);
    throw error;
  } finally {
    await client.close();
  }
}

async function getProductStatistics() {
  try {
    await client.connect();
    const database = client.db("Products");
    const productsCollection = database.collection("products");

    const pipeline = [
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 }, // Counting total products
          averagePrice: { $avg: "$price" }, // Calculating average price
          highestQuantity: { $max: "$quantity" } // Finding highest quantity
        }
      }
    ];

    const result = await productsCollection.aggregate(pipeline).toArray();
    return result[0];
  } catch (error) {
    console.error("Error in getProductStatistics:", error);
    throw error;
  } finally {
    await client.close();
  }
}

async function test() {
  try {
    await createSampleData();

    const stats = await getProductStatistics();
    console.log("Product statistics:", stats);
  } catch (error) {
    console.error("Error in test:", error);
  }
}
test();