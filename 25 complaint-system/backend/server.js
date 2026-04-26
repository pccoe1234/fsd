const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Complaint = require('./models/Complaint');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fsdl_assignments';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected for Complaint System'))
  .catch(err => console.log(err));

// Get all complaints
app.get('/api/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit a complaint
app.post('/api/complaints', async (req, res) => {
  try {
    const { name, issue, category } = req.body;
    const newComplaint = new Complaint({ name, issue, category });
    const savedComplaint = await newComplaint.save();
    res.status(201).json(savedComplaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update status
app.patch('/api/complaints/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedComplaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Complaint System backend running on port ${PORT}`);
});
