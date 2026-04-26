const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Note = require('./models/Note');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5002;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fsdl_assignments';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected for Notes App'))
  .catch(err => console.log(err));

// Get all notes
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find().sort({ subject: 1, createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a note
app.post('/api/notes', async (req, res) => {
  try {
    const { subject, title, description } = req.body;
    const newNote = new Note({ subject, title, description });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Notes App backend running on port ${PORT}`);
});
