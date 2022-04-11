const mongoose = require("../db/mongo");

const { Schema } = mongoose;
const ListingSchema = new Schema({
  listing_id: {
    type: String,
    required: true,
  },
  listing_title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postal_code: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  },
  username: {
    type: String,
    required: true,
  },
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
