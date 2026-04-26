const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  details: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);
