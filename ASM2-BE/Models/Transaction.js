const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
  user: {
    userName: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  hotel: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Hotel",
  },
  room: {
    type: Object,
    required: true,
  },
  dataStart: {
    type: Date,
    required: true,
  },
  dataEnd: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  //(Credit Card, Cash)
  payment: {
    type: String,
    required: true,
  },
  //Tình trạng (Booked, Checkin, Checkout)
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
