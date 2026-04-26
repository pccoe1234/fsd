const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Item = require('./models/Item');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5003;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fsdl_assignments';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected for Lost & Found System'))
  .catch(err => console.log(err));

// Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add an item
app.post('/api/items', async (req, res) => {
  try {
    const { itemName, description, location, contact, type } = req.body;
    const newItem = new Item({ itemName, description, location, contact, type });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Lost & Found System backend running on port ${PORT}`);
});
