const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Vehicle = require('./models/Vehicle');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5009;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fsdl_assignments';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected for Used Vehicles'))
  .catch(err => console.log(err));

app.get('/api/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/vehicles', async (req, res) => {
  try {
    const newVehicle = new Vehicle(req.body);
    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Used Vehicles backend running on port ${PORT}`);
});
