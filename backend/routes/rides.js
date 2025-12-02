const express = require("express");
const router = express.Router();
const Ride = require("../models/Ride");

// 1) Available rides for rider (KEEP THIS BEFORE /:id)
router.get("/available/list/all", async (req, res) => {
  try {
    const rides = await Ride.find({ status: "pending" }).populate(
      "student",
      "name phone"
    );
    res.json({ success: true, rides });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching rides" });
  }
});

// 2) Student creates ride
router.post("/", async (req, res) => {
  try {
    const { studentId, pickupLocation, dropLocation } = req.body;
    const ride = new Ride({
      student: studentId,
      pickupLocation,
      dropLocation,
      fare: 10,
    });
    await ride.save();
    res.json({ success: true, ride });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Ride create failed" });
  }
});

// 3) Get ride by id
router.get("/:id", async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id)
      .populate("student", "name phone")
      .populate("rider", "name phone");
    if (!ride) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, ride });
  } catch (err) {
    res.status(404).json({ success: false, message: "Ride not found" });
  }
});

// 4) Rider accepts ride
router.post("/:id/accept", async (req, res) => {
  try {
    const { riderId } = req.body;
    const ride = await Ride.findByIdAndUpdate(
      req.params.id,
      { status: "accepted", rider: riderId },
      { new: true }
    )
      .populate("student", "name phone")
      .populate("rider", "name phone");

    res.json({ success: true, ride });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Accept failed" });
  }
});

// 5) Student selects payment method
router.post("/:id/payment", async (req, res) => {
  try {
    const { method } = req.body;
    const ride = await Ride.findByIdAndUpdate(
      req.params.id,
      { paymentMethod: method },
      { new: true }
    )
      .populate("student", "name phone")
      .populate("rider", "name phone");

    res.json({ success: true, ride });
  } catch (err) {
    res.status(400).json({ success: false, message: "Payment update failed" });
  }
});

module.exports = router;
