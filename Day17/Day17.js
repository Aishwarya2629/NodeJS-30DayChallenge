const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});
async function addUserToDatabase(user) {
  try {
    const newUser = new User(user);
    await newUser.save();
    console.log("User added successfully.");
  } catch (error) {
    console.error("Error adding user:", error);
  }
}
addUserToDatabase({ username: 'Scalar', email: 'scakar@gmail.com' });