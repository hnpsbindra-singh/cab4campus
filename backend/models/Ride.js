const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rider: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pickupLocation: { type: String, required: true },
    dropLocation: { type: String, required: true },
    fare: { type: Number, default: 10 },
    status: {
      type: String,
      enum: ["pending", "accepted", "completed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["online", "cash", null],
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ride", rideSchema);
