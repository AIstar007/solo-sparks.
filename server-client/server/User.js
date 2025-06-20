const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  mood: String,
  traits: [String],
  points: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", UserSchema);