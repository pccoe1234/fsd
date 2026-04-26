const mongoose = require('mongoose');

const RentalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  item: { type: String, required: true },
  duration: { type: String, required: true },
  startDate: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Rental', RentalSchema);
