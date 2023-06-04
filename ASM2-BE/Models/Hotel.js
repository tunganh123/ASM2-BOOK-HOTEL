const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // (Hotel, Apartments, Resorts, Villas, Cabins)
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  photos: {
    type: Array,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  //(trong khoảng 0 -> 5 điểm)
  rating: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    required: true,
  },
  rooms: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Hotel", hotelSchema);
