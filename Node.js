Node Js . 
Solution : ChatGPT

Step 1:

npm init -y
npm install express mongoose

Step 2:

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('<your-mongodb-uri>', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a University schema
const universitySchema = new mongoose.Schema({
  country: String,
  name: String,
  // Add more fields as needed
});

const University = mongoose.model('University', universitySchema);

app.use(bodyParser.json());

// API to save university data
app.post('/api/universities', async (req, res) => {
  try {
    const { country, name } = req.body;
    const university = new University({ country, name });
    await university.save();
    res.status(201).json({ message: 'University data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API to retrieve university data based on country name
app.get('/api/universities/:country', async (req, res) => {
  try {
    const country = req.params.country;
    const universities = await University.find({ country });
    res.json(universities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API to update university data based on country name and university ID
app.put('/api/universities/:country/:id', async (req, res) => {
  try {
    const { country, id } = req.params;
    const { name } = req.body;
    const updatedUniversity = await University.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.json(updatedUniversity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
