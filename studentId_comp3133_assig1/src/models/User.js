const mongoose = require("../db/mongo");

const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#\$\&\_\*])(?=.{6,})/,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
