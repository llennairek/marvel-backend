const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    unique: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  favorites: {
    comics: {
      type: Array,
      default: [],
    },
    characters: {
      type: Array,
      default: [],
    },
  },
  token: String,
  hash: String,
  salt: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
