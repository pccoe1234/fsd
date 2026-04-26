const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  type: { type: String, required: true, enum: ['Lost', 'Found'] },
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);
