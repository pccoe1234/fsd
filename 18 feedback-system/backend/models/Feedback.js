const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  feedback: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);
