const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issue: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Resolved'] },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', ComplaintSchema);
