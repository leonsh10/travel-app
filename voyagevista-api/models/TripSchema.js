const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  city: { type: String, required: true },
  hotel: { type: String, required: true },
  category: { type: String, required: true },
  shortDescription: { type: String, required: true },
  largeDescription: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  departureTime: { type: String, required: true },
  returnTime: { type: String, required: true },
  includes: [String],
  likes: { type: Number, default: 0 },
  availability: { type: Number, default: 10 },
  sale: Number, 
  cardImage: { type: String, required: true },
  landingImage: { type: String, required: true },
  effectivePrice: { type: Number },
  galleryImages: [String] 
});

module.exports = mongoose.model('Trip', TripSchema);
