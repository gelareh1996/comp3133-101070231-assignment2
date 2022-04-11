const mongoose = require("../db/mongo");

const { Schema } = mongoose;
const BookingSchema = new Schema({
  listing_id: {
    type: String,
    required: true,
  },
  booking_id: {
    type: String,
    required: true,
  },
  booking_date: {
    type: String,
    required: true,
  },
  booking_start: {
    type: String,
    required: true,
  },
  booking_end: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
