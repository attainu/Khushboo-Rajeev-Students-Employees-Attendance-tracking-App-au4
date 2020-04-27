const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  mobile: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  joined: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },

});

module.exports = User = mongoose.model("users", UserSchema);
