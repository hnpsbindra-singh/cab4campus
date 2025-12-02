const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // demo only, hash in real apps
  role: { type: String, enum: ["student", "rider"], required: true },
});

module.exports = mongoose.model("User", userSchema);
