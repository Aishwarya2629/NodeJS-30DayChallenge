const mongoose = require('mongoose');
const User = require('./user');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    async function addUserWithValidation(user) {
      try {
        const newUser = new User(user);
        await newUser.save();
        console.log("User added successfully!");
      } catch (error) {
        console.error("Error adding user:", error.message);
      }
    }
    addUserWithValidation({ username: 'john_doe', email: 'invalid-email' });
  })
  .catch(err => console.error("Error connecting to MongoDB:", err));