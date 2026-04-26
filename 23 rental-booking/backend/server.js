const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Rental = require('./models/Rental');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5010;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fsdl_assignments';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected for Rental Booking'))
  .catch(err => console.log(err));

app.get('/api/rentals', async (req, res) => {
  try {
    const rentals = await Rental.find().sort({ createdAt: -1 });
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/rentals', async (req, res) => {
  try {
    const newRental = new Rental(req.body);
    const savedRental = await newRental.save();
    res.status(201).json(savedRental);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Rental Booking backend running on port ${PORT}`);
});
