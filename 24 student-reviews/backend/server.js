const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Review = require('./models/Review');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5011;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fsdl_assignments';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected for Student Reviews'))
  .catch(err => console.log(err));

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Student Reviews backend running on port ${PORT}`);
});
