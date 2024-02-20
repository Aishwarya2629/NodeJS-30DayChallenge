const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error(`Error connecting to MongoDB: ${error}`));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

app.use(express.json());

app.post('/users', async (req, res) => {
  try {
    const { name, age } = req.body;
    const user = new User({ name, age });
    await user.save();
    res.json({ message: 'User added successfully', user });
  } catch (error) {
    console.error(`Error while adding user: ${error}`);
    res.status(500).send('Server error');
  }
});

app.get('/average-age', async (req, res) => {
  try {
    const users = await User.find({});
    const ages = await User.aggregate([
      { $group: { _id: null, avg_age: { $avg: '$age' } } },
    ]);

    const result = ages[0];
    res.json({ averageAge: result?.avg_age });
  } catch (error) {
    console.error(`Error while calculating average age: ${error}`);
    res.status(500).send('Server error');
  }
});

// Start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));